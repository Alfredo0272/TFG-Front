import { useNavigate, useParams } from 'react-router-dom';
import { useBeers } from '../../hooks/use.beer';
import { useFactories } from '../../hooks/use.factories';
import { useSales } from '../../hooks/use.sale';
import { useStock } from '../../hooks/use.stock';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function FactoryDetails() {
  const { currentFactoryItem } = useFactories();
  const { stocks } = useStock();
  const { beers } = useBeers();
  const { id } = useParams();
  const { registerSale } = useSales();

  const [expandedBeerId, setExpandedBeerId] = useState<number | null>(null);

  const navigate = useNavigate();

  const factoryId = Number(id);

  const factoryBeers = beers.filter((beer) => beer.factoryId === factoryId);

  const factoryName = currentFactoryItem?.name ?? `Factory ${factoryId}`;

  const handleSaleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
    beerId: number,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await registerSale({
      factoryId,
      beerId,
      quantityL: Number(formData.get('quantityL')),
      unitPrice: Number(formData.get('unitPrice')),
    });

    setExpandedBeerId(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:pt-10 pt-6 space-y-6 sm:space-y-8">
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
          {factoryBeers.map((beer) => {
            const beerStock = stocks.find((stock) => stock.beerId === beer.id);

            const margin =
              beer.pricePerL && beerStock?.productionCostL
                ? (beer.pricePerL - beerStock.productionCostL).toFixed(2)
                : null;

            return (
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

                {beerStock?.productionCostL && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Production cost
                    <span className="ml-2 font-medium text-foreground">
                      {beerStock.productionCostL} €/L
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

                {margin && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Margin
                    <span className="ml-2 font-medium text-green-400">
                      {margin} €/L
                    </span>
                  </p>
                )}

                <button
                  onClick={() =>
                    setExpandedBeerId(
                      expandedBeerId === beer.id ? null : beer.id,
                    )
                  }
                  className={`mt-4 rounded-md px-3 py-2 text-sm font-medium transition
                  ${
                    expandedBeerId === beer.id
                      ? 'bg-red-300 text-black'
                      : 'bg-amber-300 text-black'
                  }`}
                >
                  <ShoppingCart size={18} />
                </button>

                {expandedBeerId === beer.id && (
                  <form
                    onSubmit={(e) => handleSaleSubmit(e, beer.id)}
                    className="mt-4 space-y-2"
                  >
                    <input
                      name="quantityL"
                      type="number"
                      placeholder="Cantidad (L)"
                      className="text-gray-900  w-full rounded border p-2"
                      required
                    />

                    <input
                      name="unitPrice"
                      type="number"
                      defaultValue={beer.pricePerL ?? ''}
                      placeholder="Precio €/L"
                      className="text-gray-900 w-full rounded border p-2"
                      required
                    />

                    <button
                      type="submit"
                      className="w-full rounded-md bg-green-400 px-3 py-2 text-black"
                    >
                      Confirmar venta
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="rounded-md bg-card-foreground px-4 py-2 text-sm font-medium text-black hover:opacity-90 transition"
        >
          Return
        </button>

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
