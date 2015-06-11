/// <reference path="../definitions/lodash.d.ts" />

import Creature = require('Creature');
import Vector2 = require('Vector2');
import WorldPartition = require('WorldPartition');
	
class World {
	private static DEFAULT_NUM_CREATURES = 1000;
	private static PARTITION_SIZE = 10;

	public populationDisplay: HTMLElement = null;
	public generationsDisplay: HTMLElement = null;
	public generation: number = 0;
	
	public width: number;
	public height: number;
	public creatures: Creature[];
	
	private _partitions: WorldPartition[][] = [];
	private _numVertPartitions: number;
	private _numHorizPartitions: number;

	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.creatures = [];

		this.populationDisplay = document.getElementById('population');
		this.generationsDisplay = document.getElementById('generations');
	}

	update(tpf: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		for (var i = 0; i < this.creatures.length; ++i) {
			var creature: Creature = this.creatures[i];
			this.addToPartition(creature);
			creature.update(tpf);
			creature.draw(ctx, canvas);
		}
	}

	populate(numCreatures: number = World.DEFAULT_NUM_CREATURES, genes: Object = null): void {
		for (var i = 0; i < numCreatures; ++i) {
			var x: number = Math.random() * this.width;
			var y: number = Math.random() * this.height;

			var creature: Creature = new Creature(null);
			creature.world = this;
			creature.position.setDirect(x, y);
			creature.velocity.random();
			creature.energy = Math.random() * 2;

			this.addCreature(creature);
		}
	}

	addCreature(creature: Creature): void {
		if (!this.hasCreature(creature)) {
			creature.world = this;
			this.creatures.push(creature);
		}

		if (creature.generation > this.generation) {
			this.generation = creature.generation;
		}

		this.updatePopulationDisplay();
		this.updateGenerationsDisplay();
	}

	removeCreature(creature: Creature): void {
		var index: number = this.creatures.indexOf(creature);
		if (index > -1) {
			creature.world = null;
			this.creatures.splice(index, 1);
		}

		this.updatePopulationDisplay();
	}

	clear(creature: Creature): void {
		_.forEach(_.clone(this.creatures), this.removeCreature);
	}

	hasCreature(creature) {
		return this.creatures.indexOf(creature) > -1;
	}

	updatePopulationDisplay(): void {
		this.populationDisplay.innerHTML = 'Population: ' + this.creatures.length;
	}

	updateGenerationsDisplay(): void {
		this.generationsDisplay.innerHTML = 'Generation: ' + this.generation;
	}

	/**
	 * Sets the size of the world.
	 * 
	 * @param width
	 * 		The width of the world in pixels.
	 * @param height
	 * 		The height of the world in pixels.
	 */
	setSize(width: number, height: number): void {
		this.width = width;
		this.height = height;

		this.createParitions();
		this.creatures.forEach((creature) => {
			this.addToPartition(creature);
		});
	}

	/**
	 * Creates a grid of world partitions.
	 */
	createParitions(): void {
		this._numHorizPartitions = Math.floor(this.width / World.PARTITION_SIZE);
		this._numVertPartitions = Math.floor(this.height / World.PARTITION_SIZE);

		var rows = this._partitions = [];
		for (var i = 0; i < this._numVertPartitions; ++i) {
			rows[i] = [];
			for (var j = 0; j < this._numHorizPartitions; ++j) {
				rows[i][j] = new WorldPartition(i, j);
			}
		}
	}

	/**
	 * Adds the specified creature to the partition in which it is located and
	 * removes it from any other partition it might be in.
	 * 
	 * @param creature
	 * 		The creature which is to be assigned to a partition.
	 */
	addToPartition(creature: Creature): void {
		var partition: WorldPartition = this.getPartitionFromPosition(creature.position);
		if (creature.partition != partition) {
			if (creature.partition) {
				creature.partition.remove(creature);
			}
			partition.add(creature);
			creature.partition = partition;
		}
	}

	/**
	 * Gets the partition with the specified coordinates.
	 * 
	 * @param row
	 * 		The row of the partition.
	 * @param col
	 * 		The column of the partition.
	 * 
	 * @returns The partition which is located at the specified [row, column].
	 */
	getPartition(row: number, col: number): WorldPartition {
		return this._partitions[row][col];
	}

	/**
	 * Gets the partition that corresponds to the specified world coordinates.
	 * 
	 * @param position
	 * 		The position whose corresponding partition is to be returned.
	 * 
	 * @returns The partition which is located at the specified position.
	 */
	getPartitionFromPosition(position: Vector2) {
		var partitionPos = this.getRowColForPosition(position);
		return this._partitions[partitionPos.row][partitionPos.col];
	}

	/**
	 * Gets a list of partitions that surround the creature.
	 * 
	 * @param creature
	 * 		The creature whose surrounding partitions are to be returned.
	 * 
	 * @returns A list of partitions that surround the creature.
	 */
	getNeighborPartitions(creature: Creature): WorldPartition[] {
		var partition = creature.partition;
		var row = partition.row
		var col = partition.col;
		var left = col - 1;
		var right = col + 1;
		var top = row - 1;
		var bottom = row + 1;

		var partitions: WorldPartition[] = [];
		partitions.push(this._partitions[row][col]);

		var validRow = function (row) { row > 0 && row < this._numVertPartitions; };
		var validCol = function (col) { col > 0 && col < this._numHorizPartitions; };

		var validLeft = validCol(left);
		var validRight = validCol(right);
		var validTop = validRow(top);
		var validBottom = validRow(bottom);

		// Left, top-left and bottom-left.
		if (validLeft) {
			partitions.push(this._partitions[row][left]);

			if (validTop) {
				partitions.push(this._partitions[top][left]);
			}
			if (validBottom) {
				partitions.push(this._partitions[bottom][left]);
			}
		}

		// Right, top-right and bottom-right.
		if (validRight) {
			partitions.push(this._partitions[row][right]);

			if (validTop) {
				partitions.push(this._partitions[top][right]);
			}
			if (validBottom) {
				partitions.push(this._partitions[bottom][right]);
			}
		}

		// Top
		if (validTop) {
			partitions.push(this._partitions[top][col]);
		}

		// Bottom.
		if (validBottom) {
			partitions.push(this._partitions[top][col]);
		}

		return partitions;
	}

	/**
	 * Converts the specified world position into partition coordinates.
	 * 
	 * @param position
	 *		The position which is to be converted.
	 * 
	 * @returns The coordinates of the partition that contains the position.
	 */
	getRowColForPosition(position: Vector2) {
		return {
			row: goo.MathUtils.clamp(Math.floor(position.x / World.PARTITION_SIZE), 0, this._numVertPartitions - 1),
			col: goo.MathUtils.clamp(Math.floor(position.y / World.PARTITION_SIZE), 0, this._numHorizPartitions - 1)
		};
	}
}

export = World;