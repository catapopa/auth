import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from './core/services';
import * as AuthActions from './features/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'User Management App';

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize authentication state if token exists
    const token = this.authService.getToken();
    if (token) {
      this.store.dispatch(AuthActions.initializeAuth({ token }));
    }
  }
}
