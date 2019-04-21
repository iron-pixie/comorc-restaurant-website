import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRecordComponent } from './individual-record.component';

describe('IndividualRecordComponent', () => {
  let component: IndividualRecordComponent;
  let fixture: ComponentFixture<IndividualRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
