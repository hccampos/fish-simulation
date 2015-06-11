interface IPhenotype {
	minSpeed: number;
	maxSpeed: number;
	maxForce: number;
	maxDirChange: number;
	lookRange: number;
	length: number;
	width: number;
	lengthGrowth: number;
	widthGrowth: number;
	density: number;
	initialEnergy: number;
	energyDecay: number;
	fertility: number;
	fertilityGrowth: number;
	breedDistance: number;
	breedEnergyFactor: number;
	colorRed: number;
	colorGreen: number;
	colorBlue: number;
}

export = IPhenotype;