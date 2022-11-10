import {TealiumTrackingService} from "./tealium-tracking.service";
import {TealiumConfig} from "./tealium-config";
import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {TealiumConfigLoader, TealiumConfigStaticLoader} from "./tealium-config.loader";
import {TealiumEvent} from "./tealium-event";

describe('TealiumTrackingService', () => {
  let service: TealiumTrackingService;
  let configMock: TealiumConfig;
  let utagSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    configMock = {
      account: 'test',
      profile: 'test',
      environment: 'dev',
    };

    utagSpy = jasmine.createSpyObj(['track']);
    (window as any).utag = utagSpy;

    TestBed.configureTestingModule({
      providers: [
        TealiumTrackingService,
        {
          provide: TealiumConfigLoader,
          useValue: new TealiumConfigStaticLoader(configMock),
        },
      ],
    });
    service = TestBed.inject(TealiumTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads script if utag is not defined', fakeAsync(() => {
    (window as any).utag = undefined;
    // mock private loadScript method because this is very difficult to test in a unit test setup
    const loadScriptSpy = spyOn<any>(service, 'loadScript').and.callFake(() => {
      (window as any).utag = utagSpy;
      return Promise.resolve();
    });

    service.trackCustomEvent({});
    tick();

    expect(loadScriptSpy).toHaveBeenCalledTimes(1);
  }));

  describe('trackPageView()', () => {
    it('sends a TealiumEvent payload as a view tracking to tealium', () => {
      const eventMock: TealiumEvent = {page_name: 'test'};

      service.trackPageView(eventMock);

      expect(utagSpy.track).toHaveBeenCalledOnceWith('view', eventMock);
    });
  });

  describe('trackCustomEvent()', () => {
    it('sends a generic payload as a link tracking to tealium', () => {
      const eventMock: TealiumEvent = {random: 'true'};

      service.trackCustomEvent(eventMock);

      expect(utagSpy.track).toHaveBeenCalledOnceWith('link', eventMock);
    });
  });

  describe('addVolatile()', () => {
    it('adds a value to volatile store that is provided as additional tracking value', () => {
      service.addVolatile('random', 'value');

      expect(service['volatileStore'].get('random')).toBeDefined();
    });
  });

  describe('removeVolatile()', () => {
    it('adds a value to volatile store that is provided as additional tracking value', () => {
      service['volatileStore'].set('random', 'test');

      service.removeVolatile('random');

      expect(service['volatileStore'].get('random')).toBeUndefined();
    });
  });
});

