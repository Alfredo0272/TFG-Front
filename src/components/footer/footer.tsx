export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-border bg-primary z-50">
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 sm:py-4 text-center text-xs sm:text-sm text-muted-foreground">
        <span className="hidden sm:inline">© {new Date().getFullYear()} BeerManager · Brewery Management Platform</span>
        <span className="sm:hidden">© {new Date().getFullYear()} BeerManager</span>
      </div>
    </footer>
  );
}
