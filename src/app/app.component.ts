import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './core/api/api.service';
import { BinanceSocketService } from './core/platform/binance/binance-socket.service';
import { KrakenSocketService } from './core/platform/kraken/kraken-socket.service';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'make'},
    { field: 'model'},
    { field: 'price' }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  symbol = 'btcusdt';

  symbol$ = this.binanceSocketService.getAggTrade(this.symbol);
  krakenTicker$ = this.krakenSocketService.getTicker(this.symbol);

  constructor(
    private readonly apiService: ApiService,
    private readonly binanceSocketService: BinanceSocketService,
    private readonly krakenSocketService: KrakenSocketService,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.apiService.get().subscribe();

    // this.binanceSocketService.subscribeSymbol(this.symbol);
    //
    // setTimeout(() => {
    //   this.binanceSocketService.unsubscribeSymbol();
    // }, 5000);

    // this.krakenSocketService.subscribeSymbol(this.symbol)

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

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
