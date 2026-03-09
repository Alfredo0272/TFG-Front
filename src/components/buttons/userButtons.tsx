import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Factory,
  Beer,
  ShoppingCart,
  Hop,
  UserPlus,
  LogOut,
  BoxIcon,
} from 'lucide-react';
import { useCompanies } from '../../hooks/use.companies';

const links = [
  { name: 'Register', path: '/register', icon: UserPlus },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Sales', path: '/sales', icon: ShoppingCart },
  { name: 'Stock', path: '/stock', icon: BoxIcon },
  { name: 'Beer', path: '/beer', icon: Beer },
  { name: 'Factory', path: '/create-factory', icon: Factory },
  { name: 'Top 5', path: '/top5', icon: Hop },
];

export function UserButtons() {
  const { makeLogOut } = useCompanies();

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`
          }
        >
          <Icon size={18} />
          {name}
        </NavLink>
      ))}

      <div className="mx-2 h-5 w-px bg-border" />

      <button
        onClick={makeLogOut}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
}
