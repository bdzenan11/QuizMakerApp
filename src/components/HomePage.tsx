import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { HOME, ROUTES } from '../utils/consts';
import { Box } from '@mui/material';

export const HomePage = () => {
	const navigate = useNavigate();
	const imageRef = useRef(null);

	useEffect(() => {
		const imageElement = imageRef.current;
		const timeline = gsap.timeline({ repeat: -1 });

		timeline
			.to(imageElement, {
				rotation: -30,
				duration: 1,
				ease: 'power2.out',
			})
			.to(imageElement, {
				rotation: 0,
				duration: 1,
				ease: 'power2.out',
			})
			.to(imageElement, {
				rotation: 30,
				duration: 1,
				ease: 'power2.out',
			})
			.to(imageElement, {
				rotation: 0,
				duration: 1,
				ease: 'power2.out',
			});
	}, []);

	return (
		<Box className="homepage-wrapper">
			<Box className="quiz-title">{HOME.TITLE}</Box>
			<Box
				className="image-container"
				sx={{ display: 'flex', width: '100%', justifyContent: 'center', opacity: 0.8 }}
			>
				<img ref={imageRef} src="question-mark.png" alt="Animated" />
			</Box>
			<Box
				className="explore"
				onClick={() => {
					navigate(ROUTES.QUIZZES);
				}}
			>
				<Button className="explore-button">{HOME.EXPLORE}</Button>
			</Box>
		</Box>
	);
};
