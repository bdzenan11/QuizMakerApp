import { combineReducers } from 'redux';
import QuizReducer from './Quiz/reducers/QuizReducer';

const rootReducer = combineReducers({
	QuizReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
