import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TealiumTrackingModule } from '../../../ngx-tealium/src/lib/tealium-tracking.module';
import { TealiumConfigLoader, TealiumConfigStaticLoader } from '../../../ngx-tealium/src/lib/tealium-config.loader';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TealiumTrackingModule.forRoot({
      configLoader: {
        provide: TealiumConfigLoader,
        useValue: new TealiumConfigStaticLoader({ account: 'test', profile: 'test', environment: 'dev' }),
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
