import { configureStore } from '@reduxjs/toolkit';
import { repositorySlice } from './repositorySlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
	configureStore({
		reducer: {
			[repositorySlice.name]: repositorySlice.reducer,
		},
		devTools: true,
	});

export const wrapper = createWrapper(makeStore);
