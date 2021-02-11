import { Directive, EventEmitter, Output, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAnchorHost]'
})
export class AnchorDirective {

  @Output() eventPropagator: EventEmitter<any> = new EventEmitter();

  constructor(public viewContainerRef: ViewContainerRef) { }

}
