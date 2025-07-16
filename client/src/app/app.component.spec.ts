import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/services';
import { Store } from '@ngrx/store';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getToken']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Store, useValue: mockStore }
      ]
    });

    component = new AppComponent(mockStore, mockAuthService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('User Management App');
  });

  it('should initialize auth state when token exists', () => {
    mockAuthService.getToken.and.returnValue('mock-token');
    
    component.ngOnInit();
    
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should not initialize auth state when token does not exist', () => {
    mockAuthService.getToken.and.returnValue(null);
    
    component.ngOnInit();
    
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });
});
