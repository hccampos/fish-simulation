import IBehavior = require('IBehavior');
import Creature = require('../Creature');
import Utils = require('../Utils');

class GrowBehavior implements IBehavior {	
	execute(creature: Creature, tpf: number, partitions): void {
		creature.phenotype.width += creature.phenotype.widthGrowth * Utils.normalRandom(1) * tpf;
		creature.phenotype.length += creature.phenotype.lengthGrowth * Utils.normalRandom(1) * tpf;

		// Reduce the rate of growth so that the creature doesn't grow forever.
		creature.phenotype.widthGrowth *= 0.99;
		creature.phenotype.lengthGrowth *= 0.99;
	}
}

export = GrowBehavior;