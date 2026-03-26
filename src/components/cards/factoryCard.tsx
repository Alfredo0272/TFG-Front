import { useFactories } from '../../hooks/use.factories';
import { useBeers } from '../../hooks/use.beer';
import { Factory } from '../../models/factory.model';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface FactoryCardProps {
  factory: Factory;
}

function getCapacityColor(capacity: number) {
  if (capacity >= 5000) return 'text-emerald-400';
  if (capacity >= 2000) return 'text-amber-300';
  return 'text-red-400';
}

function getCapacityStatus(capacity: number) {
  if (capacity >= 5000) return 'High';
  if (capacity >= 2000) return 'Medium';
  return 'Low';
}

export default function FactoryCard({ factory }: FactoryCardProps) {
  const { handleFactoryDetails } = useFactories();
  const { loadBeersByFactory } = useBeers();
  const navigate = useNavigate();

  const handleClick = () => {
    handleFactoryDetails(factory);
    loadBeersByFactory(factory.id);
    navigate(`/factories/${factory.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="
        group
        border-b border-border
        even:bg-muted/10
        hover:bg-muted/40
        transition-colors
        cursor-pointer
      "
    >
      <td className="px-4 py-3 font-semibold text-inherit">{factory.name}</td>

      <td className="px-4 py-3 text-muted-foreground">
        {factory.location ?? (
          <span className="italic text-xs">No location</span>
        )}
      </td>

      <td className="px-4 py-3 text-right">
        {factory.capacity ? (
          <span
            className={`
              px-2 py-1 rounded-md text-xs font-semibold font-mono
              ${getCapacityColor(factory.capacity)}
              bg-secondary/30
            `}
          >
            {factory.capacity} L
          </span>
        ) : (
          <span className="text-muted-foreground italic text-xs">—</span>
        )}
      </td>

      <td className="px-4 py-3 text-xs text-muted-foreground">
        {factory.capacity && getCapacityStatus(factory.capacity)}
      </td>

      <td className="px-4 py-3 text-right text-amber-50 group-hover:text-primary transition">
        <ChevronRight size={18} />
      </td>
    </tr>
  );
}
