import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  EnvironmentProviders,
  importProvidersFrom,
  makeEnvironmentProviders,
} from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import * as fromFormats from './formats';
import * as fromServices from './services';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function provideCore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: fromServices.I18nService,
      useClass: fromServices.NgxI18nService
    },
    {
      provide: fromFormats.VALUE_FORMATS,
      useClass: fromFormats.ShortDayFormat,
      multi: true
    },
    {
      provide: fromFormats.VALUE_FORMATS,
      useClass: fromFormats.CentesimalsOfMinuteFormat,
      multi: true
    },
    {
      provide: fromFormats.VALUE_FORMATS,
      useClass: fromFormats.MillesimalsOfMinuteFormat,
      multi: true
    }
  ]);
}
