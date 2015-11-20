import { Graphics, Container } from 'pixi.js';

class Backgrounds extends Container {
    constructor(music) {

        super();

        this.music = music;

        this.circles = []; // array which contains all the Circles Graphics
        this.backgroundsToAnimate = []; // array of objects which contains all backgrounds
        this.backgroundColor = 0x01022a; // default background Color

        /*
         This is the Timeline of our animation (backgrounds)
         */
        this.addRandomBackground(58200);
        this.addRandomBackground(58600);
        this.addRandomBackground(59000);
        this.addResetBackground(59400);

        this.addRandomBackground(66800);
        this.addRandomBackground(67260);
        this.addRandomBackground(67700);
        this.addResetBackground(68160);

        this.addRandomBackground(71860);
        this.addRandomBackground(72340);
        this.addRandomBackground(72780);
        this.addRandomBackground(73240);

        this.addRandomBackground(80560);
        this.addRandomBackground(81000);
        this.addRandomBackground(81460);
        this.addResetBackground(81910);

        this.addRandomBackground(85620);
        this.addRandomBackground(86040);
        this.addRandomBackground(86460);
        this.addRandomBackground(86890);

        this.addRandomBackground(94260);
        this.addRandomBackground(94760);
        this.addRandomBackground(95160);
        this.addRandomBackground(95600);

        this.addRandomBackground(99280);
        this.addRandomBackground(99762);
        this.addRandomBackground(100200);
        this.addResetBackground(100630);

        this.addRandomBackground(107980);
        this.addRandomBackground(108500);
        this.addRandomBackground(108980);
        this.addResetBackground(109410);

        this.addRandomBackground(140500);
        this.addRandomBackground(141000);
        this.addRandomBackground(141450);
        this.addRandomBackground(141900);

        this.addRandomBackground(148920);
        this.addRandomBackground(149500);
        this.addRandomBackground(149900);
        this.addResetBackground(150320);

        this.addRandomBackground(154320);
        this.addRandomBackground(154780);
        this.addRandomBackground(155200);
        this.addRandomBackground(155730);

        this.addRandomBackground(162750);
        this.addRandomBackground(163300);
        this.addRandomBackground(163800);
        this.addResetBackground(164230);

        this.addRandomBackground(167840);
        this.addRandomBackground(168320);
        this.addRandomBackground(168770);
        this.addResetBackground(169200);
    }

    update() {

        this.currentTime = this.music.getMusicCurrentTime();

        /*
         Always check Timer and if we should animate a background or not
         */
        for (let i = 0; i < this.backgroundsToAnimate.length; i++) {

            if (this.currentTime > this.backgroundsToAnimate[i].startTime && !this.backgroundsToAnimate[i].played) {

                this.backgroundsToAnimate[i].played = true; // Flagging a background to played so it can be deleted
                this.animateBackground(this.backgroundsToAnimate[i].color);

            }

        }

    }

    /*
     Add a random color background
     */
    addRandomBackground(timer) {

        var background = {

            startTime: timer,
            color: Math.random() * 0xFFFFFF,
            played: false

        };

        this.backgroundsToAnimate.push(background);

    }

    /*
     Add a color background set on default's one
     */
    addResetBackground(timer) {

        var background = {

            startTime: timer,
            color: this.backgroundColor,
            played: false

        };

        this.backgroundsToAnimate.push(background);

    }

    /*
     Launch the animation of the Background selected
     */
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

    /*
     Remove the background when its animation is completed
     */
    onBackgroundAnimationComplete() {


        if (this.circles.length > 1) {
            this.removeChild(this.circles[0]);
            this.circles.shift();
        }

    }


}

export default Backgrounds