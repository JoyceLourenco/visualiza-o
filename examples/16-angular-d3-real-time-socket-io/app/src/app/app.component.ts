import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MarketStatusService } from './market-status.service';
import { MarketPrice } from './market-price';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  marketStatus: MarketPrice[];
  marketStatusToPlot: MarketPrice[];

  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusService: MarketStatusService) {
    this.marketStatusService.getInitialMarketStatus().subscribe(prices => {
      this.MarketStatus = prices;
    });
  }
}
