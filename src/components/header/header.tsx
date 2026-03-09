import { UserButtons } from '../buttons/userButtons';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full border-b border-border bg-background/80 backdrop-blur z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          🍺 BeerManager
        </h1>

        <UserButtons />
      </div>
    </header>
  );
}
