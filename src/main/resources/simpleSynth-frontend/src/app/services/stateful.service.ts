import { ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateChangeByID, StatefulEvent } from '../interfaces/stateful.interface';

@Injectable()
export class StatefulService {

  // Observable stateful event source
  private statefulEventSource = new Subject<StateChangeByID>();

  statefulEvent$ = this.statefulEventSource.asObservable();

  constructor() { }

  /**
   * Emits a tuple of event change, respective to the component reference
   * @param componentRef the component reference of which the state change has happened
   * @param statefulEvent the type of event
   */
  emitStateChange(payload: StateChangeByID): void {
    this.statefulEventSource.next(payload);
  }
}
