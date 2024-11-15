import { bootstrapApplication } from '@angular/platform-browser';
import routes from '@app/app.routes';
import { AppComponent } from '@app/app.component';
import { provideRouter } from '@angular/router';
import { provideCore } from 'core';
import { provideUi } from 'ui-kit';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideCore(), provideUi()],
}).catch((err) => console.error(err));
