import { NodeLikeComponent } from '../models/node-like-component';

export interface AudioNodeLike {

    connectOutputTo(outputNode: NodeLikeComponent): void;

    connectInputTo(inputNode: NodeLikeComponent): void;

}
