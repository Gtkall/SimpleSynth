import { KeyboardOptions } from '../interfaces/keyboard-options.interface';
import { Keyboard } from './keyboard.model';

export class KeyboardNode {

    oscList: Map<string, OscillatorNode>;
    current: OscillatorNode;
    ctx: BaseAudioContext;

    constructor(context: BaseAudioContext, options?: KeyboardOptions) {
        this.oscList = new Map();
        this.ctx = context;

        // if keys are provided
        if (options.key_freq){

            // initialize with given keys
            options.key_freq.forEach((note) => {
                this.oscList.set(
                    note[0],
                    new OscillatorNode(context, {frequency: note[1], ...options}));
            });
        } else {

            // default initialization
            const keyboard = new Keyboard();

            keyboard.keys.forEach((freq, note) => {
                this.oscList.set(
                    note,
                    new OscillatorNode(context, {frequency: freq, ...options}));
            });
        }
    }

    playNote(note: string, freq?: number): void {
        if (this.oscList.has(note)) {
            this.current = this.oscList[note];
            this.current.start();
        } else {
            // add new oscillator and extrapolate the options from
            // one of osclist's pre-existing entries
            const osc = this.oscList.values().next().value;

            this.oscList.set(
                note,
                new OscillatorNode(
                    this.ctx,
                    {
                        frequency: freq
                    }
                ));
        }
    }

    connect(dest: AudioNode): void {
        this.current.connect(dest);
    }
}
