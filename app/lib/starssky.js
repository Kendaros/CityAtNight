import { Container } from 'pixi.js';

import StarsLayer from './starslayer'

class StarsSky extends Container {
    constructor(scene, music) {

        super();

        this.currentTime = 0;

        this.scene = scene;
        this.music = music;

        this.nbLayers = 22;
        this.nbStars = 5;
        this.starsLayers = [];
        this.allLayersAreVisible = false;

        for (var i = 0; i < this.nbLayers; i++) {
            var layer = new StarsLayer(this.nbStars);
            this.starsLayers.push(layer);
            this.scene.addChild(layer);
        }

    }

    update() {

        this.currentTime = this.music.getMusicCurrentTime();

        for (let i = 0; i < this.starsLayers.length; i++) {

            this.starsLayers[i].move();

            /*
             Always check if we need to add a layer of stars to the sky. If all layers are set to visible, then never go in this loop again (it's good performance wise)
             */
            if (!this.allLayersAreVisible) {

                this.addLayer(0, 27200);
                this.addLayer(1, 28200);
                this.addLayer(2, 28550);
                this.addLayer(3, 30350);
                this.addLayer(4, 32400);
                this.addLayer(5, 33300);
                this.addLayer(6, 33720);
                this.addLayer(7, 34250);
                this.addLayer(8, 35120);
                this.addLayer(9, 35540);
                this.addLayer(10, 37240);
                this.addLayer(11, 41000);
                this.addLayer(12, 41980);
                this.addLayer(13, 42450);
                this.addLayer(14, 43960);
                this.addLayer(15, 46000);
                this.addLayer(16, 47130);
                this.addLayer(17, 47550);
                this.addLayer(15, 47950);
                this.addLayer(19, 48865);
                this.addLayer(20, 49000);
                this.addLayer(21, 51000);

            }

        }

    }

    /*
     When timing is good, add a layer of stars in order to make it visible
     */
    addLayer(layerIndex, time) {


        if (this.currentTime >= time && !this.starsLayers[layerIndex].isVisible) {

            this.starsLayers[layerIndex].alpha += 0.001;

            if (this.starsLayers[layerIndex].alpha == 1) {
                this.starsLayers[layerIndex].isVisible = true;
            }
        }

        if (this.currentTime >= 51100) {
            this.allLayersAreVisible = true;
        }
    }
}

export default StarsSky