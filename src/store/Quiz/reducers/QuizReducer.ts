import { Action } from '../QuizActionInterfaces';
import { QuizActionTypes } from '../QuizActionTypes';
import { QuizReducerInitialState } from '../QuizReducerInterfaces';

const initialState: QuizReducerInitialState = {
	quizzes: [],
	questions: [],
	activeQuiz: { id: 0, name: '', questions: [] },
};

const reducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case QuizActionTypes.SET_QUIZZES:
			return {
				...state,
				quizzes: action.payload,
			};

		case QuizActionTypes.SET_QUIZ:
			return {
				...state,
				quizzes: action.payload.id
					? state.quizzes.map((quiz) =>
							quiz.id === action.payload.id ? { ...action.payload } : quiz
					  )
					: [
							...state.quizzes,
							{
								id: state.quizzes.length ? state.quizzes[state.quizzes.length - 1].id! + 1 : 1,
								name: action.payload.name,
								questions: action.payload.questions,
							},
					  ],
			};

		case QuizActionTypes.DELETE_QUIZ:
			return {
				...state,
				quizzes: [...state.quizzes.filter((quiz) => quiz.id !== action.payload)],
			};

		case QuizActionTypes.SET_ACTIVE_QUIZ:
			return {
				...state,
				activeQuiz: action.payload,
			};
		case QuizActionTypes.SET_QUESTIONS:
			return {
				...state,
				questions: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
