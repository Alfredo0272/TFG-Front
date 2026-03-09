import { useEffect } from 'react';
import { useFactories } from '../../hooks/use.factories';
import { Factory } from '../../models/factory.model';
import FactoryCard from '../cards/factoryCard';

export default function FactoryList() {
  const { loadFactories, factories } = useFactories();

  useEffect(() => {
    loadFactories();
  }, [loadFactories]);

  if (!factories.length) {
    return <p className="text-muted-foreground">No factories found</p>;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Factories</h2>

      <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {factories.map((factory: Factory) => (
          <li key={factory.id}>
            <FactoryCard factory={factory} />
          </li>
        ))}
      </ul>
    </section>
  );
}
