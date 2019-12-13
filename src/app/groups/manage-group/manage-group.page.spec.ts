import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageGroupPage } from './manage-group.page';

describe('ManageGroupPage', () => {
  let component: ManageGroupPage;
  let fixture: ComponentFixture<ManageGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
