import Head from 'next/head';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { selectRepositoryState, setRepositoryState } from '../store/repositorySlice';

const Home = () => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const repositories = useSelector(selectRepositoryState);
	console.log('repositories : ', repositories);

	const getListRepository = async (username) => {
		setIsLoading(true);
		try {
			const response = await fetch(`https://api.github.com/users/${username}/repos`);
			const responseJson = await response.json();

			if (responseJson.message === 'Not Found') {
				throw 'Username Not Found';
			}

			dispatch(setRepositoryState(responseJson));
		} catch (error) {
			alert(error ?? 'Something went wrong');
			dispatch(setRepositoryState([]));
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (!username) {
			return alert('Username is required!');
		}
		getListRepository(username);
	};

	let content;

	if (isLoading) {
		content = <p>Loading...</p>;
	} else {
		if ([...repositories].length) {
			content = (
				<div className="grid grid-cols-3 gap-4 mb-8">
					{[...repositories].map((repository) => (
						<Card key={repository.id} repository={repository} />
					))}
				</div>
			);
		} else {
			content = <p>Data Not Found!</p>;
		}
	}

	return (
		<>
		<div>
			<Head>
				<title>Task - GitHub List Repositories</title>
				<meta property="og:title" content="My page title" key="title" />
			</Head>
		</div>
			<main className="px-8 mt-4">
				<div className="flex justify-center">
					<h2 className='px-1 mt-1'>https://github.com/</h2>
					<form onSubmit={handleSearch}>
						<div className="border rounded-lg overflow-hidden">
							<input
								type={'text'}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="focus:outline-none px-1 text-gray-700"
								placeholder="username"
							/>
							<button
								type="submit"
								className="bg-blue-500 text-white  px-5 py-1 transition hover:bg-blue-600"
							>
								Search
							</button>
						</div>
					</form>
				</div>
				<hr className="my-4" />
				{content}
			</main>
		</>
	);
};

export default Home;
