import Utils = require('Utils')

class Genetics {
	static MUTATION = 0.05;

	static combineGenes(dadGenes, momGenes): Object {
		var genes = {};

		for (var gene in dadGenes) {
			genes[gene] = Genetics.combineGene(dadGenes[gene], momGenes[gene]);
		}

		return genes;
	}

	static combineGene(dadGene: number, momGene: number): number {
		return (dadGene + momGene) * Utils.normalRandom(0.5, Genetics.MUTATION);
	}
}