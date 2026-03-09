import { SyntheticEvent, useState } from 'react';
import { useCompanies } from '../../hooks/use.companies';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { login, loading } = useCompanies();
  const navigate = useNavigate();

  const emailRegex = /^\S+@\S+\.\S+$/;

  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginForm, string>>
  >({});

  const [loginData, setLoginData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof LoginForm, string>> = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (loginData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      await login(loginData);
      navigate('/dashboard');
    } catch {
      setErrors({
        email: 'Invalid credentials',
      });
    }
  };

  const error = (field: keyof LoginForm) =>
    errors[field] ? 'border-destructive' : '';

  const isValid =
    loginData.email.trim().length > 0 &&
    emailRegex.test(loginData.email) &&
    loginData.password.length >= 6;

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-card max-w-xl w-full space-y-6"
      >
        <h2 className="text-center text-2xl font-semibold">Login</h2>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`form-input ${error('email')}`}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className={`form-input ${error('password')}`}
        />
        {errors.password && <p className="form-error">{errors.password}</p>}

        <button
          type="submit"
          disabled={loading || !isValid}
          className="btn-primary w-full"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  );
}
