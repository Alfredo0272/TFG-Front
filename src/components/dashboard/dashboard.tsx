import { useEffect } from 'react';
import FactoryList from '../lists/factoryList';
import { useSales } from '../../hooks/use.sale';
import { useRevenue } from '../../hooks/use.revenue';

export default function Dashboard() {
  const { getAllSales, sales } = useSales();
  const { getTotalRevenue, getTotalProfit, totalRevenue, totalProfit } =
    useRevenue();

  useEffect(() => {
    getAllSales();
  }, [getAllSales]);

  useEffect(() => {
    getTotalRevenue();
    getTotalProfit();
  }, [getTotalRevenue, getTotalProfit]);

  const totalSales = sales.length;

  return (
    <section className="flex-1 mx-auto max-w-7xl p-6 pt-24 space-y-10">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>

        <div className="grid gap-4 md:grid-cols-3 pt-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs uppercase text-muted-foreground">
              Total Sales
            </p>

            <p className="mt-2 text-2xl font-bold">{totalSales}</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs uppercase text-muted-foreground">
              Total Revenue
            </p>

            <p className="mt-2 text-2xl font-bold">
              {totalRevenue !== null
                ? `${totalRevenue.toLocaleString()} €`
                : 'Loading...'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs uppercase text-muted-foreground">
              Total Profit
            </p>

            <p className="mt-2 text-2xl font-bold">
              {totalProfit !== null
                ? `${totalProfit.toLocaleString()} €`
                : 'Loading...'}
            </p>
          </div>
        </div>
      </header>

      <FactoryList />
    </section>
  );
}
