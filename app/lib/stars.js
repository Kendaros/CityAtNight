import { Container } from 'pixi.js';

import Star from './star'
import Utils from '../utils/number-utils'

class Stars extends Container {
    constructor(scene) {

        super();


        this.currentTime = 0;

        this.scene = scene;
        this.nb = 50;
        this.stars = [];
        this.stars2 = [];

        for (let i = 0; i < 50; i++) {
            var star = new Star();
            this.stars.push(star);
            this.scene.addChild(star);
        }

        for (let i = 0; i < 50; i++) {
            var star = new Star();
            this.stars2.push(star);
            this.scene.addChild(star);
        }
    }

    update(dt) {

        this.currentTime += dt;

        for (var i = 0; i < this.stars.length; i++) {
            this.stars[i].move(dt, 0.15, 2);

            if (this.currentTime >= 29000 && !this.stars[i].isVisible) {
                this.stars[i].alpha += 0.1;
                if (this.stars[i].alpha == 1) {
                    this.stars[i].isVisible = true;
                }
            }
        }

        for (var i = 0; i < this.stars2.length; i++) {
            this.stars2[i].move(dt, 0.1, 1);

            if (this.currentTime >= 31000 && !this.stars2[i].isVisible) {
                this.stars2[i].alpha += 0.1;
                if (this.stars2[i].alpha == 1) {
                    this.stars2[i].isVisible = true;
                }
            }
        }
    }
}

export default Stars