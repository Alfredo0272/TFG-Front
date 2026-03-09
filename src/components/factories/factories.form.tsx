import React, { useState } from 'react';
import { useFactories } from '../../hooks/use.factories';

interface FactoryForm {
  name: string;
  location: string;
  capacity: number;
}

export default function CreateFacotry() {
  const { registerFactory } = useFactories();
  const [formData, setFormData] = useState<FactoryForm>({
    name: '',
    location: '',
    capacity: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FactoryForm, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacity' ? Number(value) : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FactoryForm, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Factory name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.capacity) {
      newErrors.capacity = 'Capacity is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    await registerFactory(formData);

    setFormData({
      name: '',
      location: '',
      capacity: 0,
    });
  };

  const error = (field: keyof FactoryForm) =>
    errors[field] ? 'border-destructive' : '';

  const isValid =
    formData.name.trim().length > 0 &&
    formData.location.trim().length > 0 &&
    formData.capacity > 0;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-card max-w-xl w-full space-y-6"
      >
        <h2 className="text-center text-2xl font-semibold">Register Factory</h2>

        <input
          name="name"
          placeholder="Factory name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${error('name')}`}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}

        <input
          name="location"
          placeholder="Location "
          value={formData.location}
          onChange={handleChange}
          className={`form-input ${error('location')}`}
        />
        {errors.location && <p className="form-error">{errors.location}</p>}

        <input
          name="capacity"
          placeholder="Capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
          className={`form-input ${error('capacity')}`}
        />
        {errors.capacity && <p className="form-error">{errors.capacity}</p>}

        <button
          type="submit"
          disabled={!isValid}
          className="btn-primary w-full"
        ></button>
      </form>
    </section>
  );
}
