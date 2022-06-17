import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BinanceDataService {
  private readonly apiUrl = environment.binanceApiUrl + '/api/v3'

  constructor(private readonly httpClient: HttpClient) { }

  ping() {
    return this.httpClient.get<{}>(`${this.apiUrl}/ping`);
  }

  time() {
    return this.httpClient.get<{ serverTime: number }>(`${this.apiUrl}/time`);
  }

  /**
   *
   * @param symbol - example: 'BNBUSDT'
   */
  exchangeInfo(symbol: string) {
    return this.httpClient.get(`${this.apiUrl}/time`, { params: { symbol } });
  }
}
