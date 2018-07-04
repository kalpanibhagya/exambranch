import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRepeatComponent } from './delete-repeat.component';

describe('DeleteRepeatComponent', () => {
  let component: DeleteRepeatComponent;
  let fixture: ComponentFixture<DeleteRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
