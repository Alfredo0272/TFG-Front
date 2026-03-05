import { Company } from '../models/company.model';

export type LoginResponse = {
  company: Company;
  token: string;
};
