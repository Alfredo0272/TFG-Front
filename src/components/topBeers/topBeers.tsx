import { useEffect, useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useBeers } from '../../hooks/use.beer';
import { useStock } from '../../hooks/use.stock';

interface RankedBeer {
  id: number;
  name: string;
  style: string;
  factoryName: string;
  pricePerL: number;
  margin: number;
  productionCost: number;
}

const PIE_COLORS = ['#f59e0b', '#84cc16', '#06b6d4', '#8b5cf6', '#f43f5e'];
const MEDALS = ['🥇', '🥈', '🥉'];

const euroFormatter = (v: number | null) =>
  v != null
    ? `€ ${v.toLocaleString('es-ES', { minimumFractionDigits: 0 })}`
    : '';

export default function TopBeers() {
  const { beers, loadAllBeers } = useBeers();
  const { getStockByBeerId, stocks } = useStock();

  useEffect(() => {
    loadAllBeers();
  }, [loadAllBeers]);

  useEffect(() => {
    if (beers.length === 0) return;
    beers.forEach((beer) => {
      const alreadyLoaded = stocks.some((s) => s.beerId === beer.id);
      if (!alreadyLoaded) getStockByBeerId(beer.id);
    });
  }, [beers, stocks, getStockByBeerId]);

  const topBeers: RankedBeer[] = useMemo(() => {
    if (stocks.length === 0) return [];

    return beers
      .map((beer) => {
        const beerStocks = stocks.filter((s) => s.beerId === beer.id);
        const stock =
          beerStocks.length > 0 ? beerStocks[beerStocks.length - 1] : null;

        if (!stock || !beer.pricePerL || !stock.productionCostL) return null;

        const margin =
          ((beer.pricePerL - stock.productionCostL) / beer.pricePerL) * 100;

        return {
          id: beer.id,
          name: beer.name,
          style: beer.style,
          factoryName: beer.factoryName,
          pricePerL: beer.pricePerL,
          margin,
          productionCost: stock.productionCostL,
        };
      })
      .filter((beer): beer is RankedBeer => beer !== null)
      .sort((a, b) => b.margin - a.margin)
      .slice(0, 5);
  }, [beers, stocks]);

  const pieData = useMemo(
    () =>
      topBeers.map((beer, index) => ({
        id: index,
        value: parseFloat(beer.margin.toFixed(2)),
        label: beer.name,
        color: PIE_COLORS[index],
      })),
    [topBeers],
  );

  return (
    <section className="max-w-5xl mx-auto px-3 py-4 sm:px-6 sm:py-10 space-y-6">
      <h2 className="text-3xl font-semibold">🏆 Top 5 Beers by Margin</h2>

      {topBeers.length === 0 ? (
        <p className="text-muted-foreground">Loading data...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* ── Ranking list ── */}
          <div className="space-y-4">
            {topBeers.map((beer, index) => (
              <div
                key={beer.id}
                className="rounded-xl border border-border p-5 bg-card shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: PIE_COLORS[index] }}
                    />
                    {MEDALS[index] ?? `#${index + 1}`} 🍺 {beer.name}
                  </h3>
                  <span className="text-green-400 font-bold">
                    {beer.margin.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Style: {beer.style}</p>
                  <p>Factory: {beer.factoryName}</p>
                  <p>Price: {euroFormatter(beer.pricePerL)}/L</p>
                  <p>Cost: {euroFormatter(beer.productionCost)}/L</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Donut chart ── */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
            <h3 className="font-semibold text-card-foreground">Margin Share</h3>
            <p className="mt-1 mb-4 text-xs text-muted-foreground">
              Relative margin distribution across top 5 beers
            </p>

            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 60,
                  outerRadius: 110,
                  paddingAngle: 3,
                  cornerRadius: 4,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  valueFormatter: (item) => `${item.value.toFixed(1)}%`,
                },
              ]}
              height={260}
              slots={{ legend: () => null }}
            />

            {/* Manual legend */}
            <ul className="mt-4 space-y-2">
              {topBeers.map((beer, index) => {
                const totalMargin = topBeers.reduce(
                  (sum, b) => sum + b.margin,
                  0,
                );
                const share = ((beer.margin / totalMargin) * 100).toFixed(1);

                return (
                  <li
                    key={beer.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: PIE_COLORS[index] }}
                      />
                      <span className="text-card-foreground">{beer.name}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {beer.margin.toFixed(1)}%{' '}
                      <span className="ml-1 font-medium text-card-foreground">
                        ({share}%)
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
