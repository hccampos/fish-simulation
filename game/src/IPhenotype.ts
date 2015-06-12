import IBehavior = require('behaviors/IBehavior');

interface IPhenotype {
	behaviors: IBehavior[];
	gender: number;
	width: number;
	length: number;
	density: number;
	lookRange: number;
	widthGrowth: number;
	lengthGrowth: number;
	vegetarian: number;
	carnivore: number;
	colorR: number;
	colorG: number;
	colorB: number;
}

export = IPhenotype;