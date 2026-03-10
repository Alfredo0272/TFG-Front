import { Beer } from '../../models/beer.model';

interface BeerCardProps {
  beer: Beer;
}

export default function BeerCard({ beer }: BeerCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-card-foreground">
          {beer.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          Brewery: {beer.factoryName}
        </p>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="text-muted-foreground">Style:</span>
          <span className="ml-2 font-medium">{beer.style}</span>
        </p>

        <p>
          <span className="text-muted-foreground">Alcohol:</span>
          <span className="ml-2 font-medium">{beer.alcohol}%</span>
        </p>

        <p>
          <span className="text-muted-foreground">Price per liter:</span>
          <span className="ml-2 font-medium">{beer.pricePerL} €</span>
        </p>
      </div>
    </div>
  );
}
