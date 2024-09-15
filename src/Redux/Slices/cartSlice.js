import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: JSON.parse(window.localStorage.getItem('items')) || []
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart(state) {
			state.items = []
		},
		minusItem(state, action) {
			state.items = state.items.map((el) => {
				if (el.id === action.payload.id && el.type === action.payload.type && el.size === action.payload.size) {
					const { count, ...elData } = el
					return {...elData, count: count - 1}
				} else {
					return el
				}
			})
		},
		addItem(state, action) {
			const existingPizza = state.items.find((item) => (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size));
			if (existingPizza) {
				state.items = state.items.map((item) =>
				item.id === action.payload.id ? { ...item, count: item.count + 1 } : item
			);
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}
		},
		removeItem(state, action) {
			const filter = {
				id: action.payload.id,
				type: action.payload.type,
				size: action.payload.size
			}
			state.items = state.items.filter(item => !Object.keys(filter).every(key => filter[key] === item[key]))
		}
	}
})

export const { addItem, minusItem, clearCart, removeItem } = cartSlice.actions

export default cartSlice.reducer