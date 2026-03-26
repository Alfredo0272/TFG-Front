import { Sale, SaleRegister } from '../../models/sale.model';

export class SalesRepo {
  private baseUrl = 'http://localhost:8080/api/sales';
  private getToken(): string {
    const company = JSON.parse(localStorage.getItem('company') || 'null');

    if (!company?.token) {
      throw new Error('User not authenticated');
    }

    return company.token;
  }

  async createSale(newSale: SaleRegister): Promise<Sale> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(newSale),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getAllSales(): Promise<Sale[]> {
    const response = await fetch(this.baseUrl + '/company', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<Sale[]>;
  }

  async getSalesByFactory(factoryId: number): Promise<Sale[]> {
    const response = await fetch(`${this.baseUrl}/factory/${factoryId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Sale[]>;
  }
}
