import { Component, OnInit } from '@angular/core';
import { ExampleComponent } from './components/stub/example/example.component';
import { Example2Component } from './components/stub/example2/example2.component';
import { ComponentItem } from './models/component-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

  }
}
