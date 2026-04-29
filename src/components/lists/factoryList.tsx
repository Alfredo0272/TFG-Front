import { useEffect } from 'react';
import { useFactories } from '../../hooks/use.factories';
import FactoryCard from '../cards/factoryCard';

export default function FactoryList() {
  const { loadFactories, factories } = useFactories();

  useEffect(() => {
    loadFactories();
  }, [loadFactories]);

  if (!factories.length) {
    return <p className="text-muted-foreground">No factories found</p>;
  }

  const totalFactories = factories.length;

  const totalCapacity = factories.reduce(
    (acc, f) => acc + (f.capacity ?? 0),
    0,
  );

  const avgCapacity = Math.round(totalCapacity / totalFactories);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Factories</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase text-muted-foreground">
            Total factories
          </p>

          <p className="mt-2 text-2xl font-bold">{totalFactories}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase text-muted-foreground">
            Total capacity
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-400">
            {totalCapacity} L
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase text-muted-foreground">
            Avg capacity / factory
          </p>

          <p className="mt-2 text-2xl font-bold text-amber-300">
            {avgCapacity} L
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[360px]">
          <thead className="bg-card border-b border-border text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Factory</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-right">Capacity</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {factories.map((factory) => (
              <FactoryCard key={factory.id} factory={factory} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
