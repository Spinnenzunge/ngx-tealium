import { TealiumTrackingModuleConfig } from './tealium-tracking.module';
import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';
import { TealiumTrackingService } from './tealium-tracking.service';

export function provideTealiumTracking(config: TealiumTrackingModuleConfig): EnvironmentProviders {
  return makeEnvironmentProviders([..._provideTealiumTracking(config)]);
}

function _provideTealiumTracking(config: TealiumTrackingModuleConfig): Provider[] {
  return [
    TealiumTrackingService,
    config.configLoader
  ];
}
