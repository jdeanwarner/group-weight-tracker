import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightEntryPage } from './weight-entry.page';

describe('WeightEntryPage', () => {
  let component: WeightEntryPage;
  let fixture: ComponentFixture<WeightEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
