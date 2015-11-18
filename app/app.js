import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';

import Emitter from './lib/emitter'

var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();

analyser.smoothingTimeConstant = 0.9;

var frequencyData = new Uint8Array(analyser.frequencyBinCount);
var audioBuffer;
var audioSource;

class App {

    constructor() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;


        this.scene = new Scene();

        this.city = new PIXI.Graphics();

        let root = document.body.querySelector('.app')
        root.appendChild(this.scene.renderer.view);


        this.drawMoon();
        this.drawStars();

        this.scene.addChild(this.city);


        this.addListeners();
        this.loadSound();

    }

    /**
     * addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this))

    }

    /**
     * update
     * - Triggered on every TweenMax tick
     */
    update() {

        analyser.getByteFrequencyData(frequencyData);
        this.drawCity();

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        this.moon.update(this.DELTA_TIME);

        this.moon.speed = (window.innerWidth) / 180 / 60;
        this.moon.x += this.moon.speed;

        this.stars.x -= this.stars.speed;

        this.scene.render();

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

    loadSound() {
        
        var request = new XMLHttpRequest();
        request.open('GET', 'assets/sounds/lifeformed-sunbleach.mp3', true);
        request.responseType = 'arraybuffer';
        // Decode asynchronously
        request.onload = function () {
            audioCtx.decodeAudioData(request.response, function (buffer) {
                // success callback
                audioBuffer = buffer;
                // Create sound from buffer
                audioSource = audioCtx.createBufferSource();
                audioSource.buffer = audioBuffer;
                // connect the audio source to context's output
                audioSource.connect(analyser);
                analyser.connect(audioCtx.destination);
                // play sound
                audioSource.start();
            }, function () {
                // error callback
                //
            });
        };
        request.send();
    }

    drawCity() {

        this.city.clear();

        var x = 0;
        var divider = 16;
        var numberOfBars = 1024/divider;
        var barsWidth = window.innerWidth/numberOfBars;


        this.city.beginFill(0x000000);

        for (var i = 0; i <= numberOfBars; i++) {
            this.city.drawRect(x, window.innerHeight, barsWidth, -(window.innerHeight - (frequencyData[i+divider] * 2.5)));
            x += barsWidth;
        }

        this.city.endFill();

    }

    drawLayout() {

        var x = 0;
        var numberOfBars = 1024/8;
        var barsWidth = 1;

        layout.beginFill(0x000000);

        //for (var i = 0; i <= numberOfBars; i++) {
        //    layout.drawRect(x, 0, barsWidth, window.innerHeight);
        //    x += window.innerWidth/numberOfBars;
        //}

        layout.drawRect(0, 0, window.innerWidth, window.innerHeight);
        layout.endFill();
        this.scene.addChild(layout);
    }

    drawStars() {

        this.stars = new Graphics();
        this.stars.speed = (window.innerWidth / 180 / 60)*0.5;

        this.stars.beginFill(0xFAFBCF);

        for(let i = 0; i < 50; i++){
            this.stars.drawCircle(Math.random()*window.innerWidth, Math.random()*window.innerHeight, 1);
        }

        this.stars.endFill();

        this.scene.addChild(this.stars);
    }

    drawMoon() {
        //this.moon = new Graphics();
        //
        //this.moon.radius = 50;
        //this.moon.beginFill(0xFAFBCF);
        //this.moon.drawCircle(this.moon.radius + 50, window.innerHeight / 5, this.moon.radius);

        this.moon = new Emitter(this.scene);

        this.scene.addChild(this.moon);
    }

}

export default App;
