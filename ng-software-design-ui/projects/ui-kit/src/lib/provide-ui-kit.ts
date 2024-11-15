import { EnvironmentProviders, makeEnvironmentProviders, Provider } from '@angular/core';

export interface UiKitConfig {
  translator: Provider;
}

export function provideUi(config: UiKitConfig): EnvironmentProviders {
  return makeEnvironmentProviders([config.translator]);
}
