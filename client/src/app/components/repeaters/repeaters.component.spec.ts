import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatersComponent } from './repeaters.component';

describe('RepeatersComponent', () => {
  let component: RepeatersComponent;
  let fixture: ComponentFixture<RepeatersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
