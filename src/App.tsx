import './App.css';
import QuizTable from './components/QuizTable';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, setQuizzes } from './store/Quiz/actions/QuizActions';
import PlayQuiz from './components/PlayQuiz';
import { getQuizzes } from './store/Quiz/selectors/QuizSelectors';
import { State } from './store/rootReducer';

import '../src/styles/_all.scss';
import { HomePage } from './components/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/styles';
import { ROUTES, apiAddress } from './utils/consts';
import { store } from '.';

function App() {
	const dispatch = useDispatch();

	const quizState = useSelector((state: State) => getQuizzes(state));
	useEffect(() => {
		fetch(`${apiAddress}${ROUTES.QUIZZES}`)
			.then((response) => response.json())
			.then((quizzes) => {
				store.dispatch(setQuizzes(quizzes));
			});
	}, []);

	useEffect(() => {
		const questions = quizState.flatMap((quiz) => quiz.questions); //(po zavrsteku API-ja poziv /questions)
		dispatch(setQuestions(questions));
	}, [quizState, dispatch]);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<NavigationBar />
				<Routes>
					<Route path={ROUTES.HOME} element={<HomePage />}></Route>
					<Route path={ROUTES.QUIZZES} element={<QuizTable />}></Route>
					<Route path={`${ROUTES.PLAY}/:id`} element={<PlayQuiz />}></Route>
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
