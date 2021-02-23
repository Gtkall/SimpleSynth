import { Component, OnInit } from '@angular/core';
import { makeid } from 'src/app/utils/random-alphanumeric';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css']
})
export class Example2Component implements OnInit {

  randomId: string = makeid(12);

  constructor() { }

  ngOnInit(): void {
  }

}
