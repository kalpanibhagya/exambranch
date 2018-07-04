import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepeatComponent } from './edit-repeat.component';

describe('EditRepeatComponent', () => {
  let component: EditRepeatComponent;
  let fixture: ComponentFixture<EditRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
