import { Graphics } from 'pixi.js';

class Star extends Graphics {
    constructor() {

        super();

        this.alpha = 1;
        this.isVisible = true;
        this.currentTime = 0;

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight / 2;

        this.beginFill(0xFAFBCF);
        this.drawCircle(0, 0, 1);
        this.endFill();
    }

    move(dt, speed, scale) {

        //if (this.alpha < 1){
        //    this.alpha += 0.01;
        //}

        this.currentTime += dt;
        this.x -= speed;
        this.scaleX = scale;
        this.scaleY = scale;

        if (this.x <= 0) {
            this.x = window.innerWidth;
        }
    }
}

export default Star