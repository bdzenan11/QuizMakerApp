import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { State } from '../store/rootReducer';
import { getActiveQuiz, getQuestions } from '../store/Quiz/selectors/QuizSelectors';
import { Box, Modal, Typography, Stack, IconButton } from '@mui/material';
import { IQuestion } from '../interfaces/Quiz';
import { Question } from './Question';
import { modalStyle } from '../utils/styles';
import { addQuiz, updateQuiz } from '../API/API';
import { COMMON, QUIZ } from '../utils/consts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

export const QuizForm = (props: { handleClose: () => void; open: boolean }) => {
	const { handleClose, open } = props;
	const allQuestions = useSelector((state: State) => getQuestions(state));

	const activeQuiz = useSelector((state: State) => getActiveQuiz(state));

	const [questions, setQuestions] = useState<IQuestion[]>(
		activeQuiz.id !== null
			? activeQuiz!.questions
			: [{ id: allQuestions.length + 1, question: '', answer: '' }]
	);
	const [title, setTitle] = useState(activeQuiz ? activeQuiz.name : '');

	const [isSavingDisabled, setIsSavingDisabled] = useState(false);
	const [selectFromAll, setSelectFromAll] = useState<boolean>(false);

	useEffect(() => {
		setQuestions(
			activeQuiz.id == null
				? [{ id: allQuestions.length + 1, question: '', answer: '' }]
				: activeQuiz!.questions
		);
		setTitle(activeQuiz ? activeQuiz.name : '');
	}, [activeQuiz, allQuestions.length]);

	useEffect(() => {
		const isFormValid = questions.every(
			(question) => question.question !== '' && question.answer !== ''
		);
		setIsSavingDisabled(!isFormValid);
	}, [questions]);

	const handleQuestionChange = (index: number, updatedQuestion: IQuestion) => {
		setQuestions((prevQuestions) => {
			const updatedQuestions = [...prevQuestions];
			updatedQuestions[index] = updatedQuestion;
			return updatedQuestions;
		});
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleDeleteQuestion = (index: number) => {
		setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
	};

	const handleSave = () => {
		if (!isSavingDisabled) {
			const updatedQuiz = { id: activeQuiz.id, name: title, questions: questions };
			activeQuiz.id ? updateQuiz(updatedQuiz) : addQuiz(updatedQuiz);
			handleClose();
		}
	};

	const renderQuestions = questions.map((question, index) => (
		<Question
			key={index}
			questionNumber={index}
			question={question}
			onChangeQuestion={handleQuestionChange}
			onDeleteQuestion={handleDeleteQuestion}
			questionCount={questions.length}
		/>
	));

	const allQuestionsList = allQuestions.map((question, index) => (
		<Box key={index} className="question-container">
			<Box>{question.question}</Box>
			<Box>{question.answer}</Box>
			<Box
				className="select-button"
				onClick={() => {
					setQuestions((prevQuestions) => [...prevQuestions, question]);
					setSelectFromAll(false);
				}}
			>
				{COMMON.SELECT}
			</Box>
		</Box>
	));

	return (
		<Modal
			open={open}
			onClose={() => {
				handleClose();
				setSelectFromAll(false);
			}}
		>
			{!selectFromAll ? (
				<Box sx={modalStyle} className="quiz_form">
					<Stack spacing={2}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography variant="h4">{activeQuiz?.name}</Typography>
							<CloseIcon
								onClick={() => {
									handleClose();
								}}
								sx={{ cursor: 'pointer' }}
							></CloseIcon>
						</Box>
						<TextField
							id="outlined-basic"
							label="Quiz Name"
							variant="outlined"
							defaultValue={activeQuiz?.name}
							onChange={handleTitleChange}
							required={true}
							className="quiz_form-input"
							fullWidth
						/>
						<Typography variant="h6">{QUIZ.QUESTIONS}</Typography>
						<Box>{renderQuestions}</Box>
						<Box className="quiz_form-button-wrapper">
							<Button
								variant="contained"
								className="quiz_form-button"
								onClick={() => {
									setQuestions((prevQuestions) => [
										...prevQuestions,
										{ id: prevQuestions.length + 1, question: '', answer: '' },
									]);
								}}
							>
								{QUIZ.NEW}
							</Button>
							<Button
								variant="contained"
								className="quiz_form-button"
								onClick={handleSave}
								disabled={isSavingDisabled}
								sx={{ ...(isSavingDisabled && { opacity: 0.5, cursor: 'not-allowed' }) }}
							>
								{COMMON.SAVE}
							</Button>
						</Box>
						<Box
							sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
							onClick={() => {
								setSelectFromAll(true);
							}}
						>
							{QUIZ.EXISTING}
						</Box>
					</Stack>
				</Box>
			) : (
				<Box sx={modalStyle} className="quiz_form">
					{allQuestionsList}
					<IconButton
						onClick={() => {
							setSelectFromAll(false);
						}}
						sx={{ fontSize: '18px' }}
					>
						<ArrowBackIcon></ArrowBackIcon>
						{COMMON.BACK}
					</IconButton>
				</Box>
			)}
		</Modal>
	);
};
