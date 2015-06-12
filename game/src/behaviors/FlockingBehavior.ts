import IBehavior = require('IBehavior');
import Creature = require('../Creature');
import WorldPartition = require('../WorldPartition');
import Boid = require('Boid');

class FlockingBehavior implements IBehavior {
	execute(creature: Creature, tpf: number, partitions: WorldPartition[]): void {
		creature.applyForce(Boid.getForce(creature, partitions));
	}
}

export = FlockingBehavior;