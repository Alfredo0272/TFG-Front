import { UserButtons } from '../buttons/userButtons';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full border-b border-border backdrop-blur-md shadow-sm z-50 bg-primary">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-amber-100 hover:opacity-80 transition">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xl font-semibold tracking-tight hover:opacity-80 transition"
          >
            <span className="text-2xl">🍺</span>
            BeerManager
          </Link>
        </h1>

        <UserButtons />
      </div>
    </header>
  );
}
