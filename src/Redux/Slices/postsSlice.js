import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('posts/fetchPizzas', async (params) => {
	const { data } = await axios.get(`https://293fff7bcd105e86.mokky.dev/pizzas?${params.sort ? `sortBy=${params.sort}` : ''}${params.category ? (params.category == 0 ? '' : `&category=${params.category}`) : ''}${params.searchValue ? `&title=*${params.searchValue}*` : ''}&limit=8&page=${params.page}`)
	return data
})
export const fetchPizza = createAsyncThunk('posts/fetchPizza', async (params) => {
	const { data } = await axios.get(`https://293fff7bcd105e86.mokky.dev/pizzas?id=${params.id}`)
	return data
})

const initialState = {
	data: null,
	status: 'loading',
}

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchPizzas.pending, state => {
			state.data = null
			state.status = 'loading'
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.data = action.payload
			state.status = 'loaded'
		})
		builder.addCase(fetchPizzas.rejected, state => {
			state.data = null
			state.status = 'error'
		})
		builder.addCase(fetchPizza.pending, state => {
			state.data = null
			state.status = 'loading'
		})
		builder.addCase(fetchPizza.fulfilled, (state, action) => {
			state.data = {...action?.payload[0]}
			state.status = 'loaded'
		})
		builder.addCase(fetchPizza.rejected, state => {
			state.data = null
			state.status = 'error'
		})
	}
})

export default postsSlice.reducer