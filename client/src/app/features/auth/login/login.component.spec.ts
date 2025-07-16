import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockStore: jasmine.SpyObj<Store>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    formBuilder = new FormBuilder();
    
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    });

    component = new LoginComponent(formBuilder, mockStore);
    component.ngOnInit(); // Initialize the form
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should dispatch login action on form submission', () => {
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should not dispatch login action with invalid form', () => {
    component.loginForm.patchValue({
      email: '',
      password: '',
    });

    component.onSubmit();

    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
