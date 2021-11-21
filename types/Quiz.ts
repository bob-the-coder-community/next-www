export interface iQuiz {
	status: number
	message: Quiz[]
}

export interface Quiz {
	Difficulty: string
	_id: string
	Date: string
	Question: string
	Options: {
		Correct: boolean,
		_id: string
		Answer: string
		__v: number,
		id: string
	}[],
	id: string;
	Correct: boolean;
	AnswerIndex: number;
}