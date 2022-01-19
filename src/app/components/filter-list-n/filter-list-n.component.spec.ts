import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListNComponent } from './filter-list-n.component';

describe('FilterListNComponent', () => {
  let component: FilterListNComponent;
  let fixture: ComponentFixture<FilterListNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterListNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
