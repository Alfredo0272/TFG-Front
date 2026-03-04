import { Beer } from './beer.model';
import { Company } from './company.model';

export type Factory = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  company?: Company;
  beers?: Beer[];
};
