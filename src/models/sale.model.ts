export type SaleRegister = {
  beerId: number;
  factoryId: number;
  quantityL: number;
  unitPrice: number;
};

export type Sale = SaleRegister & {
  id: number;
  companyId: number;
  companyName: string;
  beerName: string;
  factoryName: string;
  totalPrice: number;
  soldAt: string;
};
