import { NavLink } from 'react-router-dom'
import './CItem.css'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../Redux/Slices/cartSlice'

function CItem({ id, imageUrl, title, count, price, type, size }) {
	const dispatch = useDispatch()
	return (
		<div className='CItem'>
			<NavLink to={`/pizza/${id}`}>
			<img id='citem-pizza-image' src={imageUrl} alt='' />
			<div className='CItem-info'>
				<h4 id='citem-pizza-title'>{title}</h4>
				<p id='citem-pizza-info'>{type}, {size} см.</p>
			</div>
			</NavLink>
			<div className='CItem-btn'>
				<button onClick={() => {
				if (count == 1) {
					const res = confirm('Вы действительно хотите удалить товар?')
					if (res) {
						dispatch(removeItem({ id, size, type }))
					}
				} else {
					dispatch(minusItem({ id, type, size }))
				}
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
						<path d="M6 12L18 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
				<p id='citem-count'>{count}</p>
				<button onClick={() => {
					dispatch(addItem({ id, imageUrl, title, count, price, size, type }))
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
						<path d="M4 12H20M12 4V20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
			<p id='citem-summ'>{price*count}{' '}₽</p>
			<svg onClick={() => {
				const res = confirm('Вы действительно хотите удалить товар?')
				if (res) {
					dispatch(removeItem({ id, size, type }))	
				}
			}} xmlns="http://www.w3.org/2000/svg" fill="#d7d7d7" version="1.1" id="btn-x" viewBox="0 0 460.775 460.775" >
				<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
			</svg>
		</div>
	)
}

export default CItem
