import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMComponent } from './list-m.component';

describe('ListMComponent', () => {
  let component: ListMComponent;
  let fixture: ComponentFixture<ListMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
