import { useEffect, useMemo, useState } from 'react';
import { useBeers } from '../../hooks/use.beer';
import BeerCard from '../cards/beerCard';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function BeerList() {
  const { loadAllBeers, beers } = useBeers();
  const [activeStyle, setActiveStyle] = useState('All');

  useEffect(() => {
    loadAllBeers();
  }, [loadAllBeers]);

  const styles = useMemo(
    () => ['All', ...Array.from(new Set(beers.map((b) => b.style)))],
    [beers],
  );

  const filtered = useMemo(
    () =>
      activeStyle === 'All'
        ? beers
        : beers.filter((b) => b.style === activeStyle),
    [beers, activeStyle],
  );

  if (beers.length === 0) {
    return <p className="text-muted-foreground">No beers found</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-3 py-4 sm:px-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Beers</h2>
        <Link
          to="/factories/beer-register"
          className="flex items-center gap-1.5 btn-primary px-3 py-2 text-sm"
        >
          <Plus size={16} />
          Add Beer
        </Link>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            className={`h-7 px-3 text-xs rounded-md font-medium transition-colors ${
              activeStyle === style
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No beers found</p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-black">
                  <th className="text-left px-4 py-3 font-medium">Beer</th>
                  <th className="text-left px-4 py-3 font-medium">Style</th>
                  <th className="text-right px-4 py-3 font-medium">Alcohol</th>
                  <th className="text-right px-4 py-3 font-medium">Price/L</th>
                  <th className="text-left px-4 py-3 font-medium">Factory</th>
                  <th className="text-right px-4 py-3 font-medium">
                    Available
                  </th>
                  <th className="text-right px-4 py-3 font-medium">Margin</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Production
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((beer) => (
                  <BeerCard key={beer.id} beer={beer} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
