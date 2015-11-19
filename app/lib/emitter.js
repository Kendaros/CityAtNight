import { Container } from 'pixi.js';

import Particle from './particle'
import Utils from '../utils/number-utils'

class Emitter extends Container {
    constructor(frequencyData) {

        super();

        this.frequencyData = frequencyData;

        this.particles = [];
        this.pool = [];
        this.currentTime = 0;
        this.currentTimePulse = 0;
        this.pulseThreshold = 0;
        this.nb = 10000;

        this.options = {
            x: 200,
            y: window.innerHeight / 5
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

        for (var i = 0; i < this.particles.length; i++) {


            this.particles[i].move(dt);

            if (this.currentTime > 50) {
                this.currentTime = 0;
                this.throw(5);
            }

            if (!this.particles[i].isAlive) {

                this.returnParticleToPool(this.particles[i], i);
            }
        }

        var sumFrequency = 0;

        for (let i = 20; i < 40; i++) {

            sumFrequency += this.frequencyData[i];

        }

        this.averageFrequency = sumFrequency/20;
        //console.log(this.averageFrequency);

        //console.log(this.pulseThreshold);

        if(this.averageFrequency > 170 && this.currentTimePulse > 140/60*1000 && this.pulseThreshold >= 51000) {
            this.pulse(dt);
        }

        this.currentTime += dt;
        this.currentTimePulse += dt;
        this.pulseThreshold += dt;
    }

    move(dt) {
        this.speed = (window.innerWidth) / 180 / 180;
        this.x += this.speed;
    }


    pulse(dt) {

        for (let i = 0; i < 100; i++) {
            let particle = this.getParticleFromPool();
            particle.life = 4000;
            particle.vx = 6;
            particle.vy = 6;
            this.particles.push(particle);
            this.addChild(particle);
        }

        this.currentTimePulse = 0;
    }
}

export default Emitter