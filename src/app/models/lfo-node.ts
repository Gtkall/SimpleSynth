import { MultiAudioNode } from './multi-audio-node';

export class LFONode extends MultiAudioNode {
  private osc: OscillatorNode;
  private gain: GainNode;
  private enabled: boolean;

  constructor(context: AudioContext | BaseAudioContext) {
    super(context.createAnalyser(), context.createAnalyser());
    this.osc = context.createOscillator();
    this.osc.frequency.value = 10;
    this.gain = context.createGain();
    this.osc.connect(this.gain.gain);
    this.enabled = true;
    this.inputNode.connect(this.gain);
    this.gain.connect(this.outputNode);
    this.osc.start();
  }

  enable(): void {
    if (!this.enabled) {
      this.osc.connect(this.gain.gain);
      this.enabled = true;
    }
  }

  disable(): void {
    if (this.enabled) {
      this.osc.disconnect(this.gain.gain);
      this.gain.gain.value = 1;
      this.enabled = false;
    }
  }

  public set frequency(frequency: number) {
    this.osc.frequency.value = frequency;
  }

  public set type(type: OscillatorType) {
    this.osc.type = type;
  }
}
