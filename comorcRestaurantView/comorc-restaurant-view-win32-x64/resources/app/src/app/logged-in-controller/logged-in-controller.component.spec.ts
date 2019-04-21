import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInControllerComponent } from './logged-in-controller.component';

describe('LoggedInControllerComponent', () => {
  let component: LoggedInControllerComponent;
  let fixture: ComponentFixture<LoggedInControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
