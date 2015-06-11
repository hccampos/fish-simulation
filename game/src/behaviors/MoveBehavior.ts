/// <reference path="../../definitions/goojs.d.ts" />

import IBehavior = require('IBehavior');
import Creature = require('../Creature');
import Utils = require('../Utils');
import WorldPartition = require('../WorldPartition');

class MoveBehavior implements IBehavior {
	execute(creature: Creature, tpf: number, partitions: WorldPartition[]): void {
		var velAngle = creature.velocity.angle();
		var minAngle = velAngle - creature.phenotype.maxDirChange;
		var maxAngle = velAngle + creature.phenotype.maxDirChange;

		creature.acceleration.mul(tpf / creature.getMass());
		creature.acceleration.limit(creature.phenotype.maxForce * 2);
		creature.velocity.add(creature.acceleration);
		creature.velocity.limit(creature.phenotype.maxSpeed);

		// Limit direction changes.
		creature.velocity.setAngle(goo.MathUtils.clamp(creature.velocity.angle(), minAngle, maxAngle));

		// Min velocity.
		if (creature.velocity.length() < creature.phenotype.minSpeed) {
			creature.velocity.setLength(creature.phenotype.minSpeed);
		}

		creature.prevPosition.setVector(creature.position);
		creature.position.add(creature.velocity);
		creature.acceleration.mul(0);
	}
}

export = MoveBehavior;