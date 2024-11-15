import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { AlertType } from '../../models/alert.model';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  type = input<AlertType>('info');
  message = input<string>();
  close = output<void>();

  translatedMessage = computed(() => {
    if (this.message()) {
      return this.message();
    }

    // Default
    return 'This is an example of alert';
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
