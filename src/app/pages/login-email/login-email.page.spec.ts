import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginEmailPage } from './login-email.page';

describe('LoginEmailPage', () => {
  let component: LoginEmailPage;
  let fixture: ComponentFixture<LoginEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
