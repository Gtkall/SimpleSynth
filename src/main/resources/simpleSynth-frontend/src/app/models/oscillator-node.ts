import { MultiAudioNode } from "./multi-audio-node";

export class CustomOscillatorNode extends MultiAudioNode {

    private osc: OscillatorNode;

    constructor(context: AudioContext | BaseAudioContext) {
        super(context.createAnalyser(), context.createAnalyser());
        this.osc = context.createOscillator();
        this.osc.start();
    }

    startPlaying(): void {
        this.osc.connect(this.outputNode);
    }

    stopPlaying(): void {
        this.osc.disconnect();
    }

    public set frequency(frequency: number) {
        this.osc.frequency.value = frequency;
    }

    public set type(type: OscillatorType) {
        this.osc.type = type;
    }
}
