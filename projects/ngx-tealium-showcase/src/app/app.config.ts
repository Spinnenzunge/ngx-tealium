import { ApplicationConfig } from '@angular/core';
import { provideTealiumTracking, TealiumConfigLoader, TealiumConfigStaticLoader } from 'ngx-tealium';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTealiumTracking({
      configLoader: {
        provide: TealiumConfigLoader,
        useValue: new TealiumConfigStaticLoader({ account: 'test', profile: 'test', environment: 'dev' })
      }
    })
  ]
};
