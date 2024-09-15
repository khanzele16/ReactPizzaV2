import { useEffect, useRef, useState } from 'react'
import './Sort.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeSort } from '../../Redux/Slices/paramsSlice'

const sortCatalog = [
	{
		id: 1,
		sortBy: 'rating',
		name: 'популярности (↑)'
	},
	{
		id: 2,
		sortBy: '-rating',
		name: 'популярности (↓)'
	},
	{
		id: 3,
		sortBy: 'price',
		name: 'цене (↑)'
	},
	{
		id: 4,
		sortBy: '-price',
		name: 'цене (↓)'
	},
	{
		id: 5,
		sortBy: 'title',
		name: 'алфавиту (↑)'
	},
	{
		id: 6,
		sortBy: '-title',
		name: 'алфавиту (↓)'
	},
]

function Sort() {
	const [sort, setSort] = useState(1)
	const [sortActive, setSortActive] = useState(false)
	const sortBtn = useRef()
	const sortDiv = useRef()
	const dispatch = useDispatch()
	const sortState = useSelector(state => state.params.sort)
	const isMounted = useRef(false)
	useEffect(() => {
		if (isMounted.current) {
			setSort(sortCatalog.find(el => el.sortBy === sortState)?.id)
		}
		isMounted.current = true
	}, [sortState])
	useEffect(() => {
		const handleClickListener = event => {
			if (
				!event.composedPath().includes(sortBtn.current) &&
				!event.composedPath().includes(sortDiv.current)
			) {
				setSortActive(false)
			}}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<div className='Sort'>
			<div ref={sortBtn} className='Sort-name' onClick={() => setSortActive(!sortActive)}>
				<svg id={sortActive ? 'sort-name-svg-active' : ''} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"></path>
				</svg>
				<p>Сортировка по <span>{sortCatalog[sort - 1]?.name}</span></p>
			</div>
			{ sortActive &&
			<ul ref={sortDiv} className='Sort-catalog'>
				{
					sortCatalog.map((el, index) => (
						<li onClick={() => {
							setSort(index + 1)
							dispatch(changeSort(sortCatalog[index].sortBy))
							setSortActive(false)
						}} id={el.id == sort ? 'sort-catalog-li-active' : ''} key={index}>
							<p>{el.name}</p>
						</li>
					))
				}
			</ul>
			}
		</div>
	)
}

export default Sort
