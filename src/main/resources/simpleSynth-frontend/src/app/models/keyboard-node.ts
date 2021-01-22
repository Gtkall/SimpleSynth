import { MultiAudioNode } from './multi-audio-node';
import { Keyboard } from './keyboard.model';
import { AudioNodeLike } from '../interfaces/audio-node-like.interface';

export class KeyboardNode extends MultiAudioNode implements AudioNodeLike {


    // tslint:disable: variable-name
    private _oscList: Map<string, OscillatorNode>;
    private _gainNode: GainNode;
    private _currentlyPlaying: string;


    constructor(context: AudioContext | BaseAudioContext, options?: any) {
        super();
        this._oscList = new Map();
        this.outputNode = new AnalyserNode(context);
        this._gainNode = new GainNode(context);
        this._currentlyPlaying = '';

        this._gainNode.connect(this.outputNode);

        // if keys are provided
        if (options){
            if (options.key_freq){

                // initialize with given keys
                options.key_freq.forEach(([key, frequency]) => {
                    this._oscList.set(
                        key,
                        new OscillatorNode(context, {frequency, ...options}));
                    this._oscList.get(key).start();
                    });
                }
            }

            // default initialization
        const keyboard = new Keyboard();

        keyboard.keys.forEach((frequency, key) => {
            this._oscList.set(
                key,
                new OscillatorNode(context, {frequency, ...options}));
            this._oscList.get(key).start();
        });
    }


    playNote(note: string): void {
        if (this.currentlyPlaying !== note) {
            this._oscList.get(note).connect(this._gainNode);
            this._currentlyPlaying = note;
        }
    }

    stopPlaying(): void {
        this._oscList.get(this.currentlyPlaying).disconnect();
        this._currentlyPlaying = '';
    }

    connectOutputTo(outputNode: AudioNode): void {
        this.outputNode.connect(outputNode);
    }

    connectInputTo(inputNode: AudioNode): void {
        inputNode.connect(this.inputNode);
        // FIXME: does nothing
    }

    inputNodeRef(): AudioNode {
        return this.outputNode;
    }

    outputNodeRef(): AudioNode {
        return this.outputNode;
    }

    disconnect(): void {
        this.outputNode.disconnect();
    }


    changeVolume(volume: number): void {
        this._gainNode.gain.value = volume;
    }

    changeWaveform(waveform: OscillatorType): void {
        this._oscList.forEach(osc => {
            osc.type = waveform;
        });
    }

    /** GETTERS / SETTERS */

    public get currentlyPlaying(): string {
        return this._currentlyPlaying;
    }
}
