import { Component, OnInit } from '@angular/core';
import { ExampleComponent } from './components/stub/example/example.component';
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
  }
}
