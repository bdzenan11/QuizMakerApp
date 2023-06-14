import { Action } from '../QuizActionInterfaces';
import { QuizActionTypes } from '../QuizActionTypes';
import { IQuestion, Quiz } from '../../../interfaces/Quiz';

export const setQuizzes = (data: Quiz[]): Action => ({
	type: QuizActionTypes.SET_QUIZZES,
	payload: data,
});

export const editQuiz = (data: Quiz): Action => ({
	type: QuizActionTypes.SET_QUIZ,
	payload: data,
});

export const deleteQuiz = (data: number): Action => ({
	type: QuizActionTypes.DELETE_QUIZ,
	payload: data,
});

export const setActiveQuiz = (data: Quiz): Action => ({
	type: QuizActionTypes.SET_ACTIVE_QUIZ,
	payload: data,
});

export const setQuestions = (data: IQuestion[]): Action => ({
	type: QuizActionTypes.SET_QUESTIONS,
	payload: data,
});
