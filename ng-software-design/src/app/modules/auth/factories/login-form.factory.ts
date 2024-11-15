import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { LoginForm } from '../forms/login.form';

@Injectable()
export class LoginFormFactory {
  private fb = inject(NonNullableFormBuilder);

  create(): LoginForm {
    const form = this.buildForm();

    return new LoginForm(form);
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }
}
