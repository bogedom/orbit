import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KrakenSocketService {

  webSocket?: WebSocket;

  messages$$ = new BehaviorSubject<Map<string, any>>(new Map());

  constructor() {
  }

  subscribeSymbol(symbol: string) {
    this.webSocket = new WebSocket(environment.krakenStreamUrl)

    this.webSocket.onopen = (e) => {
      console.log(e);

      this.webSocket?.send(JSON.stringify({
        'event': 'subscribe',
        'pair': [
          'BTC/USDT',
        ],
        'subscription': {
          'name': 'trade'
        }
      }));

    }

    this.webSocket.onmessage = (e) => {
      const parsed = JSON.parse(e.data);

      if (parsed && parsed.length) {
        this.messages$$.next(this.messages$$.value.set(symbol, parsed[1]));
      }
    }
  }

  unsubscribeSymbol() {
    this.webSocket?.send(JSON.stringify({
      'event': 'unsubscribe',
      'pair': [
        'BTC/USDT',
      ],
      'subscription': {
        'name': 'trade'
      }
    }))
  }

  getTicker(symbol: string) {
    return this.messages$$.asObservable().pipe(map((messages) => messages.get(symbol)))
  }
}
