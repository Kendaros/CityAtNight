import { Graphics } from 'pixi.js';

class Star extends Graphics {
    constructor() {

        super();

        this.alpha = 0;
        this.isVisible = false;
        this.currentTime = 0;

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.beginFill(0xFAFBCF)
        this.drawCircle(0, 0, 1);
        this.endFill();
    }

    move(dt, speed, scale) {

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