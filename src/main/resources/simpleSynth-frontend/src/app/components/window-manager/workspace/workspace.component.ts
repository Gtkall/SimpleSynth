import { Component, ComponentFactoryResolver, ComponentRef,
  EventEmitter, Input, OnInit, Output, ViewChild, ViewRef } from '@angular/core';
import { AnchorDirective } from 'src/app/directives/anchor.directive';
import { DataBindable } from 'src/app/interfaces/data-bindable.interface';
import { StateChangeByID, StatefulEvent } from 'src/app/interfaces/stateful.interface';
import { ComponentItem } from 'src/app/models/component-item';
import { StatefulService } from 'src/app/services/stateful.service';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  providers: [StatefulService]
})
export class WorkspaceComponent implements OnInit {

  @Input() componentsList: Array<ComponentItem>;
  @ViewChild(AnchorDirective, {static: true}) appAnchorHost: AnchorDirective;
  @Output() componentRefsUpdated: EventEmitter<Array<ComponentRef<any>>>
  = new EventEmitter();

  windows: Array<ComponentRef<WindowComponent>>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private statefulService: StatefulService ) {
    this.statefulService.statefulEvent$.subscribe(
      payload => this.onWindowStateChanged(payload)
    );
    this.windows = new Array();
  }

  ngOnInit(): void {

  }

  /**
   * - Dynamically creates a new window view, which houses the
   *   chosen component
   * - Updates the windows array
   * - Emits updated component references above
   * @param component the kind of component selected
   */
  onModuleSelected(component: ComponentItem): void {

    const windowRef = this.loadWindow();
    windowRef.instance.componentItem = component;
    this.windows.push(windowRef);

    this.updateComponentRefsFromWindowRefs(this.windows);

  }

  /**
   * Updates the component reference array, by looking where they are
   * positioned, based on the window reference array
   * @param windowRefs the window reference array
   */
  updateComponentRefsFromWindowRefs(windowRefs: Array<ComponentRef<any>>)
  : Array<ComponentRef<any>> {
    const componentRefs: typeof windowRefs = [];
    windowRefs.forEach((element) => {
      componentRefs.push(element.instance as ComponentRef<WindowComponent>);
    });

    this.componentRefsUpdated.emit(componentRefs);
    return componentRefs;
  }

  /**
   * Returns a new window instance reference
   */
  loadWindow(): ComponentRef<WindowComponent> {
    const windowFactory =
    this.componentFactoryResolver.resolveComponentFactory(WindowComponent);

    const viewContainerRef = this.appAnchorHost.viewContainerRef;

    const windowComponentRef =
    viewContainerRef.createComponent<WindowComponent>(windowFactory);

    return windowComponentRef;
  }

  /**
   * - Handles the window change state emited by the window child
   * @param payload the state-specific payload emited by the window
   */
  onWindowStateChanged(payload: StateChangeByID): void {

    switch (payload.stateChange) {
      case 'close':
        this.closeWindow(payload.id);
        break;
      case 'move_left':
        this.moveWindow(payload.id, 'move_left');
        break;
      case 'move_right':
        this.moveWindow(payload.id, 'move_right');
        break;
      default:
        break;
    }

  }

  /**
   * - Updates the window reference array
   * - Closes (destroys) a window, based on its ID
   * - Emits updated component reference array above
   * @param id the window ID
   */
  closeWindow(id: string): void {
    // pick up an array of the first occurence of the window specified by
    // the payload
    const windowIndex = this.windows.findIndex((value) => {
      return value.instance.id === id;
    });

    // remove it
    const window = this.windows.splice(windowIndex, 1);

    // destroy the instance
    window[0].destroy();

    // emit updated window array
    this.updateComponentRefsFromWindowRefs(this.windows);
  }

  moveWindow(id: string, direction: string): void {

    const windowIndex = this.windows.findIndex((window) => {
      return window.instance.id === id;
    });
    const temp = this.windows[windowIndex];
    const windowViewIndex = this.appAnchorHost.viewContainerRef.indexOf(temp.hostView);

    switch (direction) {
      case 'move_left':
        // out of bounds guard
        if (windowIndex !== 0) {

          // update the window reference array
          this.windows[windowIndex] = this.windows[windowIndex - 1];
          this.windows[windowIndex - 1] = temp;

          // update the view container reference array
          this.appAnchorHost.viewContainerRef.move(temp.hostView, windowViewIndex - 1);
        }
        break;
      case 'move_right':
        // out of bounds guard
        if (windowIndex !== this.windows.length - 1) {

          // update the window reference array
          this.windows[windowIndex] = this.windows[windowIndex + 1];
          this.windows[windowIndex + 1] = temp;

          // update the view container reference array
          this.appAnchorHost.viewContainerRef.move(temp.hostView, windowViewIndex + 1);
        }
        break;
      default:
        break;
    }

    // emit updated window array
    this.updateComponentRefsFromWindowRefs(this.windows);
  }

}
