import { Revenue } from '../../models/revenue.model';

export class RevenueRepo {
  private baseUrl = 'http://localhost:8080/api/revenue';

  private getToken(): string {
    const company = JSON.parse(localStorage.getItem('company') || 'null');
    if (!company?.token) throw new Error('User not authenticated');
    return company.token;
  }

  private async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  getTotalRevenue(): Promise<number> {
    return this.get('/total');
  }
  getRevenueByBeer(): Promise<Revenue[]> {
    return this.get('/by-beer');
  }
  getRevenueByFactory(): Promise<Revenue[]> {
    return this.get('/by-factory');
  }
  getMonthlyRevenue(): Promise<Revenue[]> {
    return this.get('/monthly');
  }
  getMonthlyRevenueByFactory(factoryId: number): Promise<Revenue[]> {
    return this.get(`/monthly/factory/${factoryId}`);
  }
  getRevenueBetweenDates(start: string, end: string): Promise<number> {
    return this.get(`/range?start=${start}&end=${end}`);
  }
  getTotalProfit(): Promise<number> {
    return this.get('/profit/total');
  }
  getProfitByBeer(): Promise<Revenue[]> {
    return this.get('/profit/by-beer');
  }
  getProfitByFactory(): Promise<Revenue[]> {
    return this.get('/profit/by-factory');
  }
  getTop5ProfitableBeers(): Promise<Revenue[]> {
    return this.get('/profit/top5');
  }
}
