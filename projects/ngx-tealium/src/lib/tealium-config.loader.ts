import { Observable, ReplaySubject } from 'rxjs';
import { TealiumConfig } from './tealium-config';

export abstract class TealiumConfigLoader {
  abstract loadConfig(): Observable<TealiumConfig>;
}

export class TealiumConfigHttpLoader implements TealiumConfigLoader {
  private configSubject$ = new ReplaySubject<TealiumConfig>();

  constructor(private config$: Observable<TealiumConfig>) {
    this.config$.subscribe((config) => {
      this.configSubject$.next(config);
    });
  }

  loadConfig(): Observable<TealiumConfig> {
    return this.configSubject$.asObservable();
  }
}

export class TealiumConfigStaticLoader implements TealiumConfigLoader {
  private configSubject$ = new ReplaySubject<TealiumConfig>();

  constructor(private config: TealiumConfig) {
    this.configSubject$.next(config);
  }

  loadConfig(): Observable<TealiumConfig> {
    return this.configSubject$.asObservable();
  }
}
