import World = require('World');

class Game {
	private world: World;
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	
	constructor() {
		this.canvas = document.createElement('canvas');
		document.body.appendChild(this.canvas);

		window.addEventListener('resize', this.onResize);
		this.onResize();

		this.world = new World(this.canvas.width, this.canvas.height);
		this.world.populate();
		this.world.setSize(this.canvas.width, this.canvas.height);

		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillStyle = 'rgba(4, 87, 145, 1)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	run(): void {
		window.requestAnimationFrame(this.update);
	}
	
	update = (tpf: number): void => {
		window.requestAnimationFrame(this.update);

		this.ctx.fillStyle = 'rgba(4, 87, 145, 0.2)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.world.update(tpf / 10000, this.ctx, this.canvas);
	}
	
	onResize = (): void => {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		if (this.world) {
			this.world.setSize(this.canvas.width, this.canvas.height);
		}
	}
}

export = Game;