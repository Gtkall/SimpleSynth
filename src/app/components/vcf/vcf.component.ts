import { OnChanges, SimpleChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NodeLikeComponent } from 'src/app/models/node-like-component';
import { VCFNode } from 'src/app/models/vcf-node';

@Component({
  selector: 'app-vcf',
  templateUrl: './vcf.component.html',
  styleUrls: ['./vcf.component.css'],
})
export class VCFComponent
  extends NodeLikeComponent
  implements OnInit, OnChanges, OnDestroy {
  constructor() {
    super(new VCFNode(new AudioContext()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.node = new VCFNode(this.data.context);
  }

  ngOnDestroy(): void {
    (this.node as VCFNode).outputNode.disconnect();
  }

  ngOnInit(): void {
    this.node = new VCFNode(this.data.context);
  }

  onTypeChanged(type: any): void {
    (this.node as VCFNode).type = type.value;
  }

  onFrequencyChanged(freq: number): void {
    (this.node as VCFNode).frequency = freq;
  }

  onQChanged(q: number): void {
    (this.node as VCFNode).Q = q;
  }
}
