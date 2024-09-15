import { useDispatch, useSelector } from 'react-redux'
import { fetchPizza } from '../../Redux/Slices/postsSlice'
import { useParams } from 'react-router-dom'
import './FItem.css'
import { useEffect, useState } from 'react'
import { tabTitle } from '../../utils/tabTitle'
import { addItem } from '../../Redux/Slices/cartSlice'

const typesCatalog = ['тонкое', 'традиционное']
const sizes = [26, 30, 40]

function FItem() {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart.items)
	const [ type, setType ] = useState(0)
	const [ size, setSize ] = useState(0)
	const { id } = useParams()
	const pizza = useSelector(state => state.posts.data)
	const status = useSelector(state => state.posts.status)
	const isCountedAlready = cart?.find(obj => obj.id == id) ? cart?.find(obj => obj.id == id).count : 0
	const [ countItem, setCountItem ] = useState(isCountedAlready)
	const imageUrl = pizza?.imageUrl?.replace('/r:292x292', '/r:1280x1280')
	useEffect(() => {
		if (status === 'loading') {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: hidden; margin-right: 15px'
		} else {
			document.getElementsByTagName('body')[0].style =
				'overflow-y: scroll; margin-right: 0px'
		}
	}, [status])
	useEffect(() => {
		dispatch(fetchPizza({ id }))
	}, [])
	tabTitle(`Пицца ${pizza?.title} — React Pizza`)
	return (
		<div className='FItem'>
			{
				status === 'loading' &&
				<div className='FItem-loading'>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
						<path d="M12 2.99988V5.99988M12 20.9999V17.9999M4.20577 16.4999L6.80385 14.9999M21 11.9999H18M16.5 19.7941L15 17.196M3 11.9999H6M7.5 4.20565L9 6.80373M7.5 19.7941L9 17.196M19.7942 16.4999L17.1962 14.9999M4.20577 7.49988L6.80385 8.99988" stroke="#fe5f1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</div>
			}
				<div className='FItem-content'>
				{
					status === 'loaded' &&
					<>
					<img src={imageUrl} alt='' />
					<div className='FItem-content-info'>
						<h3 id='fitem-title'>{pizza?.title}</h3>
						<p id='fitem-info'>{pizza?.info}</p>
						<div className='FItem-content-sorting'>
							<ul id='fitem-sorting-types'>
							{
								pizza?.types?.map((el, index) => (
									<li
									onClick={() => setType(index)}
									key={index}
									id={type == index ? 'fitem-sorting-types-active' : ''}
									>
										{typesCatalog[el]}
									</li>
								))
							}
							</ul>
							<ul id='fitem-sorting-sizes'>
							{
								pizza?.sizes?.map((el, index) => (
									<li 
									onClick={() => setSize(index)}
									key={index}
									id={size == index ? 'fitem-sorting-sizes-active' : ''}
									>
										{el} см.
									</li>
								))
							}
							</ul>
						</div>
						<div className='FItem-content-bottom'>
							<p id='fitem-summ'>от {pizza?.price} ₽</p>
							<button onClick={() => {
								dispatch(addItem({
									id: pizza?.id, title: pizza?.title, imageUrl: pizza?.imageUrl, price: pizza?.price, size: sizes[size], type: typesCatalog[type]
								}))
								setCountItem(countItem + 1)
							}} id='fitem-btn-add'>+ Добавить {countItem > 0 ? (<span id='fitem-count'>{countItem}</span>) : ''}</button>
						</div>
					</div>
					</>
				}
				</div>
		</div>
	)
}

export default FItem
