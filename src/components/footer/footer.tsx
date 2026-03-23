export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-border bg-primary z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BeerManager · Brewery Management Platform
      </div>
    </footer>
  );
}
