export const enum state {
    CONSTRUCTED,
    INITIALIZED
}

export interface Stateful {

    state: state;

    getState(): state;
    setState(state: state): void;
}
