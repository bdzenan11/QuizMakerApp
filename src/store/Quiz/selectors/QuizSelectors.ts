import { State } from '../../rootReducer';

export const getQuizzes = (state: State) => state.QuizReducer.quizzes;

export const getActiveQuiz = (state: State) => state.QuizReducer.activeQuiz;

export const getQuestions = (state: State) => state.QuizReducer.questions;
