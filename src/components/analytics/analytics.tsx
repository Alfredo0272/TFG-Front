import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useRevenue } from '../../hooks/use.revenue';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const euroFormatter = (v: number | null) =>
  v != null
    ? `€ ${v.toLocaleString('es-ES', { minimumFractionDigits: 0 })}`
    : '';

const PIE_COLORS = ['#f59e0b', '#84cc16', '#06b6d4', '#8b5cf6', '#f43f5e'];

export default function Analytics() {
  const {
    totalRevenue,
    totalProfit,
    revenueByBeer,
    revenueByFactory,
    profitByFactory,
    monthlyRevenue,
    top5ProfitableBeers,
    revenueBetweenDates,
    getTotalRevenue,
    getTotalProfit,
    getRevenueByBeer,
    getRevenueByFactory,
    getProfitByFactory,
    getMonthlyRevenue,
    getTop5ProfitableBeers,
    getRevenueBetweenDates,
    getMothlyProfitByAllFactories,
    monthlyProfitByAllFactories,
  } = useRevenue();

  const [start, setStart] = useState('2026-01-01');
  const [end, setEnd] = useState('2026-12-31');

  useEffect(() => {
    getTotalRevenue();
    getTotalProfit();
    getRevenueByBeer();
    getRevenueByFactory();
    getProfitByFactory();
    getMonthlyRevenue();
    getTop5ProfitableBeers();
    getMothlyProfitByAllFactories();
  }, [
    getTotalRevenue,
    getTotalProfit,
    getRevenueByBeer,
    getRevenueByFactory,
    getProfitByFactory,
    getMonthlyRevenue,
    getTop5ProfitableBeers,
    getMothlyProfitByAllFactories,
  ]);

  useEffect(() => {
    getRevenueBetweenDates(start, end);
  }, [getRevenueBetweenDates, start, end]);

  const margin =
    totalRevenue && totalProfit
      ? ((totalProfit / totalRevenue) * 100).toFixed(1)
      : null;

  const factoryNames = revenueByFactory.map((f) => f.name ?? '');
  const profitMap = new Map(
    profitByFactory.map((f) => [f.name ?? '', f.revenue]),
  );

  const allFactoryNames = [
    ...new Set(monthlyProfitByAllFactories.map((d) => d.name ?? '')),
  ];
  const monthlySeriesByFactory = allFactoryNames.map((factory, i) => ({
    data: Array.from({ length: 12 }, (_, idx) => {
      const month = idx + 1;
      return (
        monthlyProfitByAllFactories.find(
          (d) => d.name === factory && d.month === month,
        )?.revenue ?? null
      );
    }),
    label: factory,
    curve: 'natural' as const,
    showMark: false,
    color: PIE_COLORS[i % PIE_COLORS.length],
    valueFormatter: (v: number | null) => euroFormatter(v),
  }));

  return (
    <section className="mx-auto max-w-7xl px-6 pt-4 pb-12 space-y-8">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Revenue and profit overview across all factories
        </p>
      </header>

      {/* KPI summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total Revenue
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-400">
            {totalRevenue != null ? euroFormatter(totalRevenue) : '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total Profit
          </p>
          <p className="mt-2 text-2xl font-bold text-lime-400">
            {totalProfit != null ? euroFormatter(totalProfit) : '—'}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Profit Margin
          </p>
          <p className="mt-2 text-2xl font-bold text-cyan-400">
            {margin != null ? `${margin} %` : '—'}
          </p>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue by beer */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-card-foreground">
            Revenue by Beer
          </h3>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Total income per beer across all factories
          </p>
          <BarChart
            borderRadius={6}
            xAxis={[
              {
                scaleType: 'band',
                data: revenueByBeer.map((item) => item.name ?? ''),
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            yAxis={[
              {
                valueFormatter: (v: number) => `€${(v / 1000).toFixed(0)}k`,
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            series={[
              {
                data: revenueByBeer.map((item) => item.revenue),
                label: 'Revenue (€)',
                color: '#f59e0b',
                valueFormatter: (v: number | null) => euroFormatter(v),
              },
            ]}
            height={280}
            slots={{ legend: () => null }}
          />
        </div>

        {/* Monthly revenue */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h3 className="font-semibold text-card-foreground">
            Monthly Revenue
          </h3>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Aggregated revenue trend across all factories
          </p>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: monthlyRevenue.map(
                  (item) => MONTHS[(item.month ?? 1) - 1],
                ),
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            yAxis={[
              {
                valueFormatter: (v: number) => `€${(v / 1000).toFixed(0)}k`,
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            series={[
              {
                data: monthlyRevenue.map((item) => item.revenue),
                label: 'Revenue (€)',
                area: true,
                curve: 'natural',
                showMark: false,
                color: '#f59e0b',
                valueFormatter: (v: number | null) => euroFormatter(v),
              },
            ]}
            height={280}
            slots={{ legend: () => null }}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:col-span-2">
          <h3 className="font-semibold text-card-foreground">
            Revenue vs Profit by Factory
          </h3>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Side-by-side comparison for every factory
          </p>
          <BarChart
            layout="horizontal"
            borderRadius={6}
            yAxis={[
              {
                scaleType: 'band',
                data: factoryNames,
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            xAxis={[
              {
                valueFormatter: (v: number) => `€${(v / 1000).toFixed(0)}k`,
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            series={[
              {
                data: factoryNames.map(
                  (name) =>
                    revenueByFactory.find((f) => f.name === name)?.revenue ?? 0,
                ),
                label: 'Revenue',
                color: '#f59e0b',
                valueFormatter: (v: number | null) => euroFormatter(v),
              },
              {
                data: factoryNames.map((name) => profitMap.get(name) ?? 0),
                label: 'Profit',
                color: '#84cc16',
                valueFormatter: (v: number | null) => euroFormatter(v),
              },
            ]}
            height={Math.max(200, factoryNames.length * 80)}
            slotProps={{ legend: {} }}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:col-span-2">
          <h3 className="font-semibold text-card-foreground">
            Monthly Profit by Factory
          </h3>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Profit trend per factory across all months
          </p>
          <LineChart
            xAxis={[
              {
                scaleType: 'point',
                data: MONTHS,
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            yAxis={[
              {
                valueFormatter: (v: number) => `€${(v / 1000).toFixed(0)}k`,
                tickLabelStyle: { fontSize: 11, fill: '#9ca3af' },
              },
            ]}
            series={monthlySeriesByFactory}
            height={300}
            slotProps={{ legend: {} }}
          />
        </div>

        {/* Top 5 profitable beers — donut */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-card-foreground">
            Top 5 Profitable Beers
          </h3>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Profit share by beer across all factories
          </p>
          <PieChart
            series={[
              {
                data: top5ProfitableBeers.map((beer, index) => ({
                  id: index,
                  value: beer.revenue,
                  label: beer.name ?? `Beer ${index + 1}`,
                  color: PIE_COLORS[index % PIE_COLORS.length],
                })),
                innerRadius: 55,
                outerRadius: 110,
                paddingAngle: 3,
                cornerRadius: 4,
                highlightScope: { fade: 'global', highlight: 'item' },
                valueFormatter: (item) => euroFormatter(item.value),
              },
            ]}
            height={280}
            slotProps={{ legend: {} }}
          />
        </div>

        {/* Revenue between dates */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
          <div>
            <h3 className="font-semibold text-card-foreground">
              Revenue Between Dates
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Total revenue across all factories for a custom date range
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-end">
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              From
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              To
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </label>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className="text-3xl font-bold text-amber-400">
                {revenueBetweenDates != null
                  ? euroFormatter(revenueBetweenDates)
                  : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
