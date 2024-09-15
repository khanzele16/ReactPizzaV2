import { useEffect, useRef, useState } from 'react'
import './Category.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeCategory } from '../../Redux/Slices/paramsSlice'

const categories = [
	{
		id: 0,
		name: 'Все'
	},
	{
		id: 1,
		name: 'Мясные'
	},
	{
		id: 2,
		name: 'Вегетарианские'
	},
	{
		id: 3,
		name: 'Гриль'
	},
	{
		id: 4,
		name: 'Острые'
	},
	{
		id: 5,
		name: 'Закрытые'
	},
]

function Category() {
	const dispatch = useDispatch()
	const [category, setCategory] = useState(0)
	const categoryState = useSelector(state => state.params.category)
	const isMounted = useRef(false)
	useEffect(() => {
		if (isMounted.current) {
			setCategory(categoryState)
		}
		isMounted.current = true
	}, [categoryState])
	return (
		<ul className='Category'>
		{
			categories.map(
				(el, index) => (
					<li onClick={() => {
						setCategory(index)
						dispatch(changeCategory(index))
					}} id={category == (index) ? 'category-li-active' : ''} key={el.id}>
						<p>{el.name}</p>
					</li>
				)
			)
		}
		</ul>
	)
}

export default Category
