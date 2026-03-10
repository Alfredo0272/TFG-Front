import React, { useState, useEffect } from 'react';
import { useBeers } from '../../hooks/use.beer';
import { useFactories } from '../../hooks/use.factories';
import { Link } from 'react-router-dom';

interface BeerForm {
  name: string;
  style: string;
  alcohol: number;
  pricePerL: number;
  factoryId: number;
}

export default function CreateBeer() {
  const { registerBeer } = useBeers();
  const { factories, loadFactories } = useFactories();

  const [formData, setFormData] = useState<BeerForm>({
    name: '',
    style: '',
    alcohol: 0,
    pricePerL: 0,
    factoryId: 0,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BeerForm, string>>>(
    {},
  );

  useEffect(() => {
    loadFactories();
  }, [loadFactories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'alcohol' || name === 'pricePerL' || name === 'factoryId'
          ? Number(value)
          : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof BeerForm, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Beer name is required';
    if (!formData.style.trim()) newErrors.style = 'Style is required';
    if (!formData.alcohol) newErrors.alcohol = 'Alcohol percentage is required';
    if (!formData.pricePerL)
      newErrors.pricePerL = 'Price per liter is required';
    if (!formData.factoryId) newErrors.factoryId = 'Factory is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    await registerBeer(formData);

    setFormData({
      name: '',
      style: '',
      alcohol: 0,
      pricePerL: 0,
      factoryId: 0,
    });
  };

  const error = (field: keyof BeerForm) =>
    errors[field] ? 'border-destructive' : '';

  const isValid =
    formData.name.trim().length > 0 &&
    formData.style.trim().length > 0 &&
    formData.alcohol > 0 &&
    formData.pricePerL > 0 &&
    formData.factoryId > 0;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-card max-w-xl w-full space-y-6 "
      >
        <h2 className="text-center text-2xl font-semibold">Register Beer</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Beer name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${error('name')}`}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Style (IPA, Stout, Lager...)
          </label>
          <input
            name="style"
            value={formData.style}
            onChange={handleChange}
            className={`form-input ${error('style')}`}
          />
          {errors.style && <p className="form-error">{errors.style}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alcohol (%)</label>
          <input
            name="alcohol"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.alcohol}
            onChange={handleChange}
            className={`form-input ${error('alcohol')}`}
          />
          {errors.alcohol && <p className="form-error">{errors.alcohol}</p>}
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
            value={formData.pricePerL}
            onChange={handleChange}
            className={`form-input ${error('pricePerL')}`}
          />
          {errors.pricePerL && <p className="form-error">{errors.pricePerL}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Factory</label>

          <select
            name="factoryId"
            value={formData.factoryId}
            onChange={handleChange}
            className={`form-input ${error('factoryId')}`}
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

          {errors.factoryId && <p className="form-error">{errors.factoryId}</p>}
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
