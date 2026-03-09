import FactoryList from '../lists/factoryList';

export default function Dashboard() {
  return (
    <section className="flex-1 mx-auto max-w-7xl p-6 pt-24 space-y-10">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>

        <p className="text-muted-foreground">
          Bienvenido al panel de gestión cervecera.
        </p>
      </header>

      <FactoryList />
    </section>
  );
}
