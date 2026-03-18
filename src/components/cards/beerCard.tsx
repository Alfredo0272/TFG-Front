import { useEffect, useState } from 'react';
import { Beer } from '../../models/beer.model';
import { useStock } from '../../hooks/use.stock';
import StockModalCard from './stockCard';

interface BeerCardProps {
  beer: Beer;
}

export default function BeerCard({ beer }: BeerCardProps) {
  const { getStockByBeerId, stocks, addNewStock } = useStock();
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    getStockByBeerId(beer.id);
  }, [beer.id, getStockByBeerId]);

  const stock = stocks.find((s) => s.beerId === beer.id);

  const handleAddProduction = () => {
    if (!stock || volume <= 0) return;
    addNewStock(stock.id, { productionVolumeL: volume });
    setVolume(0);
    setShowForm(false);
  };

  return (
    <>
      <div
        className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition cursor-pointer"
        onClick={() => stock && setShowModal(true)}
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-card-foreground">
            {beer.name}
          </h3>
          <p className="text-sm text-muted-foreground">{beer.style}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Alcohol:</span>
              <span className="ml-2 font-medium">{beer.alcohol}%</span>
            </p>
            <p>
              <span className="text-muted-foreground">Price:</span>
              <span className="ml-2 font-medium">{beer.pricePerL} €/L</span>
            </p>
            <p>
              <span className="text-muted-foreground">Factory:</span>
              <span className="ml-2 font-medium">{beer.factoryName}</span>
            </p>

            {stock ? (
              <p>
                <span className="text-muted-foreground">Available:</span>
                <span className="ml-2 font-medium">{stock.availableL} L</span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No stock available
              </p>
            )}
          </div>

          {stock && (
            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              {showForm ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    placeholder="Volume (L)"
                    className="form-input w-full"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddProduction}
                      disabled={volume <= 0}
                      className="btn-primary flex-1"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setVolume(0);
                      }}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-secondary w-full mt-2"
                >
                  + Add production
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && stock && (
        <StockModalCard stock={stock} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
