import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { signal } from '@angular/core';

import { Credentials } from '../models/auth.model';

export class LoginForm {
  errorMessage = signal('');

  private loginSource = new Subject<Credentials>();
  login$ = this.loginSource.asObservable();

  constructor(private form: FormGroup) {}

  get asFormGroup(): FormGroup {
    return this.form;
  }

  login(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please enter your username and password.');
      this.form.markAllAsTouched();

      return;
    }

    this.errorMessage.set('');
    this.loginSource.next(this.form.value);
  }
}
