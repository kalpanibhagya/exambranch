import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndergraduateProfileComponent } from './undergraduate-profile.component';

describe('UndergraduateProfileComponent', () => {
  let component: UndergraduateProfileComponent;
  let fixture: ComponentFixture<UndergraduateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndergraduateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndergraduateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
