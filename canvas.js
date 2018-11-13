const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;

class Canvas{
	constructor(canvasId){
		this.canvas = document.getElementById(canvasId);
		this.context = this.canvas.getContext("2d");
		this.imageData = this.context.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

		this.context.fillStyle = "black";
		// set alpha to opaque
		this.context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

		// buffer to write on next animation frame
		this.buf = new ArrayBuffer(this.imageData.data.length);
		// Get the canvas buffer in 8bit and 32bit
		this.buf8 = new Uint8ClampedArray(this.buf);
		this.buf32 = new Uint32Array(this.buf);


		// Set alpha
		for (var i = 0; i < this.buf32.length; ++i) {
			this.buf32[i] = 0xff000000;
		}

		this.nes = new jsnes.NES({
			onFrame: function (frameBuffer) {
				_this.setBuffer(frameBuffer);
			},
			onStatusUpdate: console.log,
			onAudioSample: function (left, right) {
				// ... play audio sample
			}
		});
	}
}