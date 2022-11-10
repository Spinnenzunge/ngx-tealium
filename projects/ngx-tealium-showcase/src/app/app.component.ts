import {Component, OnInit} from '@angular/core';
import {TealiumTrackingService} from "../../../ngx-tealium/src/lib/tealium-tracking.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private tealiumTrackingService: TealiumTrackingService) {
  }

  public ngOnInit(): void {
    this.tealiumTrackingService.trackPageView({event: 'test'});
  }

  public trackEvent(): void {
    this.tealiumTrackingService.trackCustomEvent({event: 'custom'});
  }
}
