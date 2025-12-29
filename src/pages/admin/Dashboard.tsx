import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Package, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import SendReportButton from '@/components/admin/SendReportButton';
const Dashboard = () => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats', format(monthStart, 'yyyy-MM-dd')],
    queryFn: async () => {
      // Get daily records for this month
      const { data: dailyRecords, error: recordsError } = await supabase
        .from('daily_records')
        .select('id, record_date')
        .gte('record_date', format(monthStart, 'yyyy-MM-dd'))
        .lte('record_date', format(monthEnd, 'yyyy-MM-dd'));

      if (recordsError) throw recordsError;

      const recordIds = dailyRecords?.map(r => r.id) || [];

      // Get driver entries for these records
      const { data: driverEntries, error: entriesError } = await supabase
        .from('driver_entries')
        .select('bags_delivered, sales_amount, fuel_cost')
        .in('daily_record_id', recordIds.length > 0 ? recordIds : ['00000000-0000-0000-0000-000000000000']);

      if (entriesError) throw entriesError;

      // Get expenses for these records
      const { data: expenses, error: expensesError } = await supabase
        .from('expenses')
        .select('amount')
        .in('daily_record_id', recordIds.length > 0 ? recordIds : ['00000000-0000-0000-0000-000000000000']);

      if (expensesError) throw expensesError;

      // Calculate totals
      const totalBags = driverEntries?.reduce((sum, e) => sum + (e.bags_delivered || 0), 0) || 0;
      const totalSales = driverEntries?.reduce((sum, e) => sum + Number(e.sales_amount || 0), 0) || 0;
      const totalFuel = driverEntries?.reduce((sum, e) => sum + Number(e.fuel_cost || 0), 0) || 0;
      const totalExpenses = expenses?.reduce((sum, e) => sum + Number(e.amount || 0), 0) || 0;
      const netRevenue = totalSales - totalFuel - totalExpenses;
      const daysRecorded = dailyRecords?.length || 0;

      return {
        totalBags,
        totalSales,
        totalExpenses: totalFuel + totalExpenses,
        netRevenue,
        daysRecorded,
      };
    },
  });

  const statCards = [
    {
      title: 'Total Bags Delivered',
      value: stats?.totalBags.toLocaleString() || '0',
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Sales',
      value: `₦${stats?.totalSales.toLocaleString() || '0'}`,
      icon: DollarSign,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Total Expenses',
      value: `₦${stats?.totalExpenses.toLocaleString() || '0'}`,
      icon: TrendingUp,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      title: 'Net Revenue',
      value: `₦${stats?.netRevenue.toLocaleString() || '0'}`,
      icon: Users,
      color: 'text-water-deep',
      bgColor: 'bg-water-light',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview for {format(today, 'MMMM yyyy')}
          </p>
        </div>
        <SendReportButton />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-32" />
                  </CardContent>
                </Card>
              ))
          : statCards.map((stat, i) => (
              <Card key={i} className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                </CardContent>
              </Card>
            ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {stats?.daysRecorded || 0} days of records this month.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
