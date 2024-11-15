import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginForm } from '../../forms/login.form';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class LoginFormComponent {
  loginForm = inject(LoginForm);

  login = outputFromObservable(this.loginForm.login$);
}
