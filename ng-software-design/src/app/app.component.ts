import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from 'core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor(i18nService: I18nService) {
    i18nService.setDefaultLang('en');
    i18nService.setActiveLang('en');
  }
}
