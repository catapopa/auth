import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import * as AuthActions from '../store/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  const initialState = {
    auth: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      users: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action on form submission', () => {
    spyOn(store, 'dispatch');
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        credentials: {
          email: 'test@example.com',
          password: 'password123',
        },
      })
    );
  });

  it('should not dispatch login action with invalid form', () => {
    spyOn(store, 'dispatch');
    component.loginForm.patchValue({
      email: '',
      password: '',
    });

    component.onSubmit();

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
