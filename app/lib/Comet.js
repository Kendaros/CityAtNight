import { Container } from 'pixi.js';

import Particle from './particle'

class Comet extends Container {
    constructor() {

        super();

        this.particles = [];
        this.pool = [];
        this.currentTime = 0;
        this.delayTime = 0;
        this.nb = 1000;
        this.cometLife = 3000;


//        var p1 = {
//            x: Math.random(),
//            y: Math.random()
//        };
//
//        var p2 = {
//            x: 40,
//            y: 40
//        };
//
//// angle in radians
//        var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
//
//// angle in degrees
//        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;



        this.options = {
            x: (Math.random() * window.innerWidth / 2) + window.innerWidth / 2,
            y: Math.random() * (window.innerHeight/4),
            life: 600,
            acceleration: 0.1,
            scaleFactor: 0.5
        };

        for (let i = 0; i < this.nb; i++) {
            let particle = new Particle(this.options);
            this.pool.push(particle);
        }
        this.throw(1);
    }

    getParticleFromPool() {
        let p = this.pool[0];
        p.reset(this.options);
        this.pool.splice(0, 1);
        return p;
    }

    returnParticleToPool(particle, index) {
        this.pool.push(particle);

        this.particles.splice(index, 1);
        this.removeChild(this.particles[index]);
    }

    throw(nb) {

        for (let i = 0; i < nb; i++) {
            let particle = this.getParticleFromPool();
            this.particles.push(particle);
            this.addChild(particle);
        }

    }

    update(dt) {


        //console.log("Moon Update", dt);

        this.move(dt);

        if (this.cometLife < 0) {
            this.alpha -= 0.1;
        }



        for (var i = 0; i < this.particles.length; i++) {

            this.particles[i].move(dt);

            if (this.currentTime > 50) {
                this.currentTime = 0;
                this.throw(10);
            }

            if (!this.particles[i].isAlive) {

                this.returnParticleToPool(this.particles[i], i);
            }
        }

        this.currentTime += dt;
        this.cometLife -= dt;
        this.delayTime += dt;

    }

    move(dt) {
        this.speed = 1;
        this.x -= this.speed;
    }

    pulse(dt) {

        for (let i = 0; i < 100; i++) {
            let particle = this.getParticleFromPool();
            particle.life = 4000;
            particle.vx = 1;
            particle.vy = 1;
            this.particles.push(particle);
            this.addChild(particle);
        }

    }

}

export default Comet