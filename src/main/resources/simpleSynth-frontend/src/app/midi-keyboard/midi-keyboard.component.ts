import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AudioMapNodeControl, AudioNodeMode, AudioMapNodeOptions } from '../interfaces/audio-map-node-control.interface';
import { KeyboardOptions } from '../interfaces/keyboard-options.interface';
import { KeyboardNode } from '../models/keyboard-node';
import { Keyboard } from '../models/keyboard.model';

@Component({
  selector: 'app-midi-keyboard',
  templateUrl: './midi-keyboard.component.html',
  styleUrls: ['./midi-keyboard.component.css']
})
export class MidiKeyboardComponent implements OnInit, AudioMapNodeControl {

  @Input() readonly nodeOptions: AudioMapNodeOptions;
  @Output() nodeOutput: EventEmitter<OscillatorOptions> | EventEmitter<OscillatorNode>;

  id: string;
  mode: AudioNodeMode;
  keyboard: Keyboard;

  ctx: BaseAudioContext;
  kbdNode: KeyboardNode;


  constructor() {

  }

  /**
   * Initializes the component
   * @param id the node id
   * @param mode the mode by which the component will operate
   * @param options further initialization options
   */
  init(id: string,
       mode: AudioNodeMode = 'self-contained',
       options?: KeyboardOptions): void | AudioNode {
    this.id = id;
    this.mode = mode;
    this.keyboard = new Keyboard(1 , 'sine');
    this.ctx = new (AudioContext || BaseAudioContext)();
    if (options) {
      if (options.volume) {
        this.keyboard.volume = options.volume;
      }
    }
    switch (mode) {
      case 'broadcast':

        break;
      case 'self-contained':
        this.kbdNode = new KeyboardNode(this.ctx);
        this.kbdNode.connect(this.ctx.destination);
        break;
      case 'settings-only':

        break;
      default:
        break;
    }
  }

  emit(options?: {}): void | AudioNode {

  }

  ngOnInit(): void {
    this.init(Math.random().toString(), 'self-contained');

  }

  onKeyPressed(e: Event, key: [string, number]): void {

    // tslint:disable-next-line: no-bitwise
    if ((e as MouseEvent).buttons & 1 ) {

      switch (this.mode) {
        case 'broadcast':

          break;
          case 'self-contained':
          this.kbdNode.playNote(key[0]);
          break;
        case 'settings-only':

          break;
        default:
          break;
      }
    }
  }

  onKeyReleased(e: Event, key: [string, number]): void {

    switch (this.mode) {
      case 'broadcast':

        break;
      case 'self-contained':
        this.kbdNode.stopPlaying();
        break;
      case 'settings-only':

        break;
      default:
        break;
    }

  }

  onVolumeChange(value: number): void {
    this.kbdNode.changeVolume(value);
  }

  onWaveformChange(event: any): void {
    this.kbdNode.changeWaveform(event.value);
  }
}
