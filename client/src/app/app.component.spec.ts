import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/services';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getToken']);
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({}),
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('User Management App');
  });

  it('should initialize auth state when token exists', () => {
    mockAuthService.getToken.and.returnValue('mock-token');
    spyOn(component['store'], 'dispatch');
    
    component.ngOnInit();
    
    expect(component['store'].dispatch).toHaveBeenCalled();
  });
});
