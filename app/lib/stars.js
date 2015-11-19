import { Container } from 'pixi.js';

import Star from './star'
import Utils from '../utils/number-utils'

class Stars extends Container {
    constructor(scene) {

        super();


        this.currentTime = 0;

        this.scene = scene;
        this.nbPackages = 1;
        this.nbPerPackage = 200/this.nbPackages;
        this.stars = [];

        for (var i = 0; i < this.nbPackages; i++) {

            var stars = [];

            for (let j = 0; j < this.nbPerPackage; j++) {

                var star = new Star();
                stars.push(star);
                this.scene.addChild(star);
            }

            this.stars.push(stars);
        }
    }

    update(dt) {


        this.currentTime += dt;

        //console.log(this.currentTime);

        if(this.currentTime >= 2000) {
            console.log('add a new star');
            this.addStar();
            this.currentTime = 0;
        }

        for (let i = 0; i < this.nbPackages; i++) {

            for (let j = 0; j < this.nbPerPackage; j++) {
                this.stars[i][j].move(dt, 0.15, 2);
            }

        }

        //console.log("Stars update", this.currentTime);

        //for (var i = 0; i < this.stars.length; i++) {
        //    this.stars[i].move(dt, 0.15, 2);
        //
        //    if (this.currentTime >= 28500 && !this.stars[i].isVisible) {
        //        this.stars[i].alpha += 0.1;
        //        if (this.stars[i].alpha == 1) {
        //            this.stars[i].isVisible = true;
        //        }
        //    }
        //}
        //
        //for (var i = 0; i < this.stars2.length; i++) {
        //    this.stars2[i].move(dt, 0.1, 1);
        //
        //    if (this.currentTime >= 30500 && !this.stars2[i].isVisible) {
        //        this.stars2[i].alpha += 0.1;
        //        if (this.stars2[i].alpha == 1) {
        //            this.stars2[i].isVisible = true;
        //        }
        //    }
        //}
    }

    addStar() {
        var star = new Star();
        this.stars.push(star);
        this.scene.addChild(star);
    }
}

export default Stars