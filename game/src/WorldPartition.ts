/// <reference path="../definitions/lodash.d.ts" />

import Creature = require('Creature');

class WorldPartition {
	public row: number;
	public col: number;
	private _creatures: Array<Creature>;
	
	constructor(row: number, col: number) {
		this._creatures = [];
		this.row = row;
		this.col = col;
	}
	
	get size(): number {
		return this._creatures.length;
	}
	
	/**
	 * Executes the callback for each of the creatures.
	 */
	forEach(callback: (item: Creature) => void): void {
		for (var i = 0; i < this._creatures.length; ++i) {
			callback(this._creatures[i]);
		}
	}
	
	/**
	 * Gets whether the partition contains the specified creature.
	 */
	has(creature: Creature): boolean {
		return _.indexOf(this._creatures, creature) > -1;
	}
	
	/**
	 * Adds the specified creature to the partition if it isn't in it yet.
	 */
	add(creature: Creature): WorldPartition {
		if (!this.has(creature)) {
			this._creatures.push(creature);
		}
		
		return this;
	}
	
	/**
	 * Removes the specified creature from the partition.
	 */
	remove(creature: Creature): WorldPartition {
		var index = _.indexOf(this._creatures, creature);
		if (index > -1) {
			this._creatures.splice(index, 1);
		}
		
		return this;
	}
}

export = WorldPartition;