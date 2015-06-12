import Utils = require('Utils');
import IGene = require('IGene');

class NumericGene implements IGene {
	static MUTATION_FACTOR = 0.05;
	
	trait: string;
	value: any;
	isDominant: boolean;
	
	constructor(trait: string, value: any, isDominant: boolean = false) {
		this.trait = trait;
		this.value = value;
		this.isDominant = isDominant;
	}
	
	mutate(): void {
		var median = this.value;
		var deviation = this.value * Gene.MUTATION_FACTOR;
		this.value = Utils.normalRandom(median, deviation);
	}
}

export = NumericGene;