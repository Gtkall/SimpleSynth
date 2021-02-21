import { AudioNodeLike } from '../interfaces/audio-node-like.interface';
import { MultiAudioNode } from './multi-audio-node';

export abstract class NodeLikeComponent implements AudioNodeLike {

    // down-cast data to specifically have an audio context for
    // node initialization
    data: {
        context: AudioContext | BaseAudioContext;
    };

    // tslint:disable-next-line: variable-name
    constructor(private _node: MultiAudioNode) {
        this.data = {context: new AudioContext()};
        this._node = _node;
     }

    /**
     * Connects this node's output to next node's input
     * @param next the node that will receive the input transmitted by this
     */
    connectOutputTo(next: NodeLikeComponent): void {
        this.node.outputNode.connect(next.node.inputNode);
    }

    /**
     * Connects the previous node's output to this node's input
     * @param previous the node that will transmit the output received by this
     */
    connectInputTo(previous: NodeLikeComponent): void {
        previous.node.outputNode.connect(this.node.inputNode);
    }

    /**
     * GETTERS - SETTERS
     */
    public get node(): MultiAudioNode {
        return this._node;
    }
    public set node(value: MultiAudioNode) {
        this._node = value;
    }

}
