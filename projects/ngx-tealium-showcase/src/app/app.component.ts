import { Component, OnInit } from '@angular/core';
import { TealiumTrackingService } from 'ngx-tealium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent implements OnInit {
  constructor(private tealiumTrackingService: TealiumTrackingService) {
  }

  public ngOnInit(): void {
    this.tealiumTrackingService.trackPageView({ event: 'test' });
  }

  public trackEvent(): void {
    this.tealiumTrackingService.trackCustomEvent({ event: 'custom' });
  }
}
