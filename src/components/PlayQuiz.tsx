import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/rootReducer';
import { getActiveQuiz } from '../store/Quiz/selectors/QuizSelectors';
import { Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { QUIZ, ROUTES, apiAddress } from '../utils/consts';
import { setActiveQuiz } from '../store/Quiz/actions/QuizActions';

export default function PlayQuiz() {
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch();

	const activeQuiz = useSelector((state: State) => getActiveQuiz(state));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				const response = await fetch(`${apiAddress}${ROUTES.QUIZZES}/${params.id}`);
				const quiz = await response.json();
				dispatch(setActiveQuiz(quiz));
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchQuiz();
	}, [dispatch, params.id]);

	const [activeQuestion, setActiveQuestion] = useState<number>(0);
	const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);

	const toggleQuestion = (increment: boolean) => {
		increment ? setActiveQuestion(activeQuestion + 1) : setActiveQuestion(activeQuestion - 1);
	};

	return !loading ? (
		<Box className="play-quiz-wrapper">
			<Paper
				sx={{
					width: '100%',
					overflow: 'hidden',
					marginTop: '64px',
					background: 'linear-gradient(286.22deg,#313137 -.14%,#060607 94.41%);',
					color: '#fff',
					borderRadius: 0,
				}}
				className="play-quiz-paper"
			>
				<Box
					sx={{
						boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
						width: '60%',
						margin: '10% auto',
						padding: '24px',
						textAlign: 'center',
					}}
				>
					<Typography variant="h6" sx={{ marginBottom: '16px' }}>
						{activeQuiz.name}
					</Typography>
					<Typography variant="h6" sx={{ marginBottom: '16px' }}>
						{QUIZ.QUESTION} {activeQuestion + 1}
					</Typography>
					<Typography variant="h6" sx={{ marginBottom: '16px' }}>
						{activeQuiz?.questions[activeQuestion].question}
					</Typography>
					<Typography
						className={`answer ${answerRevealed ? 'reveal' : ''}`}
						sx={{ marginBottom: '16px' }}
					>
						{activeQuiz?.questions[activeQuestion].answer}
					</Typography>
					{activeQuestion !== 0 && (
						<Button
							onClick={() => {
								toggleQuestion(false);
								setAnswerRevealed(true);
							}}
							variant="contained"
							className="quiz_form-button"
						>
							<ArrowBackIcon />
							{QUIZ.PREVIOUS}
						</Button>
					)}
					{!answerRevealed && (
						<Button
							onClick={() => setAnswerRevealed(true)}
							variant="contained"
							className="quiz_form-button"
						>
							{QUIZ.REVEAL}
							<VisibilityIcon />
						</Button>
					)}

					{answerRevealed && activeQuestion !== activeQuiz!.questions.length - 1 && (
						<Button
							onClick={() => {
								setAnswerRevealed(false);
								toggleQuestion(true);
							}}
							variant="contained"
							className="quiz_form-button"
						>
							{QUIZ.NEXT}
							<ArrowForwardIcon />
						</Button>
					)}

					{activeQuestion === activeQuiz!.questions.length - 1 && answerRevealed && (
						<Box sx={{ marginTop: '30px' }}>
							<Typography variant="h2">{QUIZ.FINISHED}</Typography>
							<Button
								variant="contained"
								className="quiz_form-button"
								onClick={() => {
									navigate(ROUTES.QUIZZES);
								}}
								sx={{ marginTop: '32px' }}
							>
								{QUIZ.RETURN}
							</Button>
						</Box>
					)}
				</Box>
			</Paper>
		</Box>
	) : (
		<></>
	);
}
