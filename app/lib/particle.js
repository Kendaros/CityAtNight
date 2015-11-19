import { Sprite, BLEND_MODES } from 'pixi.js';

class Particle extends Sprite {
    constructor(options){

        var texture = PIXI.Texture.fromImage("./assets/img/particle.png");

        super(texture);
        this.options = options;
        this.x = this.options.x;
        this.y = this.options.y;
        this.vx = this.options.acceleration;
        this.vy = this.options.acceleration;
        this.angle =  Math.floor(Math.random() * 360)+1;
        this.life = this.options.life;
        //this.beginFill('0xFFFFFF');
        this.size = Math.random()*2;
        //this.drawCircle(0, 0, this.size);

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;

        this.tint = 0x111111;
        this.blendMode = BLEND_MODES.ADD;

        this.isAlive = true;

    }

    move(dt){
        this.x += Math.sin(this.angle * Math.PI/180) * this.vx;
        this.y += Math.cos(this.angle * Math.PI/180) * this.vy;
        if(this.life <= 100){
            this.alpha = (this.life/100);
        }
        this.life -= dt;


        if(this.life <= 0){
            this.isAlive = false;
        }
    }

    reset(options) {
        this.x = options.x;
        this.y = options.y;
        this.vx = this.options.acceleration;
        this.vy = this.options.acceleration;
        this.scaleFactor = Math.random() * this.options.scaleFactor;
        this.scale.x = this.scaleFactor;
        this.scale.y = this.scaleFactor;
        this.life = this.options.life;
        this.alpha = 1;

        this.isAlive = true;
    }
}

export default Particle