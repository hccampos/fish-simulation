import IGene = require('IGene');
import IBehavior = require('behaviors/IBehavior');
import Utils = require('Utils');

class BehaviorGene implements IGene {
	static MUTATION_FACTOR = 0.01;
	
	trait: string;
	isDominant: boolean;
	
	private _probability: number = 1;
	private _behavior: IBehavior = null;
	
	constructor(probability: number, behavior: IBehavior, isDominant: boolean = false) {
		this.trait = 'behaviors';
		this.isDominant = isDominant;
		this._probability = probability;
		this._behavior = behavior;
	}
	
	get value():IBehavior {
		return this._probability > 0.5 ? this._behavior : null;
	}
	
	mutate(): void {
		var median = this._probability;
		var deviation = this._probability * BehaviorGene.MUTATION_FACTOR;
		this._probability = Utils.normalRandom(median, deviation);
	}
}

export = BehaviorGene;