import { Container } from 'pixi.js';

import Star from './star'

class StarsLayer extends Container {
    constructor(nbStars) {

        super();

        this.nbStars = nbStars;
        this.stars = [];
        this.alpha = 0;
        this.isVisible = false;
        this.addStarsToLayer();

    }

    addStarsToLayer() {
        for (let j = 0; j < this.nbStars; j++) {

            // Star Parameters: Speed, Scale
            var star = new Star(Math.random() * 0.3, Math.random() * 2);
            this.stars.push(star);
            this.addChild(star);
        }
    }

    move(dt, speed, scale) {
        for (let j = 0; j < this.stars.length; j++) {
            this.stars[j].move(dt, speed, scale);
        }
    }

}

export default StarsLayer