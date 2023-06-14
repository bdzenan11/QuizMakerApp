import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store/rootReducer';
import { getActiveQuiz, getQuizzes } from '../store/Quiz/selectors/QuizSelectors';
import { setActiveQuiz } from '../store/Quiz/actions/QuizActions';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { COMMON, QUIZ } from '../utils/consts';
import { QuizForm } from './QuizForm';
import { getQuiz } from '../API/API';
import { Box } from '@mui/material';

export default function QuizTable() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const quizState = useSelector((state: State) => getQuizzes(state));
	const activeQuiz = useSelector((state: State) => getActiveQuiz(state));

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

	const [idToDelete, setIdToDelete] = useState<number>(0);

	const handleFormOpen = async (id: number | null) => {
		if (id) {
			await getQuiz(id);
		} else {
			dispatch(setActiveQuiz({ id: null, name: '', questions: [] }));
		}
		setFormOpen(true);
	};

	const handleConfirmationOpen = (id: number | null) => {
		setIdToDelete(id!);
		setDeleteConfirmation(true);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '70px' }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableBody>
						{quizState.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quiz) => {
							return (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={quiz.id}
									onClick={() => handleFormOpen(quiz.id)}
									sx={{ cursor: 'pointer' }}
								>
									<TableCell align="left">{quiz.name}</TableCell>
									<TableCell align="center" sx={{ cursor: 'pointer' }}>
										<IconButton
											onClick={(e) => {
												e.stopPropagation();
												handleConfirmationOpen(quiz.id);
											}}
											sx={{ fontSize: '14px' }}
										>
											<DeleteIcon sx={{ marginRight: '10px' }} />
											{COMMON.DELETE}
										</IconButton>
									</TableCell>
									<TableCell align="center" sx={{ cursor: 'pointer' }}>
										<IconButton
											onClick={(e) => {
												e.stopPropagation();
												navigate(`/play/${quiz.id}`);
											}}
											sx={{ fontSize: '14px' }}
										>
											<PlayCircleOutlineIcon sx={{ marginRight: '10px' }} />
											{COMMON.PLAY}
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					variant="contained"
					sx={{ marginTop: '30px' }}
					onClick={() => {
						handleFormOpen(null);
					}}
					className="explore-button"
				>
					{QUIZ.ADD}
				</Button>
			</Box>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={quizState.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{activeQuiz.id !== 0 && (
				<QuizForm
					open={formOpen}
					handleClose={() => {
						setFormOpen(false);
					}}
				></QuizForm>
			)}
			<ConfirmationDialog
				open={deleteConfirmation}
				handleClose={() => {
					setDeleteConfirmation(false);
				}}
				id={idToDelete}
			></ConfirmationDialog>
		</Paper>
	);
}
