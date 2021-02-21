import { Component, ComponentRef, OnInit } from '@angular/core';
import { ComponentItem } from 'src/app/models/component-item';
import { NodeLikeComponent } from 'src/app/models/node-like-component';
import { makeid } from 'src/app/utils/random-alphanumeric';
import { MidiKeyboardComponent } from '../midi-keyboard/midi-keyboard.component';
import { OscillatorComponent } from '../oscillator/oscillator.component';

@Component({
  selector: 'app-synthesizer',
  templateUrl: './synthesizer.component.html',
  styleUrls: ['./synthesizer.component.css'],
})
export class SynthesizerComponent implements OnInit {
  readonly id: string = makeid(6);
  ctx: AudioContext;
  inputList: ComponentItem[];

  inputRef: ComponentRef<NodeLikeComponent>;
  filterRefs: ComponentRef<NodeLikeComponent>[];
  componentRefs: ComponentRef<NodeLikeComponent>[];

  constructor() {
    this.ctx = new AudioContext();
  }

  ngOnInit(): void {
    this.inputList = [
      {
        component: MidiKeyboardComponent,
        data: { context: this.ctx },
      },
      {
        component: OscillatorComponent,
        data: { context: this.ctx },
      },
    ];
    this.filterRefs = [];
    this.componentRefs = [];

  }

  /**
   * - Connects the component references with one another
   * - finishes the connection at ctx.destination
   */
  connectNodes(): void {
    // this.inputRef.instance.connectOutputTo(
    //   // FIXME: must check for zero-length array
    //   this.filterRefs[0].instance
    // );

    // for (let index = 0; index < this.filterRefs.length - 1; index++) {
    //   this.filterRefs[index].instance.connectOutputTo(
    //     this.filterRefs[index + 1].instance
    //   );
    // }

    // // check if there are no filters, so that the synthesizer is always
    // // connected to a destination
    // if (this.filterRefs.length === 0) {
    //   this.inputRef.instance.node.outputNode.connect(this.ctx.destination);
    // } else {

    //   this.filterRefs[this.filterRefs.length - 1].instance.node.outputNode.connect(
    //     this.ctx.destination
    //   );
    // }

    this.componentRefs = [];
    this.componentRefs = this.componentRefs.concat(this.inputRef);
    this.componentRefs = this.componentRefs.concat(this.filterRefs);

    if (this.componentRefs.length > 0) {

      let index: number = 0;
      for (index; index < this.componentRefs.length - 1; index++) {
        this.componentRefs[index].instance.connectOutputTo(this.componentRefs[index + 1].instance);
      }
      
      this.componentRefs[index].instance.node.outputNode.connect(this.ctx.destination);
    }
  }

  onInputRefsUpdated(inputRefs: any): void {
    this.inputRef = inputRefs[0];
    this.connectNodes();
  }

  onFilterRefsUpdated(filterRefs: any): void {
    this.filterRefs = filterRefs;
    this.connectNodes();
  }
}
