import { Component, ComponentFactoryResolver, ComponentRef,
  EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AnchorDirective } from 'src/app/directives/anchor.directive';
import { DataBindable } from 'src/app/interfaces/data-bindable.interface';
import { ComponentItem } from 'src/app/models/component-item';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  @Input() componentsList: Array<ComponentItem>;
  @ViewChild(AnchorDirective, {static: true}) appAnchorHost: AnchorDirective;
  @Output() componentRefs: EventEmitter<Array<ComponentRef<DataBindable>>>
  = new EventEmitter();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }

  onModuleSelected(component: ComponentItem): void {
    const windowRef = this.loadWindow();
    windowRef.instance.componentItem = component;
    windowRef.instance.loadComponent<DataBindable>(component);
  }


  loadWindow(): ComponentRef<WindowComponent> {
    const windowFactory =
    this.componentFactoryResolver.resolveComponentFactory(WindowComponent);

    const viewContainerRef = this.appAnchorHost.viewContainerRef;

    const windowComponentRef =
    viewContainerRef.createComponent<WindowComponent>(windowFactory);
    windowComponentRef.instance.windowEvent.subscribe(this.appAnchorHost.eventPropagator);

    return windowComponentRef;
  }


}
