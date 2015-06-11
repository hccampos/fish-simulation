class Utils {
	static normalRandom(median: number = 0, deviation: number = 1) {
		var random = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
		return median + (random * deviation);
	}
}

export = Utils;