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
  title = 'simpleSynth-frontend';
  cmp: Array<ComponentItem>;
  
  ngOnInit(): void {
    this.cmp = new Array();
    this.cmp.push({component: ExampleComponent});
    this.cmp.push({component: Example2Component});
  }
}
