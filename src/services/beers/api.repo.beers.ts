import { Beer } from '../../models/beer.model';

export class BeerRepo {
  private baseUrl = 'http://localhost:8080/api/beers';

  private getToken(): string {
    const company = JSON.parse(localStorage.getItem('company') || 'null');

    if (!company?.token) {
      throw new Error('User not authenticated');
    }

    return company.token;
  }

  async getAllBeers(): Promise<Beer[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async registerBeers(partialBeer: Partial<Beer>): Promise<Beer> {
    const response = await fetch(`${this.baseUrl}/new`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partialBeer),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getBeerById(beerId: number): Promise<Beer> {
    const response = await fetch(`${this.baseUrl}/${beerId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getBeerByFactory(factoryId: number): Promise<Beer[]> {
    const response = await fetch(`${this.baseUrl}/factory/${factoryId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
