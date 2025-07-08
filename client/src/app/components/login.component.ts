import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import * as AuthActions from '../store/auth.actions';
import { selectAuthLoading, selectAuthError } from '../store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
  ],
  template: `
    <div class="login-container">
      <p-card header="Login" styleClass="login-card">
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              pInputText
              id="email"
              type="email"
              formControlName="email"
              class="w-full"
              [class.ng-invalid]="
                loginForm.get('email')?.invalid &&
                loginForm.get('email')?.touched
              "
            />
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <p-password
              id="password"
              formControlName="password"
              [feedback]="false"
              styleClass="w-full"
              [class.ng-invalid]="
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
            />
          </div>

          <p-message
            *ngIf="error$ | async as error"
            severity="error"
            [text]="error"
            styleClass="w-full mb-3"
          />

          <p-button
            type="submit"
            label="Login"
            styleClass="w-full"
            [loading]="loading$ | async"
            [disabled]="loginForm.invalid"
          />
        </form>

        <div class="mt-4 text-center">
          <small>
            <strong>Demo Credentials:</strong><br />
            Admin: admin&#64;example.com / admin123
          </small>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
      }

      .login-card {
        width: 100%;
        max-width: 400px;
      }

      .form-field {
        margin-bottom: 1rem;
      }

      .form-field label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      :host ::ng-deep .p-password input {
        width: 100%;
      }

      :host ::ng-deep .ng-invalid {
        border-color: #e24c4c;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(
        AuthActions.login({
          credentials: this.loginForm.value,
        })
      );
    }
  }
}
