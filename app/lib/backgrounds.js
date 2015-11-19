import { Graphics, Container } from 'pixi.js';

const backgroundsToAnimate = [
    {
        startTime: 58300,
        //startTime: 1000,
        played: false,
        color: 0x21FCFF
    },
    {
        startTime: 58800,
        //startTime: 3000,
        played: false,
        color: 0xFFAEB0
    },
    {
        startTime: 59300,
        //startTime: 5000,
        played: false,
        color: 0x01022a
    },


    //{
    //    startTime: 58300,
    //    played: false,
    //    color: 0xff0000
    //},
    //{
    //    startTime: 58800,
    //    played: false,
    //    color: 0x00ff00
    //},
    //{
    //    startTime: 59300,
    //    played: false,
    //    color: 0x8e0093
    //}
]

class Backgrounds extends Container {
    constructor(scene) {

        super();

        this.scene = scene;

        this.circles = [];


    }

    update(timer) {

        for (let i = 0; i < backgroundsToAnimate.length; i++) {

            if (timer > backgroundsToAnimate[i].startTime && !backgroundsToAnimate[i].played) {
                backgroundsToAnimate[i].played = true;
                this.animateBackground(backgroundsToAnimate[i].color);
            }

        }


    }

    animateBackground(color) {

        var background = new Graphics();

        background.beginFill(color);
        background.drawCircle(0, 0, 50);
        background.endFill();

        background.x = window.innerWidth / 2;
        background.y = window.innerHeight;

        this.circles.push(background);

        TweenMax.to(background.scale, 2.5, {x: 40, y: 40, onComplete: this.onBackgroundAnimationComplete.bind(this)});

        this.addChild(background);

    }

    onBackgroundAnimationComplete() {


        if(this.circles.length > 1) {
            this.removeChild(this.circles[0]);
            this.circles.shift();


            console.log(this.children);
        }

    }


}

export default Backgrounds