import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';

import Music from './lib/music'
import City from './lib/city'
import Moon from './lib/moon'
import Comet from './lib/comet'
import StarsSky from './lib/starssky'
import EventEmitter from './lib/event-emitter'

import Backgrounds from './lib/backgrounds'

var john = 0;

class App {

    constructor() {

        EventEmitter.on('MUSIC_LOADED', this.onMusicLoaded.bind(this));

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();
        this.music = new Music("assets/sounds/lifeformed-sunbleach.mp3");

        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.view);

        this.drawBackgrounds();
        this.drawMoon();
        this.drawStars();
        this.drawCity();
        //this.drawComet();

        this.music.loadSound();

        this.timer = 0;

    }

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

        window.addEventListener('click', this.log.bind(this));

    }

    log() {
        console.log(john, this.stars.currentTime);

        john += 1;
    }


    /**
     * onResize
     * - Triggered when window is resized
     * @param  {obj} evt
     */
    onResize(evt) {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);
    }


    /**
     * update
     * - Triggered on every TweenMax tick
     */
    update() {

        //console.log("App update");

        this.music.analyser.getByteFrequencyData(this.music.frequencyData);

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        this.city.update();

        this.moon.update(this.DELTA_TIME);
        this.moon.move(this.DELTA_TIME);

        this.stars.update(this.DELTA_TIME);

        //this.comet.update(this.DELTA_TIME);

        this.scene.render();

        this.timer += this.DELTA_TIME;

        this.backgrounds.update(this.timer);

    }

    drawCity() {

        this.city = new City(this.scene, this.music.frequencyData);
        this.scene.addChild(this.city);

    }

    drawStars() {

        this.stars = new StarsSky(this.scene);
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

        this.backgrounds = new Backgrounds();
        this.scene.addChild(this.backgrounds);
    }


}


export default App
