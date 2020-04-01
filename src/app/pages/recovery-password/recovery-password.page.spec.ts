import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecoveryPasswordPage } from './recovery-password.page';

describe('RecoveryPasswordPage', () => {
  let component: RecoveryPasswordPage;
  let fixture: ComponentFixture<RecoveryPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoveryPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
