import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Factory,
  Beer,
  ShoppingCart,
  Hop,
} from 'lucide-react';

const links = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Ventas', path: '/sales', icon: ShoppingCart },
  { name: 'Stock', path: '/stock', icon: Factory },
  { name: 'Beer', path: '/beer', icon: Beer },
  { name: 'Top 5', path: '/top5', icon: Hop },
];

export function UserButtons() {
  return (
    <section className="flex items-center gap-2">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
              flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors
              ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }
              `
            }
          >
            <Icon size={18} />
            {link.name}
          </NavLink>
        );
      })}
    </section>
  );
}
