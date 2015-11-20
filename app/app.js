import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';

import Music from './lib/music'
import City from './lib/city'
import Moon from './lib/moon'
//import Comet from './lib/comet'
import StarsSky from './lib/starssky'
import EventEmitter from './lib/event-emitter'

import Backgrounds from './lib/backgrounds'

// var clickTimer = 0; // This is a dev variable

class App {

    constructor() {

        // When the music is loaded, launch a callback
        EventEmitter.on('MUSIC_LOADED', this.onMusicLoaded.bind(this));

        this.scene = new Scene();
        // Here you put the music file path
        this.music = new Music("assets/sounds/lifeformed-sunbleach.mp3");

        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.view);


        this.drawBackgrounds();
        this.drawMoon();
        this.drawStars();
        this.drawCity();
        //this.drawComet();

        this.music.loadSound();

    }

    /*
     When the music is fully loaded, we can launch the timers and the animations
     */
    onMusicLoaded() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();
        this.addListeners();

    }

    /**
     * addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));

        //window.addEventListener('click', this.log.bind(this)); // DevTool
    }

    /**
     * onResize
     * - Triggered when window is resized
     * @param  {obj} evt
     */
    onResize(evt) {
        this.scene.resize(window.innerWidth, window.innerHeight);
    }


    /**
     * update
     * - Triggered on every TweenMax tick
     */
    update() {

        // This is the frequency analyser
        this.music.analyser.getByteFrequencyData(this.music.frequencyData);

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        this.city.update();

        this.moon.update(this.DELTA_TIME);
        this.moon.move();

        this.stars.update();
        this.backgrounds.update();

        this.scene.render();

    }

    drawCity() {

        this.city = new City(this.scene, this.music.frequencyData);
        this.scene.addChild(this.city);

    }

    drawStars() {

        this.stars = new StarsSky(this.scene, this.music);
        this.scene.addChild(this.stars);

    }

    drawMoon() {

        this.moon = new Moon(this.music.frequencyData);
        this.scene.addChild(this.moon);

    }

    drawComet() {

        this.comet = new Comet();
        this.scene.addChild(this.comet);

    }

    drawBackgrounds() {

        this.backgrounds = new Backgrounds(this.music);
        this.scene.addChild(this.backgrounds);
    }


    /*
     DevTool method
     */
    log() {
        console.log(clickTimer, this.stars.currentTime);
        clickTimer += 1;
    }


}


export default App
