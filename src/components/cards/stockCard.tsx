import { useEffect } from 'react';
import { useBeers } from '../../hooks/use.beer';
import { useFactories } from '../../hooks/use.factories';
import { Stock } from '../../models/stock.model';

interface StockModalProps {
  stock: Stock;
  onClose: () => void;
}

export default function StockModalCard({ stock, onClose }: StockModalProps) {
  const { loadBeerById, currentBeerItem } = useBeers();
  const { loadFactoryById, currentFactoryItem } = useFactories();

  useEffect(() => {
    loadBeerById(stock.beerId);
    loadFactoryById(stock.factoryId);
  }, [stock.beerId, stock.factoryId, loadBeerById, loadFactoryById]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl shadow-lg p-8 w-full max-w-md space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {currentBeerItem?.name ?? '...'} — Stock detail
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Beer</span>
            <span className="font-medium">
              {currentBeerItem?.name ?? '...'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Factory</span>
            <span className="font-medium">
              {currentFactoryItem?.name ?? '...'}
            </span>
          </div>

          <hr className="border-border" />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Production cost</span>
            <span className="font-medium">{stock.productionCostL} €/L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Production volume</span>
            <span className="font-medium">{stock.productionVolumeL} L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Available</span>
            <span className="font-medium">{stock.availableL} L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Updated at</span>
            <span className="font-medium">
              {new Date(stock.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
