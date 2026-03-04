import { Company } from './company.model';
import { Factory } from './factory.model';

export type Beer = {
  id: number;
  name: string;
  style: string;
  alcohol: number;
  pricePerL: number;
  company: Company;
  factory: Factory;
};
