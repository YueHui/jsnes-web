import { NES } from 'jsnes';
import Canvas from './canvas';


class Nes{
	constructor(canvasId){
		this.canvas = new Canvas(canvasId);
		this.nes = new NES({
			onFrame: (frameBuffer) => {
				this.canvas.setBuffer(frameBuffer);
			},
			onStatusUpdate: console.log,
			onAudioSample: function (left, right) {
				// ... play audio sample
			}
		});
	}

	/**
	 * romData
	 * @param {string} romData
	 */
	loadRom(romData){
		if(!romData){
			console.log("没发现rom数据");
			return;
		}
		this.nes.loadROM(romData);
	}

	startFrame() {
		requestAnimationFrame(() =>{
			this.nes.frame();
			this.canvas.writeBuffer();
			this.startFrame();
		})
	}

}

window.Nes = Nes;