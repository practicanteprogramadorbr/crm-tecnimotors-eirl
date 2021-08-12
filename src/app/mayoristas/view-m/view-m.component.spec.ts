import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMComponent } from './view-m.component';

describe('ViewMComponent', () => {
  let component: ViewMComponent;
  let fixture: ComponentFixture<ViewMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
