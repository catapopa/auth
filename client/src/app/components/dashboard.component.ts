import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { User, UserRole } from '../models/auth.models';
import * as AuthActions from '../store/auth.actions';
import {
  selectUser,
  selectUsers,
  selectIsAdmin,
  selectAuthLoading,
} from '../store/auth.selectors';
import { UserDialogComponent } from './user-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    UserDialogComponent,
  ],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>User Management Dashboard</h1>
        <div class="header-actions">
          <span class="welcome-text">
            Welcome, {{ (currentUser$ | async)?.firstName }}
            {{ (currentUser$ | async)?.lastName }}!
          </span>
          <p-button
            label="Logout"
            icon="pi pi-sign-out"
            severity="secondary"
            (onClick)="logout()"
          />
        </div>
      </div>

      <p-card>
        <div class="table-header">
          <h3>Users</h3>
          <p-button
            *ngIf="isAdmin$ | async"
            label="Add User"
            icon="pi pi-plus"
            (onClick)="showCreateDialog()"
          />
        </div>

        <p-table
          [value]="(users$ | async) || []"
          [loading]="loading$ | async"
          styleClass="p-datatable-gridlines"
          [paginator]="true"
          [rows]="10"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th *ngIf="isAdmin$ | async">Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-user>
            <tr>
              <td>{{ user.firstName }} {{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>
                <p-tag
                  [value]="user.role"
                  [severity]="user.role === 'admin' ? 'danger' : 'info'"
                />
              </td>
              <td>
                <p-tag
                  [value]="user.isActive ? 'Active' : 'Inactive'"
                  [severity]="user.isActive ? 'success' : 'warning'"
                />
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
              <td *ngIf="isAdmin$ | async">
                <p-button
                  icon="pi pi-pencil"
                  severity="info"
                  size="small"
                  (onClick)="editUser(user)"
                  class="mr-2"
                />
                <p-button
                  icon="pi pi-trash"
                  severity="danger"
                  size="small"
                  (onClick)="deleteUser(user)"
                />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>

      <app-user-dialog
        [(visible)]="showDialog"
        [user]="selectedUser"
        [mode]="dialogMode"
        (userSaved)="onUserSaved()"
      />

      <p-toast />
      <p-confirmDialog />
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e9ecef;
      }

      .header h1 {
        margin: 0;
        color: #495057;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .welcome-text {
        font-weight: 500;
        color: #6c757d;
      }

      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .table-header h3 {
        margin: 0;
      }

      :host ::ng-deep .p-card .p-card-content {
        padding: 1.5rem;
      }

      :host ::ng-deep .p-datatable .p-datatable-tbody td {
        padding: 0.75rem 1rem;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  users$: Observable<User[]>;
  isAdmin$: Observable<boolean>;
  loading$: Observable<boolean>;

  showDialog = false;
  selectedUser: User | null = null;
  dialogMode: 'create' | 'edit' = 'create';

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectUser);
    this.users$ = this.store.select(selectUsers);
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.loading$ = this.store.select(selectAuthLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadUsers());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  showCreateDialog(): void {
    this.selectedUser = null;
    this.dialogMode = 'create';
    this.showDialog = true;
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.dialogMode = 'edit';
    this.showDialog = true;
  }

  deleteUser(user: User): void {
    // TODO: Add confirmation dialog
    this.store.dispatch(AuthActions.deleteUser({ id: user.id }));
  }

  onUserSaved(): void {
    this.showDialog = false;
    this.selectedUser = null;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }
}
