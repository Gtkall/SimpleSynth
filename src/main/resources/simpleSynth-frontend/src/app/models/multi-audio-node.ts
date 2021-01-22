import { makeid } from '../utils/random-alphanumeric';

export abstract class MultiAudioNode {

    // tslint:disable: variable-name
    private readonly _id: string;
    private _inputNode: AudioNode;
    private _outputNode: AudioNode;


    constructor(input?: AudioNode, output?: AudioNode) {
        this._id = makeid(6);
        this._inputNode = input ?? null;
        this._outputNode = output ?? null;
    }


    public get id(): string {
        return this._id;
    }

    public get inputNode(): AudioNode {
        return this._inputNode;
    }

    public set inputNode(inputNode: AudioNode) {
        this._inputNode = inputNode;
    }

    public get outputNode(): AudioNode {
        return this._outputNode;
    }

    public set outputNode(outputNode: AudioNode) {
        this._outputNode = outputNode;
    }
}
