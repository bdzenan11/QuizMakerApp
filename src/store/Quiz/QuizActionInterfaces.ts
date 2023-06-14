import { IQuestion, Quiz } from '../../interfaces/Quiz';
import { QuizActionTypes } from './QuizActionTypes';

interface SetQuizzes {
	type: QuizActionTypes.SET_QUIZZES;
	payload: Quiz[];
}

interface SetQuiz {
	type: QuizActionTypes.SET_QUIZ;
	payload: Quiz;
}

interface DeleteQuiz {
	type: QuizActionTypes.DELETE_QUIZ;
	payload: number;
}

interface SetctiveQuiz {
	type: QuizActionTypes.SET_ACTIVE_QUIZ;
	payload: Quiz;
}

interface SetQuestion {
	type: QuizActionTypes.SET_QUESTIONS;
	payload: IQuestion[];
}

export type Action = SetQuizzes | SetQuiz | DeleteQuiz | SetctiveQuiz | SetQuestion;
