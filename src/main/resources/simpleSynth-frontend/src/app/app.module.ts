import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SynthesizerComponent } from './components/synthesizer/synthesizer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { WindowComponent } from './components/window-manager/window/window.component';
import { AnchorDirective } from './directives/anchor.directive';
import { WorkspaceComponent } from './components/window-manager/workspace/workspace.component';
import { ExampleComponent } from './components/stub/example/example.component';
import { Example2Component } from './components/stub/example2/example2.component';
import { MidiKeyboardComponent } from './components/midi-keyboard/midi-keyboard.component';
import { OscillatorComponent } from './components/oscillator/oscillator.component';
@NgModule({
  declarations: [
    AppComponent,
    SynthesizerComponent,
    WindowComponent,
    AnchorDirective,
    WorkspaceComponent,
    ExampleComponent,
    Example2Component,
    MidiKeyboardComponent,
    OscillatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCardModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
