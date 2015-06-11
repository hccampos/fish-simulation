import Vector2 = require('Vector2');
import Utils = require('Utils');
import World = require('World');
import Boid = require('Boid');
import Genetics = require('Genetics');
import WorldPartition = require('WorldPartition');
import IBehavior = require('behaviors/IBehavior');
import IPhenotype = require('IPhenotype');

class Creature {
	public static DEFAULT_PHENOTYPE: IPhenotype = {
		minSpeed: 1.0,
		maxSpeed: 1.5,
		maxForce: 0.1,
		maxDirChange: Math.PI / 40,
		lookRange: 20,
		length: 1.0,
		width: 1.2,
		lengthGrowth: 0.0005,
		widthGrowth: 0.0005,
		density: 0.1,
		initialEnergy: 1.5,
		energyDecay: 0.00004,
		fertility: 0.0,
		fertilityGrowth: 0.004,
		breedDistance: 6.0,
		breedEnergyFactor: 0.8,
		colorRed: 0.5,
		colorGreen: 0.5,
		colorBlue: 0.5
	};
	
	// The world where the creature lives in.
	public world: World = null;
	// The current generation of the creature (not of the world).
	public generation: number = 0;
	// The characteristics/traits of the creature.
	public phenotype: IPhenotype = null;
	// How much energy the creature has left. When the energy reaches 0
	// the creature is considered dead.
	public energy: number = 0;
	
	// Variables used to position and move the creature in the world.
	public position: Vector2 = new Vector2();
	public prevPosition: Vector2 = new Vector2();
	public velocity: Vector2 = new Vector2();
	public acceleration: Vector2 = new Vector2();
	public behaviors: Array<IBehavior> = [];
	
	// The world partition in which the creature is located.
	public partition: WorldPartition = null;
	
	// The color used to draw the creature. It is calculated based on
	// the phenotype.
	public color: string = '';
	
	constructor(phenotype: IPhenotype) {
		if (phenotype) {
			this.phenotype = _.clone(Creature.DEFAULT_PHENOTYPE);
		} else {
			this.phenotype = _.clone(phenotype);
		}
		
		this.color = this.getColorRgba();
	}
	
	update(tpf: number): void {
		if (!this.world) {
			return;
		}

		this.applyBoundaryForces();

		// Get the world partitions that surround the creature.
		// This way we don't have to look at all other creatures.
		var partitions: WorldPartition[] = this.world.getNeighborPartitions(this);

		// Flocking
		this.applyForce(Boid.getForce(this, partitions));

		// Creature behaviors.
		for (var i = 0; i < this.behaviors.length; ++i) {
			this.behaviors[i].execute(this, tpf, partitions);
		}
		
		if (this.isDead()) {
			this.world.removeCreature(this);
		}
	}

	applyForce(force: Vector2): void {
		this.acceleration.add(force);
	}

	applyBoundaryForces(): void {
		var threshold = 10;
		var multiplier = 200;
		var maxForce = this.phenotype.maxForce;

		if (this.position.x > this.world.width - threshold) {
			this.applyForce(new Vector2(-maxForce * multiplier, 0));
		}
		if (this.position.x < threshold) {
			this.applyForce(new Vector2(maxForce * multiplier, 0));
		}
		if (this.position.y < threshold) {
			this.applyForce(new Vector2(0, maxForce * multiplier));
		}
		if (this.position.y > this.world.height - threshold) {
			this.applyForce(new Vector2(0, -maxForce * multiplier));
		}
	}

	draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		if (this.isDead()) {
			return;
		}

		var angle = this.velocity.angle();

		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.phenotype.width;
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(this.prevPosition.x, this.prevPosition.y);
		ctx.lineTo(this.position.x, this.position.y);
		ctx.stroke();
	}

	isDead(): boolean {
		return this.energy <= 0;
	}

	getMass(): number {
		return this.phenotype.length * this.phenotype.width * this.phenotype.density;
	}

	getColorRgba(): string {
		var r = Math.round(this.phenotype.colorRed * 255.0);
		var g = Math.round(this.phenotype.colorGreen * 255.0);
		var b = Math.round(this.phenotype.colorBlue * 255.0);
		return 'rgba(' + r + ',' + g + ',' + b + ', 1)';
	}
}

export = Creature;