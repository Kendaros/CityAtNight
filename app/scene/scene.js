import { WebGLRenderer, Container } from 'pixi.js';
var pixi = require('pixi.js')

class Scene {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new WebGLRenderer(this.width, this.height, {backgroundColor: 0x01022a, antialias: true});

        this.renderer.view.style.position = 'absolute';
        this.renderer.view.style.display = 'block';

        this.stage = new Container();

    }

    /**
     * Add a child to the stage
     *
     * @param {Obj} child - a PIXI object
     */
    addChild(child) {

        this.stage.addChild(child)

    }

    /**
     * Remove a child from the stage
     *
     * @param {Obj} child - a PIXI object
     */
    removeChild(child) {

        this.stage.removeChild(child)

    }

    /**
     * Renders/Draw the scene
     */
    render() {

        this.renderer.render(this.stage);

    }

    /**
     * Resize the scene according to screen size
     *
     * @param {Number} newWidth
     * @param {Number} newHeight
     */
    resize(newWidth, newHeight) {

        this.renderer.resize(newWidth, newHeight)

    }

}

export default Scene;
