import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioMapNodeControl, AudioNodeMode, AudioMapNodeOptions } from '../interfaces/audio-map-node-control.interface';
import { KeyboardOptions } from '../interfaces/keyboard-options.interface';
import { state, Stateful } from '../interfaces/stateful.interface';
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

  constructor() {

  }

  init(id: string, mode: AudioNodeMode, options?: KeyboardOptions): void | AudioNode {
    this.id = id;
    this.mode = mode;
    this.keyboard = new Keyboard(1 , 'sine');
    if (options) {
      this.keyboard.volume = options.volume;
    }
    switch (mode) {
      case 'broadcast':

        break;
      case 'self-contained':

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
    this.init(this.nodeOptions.id, this.nodeOptions.mode);

  }

  onKeyPressed(e: Event, key: [string, number]): void {
    // tslint:disable-next-line: no-bitwise
    if ((e as MouseEvent).buttons & 1 ) {
      const mouseEvent = e as MouseEvent;
      
     }
  }

  onKeyReleased(e: any, key: [string, number]): void {

  }
}
