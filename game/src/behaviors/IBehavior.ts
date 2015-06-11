import Creature = require('Creature');
import World = require('World');
import WorldPartition = require('../WorldPartition');

interface IBehavior {
	/**
	 * Executes the behavior.
	 * 
	 * @param creature
	 * 		The creature on which the behavior is to be applied.
	 * @param tpf
	 * 		Number of milliseconds that have passed since the last update.
	 * @param partitions
	 * 		Partitions of the world surrounding the creature.
	 */
	execute(creature: Creature, tpf: number, partitions: WorldPartition[]): void;
}

export = IBehavior;