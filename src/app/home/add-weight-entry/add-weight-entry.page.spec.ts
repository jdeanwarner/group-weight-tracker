import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddWeightEntryPage } from './add-weight-entry.page';

describe('AddWeightEntryPage', () => {
  let component: AddWeightEntryPage;
  let fixture: ComponentFixture<AddWeightEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
