import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';

import { AlertType } from '../../models/alert.model';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  private i18nService = inject(I18nService);

  type = input<AlertType>('info');
  message = input<string>();
  close = output<void>();

  translatedMessage = computed(() => {
    if (this.message()) {
      return this.message();
    }

    // Default
    return this.i18nService.translate('ui.alert.message');
  });

  getClass(): string {
    const classes = {
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
    };

    return classes[this.type()];
  }

  onClick(): void {
    this.close.emit();
  }
}
