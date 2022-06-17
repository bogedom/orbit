import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinanceSocketService {
  webSocket?: WebSocket;

  messages$$ = new BehaviorSubject<Map<string, any>>(new Map());

  constructor() {
  }

  subscribeSymbol(symbol: string) {
    this.webSocket = new WebSocket(environment.binanceStreamUrl + `/ws/${symbol}`)

    this.webSocket.onopen = (e) => {
      this.webSocket?.send(JSON.stringify({
        'method': 'SUBSCRIBE',
        'params':
          [
            'btcusdt@aggTrade'
          ],
        'id': 1
      }));

    }

    this.webSocket.onmessage = (e) => {
      const parsed = JSON.parse(e.data)

      if (parsed) {
        this.messages$$.next(this.messages$$.value.set(symbol, parsed));
      }
    }
  }

  unsubscribeSymbol() {
    this.webSocket?.send(JSON.stringify({
      'method': 'UNSUBSCRIBE',
      'params':
        [
          'btcusdt@aggTrade'
        ],
      'id': 312
    }))
  }

  getAggTrade(symbol: string) {
    return this.messages$$.asObservable().pipe(map((messages) => messages.get(symbol)))
  }
}
