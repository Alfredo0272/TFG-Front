import { Factory } from '../../models/factory.model';

export class FactoriesRepo {
  private baseUrl = 'http://localhost:8080/api/factories';
  private getToken(): string {
    const company = JSON.parse(localStorage.getItem('company') || 'null');

    if (!company?.token) {
      throw new Error('User not authenticated');
    }

    return company.token;
  }

  async createFactory(newFactory: Partial<Factory>): Promise<Factory> {
    console.log(newFactory);
    console.log(this.getToken());
    const response = await fetch(this.baseUrl + '/register', {
      method: 'POST',
      body: JSON.stringify(newFactory),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<Factory>;
  }

  async getAllFactories(): Promise<Factory[]> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Factory[]>;
  }

  async getFactoryById(id: number): Promise<Factory> {
    const response = await fetch(`${this.baseUrl + '/'}${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Factory>;
  }

  async updateFactory(
    id: number,
    updatedFactory: Partial<Factory>,
  ): Promise<Factory> {
    const response = await fetch(this.baseUrl + '/' + id, {
      method: 'PUT',
      body: JSON.stringify(updatedFactory),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Factory>;
  }
}
