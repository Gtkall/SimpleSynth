import { ADSRoptions, TimeEncapValue } from '../interfaces/adsr-options.interface';
import { AudioNodeLike } from '../interfaces/audio-node-like.interface';
import { MultiAudioNode as MultiAudioNode } from './multi-audio-node';

export class ADSRNode extends MultiAudioNode implements AudioNodeLike {

    // tslint:disable: variable-name
    private _attack: TimeEncapValue;
    private _decay: TimeEncapValue;
    private _sustain: TimeEncapValue;
    private _release: TimeEncapValue;

    private gainNode: GainNode;

    constructor(context: AudioContext | BaseAudioContext, options?: ADSRoptions) {
        super();
        this.gainNode = new GainNode(context);
        this.inputNode = new AnalyserNode(context);
        this.outputNode = new AnalyserNode(context);

        this.inputNode.connect(this.gainNode);
        this.gainNode.connect(this.outputNode);

        if (options) {
            this.update_params(options);
        }
    }

    update_params(options: ADSRoptions): void {
        this._attack = options.attack ? options.attack : this._attack;
        this._decay = options.decay ? options.decay : this._decay;
        this._sustain = options.sustain ? options.sustain : this._sustain;
        this._release = options.release ? options.release : this._release;
    }

    connectOutputTo(outputNode: AudioNode): void {
        this.outputNode.connect(outputNode);
    }

    connectInputTo(inputNode: AudioNode): void {
        inputNode.connect(this.inputNode);
    }

    /**
     * Updates the Attack and Decay values for the next passthrough
     * of the ADSR envelope
     * @param options timeframe for the attack-decay effect
     */
    attack_decay_env(options: ADSRoptions): void {
        // cancel any remaining scheduled events
        const now = this.gainNode.context.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        // update params
        this.update_params(options);
        // prepare the gain node for ramp up
        this.gainNode.gain.setValueAtTime(this._attack.startingValue, now);
        // set attack
        const attackDuration = now + this._attack.duration;
        this.gainNode.gain.linearRampToValueAtTime(this._decay.startingValue, attackDuration);
        // set decay
        const decayDuration = attackDuration + this._decay.duration;
        this.gainNode.gain.linearRampToValueAtTime(this._sustain.startingValue, decayDuration);
    }

    release_env(options: ADSRoptions): void {
        // cancel any remaining scheduled events
        const now = this.gainNode.context.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        // update params
        this.update_params(options);
        // set release
        const releaseDuration = now + this._release.duration;
        this.gainNode.gain.linearRampToValueAtTime(0, releaseDuration);
    }

    reset(): void {
        this.gainNode.gain.cancelScheduledValues(this.gainNode.context.currentTime);
        this.gainNode.gain.value = 1;
    }

}
