import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { IQuestion } from '../interfaces/Quiz';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { QUIZ } from '../utils/consts';
import { Box } from '@mui/material';

export const Question = (props: {
	questionNumber: number;
	question: IQuestion;
	onChangeQuestion: (index: number, question: IQuestion) => void;
	onDeleteQuestion: (index: number) => void;
	questionCount: number;
}) => {
	const { questionNumber, question, onChangeQuestion, onDeleteQuestion, questionCount } = props;

	const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedQuestion = { ...question, question: event.target.value };
		onChangeQuestion(questionNumber, updatedQuestion);
	};

	const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const updatedQuestion = { ...question, answer: event.target.value };
		onChangeQuestion(questionNumber, updatedQuestion);
	};
	const handleDeleteQuestion = () => {
		onDeleteQuestion(questionNumber);
	};

	return (
		<Paper sx={{ padding: '16px', marginBottom: '16px' }} className="question">
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<h3 style={{ margin: '0' }}>
					{' '}
					{QUIZ.QUESTION}
					{questionNumber + 1}
				</h3>
				{questionCount > 1 && (
					<Box>
						<IconButton sx={{ margin: 0, padding: 0 }} onClick={handleDeleteQuestion}>
							<DeleteIcon sx={{ color: '#ff907f', opacity: 0.7 }} />
						</IconButton>
					</Box>
				)}
			</Box>
			<TextField
				id={`question-${questionNumber}`}
				label="Question"
				variant="outlined"
				value={question.question}
				onChange={handleQuestionChange}
				className="question_input"
			/>
			<TextField
				id={`answer-${questionNumber}`}
				label="Answer"
				variant="outlined"
				value={question.answer}
				onChange={handleAnswerChange}
				className="question_input"
			/>
		</Paper>
	);
};
