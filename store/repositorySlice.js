import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	repositoryState: [],
};

// Actual Slice
export const repositorySlice = createSlice({
	name: 'repository',
	initialState,
	reducers: {
		setRepositoryState(state, action) {
			state.repositoryState = action.payload;
		},
	},
});

export const { setRepositoryState } = repositorySlice.actions;

export const selectRepositoryState = (state) => state.repository.repositoryState;

export default repositorySlice.reducer;
