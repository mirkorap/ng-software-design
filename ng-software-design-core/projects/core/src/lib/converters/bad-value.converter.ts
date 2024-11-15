import { Injectable } from '@angular/core';
import Decimal from 'decimal.js';

interface ValueFormat {
  toText(value: number): string;
  toValue(text: string): number;
}

@Injectable({
  providedIn: 'root',
})
export class BadValueConverter {
  private formats: Record<string, ValueFormat> = {
    "&#'###": {
      toText: this.toMillesimalsOfMinuteText,
      toValue: this.toMillesimalsOfMinuteValue,
    },
    "&&#'###": {
      toText: this.toMillesimalsOfMinuteText,
      toValue: this.toMillesimalsOfMinuteValue,
    },
    "&&&#'###": {
      toText: this.toMillesimalsOfMinuteText,
      toValue: this.toMillesimalsOfMinuteValue,
    },
    "&#'##": {
      toText: this.toCentesimalsOfMinuteText,
      toValue: this.toCentesimalsOfMinuteValue,
    },
    "&&#'##": {
      toText: this.toCentesimalsOfMinuteText,
      toValue: this.toCentesimalsOfMinuteValue,
    },
    "&&&#'##": {
      toText: this.toCentesimalsOfMinuteText,
      toValue: this.toCentesimalsOfMinuteValue,
    },
    "&&&&#'##": {
      toText: this.toCentesimalsOfMinuteText,
      toValue: this.toCentesimalsOfMinuteValue,
    },
    '&#d ##h': {
      toText: this.toShortDayText,
      toValue: this.toShortDayValue,
    },
  };

  toText(value: number, mask: string): string {
    try {
      return this.formats[mask].toText(value);
    } catch {
      return '';
    }
  }

  toValue(text: string, mask: string): number {
    try {
      return this.formats[mask].toValue(text);
    } catch {
      return 0;
    }
  }

  private toMillesimalsOfMinuteText(value: number): string {
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
      seconds.mul(100).div(6).floor().toString().padStart(3, '0')
    );
  }

  private toMillesimalsOfMinuteValue(text: string): number {
    const parts = text.split("'");
    const minutes = parts[0]?.trim() || '0';
    const millesimals = parts[1]?.trim() || '0';

    const value = new Decimal(minutes)
      .add(new Decimal(millesimals).div(1000))
      .div(60);

    return value.toNumber();
  }

  private toCentesimalsOfMinuteText(value: number): string {
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

  private toCentesimalsOfMinuteValue(text: string): number {
    const parts = text.split("'");
    const minutes = parts[0]?.trim() || '0';
    const centesimals = parts[1]?.trim() || '0';

    const value = new Decimal(minutes)
      .add(new Decimal(centesimals).div(100))
      .div(60);

    return value.toNumber();
  }

  private toShortDayText(value: number): string {
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

  private toShortDayValue(text: string): number {
    const parts = text.split(/[dh]+/);
    const days = parts[0]?.trim() || '0';
    const hours = parts[1]?.trim() || '0';

    const value = new Decimal(days).mul(24).add(new Decimal(hours));

    return value.toNumber();
  }
}
