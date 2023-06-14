import { store } from '..';
import { IQuestion, Quiz } from '../interfaces/Quiz';
import {
	editQuiz,
	setQuizzes,
	deleteQuiz,
	setQuestions,
	setActiveQuiz,
} from '../store/Quiz/actions/QuizActions';
import { ROUTES, apiAddress } from '../utils/consts';

export const fetchQuizzes = async () => {
	try {
		const response = await fetch(`${apiAddress}${ROUTES.QUIZZES}`);
		const quizzes = await response.json();
		store.dispatch(setQuizzes(quizzes));
	} catch (error) {
		console.error('Error fetching quizzes:', error);
	}
};

export const addQuiz = async (quiz: Quiz) => {
	try {
		await fetch(`${apiAddress}${ROUTES.QUIZZES}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(quiz),
		});
		store.dispatch(editQuiz(quiz));
	} catch (error) {
		console.error('Error adding quiz:', error);
	}
};

export const removeQuiz = async (id: number) => {
	try {
		const res = await fetch(`${apiAddress}${ROUTES.QUIZZES}/${id}`, {
			method: 'DELETE',
		});
		if (res.status === 200) {
			store.dispatch(deleteQuiz(id));
		} else {
			throw new Error('Error deleting this quiz');
		}
	} catch (error) {
		console.error(error);
	}
};

export const updateQuiz = async (quiz: Quiz) => {
	try {
		await fetch(`${apiAddress}${ROUTES.QUIZZES}/${quiz.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(quiz),
		});
		store.dispatch(editQuiz(quiz));
	} catch (error) {
		console.error('Error updating quiz:', error);
	}
};

export const getQuiz = async (id: number) => {
	try {
		const response = await fetch(`${apiAddress}${ROUTES.QUIZZES}/${id}`);
		const quiz = await response.json();
		store.dispatch(setActiveQuiz(quiz));
	} catch (error) {
		console.error('Error getting quiz:', error);
	}
};

export const getQuestions = async () => {
	try {
		const response = await fetch(`${apiAddress}${ROUTES.QUESTIONS}`);
		const data = await response.json();
		const allQuestions: IQuestion[] = [];
		data.quizzes.forEach((quiz: Quiz) => {
			quiz.questions.forEach((question: IQuestion) => {
				allQuestions.push(question);
			});
		});
		store.dispatch(setQuestions(allQuestions));
	} catch (error) {
		console.error('Error getting questions:', error);
	}
};

export const addQuestion = async (quiz: Quiz) => {
	try {
		await fetch(`${apiAddress}${ROUTES.QUESTIONS}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(quiz.questions),
		});
	} catch (error) {
		console.error('Error adding question:', error);
	}
};
