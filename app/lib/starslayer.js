import { Container } from 'pixi.js';

import Star from './star'
import Utils from '../utils/number-utils'

class StarsLayer extends Container {
    constructor(nbStars) {

        super();

        this.nbStars = nbStars;
        this.alpha = 0;
        this.isVisible = false;
        this.addStarsToLayer();

    }

    addStarsToLayer() {
        for (let j = 0; j < this.nbStars; j++) {
            var star = new Star();
            this.addChild(star);
        }
    }

}

export default StarsLayer