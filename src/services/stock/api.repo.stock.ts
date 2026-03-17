import { Stock } from '../../models/stock.model';

export class StockRepo {
  private baseUrl = 'http://localhost:8080/api/stocks';

  private getToken(): string {
    const company = JSON.parse(localStorage.getItem('company') || 'null');

    if (!company?.token) {
      throw new Error('User not authenticated');
    }

    return company.token;
  }

  async registerStock(newStock: Partial<Stock>): Promise<Stock> {
    const response = await fetch(this.baseUrl + '/new', {
      method: 'POST',
      body: JSON.stringify(newStock),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<Stock>;
  }

  async getStockById(id: number): Promise<Stock> {
    const response = await fetch(`${this.baseUrl + '/'}${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Stock>;
  }

  async addNewStock(id: number, newStock: Partial<Stock>): Promise<Stock> {
    const response = await fetch(`${this.baseUrl}/${id}/production`, {
      method: 'PUT',
      body: JSON.stringify(newStock),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<Stock>;
  }
}
