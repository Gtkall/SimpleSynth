// tslint:disable: typedef-whitespace
export interface ADSRoptions {
    attack?:  TimeEncapValue;
    decay?:   TimeEncapValue;
    sustain?: TimeEncapValue;
    release?: TimeEncapValue;
}

export interface TimeEncapValue {
    startingValue?: number;
    duration?:      number;
}
