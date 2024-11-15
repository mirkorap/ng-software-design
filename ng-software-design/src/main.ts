import { bootstrapApplication } from '@angular/platform-browser';
import routes from '@app/app.routes';
import { AppComponent } from '@app/app.component';
import { provideRouter } from '@angular/router';
import { NgxI18nService, provideCore } from 'core';
import { I18nService, provideUi } from 'ui-kit';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideCore(),
    provideUi({
      translator: {
        provide: I18nService,
        useClass: NgxI18nService,
      },
    }),
  ],
}).catch((err) => console.error(err));
