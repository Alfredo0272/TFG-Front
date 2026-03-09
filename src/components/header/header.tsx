import { UserButtons } from '../buttons/userButtons';

export function Header() {
  return (
    <header className="fixed top left-0 w-full border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight py-0.5 mr-4">
          🍺 BeerManager
        </h1>

        <UserButtons />
      </div>
    </header>
  );
}
