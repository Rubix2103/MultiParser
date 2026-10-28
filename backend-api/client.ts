export interface ApiResponse<T> {
  status: number;
  data: T;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
    const response = await fetch(url);
    const data = (await response.json()) as T;
    return {
      status: response.status,
      data,
    };
  }
}

