import { useEffect, useState } from 'react';
import { Beer } from '../../models/beer.model';
import { useStock } from '../../hooks/use.stock';
import StockModalCard from './stockCard';
import { useBeers } from '../../hooks/use.beer';
import { Trash2 } from 'lucide-react';

interface BeerCardProps {
  beer: Beer;
}

const styleColors: Record<string, string> = {
  IPA: 'bg-teal-900/40 text-teal-300',
  Stout: 'bg-stone-800/60 text-stone-300',
  Lager: 'bg-amber-900/40 text-amber-300',
  'Pale Ale': 'bg-cyan-900/40 text-cyan-300',
  Wheat: 'bg-yellow-900/40 text-yellow-300',
  Pilsner: 'bg-emerald-900/40 text-emerald-300',
  Sour: 'bg-pink-900/40 text-pink-300',
  Porter: 'bg-violet-900/40 text-violet-300',
};

function getMarginColor(margin: number) {
  if (margin >= 60) return 'text-emerald-400';
  if (margin >= 40) return 'text-amber-300';
  return 'text-red-400';
}

export default function BeerCard({ beer }: BeerCardProps) {
  const { getStockByBeerId, stocks, addNewStock } = useStock();
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [volume, setVolume] = useState(0);
  const { deleteBeers } = useBeers();

  useEffect(() => {
    getStockByBeerId(beer.id);
  }, [beer.id, getStockByBeerId]);

  const stock = stocks.find((s) => s.beerId === beer.id);

  const margin = stock
    ? ((beer.pricePerL - stock.productionCostL) / beer.pricePerL) * 100
    : null;

  const handleAddProduction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!stock || volume <= 0) return;
    addNewStock(stock.id, { productionVolumeL: volume });
    setVolume(0);
    setShowForm(false);
  };

  return (
    <>
      <tr
        className="border-b border-border transition-colors hover:bg-muted/30 cursor-pointer"
        onClick={() => stock && setShowModal(true)}
      >
        <td className="px-4 py-3 font-medium text-amber-100">{beer.name}</td>
        <td className="px-4 py-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styleColors[beer.style] ?? 'bg-muted text-muted-foreground'}`}
          >
            {beer.style}
          </span>
        </td>
        <td className="px-4 py-3 text-right font-mono">{beer.alcohol}%</td>
        <td className="px-4 py-3 text-right font-mono">{beer.pricePerL} €</td>
        <td className="px-4 py-3 text-muted-foreground">{beer.factoryName}</td>
        <td className="px-4 py-3 text-right font-mono">
          {stock ? (
            <span className="text-emerald-400">{stock.availableL} L</span>
          ) : (
            <span className="text-muted-foreground italic text-xs">
              No stock
            </span>
          )}
        </td>

        <td className="px-4 py-3 text-right font-mono">
          {margin !== null ? (
            <span className={`font-semibold ${getMarginColor(margin)}`}>
              {margin.toFixed(1)}%
            </span>
          ) : (
            <span className="text-muted-foreground italic text-xs">—</span>
          )}
        </td>

        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          {stock &&
            (showForm ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  placeholder="Vol (L)"
                  className="form-input w-24 h-7 text-xs"
                />
                <button
                  onClick={handleAddProduction}
                  disabled={volume <= 0}
                  className="btn-primary h-7 px-2 text-xs"
                >
                  OK
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowForm(false);
                    setVolume(0);
                  }}
                  className="btn-secondary h-7 px-2 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowForm(true);
                }}
                className="btn-secondary h-7 px-3 text-xs"
              >
                + Production
              </button>
            ))}
        </td>

        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => deleteBeers(beer.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </td>
      </tr>

      {showModal && stock && (
        <StockModalCard stock={stock} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
