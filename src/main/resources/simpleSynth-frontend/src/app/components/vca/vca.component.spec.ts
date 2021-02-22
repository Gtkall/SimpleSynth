import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCAComponent } from './vca.component';

describe('VCAComponent', () => {
  let component: VCAComponent;
  let fixture: ComponentFixture<VCAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VCAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
