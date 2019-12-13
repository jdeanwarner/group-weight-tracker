import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinedPage } from './joined.page';

describe('JoinedPage', () => {
  let component: JoinedPage;
  let fixture: ComponentFixture<JoinedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
