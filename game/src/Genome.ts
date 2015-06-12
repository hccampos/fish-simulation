import Gene = require('Gene');
import BehaviorGene = require('Gene');
import IPhenotype = require('IPhenotype');

interface GenePair {
	mom: Gene,
	dad: Gene
}

/**
 * Represents the entire genome which is usually stored in a cell
 * of a diploid organism. The genes can be split in half through
 * meiosis and then combined with other genes through fertilization.
 */
class Genome {
	// The pairs of genes for each trait of the organism. That is,
	// for each trait there is a gene coming from the father and
	// another coming from the mother.
	private _genes: { [trait: string]: GenePair } = {};
	
	/**
	 * Combines the genes from the egg with the genes from
	 * the sperm to build up a full genome with gene pairs for
	 * each phenotype trait.
	 * 
	 * @param eggGenes
	 * 		The maternal genes (contained in the egg).
	 * @param spermGenes
	 * 		The paternal genes (contained in the sperm).
	 */
	constructor(eggGenes: Gene[], spermGenes: Gene[]) {
		// Map the gene pairs to their corresponding traits
		// in the phenotype.
		for (var i = 0; i < eggGenes.length; ++i) {
			var momGene: Gene = eggGenes[i];
			var dadGene: Gene = spermGenes[i];
			this._genes[momGene.trait] = {
				mom: momGene,
				dad: dadGene
			};
		}
	}
	
	/**
	 * Builds an initial phenotype based on the genes stored in the
	 * genome.
	 */
	getPhenotype(): IPhenotype {
		var phenotype: IPhenotype = <IPhenotype>{
			behaviors: []
		};
		
		// Pass the values of each gene to the phenotype.
		var traits: string[] = _.keys(this._genes);
		_.forEach(traits, (trait: string) => {
			var gene: Gene = this.getGene(trait);
			
			if (gene instanceof BehaviorGene && gene.value) {
				phenotype.behaviors.push(gene.value);
			} else {
				phenotype[trait] = gene.value;
			}
		});
				
		return <IPhenotype>phenotype;
	}
	
	/**
	 * Gets the gene for the specified trait. It takes dominance
	 * into account.
	 * 
	 * @param trait
	 *		The trait whose gene is to be returned.
	 */
	getGene(trait: string): Gene {
		var pair: GenePair = this._genes[trait];
		
		if (pair.dad.isDominant && pair.mom.isDominant) {
			return this._randomPick(pair);
		} else if (pair.dad.isDominant) {
			return pair.dad;
		} else {
			return pair.mom;
		}
	}
	
	/**
	 * Performs meiosis on the genome and produces a single copy
	 * of the genes (contained in a Gamete) that can then be used 
	 * to create another genome through fertilization with another 
	 * set of genes.
	 */
	meiosis(): Gene[] {
		var genes: Gene[] = [];
		
		_.forEach(this._genes, (pair: GenePair, trait: string) => {
			var pickedGene: Gene = this._randomPick(pair);
			// Introduce some (hopefully good!) mutations.
			pickedGene.mutate();
			genes.push(pickedGene);
		});
		
		return genes;
	}
	
	/**
	 * Randomly picks one gene from a gene pair.
	 * 
	 * @param pair
	 * 		The pair of genes from which to pick.
	 * 
	 * @returns The gene that was picked.
	 */
	private _randomPick(pair: GenePair): Gene {
		return Math.random() > 0.5 ? pair.dad : pair.mom;
	}
}

export = Genome;