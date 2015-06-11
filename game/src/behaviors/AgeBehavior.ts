import IBehavior = require('IBehavior');
import Creature = require('../Creature');
import WorldPartition = require('../WorldPartition');

class AgeBehavior implements IBehavior {
	execute(creature: Creature, tpf: number, partitions: WorldPartition[]): void {
		var size = -1;
		partitions.forEach(function (p) { size += p.size; });
		creature.energy -= creature.phenotype.energyDecay * Math.random() * tpf * (size * size / 5);
	}
}

export = AgeBehavior;