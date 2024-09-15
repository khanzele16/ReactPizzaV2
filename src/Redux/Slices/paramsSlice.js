import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	page: 1,
	sort: null,
	category: null,
	search: '',
}

const paramsSlice = createSlice({
	name: 'params',
	initialState,
	reducers: {
		changePage(state, action) {
			state.page = action.payload
		},
		changeSort(state, action) {
			state.sort = action.payload
		},
		changeCategory(state, action) {
			state.category = action.payload
			state.page = 1
		},
		changeSearch(state, action) {
			state.search = action.payload
			state.page = 1
		},
		changeParams(state, action) {
			state.page = action.payload.page
			state.sort = action.payload.sort
			state.category = action.payload.category
			if (action?.payload?.search) { 
				state.search = action.payload.search
			}
		},
		clearSearch(state) {
			state.search = ''
		}
	}
})

export const { changePage, changeSort, changeCategory, changeSearch, clearSearch, changeParams } = paramsSlice.actions

export default paramsSlice.reducer