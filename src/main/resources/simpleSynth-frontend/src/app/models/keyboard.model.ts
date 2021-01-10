import { Observable } from 'rxjs';
import notes from '../json/note-freq.json';

export class Keyboard {
    NOTES = '../json/note-freq.json';

    keys: Map<string, number>;
    volume = 1;
    waveform: OscillatorType = 'sine';

    constructor(volume?: number, waveform?: OscillatorType) {
        this.keys = new Map();
        this.volume = volume;
        this.waveform = waveform;
        this.init();
    }

    init(): Map<string, number> {
        const keys = Object.entries(notes);

        // initialize keyboard keys
        keys.forEach(key => {
            this.keys.set(key[0], key[1]);
        });
        return this.keys;
    }



}
