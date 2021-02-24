import { MultiAudioNode } from './multi-audio-node';

export class VCANode extends MultiAudioNode {
  // tslint:disable-next-line: variable-name
  private _gainNode: GainNode;

  constructor(context: AudioContext | BaseAudioContext) {
    super(context.createAnalyser(), context.createAnalyser());
    this._gainNode = context.createGain();
    this.inputNode.connect(this._gainNode);
    this._gainNode.connect(this.outputNode);
  }

  // GETTERS - SETTERS

  public set gain(value: number) {
    this._gainNode.gain.value = value;
  }
}
