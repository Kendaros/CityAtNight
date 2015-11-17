import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';


let angle = 0;

var audioCtx = new AudioContext();
var analyser = audioCtx.createAnalyser();

analyser.smoothingTimeConstant = 0.9;

var frequencyData = new Uint8Array(analyser.frequencyBinCount);
var audioBuffer;
var audioSource;

var rect = new PIXI.Graphics();
var layout = new PIXI.Graphics();



class App {

    constructor() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new Scene();

        let root = document.body.querySelector('.app')
        root.appendChild(this.scene.renderer.view);
        this.scene.addChild(rect);

        this.ball = new Graphics();
        this.ball.beginFill(0x000000);
        this.ball.drawCircle(0, 0, 50);
        this.ball.y = window.innerHeight / 5;
        this.scene.addChild(this.ball);


        this.addListeners();

        //this.drawLayout();
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
        this.draw();

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        angle += 0.01;

        this.ball.alpha =1 ;
        this.ball.x = ( window.innerWidth / 2 ) + Math.sin(angle) * 180;

        this.scene.render();



        //console.log(frequencyData[0]);

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

    draw() {


        rect.clear();


        var x = 0;
        var divider = 8;
        var numberOfBars = 1024/divider;
        var barsWidth = window.innerWidth/numberOfBars;


        rect.beginFill(0xFFFFFF);

        rect.endFill();




        rect.beginFill(0xFFFFFF);

        for (var i = 0; i <= numberOfBars; i++) {
            rect.drawRect(x, 0, barsWidth, frequencyData[i+divider] * 2.5);
            x += barsWidth;
        }

        rect.endFill();



    }

    drawLayout() {

        var x = 0;
        var numberOfBars = 1024/8;
        var barsWidth = 1;

        layout.beginFill(0xFFFFFF);

        for (var i = 0; i <= numberOfBars; i++) {
            layout.drawRect(x, 0, barsWidth, window.innerHeight);
            x += window.innerWidth/numberOfBars;
        }

        //layout.drawRect(0, 0, window.innerWidth, window.innerHeight / 2);
        layout.endFill();
        this.scene.addChild(layout);
    }

}

export default App;
