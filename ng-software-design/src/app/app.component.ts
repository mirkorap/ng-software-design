import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService, ValueConverter } from 'core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  private i18nService = inject(I18nService);
  private converter = inject(ValueConverter);

  constructor() {
    this.i18nService.setDefaultLang('en');
    this.i18nService.setActiveLang('en');

    // Formats
    const valueAsText = this.converter.toText(38.0769444, "&#d ##h");
    console.log(valueAsText);
  }
}
