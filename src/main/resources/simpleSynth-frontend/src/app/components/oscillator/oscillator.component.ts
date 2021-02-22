import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Keyboard } from 'src/app/models/keyboard.model';
import { NodeLikeComponent } from 'src/app/models/node-like-component';
import { CustomOscillatorNode } from 'src/app/models/oscillator-node';
import notes from '../../json/note-freq.json';


@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.css'],
})
export class OscillatorComponent
  extends NodeLikeComponent
  implements OnInit, OnDestroy {

  isPlaying = false;

  constructor() {
    super(new CustomOscillatorNode(new AudioContext()));
  }
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.node = new CustomOscillatorNode(this.data.context);
  //   (this.node as CustomOscillatorNode).frequency = 440;
  // }
  
  ngOnInit(): void {
    this.node = new CustomOscillatorNode(this.data.context);
  }

  ngOnDestroy(): void {
    (this.node as CustomOscillatorNode).outputNode.disconnect();
  }

  onPlayButtonPressed(): void {
    if (!this.isPlaying) {
      (this.node as CustomOscillatorNode).startPlaying();
    } else {
      (this.node as CustomOscillatorNode).stopPlaying();
    }
    this.isPlaying = !this.isPlaying;
  }

  onWaveformChanged(waveform: any): void {
    (this.node as CustomOscillatorNode).type = waveform.value;
  }

  onDetuneChanged(detune: number): void {
    (this.node as CustomOscillatorNode).detune = detune;
  }
}
