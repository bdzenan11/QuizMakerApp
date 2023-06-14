import { IQuestion, Quiz } from '../../interfaces/Quiz';

export interface QuizReducerInitialState {
	quizzes: Quiz[];
	activeQuiz: Quiz;
	questions: IQuestion[];
}
