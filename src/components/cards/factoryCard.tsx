import { useFactories } from '../../hooks/use.factories';
import { Factory } from '../../models/factory.model';

interface FactoryCardProps {
  factory: Factory;
}

export default function FactoryCard({ factory }: FactoryCardProps) {
  const { handleFactoryDetails } = useFactories();

  return (
    <div className="rounded-xl border border-border bg-card-foreground p-6 shadow-sm hover:shadow-md transition ">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-card-foreground">
          {factory.name}
        </h3>

        <p className="text-sm text-muted-foreground">{factory.location}</p>
      </div>

      {factory.capacity && (
        <p className="mt-4 text-sm text-muted-foreground">
          Capacity
          <span className="ml-2 font-medium text-foreground">
            {factory.capacity}
          </span>
        </p>
      )}

      {factory.beers && (
        <p className="mt-4 text-sm text-muted-foreground">
          Beers
          <span className="ml-2 font-medium text-foreground">
            {factory.beers.length}
          </span>
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => handleFactoryDetails(factory)}
          className="text-sm font-medium text-primary hover:underline"
        >
          View details
        </button>
      </div>
    </div>
  );
}
