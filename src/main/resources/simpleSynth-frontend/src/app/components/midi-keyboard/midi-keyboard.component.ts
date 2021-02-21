import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AudioNodeLike } from 'src/app/interfaces/audio-node-like.interface';
import { DataBindable } from 'src/app/interfaces/data-bindable.interface';
import { CustomKeyboardNode } from 'src/app/models/keyboard-node';
import { Keyboard } from 'src/app/models/keyboard.model';
import { MultiAudioNode } from 'src/app/models/multi-audio-node';
import { NodeLikeComponent } from 'src/app/models/node-like-component';
import { makeid } from 'src/app/utils/random-alphanumeric';

@Component({
  selector: 'app-midi-keyboard',
  templateUrl: './midi-keyboard.component.html',
  styleUrls: ['./midi-keyboard.component.css'],
})
export class MidiKeyboardComponent
  extends NodeLikeComponent
  implements OnInit, OnChanges {
  @Input() data = this.data;

  readonly id: string = makeid(6);
  keyboard: Keyboard;


  constructor() {
    super(new CustomKeyboardNode(new AudioContext()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.node = new CustomKeyboardNode(this.data.context);
    console.log(changes);

  }

  ngOnInit(): void {
    // initialize a model kbd to display
    this.keyboard = new Keyboard(1, 'sine');
    this.node = new CustomKeyboardNode(this.data.context);
  }

  onKeyPressed(e: Event, key: [string, number]): void {
    // tslint:disable-next-line: no-bitwise
    if ((e as MouseEvent).buttons & 1 ) {
      (this.node as CustomKeyboardNode).playNote(key[0]);
    }
  }

  onKeyReleased(): void {
    (this.node as CustomKeyboardNode).stopPlaying();
  }

  onWaveformChanged(waveform: any): void {
    (this.node as CustomKeyboardNode).changeWaveform(waveform.value);
  }

  onVolumeChanged(volume: number): void {
    (this.node as CustomKeyboardNode).changeVolume(volume);
  }
}
