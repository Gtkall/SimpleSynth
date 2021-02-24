import { MultiAudioNode } from './multi-audio-node';

export class VCFNode extends MultiAudioNode {
  // tslint:disable-next-line: variable-name
  private _filterNode: BiquadFilterNode;

  constructor(context: AudioContext | BaseAudioContext) {
    super(context.createAnalyser(), context.createAnalyser());
    this._filterNode = context.createBiquadFilter();
    this.inputNode.connect(this._filterNode);
    this._filterNode.connect(this.outputNode);
    this._filterNode.type = 'lowpass';
    this._filterNode.frequency.value = 5000;
    this._filterNode.Q.value = 50;
  }

  // GETTERS - SETTERS

  public set type(type: BiquadFilterType) {
    this._filterNode.type = type;
  }

  public set frequency(freq: number) {
    this._filterNode.frequency.value = freq;
  }

  public set Q(q: number) {
    this._filterNode.Q.value = q;
  }
}
