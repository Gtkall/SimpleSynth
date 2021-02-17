import { ComponentFactoryResolver, Output, EventEmitter, Renderer2, ChangeDetectorRef, ViewRef, OnChanges, SimpleChanges } from '@angular/core';
import { Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnchorDirective } from 'src/app/directives/anchor.directive';
import { DataBindable } from 'src/app/interfaces/data-bindable.interface';
import { StateChangeByID, StatefulEvent, WindowState } from 'src/app/interfaces/stateful.interface';
import { ComponentItem } from 'src/app/models/component-item';
import { StatefulService } from 'src/app/services/stateful.service';
import { makeid } from 'src/app/utils/random-alphanumeric';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit, OnDestroy, OnChanges {

  @Input() componentItem: ComponentItem;
  // enforce only stateful custom events to be passed above (mock stateful presence)
  @Output() windowStateChanged: EventEmitter<StateChangeByID> = new EventEmitter();
  @ViewChild(AnchorDirective, {static: true}) appAnchorhost: AnchorDirective;

  componentRef: ComponentRef<any>;
  windowState: WindowState = 'windowed';
  public readonly id: string = makeid(6);

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private renderer: Renderer2,
              private statefulService: StatefulService) { }

  ngOnInit(): void {
    if (this.componentItem) {
      // in case that window is instaciated from a template
      this.componentRef = this.loadComponent<DataBindable>(this.componentItem);
    }
  }

  ngOnDestroy(): void {

  }

  /**
   * Adds change detection whenever input is updated
   * @param changes the array containing all the changes that happened to the inputs
   * during this change detection cycle
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.componentRef = this.loadComponent(this.componentItem);
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
    this.componentRef = componentRef;
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
      this.windowStateChanged.emit({id: this.id, stateChange: 'minimize'});
    }
    else if (this.windowState === 'minimized') {
      this.renderer.removeStyle(el, 'display');
      this.windowState = 'windowed';
      this.windowStateChanged.emit({id: this.id, stateChange: 'window'});
    }
  }

  /**
   * - Clears the view conainer reference
   * - Emits proper statefulEvent above
   */
  onClose(): void {
    this.appAnchorhost.viewContainerRef.clear();
    this.windowState = 'closed';
    this.windowStateChanged.emit({id: this.id, stateChange: 'close'});
    const payload: StateChangeByID = {
      id: this.id,
      stateChange: 'close'
    };
    this.statefulService.emitStateChange(payload);
  }

  onMaximize(): void {
    const el = this.appAnchorhost.viewContainerRef.element.nativeElement.parentElement;
    if (this.windowState !== 'maximized') {
      // TODO: Possibly have this component take action for maximization?
      this.windowState = 'maximized';
      this.windowStateChanged.emit({id: this.id, stateChange: 'maximize'});
    }
    else if (this.windowState === 'maximized') {
      this.renderer.removeStyle(el, 'display');
      this.windowState = 'windowed';
      this.windowStateChanged.emit({id: this.id, stateChange: 'window'});
    }
  }

  onMove(direction: string): void {

    let payload: StateChangeByID;

    switch (direction) {
      case 'move_left':
        this.windowStateChanged.emit({id: this.id, stateChange: 'move_left'});
        payload = {
          id: this.id,
          stateChange: 'move_left'
        };
        this.statefulService.emitStateChange(payload);
        break;
      case 'move_right':
        this.windowStateChanged.emit({id: this.id, stateChange: 'move_right'});
        payload = {
          id: this.id,
          stateChange: 'move_right'
        };
        this.statefulService.emitStateChange(payload);
        break;
      default:
        break;
    }
  }

}
