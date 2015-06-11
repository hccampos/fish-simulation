import IBehavior = require('IBehavior');
import Creature = require('../Creature');
import Utils = require('../Utils');
import WorldPartition = require('../WorldPartition');

class BreedBehavior implements IBehavior {
	execute(creature: Creature, tpf: number, partitions: WorldPartition[]): void {
		creature.phenotype.fertility += creature.phenotype.fertilityGrowth * tpf;

		if (!this.canBreed(creature)) { return; }

		partitions.forEach((partition: WorldPartition) => {
			partition.forEach((neighbor: Creature) => {				
				// Can't breed with itself.
				if (neighbor == creature) { return; }

				var dist = creature.position.distance(neighbor.position);
				if (dist <= creature.phenotype.breedDistance && this.canBreed(neighbor)) {
					this.createChild(creature, neighbor);
				}
			});
		});
	}
	
	canBreed(creature: Creature): boolean {
		return Utils.normalRandom(creature.phenotype.fertility, 0.1) > 0.6;
	}

	createChild(creature: Creature, partner: Creature): void {		
		var child = new Creature(null);
		child.generation = creature.generation + 1;
		
		// Position and add the child.
		child.position.setVector(creature.position);
		child.velocity.random();
		creature.world.addCreature(child);

		// Can't have another child right away.
		creature.phenotype.fertility = 0;
		partner.phenotype.fertility = 0;
		child.phenotype.fertility = 0;

		creature.energy *= creature.phenotype.breedEnergyFactor;
		partner.energy *= creature.phenotype.breedEnergyFactor;

		creature.color = creature.getColorRgba();
	}
}

export = BreedBehavior;