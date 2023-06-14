export const apiAddress = 'http://localhost:5000';

export enum ROUTES {
	HOME = '/',
	QUIZZES = '/quizzes',
	PLAY = '/play',
	QUESTIONS = '/questions',
}

export enum COMMON {
	HOME = 'HOME',
	ABOUT = 'ABOUT',
	DELETE = 'DELETE',
	PLAY = 'PLAY',
	CANCEL = 'CANCEL',
	SAVE = 'SAVE',
	SELECT = 'SELECT',
	BACK = 'Go back',
}

export enum HOME {
	TITLE = 'QUIZ MAKER APP',
	EXPLORE = 'EXPLORE QUIZZES',
}

export enum QUIZ {
	ADD = 'ADD NEW QUIZ',
	REVEAL = 'REVEAL ANSWER',
	NEXT = 'NEXT QUESTION',
	PREVIOUS = 'PREVIOUS QUESTION',
	RETURN = 'RETURN TO QUIZZES',
	NEW = 'NEW QUESTION',
	QUIZZES = 'QUIZZES',
	QUESTION = 'Question',
	FINISHED = 'Quiz finished',
	ANSWER = 'Answer',
	QUESTIONS = 'Questions',
	EXISTING = 'Add from existing questions...',
}

export enum CONFIRMATION {
	CONFIRM = 'Are you sure you want to delete this quiz?',
	TITLE = 'Confirm quiz delete',
}
