import { ComponentFactoryResolver, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnchorDirective } from 'src/app/directives/anchor.directive';
import { DataBindable } from 'src/app/interfaces/data-bindable.interface';
import { StatefulEvent, WindowState } from 'src/app/interfaces/stateful.interface';
import { ComponentItem } from 'src/app/models/component-item';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit, OnDestroy {

  @Input() componentItem: ComponentItem;
  // enforce only stateful custom events to be passed above (mock stateful presence)
  @Output() windowEvent: EventEmitter<StatefulEvent> = new EventEmitter();
  @ViewChild(AnchorDirective, {static: true}) appAnchorhost: AnchorDirective;

  componentRef: ComponentRef<DataBindable>;
  windowState: WindowState;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.componentItem) {
      // in case that window is instaciated from a template
      this.componentRef = this.loadComponent<DataBindable>(this.componentItem);
    }
    this.windowState = 'windowed';
  }

  ngOnDestroy(): void {

  }

  /**
   * Loads the component by instanciating a view inside the viewContainerRef of the
   * window component. Returns a reference to the component created.
   * @param componentItem the data class object out of which the factory will be created
   */
  loadComponent<T>(componentItem: ComponentItem): ComponentRef<T> {

    const componentFactory =
    this.componentFactoryResolver.resolveComponentFactory(componentItem.component);

    const viewContainerRef = this.appAnchorhost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<T>(componentFactory);
    return componentRef;
  }

  /**
   * - Toggle minimizes the window, by setting the display of the native element
   *   of the view container to 'none'value
   * - Sets the windowState to 'minimized'
   * - Emits proper statefulEvent above
   */
  onMinimize(): void {

    /**
     * TODO: this is a bad hack, it manipulates the DOM directly, Angular's DOM should
     * know about that first, and then render it itself
     */
    const el = this.appAnchorhost.viewContainerRef.element.nativeElement.parentElement;
    if (this.windowState !== 'minimized') {
      this.renderer.setStyle(el, 'display', 'none');
      this.windowState = 'minimized';
      this.windowEvent.emit('minimize');
    }
    else if (this.windowState === 'minimized') {
      this.renderer.removeStyle(el, 'display');
      this.windowState = 'windowed';
      this.windowEvent.emit('window');
    }
  }

  /**
   * - Clears the view conainer reference
   * - Emits proper statefulEvent above
   */
  onClose(): void {
    this.appAnchorhost.viewContainerRef.clear();
    this.windowState = 'closed';
    this.windowEvent.emit('close');
  }

  onMaximize(): void {
    const el = this.appAnchorhost.viewContainerRef.element.nativeElement.parentElement;
    if (this.windowState !== 'maximized') {
      // TODO: Possibly have this component take action for maximization?
      this.windowState = 'maximized';
      this.windowEvent.emit('maximize');
    }
    else if (this.windowState === 'maximized') {
      this.renderer.removeStyle(el, 'display');
      this.windowState = 'windowed';
      this.windowEvent.emit('window');
    }
  }

  onMove(direction: string): void {
    switch (direction) {
      case 'move_right':
        this.windowEvent.emit('move_right');
        break;
      case 'move_left':
        this.windowEvent.emit('move_left');
        break;
      default:
        break;
    }
  }

}
