import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { User } from '../../models/auth.models';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import * as AuthActions from '../auth/store/auth.actions';
import {
  selectUser,
  selectUsers,
  selectIsAdmin,
  selectAuthLoading,
} from '../auth/store/auth.selectors';

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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
