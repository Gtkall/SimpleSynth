export type AudioNodeMode = 'broadcast' | 'settings-only' | 'self-contained';
export type AudioMapNodeOptions = {
    id: string,
    mode: AudioNodeMode
};

export interface AudioMapNodeControl {

    readonly id: string;
    readonly mode: AudioNodeMode;

    // initialize the Audio Node
    init(id: string, mode: AudioNodeMode, options?: any): void | AudioNode;

    // Emit output depending on mode's mode
    emit(id: string, mode: AudioNodeMode, options?: any): void | AudioNode;

}
