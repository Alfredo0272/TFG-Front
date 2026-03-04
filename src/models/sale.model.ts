import { Beer } from './beer.model';
import { Company } from './company.model';
import { Factory } from './factory.model';

export type Sale = {
  id: number;
  company: Company;
  beer: Beer;
  factory: Factory;
  quantityL: number;
  unitPrice: number;
  totalPrice: number;
  soldAt: string;
};
