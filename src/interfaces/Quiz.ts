export interface Quiz {
	id: number | null;
	name: string;
	questions: IQuestion[];
}

export interface IQuestion {
	id: number;
	question: string;
	answer: string;
}
