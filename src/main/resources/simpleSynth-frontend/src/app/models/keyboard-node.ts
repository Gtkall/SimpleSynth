import { KeyboardOptions } from '../interfaces/keyboard-options.interface';
import { Keyboard } from './keyboard.model';

export class KeyboardNode {

    private oscList: Map<string, OscillatorNode>;
    private outputNode: AnalyserNode;
    private gainNode: GainNode;
    private currentlyPlaying: string;


    constructor(context: AudioContext | BaseAudioContext, options?: KeyboardOptions) {
        this.oscList = new Map();
        this.outputNode = new AnalyserNode(context);
        this.gainNode = new GainNode(context);
        this.currentlyPlaying = '';

        this.gainNode.connect(this.outputNode);

        // if keys are provided
        if (options){
            if (options.key_freq){

                // initialize with given keys
                options.key_freq.forEach(([key, frequency]) => {
                    this.oscList.set(
                        key,
                        new OscillatorNode(context, {frequency, ...options}));
                    this.oscList.get(key).start();
                });
            }
        }

        // default initialization
        const keyboard = new Keyboard();

        keyboard.keys.forEach((frequency, key) => {
            this.oscList.set(
                key,
                new OscillatorNode(context, {frequency, ...options}));
            this.oscList.get(key).start();
        });

        // TODO: delet this
        console.log(this.oscList);


    }

    playNote(note: string): void {
        if (this.currentlyPlaying !== note) {
            this.oscList.get(note).connect(this.gainNode);
            this.currentlyPlaying = note;
        }
    }

    stopPlaying(): void {
        this.oscList.get(this.currentlyPlaying).disconnect();
        this.currentlyPlaying = '';
    }

    connect(dest: AudioNode): void {
        this.outputNode.connect(dest);
    }

    disconnect(): void {
        this.outputNode.disconnect();
    }


    changeVolume(volume: number): void {
        this.gainNode.gain.value = volume;
    }

    changeWaveform(waveform: OscillatorType): void {
        this.oscList.forEach(osc => {
            osc.type = waveform;
        });
    }
}
