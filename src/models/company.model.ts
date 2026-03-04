import { Factory } from './factory.model';
import { Sale } from './sale.model';

export type LoginCompany = {
  email: string;
  password: string;
};

export type Company = LoginCompany & {
  id: number;
  name: string;
  country?: string;
  foundedYear?: number;
  createdAt: string;
  factories?: Factory[];
  sales?: Sale[];
};
