export interface AudioNodeLike {

    connectOutputTo(outputNode: AudioNode): void;

    connectInputTo(inputNode: AudioNode): void;

}
