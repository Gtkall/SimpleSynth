import { MultiAudioNode } from './multi-audio-node';
import { Keyboard } from './keyboard.model';
import { AudioNodeLike } from '../interfaces/audio-node-like.interface';
import { TimeEncapValue } from '../interfaces/adsr-options.interface';

export class CustomKeyboardNode extends MultiAudioNode {
  // tslint:disable: variable-name
  private _oscList: Map<string, OscillatorNode>;
  private _gainNode: GainNode;
  private _currentlyPlaying: string;
  private _adsrOn: boolean;

  // tslint:disable: variable-name
  private _attack: TimeEncapValue = {
    duration: 0.5,
    startingValue: 0.1,
  };
  private _decay: TimeEncapValue = {
    duration: 0.5,
    startingValue: 1,
  };
  private _sustain: TimeEncapValue = {
    duration: 0.5,
    startingValue: 0.4,
  };
  private _release: TimeEncapValue = {
    duration: 0.5,
    startingValue: 0.4,
  };

  constructor(context: AudioContext | BaseAudioContext, options?: any) {
    super();
    this._oscList = new Map();
    this.outputNode = new AnalyserNode(context);
    this._gainNode = new GainNode(context);
    this._currentlyPlaying = '';
    this._adsrOn = false;

    this._gainNode.connect(this.outputNode);

    // if keys are provided
    if (options) {
      if (options.key_freq) {
        // initialize with given keys
        options.key_freq.forEach(([key, frequency]) => {
          this._oscList.set(
            key,
            new OscillatorNode(context, { frequency, ...options })
          );
          this._oscList.get(key).start();
        });
      }
    }

    // default initialization
    const keyboard = new Keyboard();

    keyboard.keys.forEach((frequency, key) => {
      this._oscList.set(
        key,
        new OscillatorNode(context, { frequency, ...options })
      );
      this._oscList.get(key).start();
    });
  }

  playNote(note: string): void {
    this._gainNode.gain.value = 1;
    if (this.currentlyPlaying !== note) {
      this._oscList.get(note).connect(this._gainNode);
      this._currentlyPlaying = note;
    }
    if (this.adsrOn){
        this.runAttackDelay();
    }

  }

  stopPlaying(): void {
    if (this.adsrOn){
        this.runSustainRelease();
        setTimeout(() => {
            this._oscList.get(this.currentlyPlaying).disconnect();
            this._currentlyPlaying = '';
            this._gainNode.gain.value = 1;
        }, this.release.duration * 1000 + 1);
    } else {
        this._oscList.get(this.currentlyPlaying).disconnect();
        this._currentlyPlaying = '';
        this._gainNode.gain.value = 1;
    }
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
    this._oscList.forEach((osc) => {
      osc.type = waveform;
    });
  }

  runAttackDelay(): void {
    // cancel any remaining scheduled events
    const now = this._gainNode.context.currentTime;
    this._gainNode.gain.cancelScheduledValues(now);
    // prepare the gain node for ramp up
    this._gainNode.gain.setValueAtTime(this._attack.startingValue, now);
    // set attack
    const attackDuration = now + this._attack.duration;
    this._gainNode.gain.linearRampToValueAtTime(this._decay.startingValue, attackDuration);
    // set decay
    const decayDuration = attackDuration + this._decay.duration;
    this._gainNode.gain.linearRampToValueAtTime(this._sustain.startingValue, decayDuration);
  }

  runSustainRelease(): void {
      // cancel any remaining scheduled events
      const now = this._gainNode.context.currentTime;
      this._gainNode.gain.cancelScheduledValues(now);
      // set release
      const releaseDuration = now + this._release.duration;
      this._gainNode.gain.linearRampToValueAtTime(0, releaseDuration);
  }

  /** GETTERS / SETTERS */

  public get currentlyPlaying(): string {
    return this._currentlyPlaying;
  }

  public get attack(): TimeEncapValue {
    return this._attack;
  }
  public set attack(value: TimeEncapValue) {
    this._attack = value;
  }
  public get decay(): TimeEncapValue {
    return this._decay;
  }
  public set decay(value: TimeEncapValue) {
    this._decay = value;
  }
  public get sustain(): TimeEncapValue {
    return this._sustain;
  }
  public set sustain(value: TimeEncapValue) {
    this._sustain = value;
  }
  public get release(): TimeEncapValue {
    return this._release;
  }
  public set release(value: TimeEncapValue) {
    this._release = value;
  }
  public get adsrOn(): boolean {
    return this._adsrOn;
  }
  public set adsrOn(value: boolean) {
    this._adsrOn = value;
  }
}
