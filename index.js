import {NES} from 'jsnes';
import Canvas from './canvas';


class Nes{
	constructor(canvasId){
		this.canvas = new Canvas(canvasId);
	}
}