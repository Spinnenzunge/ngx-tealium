import {ModuleWithProviders, NgModule, Provider} from "@angular/core";
import {TealiumTrackingService} from "./tealium-tracking.service";

/**
 * Tealium Module Config
 */
export interface TealiumTrackingModuleConfig {
  configLoader: Provider;
}

/**
 * Adds directives and providers for tealium customer tracking in an application.
 *
 * You can import this NgModule multiple times, once for each lazy-loaded bundle.
 * However, only one `TealiumTracking` service can be active.
 *
 * Call the `forRoot()` method in your eager loaded core module to create an `NgModule` that contains all the directives
 * and the `TealiumTracking` service itself.
 */
@NgModule()
export class TealiumTrackingModule {
  static forRoot(config: TealiumTrackingModuleConfig): ModuleWithProviders<TealiumTrackingModule> {
    return {
      ngModule: TealiumTrackingModule,
      providers: [TealiumTrackingService, config.configLoader],
    };
  }
}

