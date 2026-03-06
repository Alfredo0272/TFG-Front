import { useState } from 'react';
import { useCompanies } from '../../hooks/use.companies';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  foundedYear: number;
}

export function Register() {
  const { register, loading } = useCompanies();

  const currentYear = new Date().getFullYear();
  const emailRegex = /^\S+@\S+\.\S+$/;

  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    foundedYear: currentYear,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterForm, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'foundedYear' ? Number(value) : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof RegisterForm, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (formData.foundedYear < 1800 || formData.foundedYear > currentYear) {
      newErrors.foundedYear = 'Invalid year';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const { confirmPassword, ...companyData } = formData;

    await register(companyData);

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      foundedYear: currentYear,
    });
  };

  const error = (field: keyof RegisterForm) =>
    errors[field] ? 'border-destructive' : '';

  const isValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    emailRegex.test(formData.email) &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    formData.country.trim().length > 0 &&
    formData.foundedYear >= 1800 &&
    formData.foundedYear <= currentYear;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-card max-w-xl w-full space-y-6"
      >
        <h2 className="text-center text-2xl font-semibold">Register Company</h2>

        <input
          name="name"
          placeholder="Company name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${error('name')}`}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${error('email')}`}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`form-input ${error('password')}`}
        />
        {errors.password && <p className="form-error">{errors.password}</p>}

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`form-input ${error('confirmPassword')}`}
        />
        {errors.confirmPassword && (
          <p className="form-error">{errors.confirmPassword}</p>
        )}

        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className={`form-input ${error('country')}`}
        />
        {errors.country && <p className="form-error">{errors.country}</p>}

        <input
          name="foundedYear"
          type="number"
          placeholder="Founded year"
          value={formData.foundedYear}
          onChange={handleChange}
          className={`form-input ${error('foundedYear')}`}
        />
        {errors.foundedYear && (
          <p className="form-error">{errors.foundedYear}</p>
        )}

        <button
          type="submit"
          disabled={loading || !isValid}
          className="btn-primary w-full"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </section>
  );
}
