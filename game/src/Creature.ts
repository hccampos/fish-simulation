/// <reference path="../definitions/goojs.d.ts" />

import Vector2 = require('Vector2');
import World = require('World');
import WorldPartition = require('WorldPartition');
import Genome = require('Genome');
import IPhenotype = require('IPhenotype');

class Creature {
	static MAX_FORCE: number = 0.2;
	static MAX_DIR_CHANGE: number = 0.2;
	static MOVE_ENERGY_FACTOR: number = 0.01;
	static ENERGY_DECAY_FACTOR: number = 0.98;
	
	// The world where the creature lives in.
	world: World = null;
	// The current generation of the creature (not of the world).
	generation: number = 0;
	// How old the creature is (in milliseconds).
	age: number = 0;
	// How much energy the creature has left. When the energy reaches 0
	// the creature is considered dead.
	energy: number = 100;
	gameteCount: number;
	timeSinceLastGamete: number;
	// The genome of the creature contains all its genes.
	genome: Genome = null;
	// The characteristics/traits of the creature.
	phenotype: IPhenotype = null;
	
	// Variables used to position and move the creature in the world.
	position: Vector2 = new Vector2();
	prevPosition: Vector2 = new Vector2();
	velocity: Vector2 = new Vector2();
	force: Vector2 = new Vector2();
	
	// The world partition in which the creature is located.
	partition: WorldPartition = null;
	
	constructor(genome: Genome, generation: number) {
		this.genome = genome;
		this.phenotype = this.genome.getPhenotype();
		this.generation = generation;
	}
	
	/**
	 * Updates the creature state.
	 * 
	 * @param tpf
	 * 		The number of milliseconds that have passed since the
	 * 		last update.
	 */
	update(tpf: number): void {
		if (!this.world) {
			return;
		}

		this.applyBoundaryForces();

		// Get the world partitions that surround the creature.
		// This way we don't have to look at all other creatures.
		var partitions = this.world.getNeighborPartitions(this);

		// Apply the creature's behaviors.
		var behaviors = this.phenotype.behaviors;
		for (var i = 0; i < behaviors.length; ++i) {
			behaviors[i].execute(this, tpf, partitions);
		}
		
		this.move(tpf);
		this.ageOff(tpf);
		
		// Too bad! hopefully had the chance to leave some offspring.
		if (this.isDead()) {
			this.world.removeCreature(this);
		}
	}
	
	/**
	 * Draws the creature onto the canvas.
	 */
	draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		if (this.isDead()) {
			return;
		}

		var angle = this.velocity.angle();

		ctx.strokeStyle = this.getColorRgba();
		ctx.lineWidth = this.phenotype.width;
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(this.prevPosition.x, this.prevPosition.y);
		ctx.lineTo(this.position.x, this.position.y);
		ctx.stroke();
	}
	
	ageOff(tpf: number): void {
		this.age += tpf;
		
		// All creatures lose some energy exponentially to help them die off 
		// eventually.
		this.energy -= Creature.ENERGY_DECAY_FACTOR * tpf / (this.age * this.age);
	}
	
	move(tpf: number): void {
		var velAngle = this.velocity.angle();
		var minAngle = velAngle - Creature.MAX_DIR_CHANGE;
		var maxAngle = velAngle + Creature.MAX_DIR_CHANGE;

		this.force.mul(tpf / this.getMass()); // Acceleration... F=ma
		this.force.limit(Creature.MAX_FORCE);
		this.velocity.add(this.force);
		
		// Apply some fake drag that depends on how big the creature is.
		this.velocity.mul(1 / this.getArea());

		// Limit direction changes so the creatures don't go completely bananas.
		this.velocity.setAngle(goo.MathUtils.clamp(this.velocity.angle(), minAngle, maxAngle));

		// Move the creature.
		this.prevPosition.setVector(this.position);
		this.position.add(this.velocity);
		
		// Moving spends (precious) energy. Already accounted for the tpf
		// above.
		var exertedForce = this.force.length();
		this.energy -= exertedForce * Creature.MOVE_ENERGY_FACTOR;
		
		// Kill off the force for the next step because we don't know
		// what the creature will want to do.
		this.force.mul(0);
	}

	/**
	 * Applies a force to the creature.
	 */
	applyForce(force: Vector2): void {
		this.force.add(force);
	}

	/**
	 * Applies some forces to the creature to try to keep it inside the
	 * visible world.
	 */
	applyBoundaryForces(): void {
		var threshold = 10;
		var multiplier = 200;
		var maxForce = Creature.MAX_FORCE;

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

	/**
	 * When a creature has no energy it is dead.
	 */
	isDead(): boolean {
		return this.energy <= 0;
	}
	
	/**
	 * Gets whether the creature is a male.
	 */
	isMale(): boolean {
		return this.phenotype.gender > 0.5;
	}
	
	/**
	 * Gets whether the creature is a female.
	 */
	isFemale(): boolean {
		return this.phenotype.gender < 0.5;
	}

	/**
	 * Gets the mass of the creature based on its size and density.
	 */
	getMass(): number {
		return this.getArea() * this.phenotype.density;
	}
	
	/**
	 * Gets the size of the creature.
	 */
	getArea(): number {
		return this.phenotype.length * this.phenotype.width;
	}

	/**
	 * Gets the color of the creature based on the phenotype properties.
	 */
	getColorRgba(): string {
		var r = Math.round(this.phenotype.colorR * 255.0);
		var g = Math.round(this.phenotype.colorG * 255.0);
		var b = Math.round(this.phenotype.colorB * 255.0);
		return 'rgba(' + r + ',' + g + ',' + b + ', 1)';
	}
}

export = Creature;