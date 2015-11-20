import { Graphics } from 'pixi.js';

import NumberUtils from '../utils/number-utils'

class City extends Graphics {
    constructor(scene, frequencyData) {

        super();

        this.scene = scene;
        this.frequencyData = frequencyData;

        // Divider should be a 2pow number, because FrequencyData has 1024 values
        this.divider = 16;
        this.numberOfBars = 1024 / this.divider;
    }

    update() {

        // Set the bars width in the update so it can update on resize of window
        this.barsWidth = window.innerWidth / this.numberOfBars;

        this.clear();
        this.stepX = 0;

        this.beginFill(0x000000);

        for (var i = 0; i <= this.numberOfBars; i++) {

            // The more intense is the frequency, the less high will be the black bar
            var height = -(window.innerHeight - (this.frequencyData[i + this.divider] * 2.5));

            this.drawRect(this.stepX, window.innerHeight, this.barsWidth, height);

            this.stepX += this.barsWidth;
        }

        this.endFill();
    }
}

export default City