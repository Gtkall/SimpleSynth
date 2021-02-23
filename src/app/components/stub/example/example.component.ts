import { Component, OnInit } from '@angular/core';
import { makeid } from 'src/app/utils/random-alphanumeric';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  randomId: string = makeid(12);

  constructor() { }

  ngOnInit(): void {
  }

}
