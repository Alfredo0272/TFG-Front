export function Footer() {
  return (
    <footer className="border-t border-border ">
      <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-muted-foreground ">
        © {new Date().getFullYear()} BeerManager · Brewery Management Platform
      </div>
    </footer>
  );
}
