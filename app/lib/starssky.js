import { Container } from 'pixi.js';

import StarsLayer from './starslayer'
import Utils from '../utils/number-utils'

class StarsSky extends Container {
    constructor(scene) {

        super();

        this.currentTime = 0;

        this.scene = scene;
        this.nbLayers = 22;
        this.nbStars = 3;
        this.starsLayers = [];

        for (var i = 0; i < this.nbLayers; i++) {
            var layer = new StarsLayer(this.nbStars);
            this.starsLayers.push(layer);
            this.scene.addChild(layer);
        }
    }

    update(dt) {

        this.currentTime += dt;

        for (let i = 0; i < this.starsLayers.length; i++) {

            this.starsLayers[i].move(dt, 0.1, Math.random());

            this.addLayer(0, 27300);
            this.addLayer(1, 28000);
            this.addLayer(2, 28550);
            this.addLayer(3, 30350);
            this.addLayer(4, 32400);

            this.addLayer(5, 33400);
            this.addLayer(6, 33820);
            this.addLayer(7, 34250);
            this.addLayer(8, 35120);

            this.addLayer(9, 35540);
            this.addLayer(10, 37240);
            this.addLayer(11, 41100);
            this.addLayer(12, 41980);

            this.addLayer(13, 42450);
            this.addLayer(14, 44060);
            this.addLayer(15, 46200);
            this.addLayer(16, 47130);

            this.addLayer(17, 47550);
            this.addLayer(15, 47950);
            this.addLayer(19, 48865);
            this.addLayer(20, 49000);

            this.addLayer(21, 51000);

        }
    }

    addLayer(layerIndex, time) {
        if (this.currentTime >= time && !this.starsLayers[layerIndex].isVisible) {
            this.starsLayers[layerIndex].alpha += 0.001;

            if (this.starsLayers[layerIndex].alpha == 1) {
                this.starsLayers[layerIndex].isVisible = true;
            }
        }
    }
}

export default StarsSky