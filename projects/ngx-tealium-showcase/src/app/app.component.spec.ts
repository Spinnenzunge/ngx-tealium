import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TealiumTrackingService} from "../../../ngx-tealium/src/lib/tealium-tracking.service";

describe('AppComponent', () => {
  let tealiumTrackingServiceSpy: jasmine.SpyObj<TealiumTrackingService>;

  beforeEach(async () => {
    tealiumTrackingServiceSpy = jasmine.createSpyObj<TealiumTrackingService>(['trackPageView', 'trackCustomEvent']);

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: TealiumTrackingService,
          useValue: tealiumTrackingServiceSpy
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
