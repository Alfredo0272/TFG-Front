import { Link } from 'react-router-dom';
const links = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Ventas', path: '/sales' },
  { name: 'Stock', path: '/stock' },
];

export function UserButtons() {
  return (
    <section className="flex gap-6 text-sm font-medium">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="hover:text-primary transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </section>
  );
}
