import React, { useState, useEffect } from 'react';
import { useBeers } from '../../hooks/use.beer';
import { useFactories } from '../../hooks/use.factories';
import { useStock } from '../../hooks/use.stock';
import { Link } from 'react-router-dom';

interface BeerForm {
  name: string;
  style: string;
  alcohol: number;
  pricePerL: number;
  factoryId: number;
}

interface StockForm {
  productionCostL: number;
  productionVolumeL: number;
}

const initialBeerForm: BeerForm = {
  name: '',
  style: '',
  alcohol: 0,
  pricePerL: 0,
  factoryId: 0,
};

const initialStockForm: StockForm = {
  productionCostL: 0,
  productionVolumeL: 0,
};

export default function CreateBeer() {
  const { registerBeer } = useBeers();
  const { factories, loadFactories } = useFactories();
  const { addStock } = useStock();

  const [beerData, setBeerData] = useState<BeerForm>(initialBeerForm);
  const [stockData, setStockData] = useState<StockForm>(initialStockForm);
  const [beerErrors, setBeerErrors] = useState<
    Partial<Record<keyof BeerForm, string>>
  >({});
  const [stockErrors, setStockErrors] = useState<
    Partial<Record<keyof StockForm, string>>
  >({});

  useEffect(() => {
    loadFactories();
  }, [loadFactories]);

  const beerFields = ['name', 'style', 'alcohol', 'pricePerL', 'factoryId'];
  const numericFields = [
    'alcohol',
    'pricePerL',
    'factoryId',
    'productionCostL',
    'productionVolumeL',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const parsed = numericFields.includes(name) ? Number(value) : value;

    if (beerFields.includes(name)) {
      setBeerData((prev) => ({ ...prev, [name]: parsed }));
      setBeerErrors((prev) => ({ ...prev, [name]: '' }));
    } else {
      setStockData((prev) => ({ ...prev, [name]: parsed }));
      setStockErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newBeerErrors: Partial<Record<keyof BeerForm, string>> = {};
    const newStockErrors: Partial<Record<keyof StockForm, string>> = {};

    if (!beerData.name.trim()) newBeerErrors.name = 'Beer name is required';
    if (!beerData.style.trim()) newBeerErrors.style = 'Style is required';
    if (!beerData.alcohol)
      newBeerErrors.alcohol = 'Alcohol percentage is required';
    if (!beerData.pricePerL)
      newBeerErrors.pricePerL = 'Price per liter is required';
    if (!beerData.factoryId) newBeerErrors.factoryId = 'Factory is required';

    if (!stockData.productionCostL)
      newStockErrors.productionCostL = 'Production cost is required';
    if (!stockData.productionVolumeL)
      newStockErrors.productionVolumeL = 'Production volume is required';

    setBeerErrors(newBeerErrors);
    setStockErrors(newStockErrors);

    return (
      Object.keys(newBeerErrors).length === 0 &&
      Object.keys(newStockErrors).length === 0
    );
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const createdBeer = await registerBeer(beerData);

    if (createdBeer?.id) {
      addStock({
        beerId: createdBeer.id,
        factoryId: beerData.factoryId,
        productionCostL: stockData.productionCostL,
        productionVolumeL: stockData.productionVolumeL,
        availableL: stockData.productionVolumeL,
      });
    }

    setBeerData(initialBeerForm);
    setStockData(initialStockForm);
  };

  const isValid =
    beerData.name.trim().length > 0 &&
    beerData.style.trim().length > 0 &&
    beerData.alcohol > 0 &&
    beerData.pricePerL > 0 &&
    beerData.factoryId > 0 &&
    stockData.productionCostL > 0 &&
    stockData.productionVolumeL > 0;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-card max-w-xl w-full space-y-6"
      >
        <h2 className="text-center text-2xl font-semibold">Register Beer</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Beer name</label>
          <input
            name="name"
            value={beerData.name}
            onChange={handleChange}
            className={`form-input ${beerErrors.name ? 'border-destructive' : ''}`}
          />
          {beerErrors.name && <p className="form-error">{beerErrors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Style (IPA, Stout, Lager...)
          </label>
          <input
            name="style"
            value={beerData.style}
            onChange={handleChange}
            className={`form-input ${beerErrors.style ? 'border-destructive' : ''}`}
          />
          {beerErrors.style && <p className="form-error">{beerErrors.style}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alcohol (%)</label>
          <input
            name="alcohol"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={beerData.alcohol}
            onChange={handleChange}
            className={`form-input ${beerErrors.alcohol ? 'border-destructive' : ''}`}
          />
          {beerErrors.alcohol && (
            <p className="form-error">{beerErrors.alcohol}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price per liter (€)
          </label>
          <input
            name="pricePerL"
            type="number"
            step="0.01"
            min="0"
            value={beerData.pricePerL}
            onChange={handleChange}
            className={`form-input ${beerErrors.pricePerL ? 'border-destructive' : ''}`}
          />
          {beerErrors.pricePerL && (
            <p className="form-error">{beerErrors.pricePerL}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Factory</label>
          <select
            name="factoryId"
            value={beerData.factoryId}
            onChange={handleChange}
            className={`form-input ${beerErrors.factoryId ? 'border-destructive' : ''}`}
          >
            <option value={0}>
              {factories.length ? 'Select factory' : 'Loading factories...'}
            </option>
            {factories.map((factory) => (
              <option key={factory.id} value={factory.id}>
                {factory.name}
              </option>
            ))}
          </select>
          {beerErrors.factoryId && (
            <p className="form-error">{beerErrors.factoryId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Production cost (€/L)
          </label>
          <input
            name="productionCostL"
            type="number"
            step="0.01"
            min="0"
            value={stockData.productionCostL}
            onChange={handleChange}
            className={`form-input ${stockErrors.productionCostL ? 'border-destructive' : ''}`}
          />
          {stockErrors.productionCostL && (
            <p className="form-error">{stockErrors.productionCostL}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Production volume (L)
          </label>
          <input
            name="productionVolumeL"
            type="number"
            step="0.01"
            min="0"
            value={stockData.productionVolumeL}
            onChange={handleChange}
            className={`form-input ${stockErrors.productionVolumeL ? 'border-destructive' : ''}`}
          />
          {stockErrors.productionVolumeL && (
            <p className="form-error">{stockErrors.productionVolumeL}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="btn-primary w-full"
        >
          Register Beer
        </button>

        <Link
          to="/dashboard"
          className="block text-center text-sm text-muted-foreground font-medium hover:underline"
        >
          Return to dashboard
        </Link>
      </form>
    </section>
  );
}
