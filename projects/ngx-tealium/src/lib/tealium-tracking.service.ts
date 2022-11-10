import {Injectable} from '@angular/core';
import {switchMap, take} from 'rxjs';
import {TealiumConfig} from './tealium-config';
import {TealiumConfigLoader} from './tealium-config.loader';
import {TealiumEvent,} from './tealium-event';

const TEALIUM_SCRIPT_ID = 'tealium-utag-js';

@Injectable()
export class TealiumTrackingService {
  /**
   * Volatile store state in form of a string map
   *
   * @private
   */
  private volatileStore = new Map<string, string | string[]>();

  constructor(private tealiumConfigLoader: TealiumConfigLoader) {
    // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
    (window as any).utag_cfg_ovrd = {noview: true};
    (window as any).utag_data = {};
  }

  /**
   * Tracks a generic tealium view event
   *
   * @param event Tracking payload
   */
  public trackPageView(event: TealiumEvent): void {
    this.track('view', event);
  }

  /**
   * Tracks a generic tealium link event
   *
   * @param event Tracking payload
   */
  public trackCustomEvent(event: TealiumEvent): void {
    this.track('link', event);
  }

  /**
   * Adds data to the stateful volatile store that is sent with every tracking request
   *
   * @param key The key name that this data will be stored under
   * @param value The value to be stored as volatile data
   */
  public addVolatile(key: string, value: string | string[]): void {
    this.volatileStore.set(key, value);
  }

  /**
   * Removes data from the stateful volatile store
   *
   * @param key The key name of the date in the store
   */
  public removeVolatile(key: string): void {
    this.volatileStore.delete(key);
  }

  /**
   * Enrich tracking payload with volatile store and track event with tealium utag api
   *
   * @param trackingType View or event tracking
   * @param event Tracking payload
   * @private
   */
  private track(trackingType: 'view' | 'link', event: TealiumEvent): void {
    const data: TealiumEvent = {
      ...event,
      ...Object.fromEntries(this.volatileStore),
    };

    if ((window as any).utag === undefined) {
      this.tealiumConfigLoader
        .loadConfig()
        .pipe(
          take(1),
          switchMap((config) => this.loadScript(config))
        )
        .subscribe(() => {
          (window as any).utag?.track(trackingType, data);
        });
    } else {
      (window as any).utag.track(trackingType, data);
    }
  }

  /**
   * Dynamically add external js script to dom and resolve on load event
   *
   * @param config Config to load script for
   * @private
   */
  private loadScript(config: TealiumConfig): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      const src = `https://tags.tiqcdn.com/utag/${config.account}/${config.profile}/${config.environment}/utag.js`;
      const existingScript = document.getElementById(TEALIUM_SCRIPT_ID);
      if (existingScript) {
        existingScript.addEventListener('load', resolve);
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.id = TEALIUM_SCRIPT_ID;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }
}

