interface IGene {
	trait: string;
	value: any;
	isDominant: boolean;	
	mutate(): void;
}

export = IGene;