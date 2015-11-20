import { Graphics } from 'pixi.js';

class Star extends Graphics {
    constructor(speed, scale) {

        super();

        this.alpha = 1;
        this.isVisible = true;
        this.currentTime = 0;
        this.speed = speed;
        this.scale.x = scale;
        this.scale.y = scale;

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight / 1.5;

        this.beginFill(0xFAFBCF);
        this.drawCircle(0, 0, 1);
        this.endFill();
    }

    move() {

        this.x -= this.speed;

        if (this.x <= 0) {
            this.x = window.innerWidth;
        }
    }
}

export default Star