import { ValueFormat } from './value.format';

export class NullFormat extends ValueFormat {
  match(_: string): boolean {
    return true;
  }

  override toText(value: number, mask: string): string {
    if (!this.match(mask)) {
      return super.toText(value, mask);
    }

    return '';
  }

  override toValue(text: string, mask: string): number {
    if (!this.match(mask)) {
      return super.toValue(text, mask);
    }

    return 0;
  }
}
