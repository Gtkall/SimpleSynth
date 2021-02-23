import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NodeLikeComponent } from 'src/app/models/node-like-component';
import { VCANode } from 'src/app/models/vca-node';

@Component({
  selector: 'app-vca',
  templateUrl: './vca.component.html',
  styleUrls: ['./vca.component.css'],
})
export class VCAComponent
  extends NodeLikeComponent
  implements OnInit, OnChanges, OnDestroy {
  constructor() {
    super(new VCANode(new AudioContext()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.node = new VCANode(this.data.context);
  }

  ngOnDestroy(): void {
    (this.node as VCANode).outputNode.disconnect();
  }

  ngOnInit(): void {
    this.node = new VCANode(this.data.context);
  }

  onVolumeChanged(volume: number): void {
    (this.node as VCANode).gain = volume;
  }
}
