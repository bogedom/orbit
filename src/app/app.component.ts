import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'orbit';

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get().subscribe();
  }
}
