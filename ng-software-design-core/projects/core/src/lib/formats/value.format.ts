import { InjectionToken } from '@angular/core';

export const VALUE_FORMATS = new InjectionToken<ValueFormat[]>('ValueFormats');

export abstract class ValueFormat {
  protected nextHandler?: ValueFormat;

  setNext(handler: ValueFormat): ValueFormat {
    this.nextHandler = handler;

    return this;
  }

  abstract match(mask: string): boolean;

  toText(value: number, mask: string): string {
    if (this.nextHandler) {
      return this.nextHandler.toText(value, mask);
    }

    throw new Error('Unreachable code');
  }

  toValue(text: string, mask: string): number {
    if (this.nextHandler) {
      return this.nextHandler.toValue(text, mask);
    }

    throw new Error('Unreachable code');
  }
}
