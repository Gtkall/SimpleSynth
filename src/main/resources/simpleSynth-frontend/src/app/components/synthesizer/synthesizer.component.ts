import { Component, OnInit } from '@angular/core';
import { ADSRoptions } from 'src/app/interfaces/adsr-options.interface';
import { ADSRNode } from 'src/app/models/adsr-node';
import { KeyboardNode } from '../../models/keyboard-node';
import { Keyboard } from '../../models/keyboard.model';

@Component({
  selector: 'app-synthesizer',
  templateUrl: './synthesizer.component.html',
  styleUrls: ['./synthesizer.component.css']
})
export class SynthesizerComponent implements OnInit {

  id: string;
  keyboard: Keyboard;

  ctx: BaseAudioContext;
  kbdNode: KeyboardNode;
  adsrNode: ADSRNode;
  adsrOptions: ADSRoptions;


  constructor() {

  }

  /**
   * Initializes the component
   * @param id the node id
   * @param options further initialization options
   */
  init(id: string, options?: any): void | AudioNode {
    this.id = id;
    this.keyboard = new Keyboard(1 , 'sine');
    this.ctx = new (AudioContext || BaseAudioContext)();
    if (options) {
      if (options.volume) {
        this.keyboard.volume = options.volume;
      }
    }
    this.kbdNode = new KeyboardNode(this.ctx);
    this.adsrNode = new ADSRNode(this.ctx);
    this.adsrOptions = {
      attack: {
        duration: 0.2,
        startingValue: 0.5
      },
      decay: {
        duration: 0.25,
        startingValue: 1
      },
      sustain: {
        duration: 0.5,
        startingValue: 0.1
      },
      release: {
        duration: 0.2,
        startingValue: 0.1
      }
    };
    this.kbdNode.connectOutputTo(this.adsrNode.inputNode);
    this.adsrNode.outputNode.connect(this.ctx.destination);
  }

  ngOnInit(): void {
    this.init(Math.random().toString());

  }

  onKeyPressed(e: Event, key: [string, number]): void {

    // tslint:disable-next-line: no-bitwise
    if ((e as MouseEvent).buttons & 1 ) {
      this.adsrNode.attack_decay_env(this.adsrOptions);
      this.kbdNode.playNote(key[0]);
    }
  }

  onKeyReleased(): void {
    this.adsrNode.release_env(this.adsrOptions);
    setTimeout(() => {
      this.kbdNode.stopPlaying();
      this.adsrNode.reset();
    }, this.adsrOptions.release.duration * 1000);
  }

  onVolumeChange(value: number): void {
    this.kbdNode.changeVolume(value);
  }

  onWaveformChange(event: any): void {
    this.kbdNode.changeWaveform(event.value);
  }
}
