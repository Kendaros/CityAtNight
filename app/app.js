import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';

import Music from './lib/music'
import City from './lib/city'
import Emitter from './lib/emitter'
import Stars from './lib/stars'
import EventEmitter from './lib/event-emitter'

class App {

    constructor() {

        EventEmitter.on('MUSIC_LOADED', this.onMusicLoaded.bind(this));

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();
        this.music = new Music("assets/sounds/lifeformed-sunbleach.mp3");

        let root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.view);


        this.drawMoon();
        this.drawStars();
        //this.drawCity();

        this.music.loadSound();

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
        TweenMax.ticker.addEventListener('tick', this.update.bind(this))

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

        //this.city.update();

        this.moon.update(this.DELTA_TIME);
        this.moon.move(this.DELTA_TIME);

        this.stars.update(this.DELTA_TIME);

        this.scene.render();

    }

    drawCity() {

        this.city = new City(this.scene, this.music.frequencyData);
        this.scene.addChild(this.city);

    }

    drawStars() {

        this.stars = new Stars(this.scene);
        this.scene.addChild(this.stars);

    }

    drawMoon() {

        this.moon = new Emitter(this.music.frequencyData);
        this.scene.addChild(this.moon);

    }


}


export default App
