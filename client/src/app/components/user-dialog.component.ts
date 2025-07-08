import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

// PrimeNG imports
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import {
  User,
  UserRole,
  CreateUserDto,
  UpdateUserDto,
} from '../models/auth.models';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
  ],
  template: `
    <p-dialog
      [header]="dialogTitle"
      [(visible)]="visible"
      [modal]="true"
      styleClass="user-dialog"
      [style]="{ width: '450px' }"
      (onHide)="onHide()"
    >
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label for="firstName">First Name</label>
          <input
            pInputText
            id="firstName"
            formControlName="firstName"
            class="w-full"
          />
        </div>

        <div class="form-field">
          <label for="lastName">Last Name</label>
          <input
            pInputText
            id="lastName"
            formControlName="lastName"
            class="w-full"
          />
        </div>

        <div class="form-field">
          <label for="email">Email</label>
          <input
            pInputText
            id="email"
            type="email"
            formControlName="email"
            class="w-full"
          />
        </div>

        <div class="form-field" *ngIf="mode === 'create'">
          <label for="password">Password</label>
          <p-password
            id="password"
            formControlName="password"
            [feedback]="false"
            styleClass="w-full"
          />
        </div>

        <div class="form-field">
          <label for="role">Role</label>
          <p-dropdown
            id="role"
            formControlName="role"
            [options]="roleOptions"
            optionLabel="label"
            optionValue="value"
            styleClass="w-full"
          />
        </div>

        <div class="form-field">
          <p-checkbox
            formControlName="isActive"
            [binary]="true"
            label="Active"
            id="isActive"
          />
        </div>

        <div class="dialog-footer">
          <p-button
            label="Cancel"
            severity="secondary"
            (onClick)="onCancel()"
            class="mr-2"
          />
          <p-button
            type="submit"
            [label]="mode === 'create' ? 'Create' : 'Update'"
            [disabled]="userForm.invalid"
          />
        </div>
      </form>
    </p-dialog>
  `,
  styles: [
    `
      .form-field {
        margin-bottom: 1rem;
      }

      .form-field label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 1.5rem;
      }

      :host ::ng-deep .p-password input {
        width: 100%;
      }

      :host ::ng-deep .user-dialog .p-dialog-content {
        padding: 1.5rem;
      }
    `,
  ],
})
export class UserDialogComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() user: User | null = null;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() userSaved = new EventEmitter<void>();

  userForm!: FormGroup;
  roleOptions = [
    { label: 'User', value: UserRole.USER },
    { label: 'Admin', value: UserRole.ADMIN },
  ];

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.userForm) {
      this.initForm();
    }
  }

  get dialogTitle(): string {
    return this.mode === 'create' ? 'Add New User' : 'Edit User';
  }

  initForm(): void {
    this.userForm = this.fb.group({
      firstName: [
        this.user?.firstName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.user?.lastName || '',
        [Validators.required, Validators.minLength(2)],
      ],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: [
        '',
        this.mode === 'create'
          ? [Validators.required, Validators.minLength(6)]
          : [],
      ],
      role: [this.user?.role || UserRole.USER, Validators.required],
      isActive: [this.user?.isActive ?? true],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      if (this.mode === 'create') {
        const createData: CreateUserDto = formValue;
        this.store.dispatch(AuthActions.createUser({ userData: createData }));
      } else if (this.user) {
        const updateData: UpdateUserDto = { ...formValue };
        if (!updateData.password) {
          delete updateData.password;
        }
        this.store.dispatch(
          AuthActions.updateUser({
            id: this.user.id,
            userData: updateData,
          })
        );
      }

      this.userSaved.emit();
    }
  }

  onCancel(): void {
    this.onHide();
  }

  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
