import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef SurveyEntry
 * @prop {string} name
 * @prop {number} age
 * @prop {"male" | "female"} gender
 * @prop {"0" | "1"} smoking
 * @prop {string[]} brand
 */

/**
 * @typedef SurveyState
 * @prop {SurveyEntry[]} entries
 */

/** @type {SurveyState} */
const initialState = { entries: [] };

const surveySlice = createSlice({
	name: "survey",
	initialState,
	reducers: {
		addEntry(state, action) {
			state.entries.push(action.payload);
			return state;
		},
		removeEntry(state, action) {
			state.entries.splice(action.payload, 1);
			return state;
		},
	},
});

export const { addEntry, removeEntry } = surveySlice.actions;
export default surveySlice.reducer;
