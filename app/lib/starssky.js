import { Container } from 'pixi.js';

import StarsLayer from './starslayer'
import Utils from '../utils/number-utils'

class StarsSky extends Container {
    constructor(scene) {

        super();

        this.currentTime = 0;

        this.scene = scene;
        this.nbLayers = 22;
        this.nbStars = 5;
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


            this.addLayer(0, 27500);
            this.addLayer(1, 28000);
            this.addLayer(2, 28450);
            this.addLayer(3, 30550);
            this.addLayer(4, 32680);

            //this.addLayer(5, 33600);
            //this.addLayer(6, 34020);
            //this.addLayer(7, 34450);
            //this.addLayer(8, 35320);
            //
            //this.addLayer(9, 35740);
            //this.addLayer(10, 37440);
            //this.addLayer(11, 41300);
            //this.addLayer(12, 42180);
            //
            //this.addLayer(13, 42650);
            //this.addLayer(14, 44260);
            //this.addLayer(15, 46400);
            //this.addLayer(16, 47330);
            //
            //this.addLayer(17, 47750);
            //this.addLayer(15, 48150);
            //this.addLayer(19, 49065);
            //this.addLayer(20, 49500);
            //
            //this.addLayer(21, 51200);

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