# ngx-tealium

This library supports the implementation of customer tracking with Tealium in Angular applications.

> Tealium provides an [Angular Integration Guide](https://github.com/Tealium/integration-angular) already, but their
> approach require the consumer to create their own service. This library uses the developer friendly NgModule
> approach to make an Angular Integration.

## Installation

```shell
npm install @spinnenzunge/ngx-tealium --save
```

## Usage

### 1. Import the `TealiumTrackingModule`

After installation you can use the ngx-tealium library in your Angular project. You have to
import `TealiumTrackingModule.forRoot()` in the root NgModule of your application.

The `forRoot` static method is a convention that provides and configures services at the same time. Make sure you only
call this method in the root module of your application, most of the time called AppModule. This method allows you to
configure the TealiumTrackingModule by defining a `configLoader` provider.

```ts
@NgModule({
  imports: [
    BrowserModule,
    TealiumTrackingModule.forRoot({
      configLoader: {
        provide: TealiumConfigLoader,
        useValue: new TealiumConfigStaticLoader({ account: 'test', profile: 'test', environment: 'dev' }),
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Async Config

If you want to use a configuration from a HTTP or other async source, you need to provide a `TealiumConfigHttpLoader`
class created in a factory function.

```ts
// AoT requires an exported function for factories
export function tealiumConfigLoaderFactory(httpClient: HttpClient): TealiumConfigLoader {
  const config$ = httpClient.get<TealiumConfig>('http://localhost:3000/config');
  return new TealiumConfigHttpLoader(config$);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TealiumTrackingModule.forRoot({
      configLoader: {
        provide: TealiumConfigLoader,
        useFactory: tealiumConfigLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Configuration

The tealium config is provided when importing the `TealiumTrackingModule` with `forRoot` by providing an `account`
, `profile` and `environment`.

### 2. Use the service

Inject the `TealiumTrackingService` to send tealium tracking events to your profile. Check the [API](#api) of the
Service in the Module for more information.

## API

### TealiumTrackingService

The `TealiumTrackingService` is an injectable Angular service to be used in your components. It provides the most common
tracking methods specified in a customer tracking concept.

#### Methods

- `trackCustomEvent(event: TealiumEvent)`: Tracks a generic tealium link event.
- `trackPageView(event: TealiumEvent)`: Tracks a generic tealium view event.
- `addVolatile(key: string, value: string | string[])`: Adds data to the stateful volatile store that is sent with every
  tracking request.
- `removeVolatile(key: string)`: Removes data from the stateful volatile store.

## Contributing

Thanks for your interest in contributing! Read up on our guidelines for [contributing](./.github/CONTRIBUTING.md) and then look through our issues with a help wanted label.
