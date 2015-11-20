import { Container } from 'pixi.js';

import Particle from './particle'

class Moon extends Container {
    constructor(frequencyData) {

        super();

        this.frequencyData = frequencyData;

        this.particles = [];
        this.pool = [];
        this.currentTime = 0;
        this.currentTimePulse = 0;
        this.pulseDelay = 0;
        this.nb = 2000; // This is the number of particles in the pool

        // SAFARI Compatibility
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            this.frequencyThreshold = 220;
        }
        else {
            this.frequencyThreshold = 200;
        }


        // These are the options for the particle
        this.options = {
            x: 200,
            y: window.innerHeight / 5,
            life: 2000,
            acceleration: 0.1,
            scaleFactor: 1.2
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

    /*
     Send particles by the emitter
     */
    throw(nb) {

        for (let i = 0; i < nb; i++) {
            let particle = this.getParticleFromPool();
            this.particles.push(particle);
            this.addChild(particle);
        }

    }

    update(dt) {

        //console.log(this.particles.length, this.pool.length);

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

        /*
         Check the average frequency intensity on frenquecies 0 to 20
         */

        var sumFrequency = 0;


        for (let i = 0; i < 20; i++) {
            sumFrequency += this.frequencyData[i];
        }

        this.averageFrequency = sumFrequency / 20;
        /*
         When it goes higher than the 200 threshold (255 being the highest), send a pulse, and set a little delay before being able to send a new pulse.
         */

        if (this.averageFrequency > this.frequencyThreshold && this.currentTimePulse > (10 / 60) * 1000 && this.pulseDelay >= 51000) {
            this.pulse();
        }

        this.currentTime += dt;
        this.currentTimePulse += dt;
        this.pulseDelay += dt;
    }

    move() {
        this.speed = (window.innerWidth) / 180 / 180;
        this.x += this.speed;
    }

    pulse() {

        for (let i = 0; i < 100; i++) {
            let particle = this.getParticleFromPool();
            // Setting the pulse particles
            particle.life = 4000;
            particle.vx = 6;
            particle.vy = 6;
            this.particles.push(particle);
            this.addChild(particle);
        }

        // Resetting the time for a new pulse
        this.currentTimePulse = 0;
    }
}

export default Moon