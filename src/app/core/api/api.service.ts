import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(environment.binanceApiUrl + '/api/v3/ping');
  }
}
