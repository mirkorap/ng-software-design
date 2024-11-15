import { inject, Injectable } from '@angular/core';

import { NullFormat, VALUE_FORMATS, ValueFormat } from '../formats';

@Injectable({
  providedIn: 'root',
})
export class ValueConverter {
  private valueFormats = inject(VALUE_FORMATS);

  private formatter: ValueFormat = new NullFormat();

  constructor() {
    this.valueFormats.forEach((current) => {
      const lastElement = this.formatter;
      this.formatter = current.setNext(lastElement);
    });
  }

  toText(value: number, mask: string): string {
    return this.formatter.toText(value, mask);
  }

  toValue(text: string, mask: string): number {
    return this.formatter.toValue(text, mask);
  }
}
