/// <reference path="../definitions/lodash.d.ts" />

import Vector2 = require('Vector2');
import Creature = require('Creature');
import WorldPartition = require('WorldPartition');

var posDiff = new Vector2();
var separation = new Vector2();
var alignment = new Vector2();
var cohesion = new Vector2();

class Boid {
	static COHESION_FACTOR = 0.5;
	static SEPARATION_FACTOR = 2;
	static ALIGNMENT_FACTOR = 3;

	static getForce(creature: Creature, partitions: WorldPartition[]): Vector2 {
		var result = new Vector2(0, 0);
		separation.setDirect(0, 0);
		alignment.setDirect(0, 0);
		cohesion.setDirect(0, 0);
		
		var count = 0;
		for (var i = 0; i < partitions.length; ++i) {
			var partition = partitions[i];
			partition.forEach(function (neighbor: Creature) {
				var dist = creature.position.distance(neighbor.position);
				if (dist <= 0 || dist > creature.phenotype.lookRange) {
					return;
				}

				++count;

				Vector2.sub(creature.position, neighbor.position, posDiff);

				posDiff.normalize();
				posDiff.div(dist);
				separation.add(posDiff);
				alignment.add(neighbor.velocity);
				cohesion.add(neighbor.position);
			});
		}

		if (count === 0) { return result; }

		// Separation
		separation.div(count);
		separation.normalize();
		separation.mul(creature.phenotype.maxSpeed);
		separation.sub(creature.velocity);
		separation.limit(creature.phenotype.maxForce);
		separation.mul(Boid.SEPARATION_FACTOR);

		// Alignment
		alignment.div(count);
		alignment.normalize();
		alignment.mul(creature.phenotype.maxSpeed);
		alignment.sub(creature.velocity); // Pull towards the average direction.
		alignment.limit(creature.phenotype.maxForce);
		alignment.mul(Boid.ALIGNMENT_FACTOR);

		// Cohesion
		cohesion.div(count);
		cohesion.sub(creature.position);
		cohesion.normalize();
		cohesion.limit(creature.phenotype.maxForce);
		cohesion.mul(Boid.COHESION_FACTOR);

		return <Vector2>result.add(separation).add(alignment).add(cohesion);
	}
}

export = Boid;