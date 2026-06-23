import { createSlice } from "@reduxjs/toolkit";

const surveySlice = createSlice({
	name: "survey",
	initialState: { entries: [] },
	reducers: {
		addEntry(state, action) {
			state.entries.push(action.payload);
		},
	},
});

export const { addEntry } = surveySlice.actions;
export default surveySlice.reducer;
