import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiKeyboardComponent } from './midi-keyboard.component';

describe('MidiKeyboardComponent', () => {
  let component: MidiKeyboardComponent;
  let fixture: ComponentFixture<MidiKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidiKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
