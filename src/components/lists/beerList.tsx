import { useEffect } from 'react';
import { useBeers } from '../../hooks/use.beer';
import BeerCard from '../cards/beerCard';

export default function BeerList() {
  const { loadAllBeers, beers } = useBeers();

  useEffect(() => {
    loadAllBeers();
  }, [loadAllBeers]);

  if (beers.length === 0) {
    return <p className="text-muted-foreground">No beers found</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pt-28 pb-16">
      <h2 className="text-2xl font-semibold mb-8">Beers</h2>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {beers.map((beer) => (
          <li key={beer.id}>
            <BeerCard beer={beer} />
          </li>
        ))}
      </ul>
    </section>
  );
}
