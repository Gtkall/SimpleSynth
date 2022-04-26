import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestViewRef } from 'test/test-utils';
import { AppComponent } from '../app.component';
import { WindowComponent } from '../components/window-manager/window/window.component';
import { AnchorDirective } from './anchor.directive';

describe('AnchorDirective', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WindowComponent,
        AnchorDirective
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    const viewRef = new TestViewRef();
    const directive = new AnchorDirective(viewRef);
    expect(directive).toBeTruthy();
  });
});
