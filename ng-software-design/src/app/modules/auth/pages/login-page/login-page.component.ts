import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from 'ui-kit';

@Component({
  selector: 'app-login-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-page.component.html',
  imports: [ReactiveFormsModule, AlertComponent],
})
export class LoginPageComponent {
  private fb = inject(NonNullableFormBuilder);

  errorMessage = signal('');

  form = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please enter your username and password.');
      this.form.markAllAsTouched();

      return;
    }

    this.errorMessage.set('');
    console.log(this.form.value);
  }

  onClose(): void {
    this.errorMessage.set('');
  }
}
