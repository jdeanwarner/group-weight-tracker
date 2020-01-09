import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginRequiredPage } from './login-required.page';

describe('LoginRequiredPage', () => {
  let component: LoginRequiredPage;
  let fixture: ComponentFixture<LoginRequiredPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRequiredPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRequiredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
