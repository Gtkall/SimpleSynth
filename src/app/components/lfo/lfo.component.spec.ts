import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LFOComponent } from './lfo.component';

describe('LFOComponent', () => {
  let component: LFOComponent;
  let fixture: ComponentFixture<LFOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LFOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LFOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
