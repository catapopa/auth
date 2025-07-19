import { Component, Input, Output, EventEmitter, OnInit, OnChanges, inject } from '@angular/core';
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

import * as AuthActions from '../../auth/store/auth.actions';
import { CreateUserDto, UpdateUserDto, User, UserRole } from '@auth/shared';

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
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private store = inject(Store);

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
