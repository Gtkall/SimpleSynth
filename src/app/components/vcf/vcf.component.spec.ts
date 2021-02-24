import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCFComponent } from './vcf.component';

describe('VCFComponent', () => {
  let component: VCFComponent;
  let fixture: ComponentFixture<VCFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VCFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VCFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
