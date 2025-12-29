import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { CalendarIcon, Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DriverEntry {
  id?: string;
  driver_name: string;
  bags_delivered: number;
  sales_amount: number;
  fuel_cost: number;
}

interface Expense {
  id?: string;
  description: string;
  amount: number;
}

const SalesEntry = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [driverEntries, setDriverEntries] = useState<DriverEntry[]>([
    { driver_name: '', bags_delivered: 0, sales_amount: 0, fuel_cost: 0 },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const dateStr = format(selectedDate, 'yyyy-MM-dd');

  // Fetch existing record for selected date
  const { data: existingRecord, isLoading } = useQuery({
    queryKey: ['daily-record', dateStr],
    queryFn: async () => {
      const { data: record, error: recordError } = await supabase
        .from('daily_records')
        .select('*')
        .eq('record_date', dateStr)
        .maybeSingle();

      if (recordError) throw recordError;

      if (record) {
        // Fetch driver entries
        const { data: entries, error: entriesError } = await supabase
          .from('driver_entries')
          .select('*')
          .eq('daily_record_id', record.id);

        if (entriesError) throw entriesError;

        // Fetch expenses
        const { data: expenseData, error: expenseError } = await supabase
          .from('expenses')
          .select('*')
          .eq('daily_record_id', record.id);

        if (expenseError) throw expenseError;

        return { record, entries: entries || [], expenses: expenseData || [] };
      }

      return null;
    },
    staleTime: 0,
  });

  // Load existing data when date changes
  React.useEffect(() => {
    if (existingRecord) {
      setDriverEntries(
        existingRecord.entries.length > 0
          ? existingRecord.entries.map((e) => ({
              id: e.id,
              driver_name: e.driver_name,
              bags_delivered: e.bags_delivered,
              sales_amount: Number(e.sales_amount),
              fuel_cost: Number(e.fuel_cost),
            }))
          : [{ driver_name: '', bags_delivered: 0, sales_amount: 0, fuel_cost: 0 }]
      );
      setExpenses(
        existingRecord.expenses.map((e) => ({
          id: e.id,
          description: e.description,
          amount: Number(e.amount),
        }))
      );
    } else {
      setDriverEntries([{ driver_name: '', bags_delivered: 0, sales_amount: 0, fuel_cost: 0 }]);
      setExpenses([]);
    }
  }, [existingRecord]);

  const addDriverEntry = () => {
    setDriverEntries([
      ...driverEntries,
      { driver_name: '', bags_delivered: 0, sales_amount: 0, fuel_cost: 0 },
    ]);
  };

  const removeDriverEntry = (index: number) => {
    if (driverEntries.length > 1) {
      setDriverEntries(driverEntries.filter((_, i) => i !== index));
    }
  };

  const updateDriverEntry = (index: number, field: keyof DriverEntry, value: string | number) => {
    const updated = [...driverEntries];
    updated[index] = { ...updated[index], [field]: value };
    setDriverEntries(updated);
  };

  const addExpense = () => {
    setExpenses([...expenses, { description: '', amount: 0 }]);
  };

  const removeExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const updateExpense = (index: number, field: keyof Expense, value: string | number) => {
    const updated = [...expenses];
    updated[index] = { ...updated[index], [field]: value };
    setExpenses(updated);
  };

  const handleSave = async () => {
    if (!user) return;

    // Validate driver entries
    const validDrivers = driverEntries.filter((e) => e.driver_name.trim() !== '');
    if (validDrivers.length === 0) {
      toast.error('Please add at least one driver entry');
      return;
    }

    setIsSaving(true);

    try {
      let recordId: string;

      if (existingRecord?.record) {
        // Update existing record
        recordId = existingRecord.record.id;
        await supabase
          .from('daily_records')
          .update({ updated_by: user.id })
          .eq('id', recordId);
      } else {
        // Create new record
        const { data: newRecord, error: createError } = await supabase
          .from('daily_records')
          .insert({
            record_date: dateStr,
            created_by: user.id,
          })
          .select()
          .single();

        if (createError) throw createError;
        recordId = newRecord.id;
      }

      // Delete existing entries and expenses
      await supabase.from('driver_entries').delete().eq('daily_record_id', recordId);
      await supabase.from('expenses').delete().eq('daily_record_id', recordId);

      // Insert driver entries
      const driverData = validDrivers.map((e) => ({
        daily_record_id: recordId,
        driver_name: e.driver_name.trim(),
        bags_delivered: e.bags_delivered,
        sales_amount: e.sales_amount,
        fuel_cost: e.fuel_cost,
        net_sales: e.sales_amount - e.fuel_cost,
      }));

      const { error: entriesError } = await supabase.from('driver_entries').insert(driverData);
      if (entriesError) throw entriesError;

      // Insert expenses
      const validExpenses = expenses.filter((e) => e.description.trim() !== '' && e.amount > 0);
      if (validExpenses.length > 0) {
        const expenseData = validExpenses.map((e) => ({
          daily_record_id: recordId,
          description: e.description.trim(),
          amount: e.amount,
        }));

        const { error: expenseError } = await supabase.from('expenses').insert(expenseData);
        if (expenseError) throw expenseError;
      }

      toast.success('Daily record saved successfully');
      queryClient.invalidateQueries({ queryKey: ['daily-record', dateStr] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    } catch (error: any) {
      toast.error(error.message || 'Failed to save record');
    } finally {
      setIsSaving(false);
    }
  };

  const totalSales = driverEntries.reduce((sum, e) => sum + (e.sales_amount || 0), 0);
  const totalFuel = driverEntries.reduce((sum, e) => sum + (e.fuel_cost || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalBags = driverEntries.reduce((sum, e) => sum + (e.bags_delivered || 0), 0);
  const netRevenue = totalSales - totalFuel - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Daily Sales Entry</h2>
          <p className="text-muted-foreground">Record driver deliveries and expenses</p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Driver Entries */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Driver Deliveries</CardTitle>
              <Button onClick={addDriverEntry} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Driver
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {driverEntries.map((entry, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="md:col-span-1">
                    <Label htmlFor={`driver-${index}`}>Driver Name</Label>
                    <Input
                      id={`driver-${index}`}
                      value={entry.driver_name}
                      onChange={(e) => updateDriverEntry(index, 'driver_name', e.target.value)}
                      placeholder="Enter driver name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`bags-${index}`}>Bags Delivered</Label>
                    <Input
                      id={`bags-${index}`}
                      type="number"
                      value={entry.bags_delivered}
                      onChange={(e) =>
                        updateDriverEntry(index, 'bags_delivered', parseInt(e.target.value) || 0)
                      }
                      min={0}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`sales-${index}`}>Sales Amount (₦)</Label>
                    <Input
                      id={`sales-${index}`}
                      type="number"
                      value={entry.sales_amount}
                      onChange={(e) =>
                        updateDriverEntry(index, 'sales_amount', parseFloat(e.target.value) || 0)
                      }
                      min={0}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`fuel-${index}`}>Fuel Cost (₦)</Label>
                    <Input
                      id={`fuel-${index}`}
                      type="number"
                      value={entry.fuel_cost}
                      onChange={(e) =>
                        updateDriverEntry(index, 'fuel_cost', parseFloat(e.target.value) || 0)
                      }
                      min={0}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDriverEntry(index)}
                      disabled={driverEntries.length === 1}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expenses */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Other Expenses</CardTitle>
              <Button onClick={addExpense} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Expense
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {expenses.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No expenses added. Click "Add Expense" to add one.
                </p>
              ) : (
                expenses.map((expense, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="md:col-span-2">
                      <Label htmlFor={`expense-desc-${index}`}>Description</Label>
                      <Input
                        id={`expense-desc-${index}`}
                        value={expense.description}
                        onChange={(e) => updateExpense(index, 'description', e.target.value)}
                        placeholder="Enter expense description"
                      />
                    </div>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label htmlFor={`expense-amount-${index}`}>Amount (₦)</Label>
                        <Input
                          id={`expense-amount-${index}`}
                          type="number"
                          value={expense.amount}
                          onChange={(e) =>
                            updateExpense(index, 'amount', parseFloat(e.target.value) || 0)
                          }
                          min={0}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExpense(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-serif">Daily Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Bags</p>
                  <p className="text-xl font-bold text-primary">{totalBags}</p>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-xl font-bold text-accent">₦{totalSales.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Fuel Costs</p>
                  <p className="text-xl font-bold">₦{totalFuel.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-destructive/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Other Expenses</p>
                  <p className="text-xl font-bold text-destructive">
                    ₦{totalExpenses.toLocaleString()}
                  </p>
                </div>
                <div
                  className={cn(
                    'text-center p-3 rounded-lg',
                    netRevenue >= 0 ? 'bg-water-light' : 'bg-destructive/10'
                  )}
                >
                  <p className="text-sm text-muted-foreground">Net Revenue</p>
                  <p
                    className={cn(
                      'text-xl font-bold',
                      netRevenue >= 0 ? 'text-water-deep' : 'text-destructive'
                    )}
                  >
                    ₦{netRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-cta px-8"
              size="lg"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Daily Record
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesEntry;
