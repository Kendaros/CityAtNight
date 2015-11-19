import { Graphics } from 'pixi.js';

import NumberUtils from '../utils/number-utils'

class City extends Graphics {
    constructor(scene, frequencyData) {

        super();

        this.scene = scene;
        this.frequencyData = frequencyData;

        this.stepX = 0;

        this.divider = 16;
        this.numberOfBars = 1024/this.divider;

        this.beginFill(0x0c0c0c);

        this.drawRect(0, 0, 500, 500);

        this.endFill();

    }

    update() {


        this.barsWidth = window.innerWidth/this.numberOfBars;

        this.clear();
        this.stepX = 0;

        for (var i = 0; i <= this.numberOfBars; i++) {

            var height = -(window.innerHeight - (this.frequencyData[i+this.divider] * 2.5));

            this.beginFill(0x000000);

            this.drawRect(this.stepX, window.innerHeight, this.barsWidth, height);
            this.endFill();

            //this.beginFill(0xFFFFFF);
            //
            //
            //for ( let j = 0; j < 20; j ++) {
            //
            //    this.drawRect((this.stepX + this.barsWidth/2), window.innerHeight + height + 50, this.barsWidth/4, this.barsWidth/2 * Math.random());
            //
            //    height += 20;
            //
            //}
            //
            //this.endFill();

            this.stepX += this.barsWidth;
        }

        this.endFill();
    }
}

export default City