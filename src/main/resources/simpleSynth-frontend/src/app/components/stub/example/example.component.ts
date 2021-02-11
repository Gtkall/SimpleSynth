import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  randomNumber: number = Math.floor(Math.random() * 100);

  constructor() { }

  ngOnInit(): void {
  }

}
