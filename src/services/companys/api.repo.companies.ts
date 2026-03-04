import { Company, LoginCompany } from '../../models/company.model';
import { LoginResponse } from '../../types/company.login';

export class CompaniesRepo {
  private baseUrl = 'http://localhost:8080/api/companies/';

  async login(loginCompany: LoginCompany): Promise<LoginResponse> {
    const url = this.baseUrl + 'login';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginCompany),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async loginWithToken(token: string): Promise<LoginResponse> {
    const url = this.baseUrl + 'login';
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async registerCompany(newCompany: Partial<Company>): Promise<Company> {
    const url = this.baseUrl + 'register';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newCompany),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
