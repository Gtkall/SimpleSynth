import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LFONode } from 'src/app/models/lfo-node';
import { NodeLikeComponent } from 'src/app/models/node-like-component';
import { makeid } from 'src/app/utils/random-alphanumeric';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.css'],
})
export class LFOComponent
  extends NodeLikeComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() data = this.data;

  readonly id: string = makeid(6);

  constructor() {
    super(new LFONode(new AudioContext()));
  }

  ngOnInit(): void {
    this.node = new LFONode(this.data.context);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.node = new LFONode(this.data.context);
  }

  ngOnDestroy(): void {
    (this.node as LFONode).outputNode.disconnect();
  }

  onSliderToggled(toggle: any): void {
    if (toggle.checked) {
      (this.node as LFONode).enable();
    } else {
      (this.node as LFONode).disable();
    }
  }

  onWaveformChanged(waveform: any): void {
    (this.node as LFONode).type = waveform.value;
  }

  onFrequencyChanged(freq: any): void {
    (this.node as LFONode).frequency = freq;
  }
}
