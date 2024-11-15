import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'ui-kit';

import { LoginFormFactory } from '../../factories/login-form.factory';
import { LoginForm } from '../../forms/login.form';
import { Credentials } from '../../models/auth.model';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AlertComponent, LoginFormComponent],
  providers: [
    LoginFormFactory,
    {
      provide: LoginForm,
      useFactory: (factory: LoginFormFactory): LoginForm => factory.create(),
      deps: [LoginFormFactory],
    },
  ],
})
export class LoginPageComponent {
  loginForm = inject(LoginForm);

  onLogin(credentials: Credentials): void {
    console.log(credentials);
  }

  onClose(): void {
    this.loginForm.errorMessage.set('');
  }
}
