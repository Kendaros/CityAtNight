import EventEmitter from './event-emitter';

class Music {
    constructor(soundPath) {

        this.soundPath = soundPath;

        // SAFARI Compatibility
        var constructor = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new constructor();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.9;

        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

        this.initTime = Date.now();
    }

    loadSound() {

        var request = new XMLHttpRequest();
        request.open('GET', this.soundPath, true);
        request.responseType = 'arraybuffer';
        // Decode asynchronously
        request.onload = function () {
            this.audioCtx.decodeAudioData(request.response, function (buffer) {
                // success callback
                this.audioBuffer = buffer;
                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;
                // connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
                // play sound
                var now = Date.now();
                this.differenceTime = now - this.initTime;

                this.audioSource.start(this.audioCtx.currentTime);

                EventEmitter.emit('MUSIC_LOADED');
            }.bind(this), function () {
                // error callback
                //
            });
        }.bind(this);
        request.send();
    }

    getMusicCurrentTime() {

        return (this.audioCtx.currentTime * 1000) - this.differenceTime;

    }

}

export default Music