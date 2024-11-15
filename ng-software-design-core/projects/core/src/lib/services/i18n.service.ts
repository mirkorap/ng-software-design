import { Injectable } from '@angular/core';

@Injectable()
export abstract class I18nService {
  abstract getDefaultLang(): string;

  abstract setDefaultLang(lang: string): void;

  abstract getActiveLang(): string;

  abstract setActiveLang(lang: string): void;

  abstract translate(key: string, params?: Record<string, string>): string;
}
