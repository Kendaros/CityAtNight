import { Graphics } from 'pixi.js';

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

        this.beginFill(0x0c0c0c);

        for (var i = 0; i <= this.numberOfBars; i++) {

            this.drawRect(this.stepX, window.innerHeight, this.barsWidth, -(window.innerHeight - (this.frequencyData[i+this.divider] * 2.5)));
            this.stepX += this.barsWidth;
        }

        this.endFill();
    }
}

export default City