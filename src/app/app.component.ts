import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/api/api.service';
import { BinanceSocketService } from './core/binance/binance-socket.service';
import { KrakenSocketService } from './core/kraken/kraken-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orbit';

  symbol = 'btcusdt';

  symbol$ = this.binanceSocketService.getAggTrade(this.symbol);
  krakenTicker$ = this.krakenSocketService.getTicker(this.symbol);

  constructor(
    private readonly apiService: ApiService,
    private readonly binanceSocketService: BinanceSocketService,
    private readonly krakenSocketService: KrakenSocketService,
  ) {}

  ngOnInit(): void {
    this.apiService.get().subscribe();

    this.binanceSocketService.subscribeSymbol(this.symbol);
    //
    // setTimeout(() => {
    //   this.binanceSocketService.unsubscribeSymbol();
    // }, 5000);

    this.krakenSocketService.subscribeSymbol(this.symbol)

  }

  getDiff(a: number, b: number) {
    if (a && b) {
      console.log((+a - +b));
      console.log((+a + +b));
      return Math.abs((+a - +b) / (+a + +b) / 2) * 100;
    } else {
      return 0;
    }
  }
}
