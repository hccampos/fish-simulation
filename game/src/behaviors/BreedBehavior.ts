import IBehavior = require('IBehavior');
import Creature = require('../Creature');
import Gene = require('../Gene');
import Genome = require('../Genome');
import Utils = require('../Utils');
import WorldPartition = require('../WorldPartition');

class BreedBehavior implements IBehavior {
	static BREEDING_DISTANCE = 10;
	static BREEDING_COST_MALE = 0.1;
	static BREEDING_COST_FEMALE = 0.2;
	static TIME_TO_EGG = 1000;
	static TIME_TO_SPERM = 10;
	
	execute(creature: Creature, tpf: number, partitions: WorldPartition[]): void {
		this.produceGametes(creature);
		
		// The creature can't breed it it doesn't have any eggs or sperms.
		if (creature.gameteCount === 0) {
			return;
		}

		// Check the creature's neighbors to see if it can breed with any of them.
		partitions.forEach((partition: WorldPartition) => {
			partition.forEach((neighbor: Creature) => {				
				this.tryToBreed(creature, neighbor);
			});
		});
	}
	
	/**
	 * Produces new sperms or eggs if enough time has passed since the last time
	 * one was produced.
	 */
	produceGametes(creature: Creature): void {	
		if (creature.isFemale()) {
			var timeToGamete = BreedBehavior.TIME_TO_EGG;
		} else {
			var timeToGamete = BreedBehavior.TIME_TO_SPERM;
		}
		
		var numProducedGametes = Math.round(creature.timeSinceLastGamete / timeToGamete);
		if (numProducedGametes > 0) {
			creature.gameteCount += numProducedGametes;
			creature.timeSinceLastGamete = 0;
		}
	}
	
	/**
	 * Gets whether two creatures can breed with each other. It takes into account
	 * their genders, how close they are to each other and wether they have any
	 * gametes available for fertilization.
	 * 
	 * @param creature
	 * 		The creature which is being checked.
	 * @param partner
	 * 		The potential partner.
	 */
	canBreed(creature: Creature, partner: Creature): boolean {
		// Can't breed with itself.
		if (creature === partner) {
			return false;
		}
		
		var dist = creature.position.distance(partner.position);
		if (dist > BreedBehavior.BREEDING_DISTANCE) {
			return false;
		}
		
		// Partner must have available gametes. When we call this method
		// we have already checked if the creature itself has gametes.
		if (partner.gameteCount === 0) {
			return false;
		}
		
		// Make sure we can't breed with creatures of the same sex.
		if (
			(creature.isFemale() && partner.isFemale()) || 
			(creature.isMale() && partner.isMale())
		) {
			return false;
		}
		
		return true;
	}

	tryToBreed(creature: Creature, partner: Creature): void {
		if (!this.canBreed(creature, partner)) {
			return;
		}
		
		var female: Creature;
		var male: Creature;
		
		if (creature.isFemale()) {
			female = creature;
			male = partner;
		} else {
			female = partner;
			male = creature;
		}
		
		var eggGenes: Gene[] = female.genome.meiosis();
		var spermGenes: Gene[] = male.genome.meiosis();
		var genome: Genome = new Genome(eggGenes, spermGenes);
				
		var child = new Creature(genome, female.generation + 1);
		
		// Position the child close to the mother.
		child.position.setVector(female.position);
		child.velocity.random();
		female.world.addCreature(child);

		// Used up a sperm from the male and an egg from the female.
		female.gameteCount--;
		male.gameteCount--;

		// Breeding takes up some energy, especially for the female.
		female.energy -= BreedBehavior.BREEDING_COST_FEMALE;
		male.energy -= BreedBehavior.BREEDING_COST_MALE;
	}
}

export = BreedBehavior;