import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradFilterComponent } from './dashborad-filter.component';

describe('DashboradFilterComponent', () => {
  let component: DashboradFilterComponent;
  let fixture: ComponentFixture<DashboradFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboradFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboradFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
