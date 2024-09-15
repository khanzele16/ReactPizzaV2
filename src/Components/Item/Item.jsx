import { useState } from 'react'
import './Item.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../Redux/Slices/cartSlice'
import { NavLink } from 'react-router-dom'

const typesCatalog = ['тонкое', 'традиционное']

function Item({ id, title, imageUrl, price, types, sizes }) {
	const cart = useSelector(state => state.cart.items)
	const [ type, setType ] = useState(0)
	const [ size, setSize ] = useState(0)
	const isCountedAlready = cart?.find(obj => obj.id == id) ? cart?.find(obj => obj.id == id).count : 0
	const [ countItem, setCountItem ] = useState(isCountedAlready)
	const dispatch = useDispatch()
	return (
		<div className='Item'>
			<NavLink to={`/pizza/${id}`}>
			<div className='Item-image'>
				<img src={imageUrl} alt='' />
			</div>
			<h3 id='item-title'>{title}</h3>
			</NavLink>
			<div className='Item-sorting'>
				<ul id='item-sorting-types'>
					{
						types.map((el, index) => (
							<li
							onClick={() => setType(index)}
							key={index}
							id={type == index ? 'item-sorting-types-active' : ''}
							>
								{typesCatalog[el]}
							</li>
						))
					}
				</ul>
				<ul id='item-sorting-sizes'>
				{
						sizes.map((el, index) => (
							<li 
							onClick={() => setSize(index)}
							key={index}
							id={size == index ? 'item-sorting-sizes-active' : ''}
							>
								{el} см.
							</li>
						))
					}
				</ul>
			</div>
			<div className='Item-bottom'>
				<p id='item-summ'>от {price} ₽</p>
				<button onClick={() => {
					dispatch(addItem({
						id, title, imageUrl, price, size: sizes[size], type: typesCatalog[type]
					}))
					setCountItem(countItem + 1)
				}} id='item-btn-add'>+ Добавить {countItem > 0 ? (<span id='item-count'>{countItem}</span>) : ''}</button>
			</div>
		</div>
	)
}

export default Item
