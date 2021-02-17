import { ComponentRef } from "@angular/core";

export const enum state {
    CONSTRUCTED,
    INITIALIZED
}

export type StatefulEvent = 'close' | 'window' | 'minimize' | 'maximize' | 'move_left' | 'move_right';

export type WindowState = 'closed' | 'windowed'| 'minimized' | 'maximized';

export type StateChangeByID = {
    id: string;
    stateChange: StatefulEvent;
};
export interface Stateful {

    state: state;

    getState(): state;
    setState(state: state): void;
}
