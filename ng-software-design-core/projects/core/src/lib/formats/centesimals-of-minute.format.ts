import { Injectable } from '@angular/core';
import Decimal from 'decimal.js';

import { ValueFormat } from './value.format';

@Injectable()
export class CentesimalsOfMinuteFormat extends ValueFormat {
  match(mask: string): boolean {
    return ["&#'##", "&&#'##", "&&&#'##", "&&&&#'##"].includes(mask);
  }

  override toText(value: number, mask: string): string {
    if (!this.match(mask)) {
      return super.toText(value, mask);
    }

    const abs = new Decimal(value).abs();
    const decPart = abs.sub(abs.floor()).mul(60);

    let hours = abs.floor();
    let minutes = decPart.floor();
    let seconds = decPart.sub(minutes).mul(60).toDP(0);

    if (seconds.eq(60)) {
      minutes = minutes.add(1);
      seconds = new Decimal(0);
    }

    if (minutes.eq(60)) {
      hours = hours.add(1);
      minutes = new Decimal(0);
    }

    return (
      (value < 0 ? '-' : '') +
      hours.mul(60).add(minutes).toString().padStart(1, '0') +
      "'" +
      seconds.mul(10).div(6).floor().toString().padStart(2, '0')
    );
  }

  override toValue(text: string, mask: string): number {
    if (!this.match(mask)) {
      return super.toValue(text, mask);
    }

    const parts = text.split("'");
    const minutes = parts[0]?.trim() || '0';
    const centesimals = parts[1]?.trim() || '0';

    const value = new Decimal(minutes)
      .add(new Decimal(centesimals).div(100))
      .div(60);

    return value.toNumber();
  }
}
