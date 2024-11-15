import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from './i18n.service';

@Injectable()
export class NgxI18nService extends I18nService {
  private baseService = inject(TranslateService);

  getDefaultLang(): string {
    return this.baseService.getDefaultLang();
  }

  setDefaultLang(lang: string): void {
    this.baseService.setDefaultLang(lang);
  }

  getActiveLang(): string {
    return this.baseService.currentLang;
  }

  setActiveLang(lang: string): void {
    this.baseService.use(lang);
  }

  translate(key: string, params?: Record<string, string>): string {
    return this.baseService.instant(key, params);
  }
}
