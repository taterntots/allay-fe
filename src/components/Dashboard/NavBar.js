import React from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import { Flex, Button, Avatar } from '@chakra-ui/core';

export default function NavBar({ history, isLoading }) {
	// use to navigate to review form
	const navToReviewForm = () => {
		history.push('/dashboard/add-review');
		ReactGA.event({
			category: 'Review',
			action: `Add new review`
		});
	};

	return (
		<Flex
			maxW='1440px'
			w='100%'
			px='40px'
			background='#FFFFFF'
			top='0'
			position='fixed'
			overflow='hidden'
			zIndex='999'
			direction='column'
		>
			<Flex align='center' justify='space-between' pt='2%'>
				<Flex align='center'>
					<Avatar mr='12%' size='lg' src='https://bit.ly/broken-link' />
					<h1> Allay </h1>
				</Flex>

				<Flex align='center'>
					<Button
						variantColor='teal'
						rounded='6px'
						border='none'
						size='lg'
						isLoading={isLoading}
						onClick={navToReviewForm}
					>
						Add A Review
					</Button>
				</Flex>
			</Flex>
			<Flex align='center' pr='25px' justify='flex-end' padding='1.5% 0'>
				{/* <Button
            variantColor='teal'
            rounded='6px'
            border='none'
            size='lg'
            isLoading={isLoading}
            onClick={navToReviewForm}
          >
            Add A Review
          </Button> */}
			</Flex>
			<Flex align='center' justify='flex-start'>
				{window.location.href.includes('dashboard/') ? (
					<Flex as='h2' fontSize='32px' display='none'>
						Recent Posts
					</Flex>
				) : (
					<Flex as='h2' fontSize='32px'>
						Recent Posts
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}