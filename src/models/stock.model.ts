import { Beer } from './beer.model';
import { Factory } from './factory.model';

export type Stock = {
  id: number;
  factory: Factory;
  beer: Beer;
  productionCostL: number;
  productionVolumeL: number;
  availableL: number;
  updatedAt: string;
};
