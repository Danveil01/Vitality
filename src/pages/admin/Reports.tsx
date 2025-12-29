import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns';
import { FileText, Calendar as CalendarIcon, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const Reports = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const { data: reportData, isLoading } = useQuery({
    queryKey: ['reports-data', format(dateRange.from, 'yyyy-MM-dd'), format(dateRange.to, 'yyyy-MM-dd')],
    queryFn: async () => {
      // Get daily records for the date range
      const { data: dailyRecords, error: recordsError } = await supabase
        .from('daily_records')
        .select('id, record_date')
        .gte('record_date', format(dateRange.from, 'yyyy-MM-dd'))
        .lte('record_date', format(dateRange.to, 'yyyy-MM-dd'))
        .order('record_date', { ascending: true });

      if (recordsError) throw recordsError;

      const recordIds = dailyRecords?.map(r => r.id) || [];
      const placeholderId = '00000000-0000-0000-0000-000000000000';

      // Get driver entries for these records
      const { data: driverEntries, error: entriesError } = await supabase
        .from('driver_entries')
        .select('daily_record_id, driver_name, bags_delivered, sales_amount, fuel_cost')
        .in('daily_record_id', recordIds.length > 0 ? recordIds : [placeholderId]);

      if (entriesError) throw entriesError;

      // Get expenses for these records
      const { data: expenses, error: expensesError } = await supabase
        .from('expenses')
        .select('daily_record_id, amount, description')
        .in('daily_record_id', recordIds.length > 0 ? recordIds : [placeholderId]);

      if (expensesError) throw expensesError;

      // Build daily breakdown
      const dailyBreakdown = dailyRecords?.map(record => {
        const dayEntries = driverEntries?.filter(e => e.daily_record_id === record.id) || [];
        const dayExpenses = expenses?.filter(e => e.daily_record_id === record.id) || [];

        const bags = dayEntries.reduce((sum, e) => sum + (e.bags_delivered || 0), 0);
        const sales = dayEntries.reduce((sum, e) => sum + Number(e.sales_amount || 0), 0);
        const fuel = dayEntries.reduce((sum, e) => sum + Number(e.fuel_cost || 0), 0);
        const otherExpenses = dayExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
        const netSales = sales - fuel - otherExpenses;

        return {
          date: record.record_date,
          displayDate: format(parseISO(record.record_date), 'MMM d'),
          bags,
          sales,
          fuel,
          expenses: otherExpenses,
          netSales,
          drivers: dayEntries.map(e => ({
            name: e.driver_name,
            bags: e.bags_delivered,
            sales: Number(e.sales_amount || 0),
            fuel: Number(e.fuel_cost || 0),
          })),
        };
      }) || [];

      // Calculate totals
      const totalBags = dailyBreakdown.reduce((sum, d) => sum + d.bags, 0);
      const totalSales = dailyBreakdown.reduce((sum, d) => sum + d.sales, 0);
      const totalFuel = dailyBreakdown.reduce((sum, d) => sum + d.fuel, 0);
      const totalExpenses = dailyBreakdown.reduce((sum, d) => sum + d.expenses, 0);
      const totalNetSales = dailyBreakdown.reduce((sum, d) => sum + d.netSales, 0);

      // Get unique drivers
      const allDrivers = driverEntries?.reduce((acc, entry) => {
        const existing = acc.find(d => d.name === entry.driver_name);
        if (existing) {
          existing.bags += entry.bags_delivered || 0;
          existing.sales += Number(entry.sales_amount || 0);
          existing.fuel += Number(entry.fuel_cost || 0);
        } else {
          acc.push({
            name: entry.driver_name,
            bags: entry.bags_delivered || 0,
            sales: Number(entry.sales_amount || 0),
            fuel: Number(entry.fuel_cost || 0),
          });
        }
        return acc;
      }, [] as Array<{ name: string; bags: number; sales: number; fuel: number }>) || [];

      return {
        dailyBreakdown,
        totals: {
          bags: totalBags,
          sales: totalSales,
          fuel: totalFuel,
          expenses: totalExpenses,
          netSales: totalNetSales,
        },
        driverSummary: allDrivers,
        daysRecorded: dailyRecords?.length || 0,
      };
    },
  });

  const exportToCSV = () => {
    if (!reportData) return;

    const headers = ['Date', 'Bags Delivered', 'Sales (₦)', 'Fuel Cost (₦)', 'Other Expenses (₦)', 'Net Sales (₦)'];
    const rows = reportData.dailyBreakdown.map(day => [
      day.date,
      day.bags,
      day.sales,
      day.fuel,
      day.expenses,
      day.netSales,
    ]);

    // Add totals row
    rows.push([
      'TOTAL',
      reportData.totals.bags,
      reportData.totals.sales,
      reportData.totals.fuel,
      reportData.totals.expenses,
      reportData.totals.netSales,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sales-report-${format(dateRange.from, 'yyyy-MM-dd')}-to-${format(dateRange.to, 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const chartConfig = {
    sales: { label: 'Sales', color: 'hsl(var(--primary))' },
    netSales: { label: 'Net Sales', color: 'hsl(var(--accent))' },
    bags: { label: 'Bags', color: 'hsl(var(--water-deep))' },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-muted-foreground">View and export detailed sales reports</p>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, 'MMM d')} - {format(dateRange.to, 'MMM d, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button onClick={exportToCSV} disabled={!reportData || reportData.daysRecorded === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Bags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{reportData?.totals.bags.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">₦{reportData?.totals.sales.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Fuel Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">₦{reportData?.totals.fuel.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Other Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">₦{reportData?.totals.expenses.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  Net Revenue
                  {(reportData?.totals.netSales || 0) >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-accent" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn(
                  "text-2xl font-bold",
                  (reportData?.totals.netSales || 0) >= 0 ? "text-accent" : "text-destructive"
                )}>
                  ₦{reportData?.totals.netSales.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-serif">Daily Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : reportData && reportData.dailyBreakdown.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={reportData.dailyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="displayDate" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netSales" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent))' }}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data for selected period
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-serif">Daily Bags Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : reportData && reportData.dailyBreakdown.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={reportData.dailyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="displayDate" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="bags" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data for selected period
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Driver Performance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif">Driver Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : reportData && reportData.driverSummary.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Driver</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Bags Delivered</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales (₦)</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Fuel Cost (₦)</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Net (₦)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.driverSummary.map((driver, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 font-medium">{driver.name}</td>
                      <td className="py-3 px-4 text-right">{driver.bags.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">₦{driver.sales.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-destructive">₦{driver.fuel.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-medium text-accent">
                        ₦{(driver.sales - driver.fuel).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No driver data for selected period</p>
          )}
        </CardContent>
      </Card>

      {/* Daily Breakdown Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Daily Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : reportData && reportData.dailyBreakdown.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Bags</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sales (₦)</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Fuel (₦)</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Expenses (₦)</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Net (₦)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.dailyBreakdown.map((day, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 font-medium">{format(parseISO(day.date), 'EEE, MMM d')}</td>
                      <td className="py-3 px-4 text-right">{day.bags.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">₦{day.sales.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-destructive">₦{day.fuel.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-destructive">₦{day.expenses.toLocaleString()}</td>
                      <td className={cn(
                        "py-3 px-4 text-right font-medium",
                        day.netSales >= 0 ? "text-accent" : "text-destructive"
                      )}>
                        ₦{day.netSales.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 font-bold">
                    <td className="py-3 px-4">TOTAL</td>
                    <td className="py-3 px-4 text-right">{reportData.totals.bags.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">₦{reportData.totals.sales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-destructive">₦{reportData.totals.fuel.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-destructive">₦{reportData.totals.expenses.toLocaleString()}</td>
                    <td className={cn(
                      "py-3 px-4 text-right",
                      reportData.totals.netSales >= 0 ? "text-accent" : "text-destructive"
                    )}>
                      ₦{reportData.totals.netSales.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No records found for the selected date range. Enter daily sales data to see reports.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
