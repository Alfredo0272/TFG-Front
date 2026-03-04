import { UserButtons } from '../buttons/userButtons';

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <h1 className="text-lg font-semibold">🍺 BeerManager</h1>
        <UserButtons />
      </div>
    </header>
  );
}
