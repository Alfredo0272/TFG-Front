import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Factory,
  Beer,
  // ShoppingCart,
  Hop,
  UserPlus,
  LogOut,
  ChartNoAxesCombined,
  Menu,
  X,
} from 'lucide-react';
import { useCompanies } from '../../hooks/use.companies';
import { LocalStorage } from '../../services/local.storage';

const publicLinks = [{ name: 'Register', path: '/register', icon: UserPlus }];

const privateLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
  { name: 'Beer', path: '/beer', icon: Beer },
  { name: 'Factory', path: '/create-factory', icon: Factory },
  { name: 'Top 5', path: '/top5', icon: Hop },
];

export function UserButtons() {
  const { makeLogOut } = useCompanies();
  const [menuOpen, setMenuOpen] = useState(false);

  const companyStore = new LocalStorage<{ token: string }>('company');
  const isAuthenticated = !!companyStore.get()?.token;

  const links = isAuthenticated ? privateLinks : publicLinks;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`;

  return (
    <nav className="relative flex items-center gap-1">
      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-1">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={linkClass}>
            <Icon size={18} />
            {name}
          </NavLink>
        ))}

        {isAuthenticated && (
          <>
            <div className="mx-2 h-5 w-px bg-border" />
            <button
              onClick={makeLogOut}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile hamburger button */}
      <button
        className="sm:hidden p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full right-0 mt-1 w-44 rounded-xl border border-border bg-primary shadow-lg z-50 py-2 flex flex-col">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={linkClass}
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <div className="my-1 mx-3 h-px bg-border" />
              <button
                onClick={() => {
                  makeLogOut();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 rounded-md mx-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
