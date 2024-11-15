import { Injectable } from '@angular/core';
import Decimal from 'decimal.js';

import { ValueFormat } from './value.format';

@Injectable()
export class ShortDayFormat extends ValueFormat {
  match(mask: string): boolean {
    return ['&#d ##h'].includes(mask);
  }

  override toText(value: number, mask: string): string {
    if (!this.match(mask)) {
      return super.toText(value, mask);
    }

    const abs = new Decimal(value).abs();

    let days = abs.divToInt(24).floor();
    let hours = abs.sub(days.mul(24)).floor();
    let minutes = abs.sub(hours).mul(60).floor();
    let seconds = abs.sub(hours).mul(60).sub(minutes).mul(60).toDP(0);

    if (seconds.eq(60)) {
      minutes = minutes.add(1);
      seconds = new Decimal(0);
    }

    if (minutes.eq(60)) {
      hours = hours.add(1);
      minutes = new Decimal(0);
    }

    if (hours.eq(24)) {
      days = days.add(1);
      hours = new Decimal(0);
    }

    return (
      (value < 0 ? '-' : '') +
      days.toString() +
      'd ' +
      hours.toString().padStart(2, '0') +
      'h'
    );
  }

  override toValue(text: string, mask: string): number {
    if (!this.match(mask)) {
      return super.toValue(text, mask);
    }

    const parts = text.split(/[dh]+/);
    const days = parts[0]?.trim() || '0';
    const hours = parts[1]?.trim() || '0';

    const value = new Decimal(days).mul(24).add(new Decimal(hours));

    return value.toNumber();
  }
}
