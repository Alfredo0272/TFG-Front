import { useNavigate, useParams } from 'react-router-dom';
import { useBeers } from '../../hooks/use.beer';
import { useFactories } from '../../hooks/use.factories';

export default function FactoryDetails() {
  const { currentFactoryItem } = useFactories();
  const { beers } = useBeers();
  const { id } = useParams();
  const navigate = useNavigate();

  const factoryId = Number(id);

  const factoryBeers = beers.filter((beer) => beer.factoryId === factoryId);

  const factoryName = currentFactoryItem?.name ?? `Factory ${factoryId}`;

  return (
    <section className="mx-auto max-w-7xl p-6 pt-24 space-y-8">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{factoryName}</h2>

        <p className="text-muted-foreground">Beers produced in this factory</p>
      </header>

      {factoryBeers.length === 0 ? (
        <div className="rounded-xl border border-border bg-card-foreground p-6 text-center text-muted-foreground">
          No beers in this factory
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {factoryBeers.map((beer) => (
            <div
              key={beer.id}
              className="rounded-xl border border-border bg-card-foreground p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-card-foreground">
                🍺 {beer.name}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Style: {beer.style}
              </p>

              {beer.alcohol && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Alcohol
                  <span className="ml-2 font-medium text-foreground">
                    {beer.alcohol}%
                  </span>
                </p>
              )}

              {beer.pricePerL && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Price
                  <span className="ml-2 font-medium text-foreground">
                    €{beer.pricePerL}/L
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex">
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-md bg-card-foreground px-4 py-2 text-sm font-medium text-black hover:opacity-90 transition"
        >
          Return
        </button>
      </div>
      <div className="mt-6 flex">
        <button
          onClick={() => navigate('/factories/beer-register')}
          className="rounded-md bg-card-foreground px-4 py-2 text-sm font-medium text-black hover:opacity-90 transition"
        >
          Registrar Cerveza
        </button>
      </div>
    </section>
  );
}
