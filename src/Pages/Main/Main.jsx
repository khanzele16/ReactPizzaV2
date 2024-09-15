import Sort from '../../Components/Sort/Sort'
import Category from '../../Components/Category/Category'
import './Main.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas } from '../../Redux/Slices/postsSlice'
import Item from '../../Components/Item/Item'
import Loader from '../../Components/Loader/Loader'
import { tabTitle } from '../../utils/tabTitle'
import Pagination from '../../Components/Pagination/Pagination'
import { changePage } from '../../Redux/Slices/paramsSlice'

const loadingArray = [...new Array(8)]

function Main() {
	const dispath = useDispatch()
	const items = useSelector(state => state?.posts?.data?.items)
	const meta = useSelector(state => state?.posts?.data?.meta)
	const status = useSelector(state => state?.posts?.status)
	const sort = useSelector(state => state.params.sort)
	const page = useSelector(state => state.params.page)
	const category = useSelector(state => state.params.category)
	const searchValue = useSelector(state => state.params.search)
	const loadingInstructor = (
		<ul className='Main-catalog'>
			{
				loadingArray.map((el, index) => <li key={index}><Loader /></li>)
			}
		</ul>
	)
	const errorInstructor = (
		<div className='Main-catalog-none'>
			<img src='https://emojigraph.org/media/apple/melting-face_1fae0.png' alt='' />
			<div className='Main-catalog-none-info'>
				<h2>Произошла ошибка.</h2>
				<p>К сожалению, не удалось получить питсы.<br />Попробуйте повторить попытку позже.</p>
			</div>
		</div>
		)
	const noneInstructor = (
	<div className='Main-catalog-none'>
		<img src='https://emojigraph.org/media/apple/melting-face_1fae0.png' alt='' />
		<div className='Main-catalog-none-info'>
			<h2>Видимо пицц по вашим запросам<br />— не существует</h2>
		</div>
	</div>
	)
	const fulfilledInstructor = (
		<ul className='Main-catalog'>
			{
				items?.map((el, index) => (
					<Item key={index} {...el} />
				))
			}
		</ul>
	)
	useEffect(() => {
		dispath(fetchPizzas({ sort, category, searchValue, page }))
	}, [sort, category, searchValue, page])
	tabTitle('Пиццы на ваш выбор — React Pizza')
	return (
		<div className='Main'>
			<div className='Main-params'>
				<Category />
				<Sort />
			</div>
			<h2 id='main-title'>Пиццы</h2>
			{
				status == 'loading' ? loadingInstructor :
				status == 'loaded' && items?.length > 0 ? fulfilledInstructor :
				status == 'error' && errorInstructor
			}
			{
				status == 'loaded' && items?.length === 0 && noneInstructor
			}
			{
				status == 'loaded' &&
				<Pagination handlePageClick={(event) => {
					dispath(changePage(event.selected + 1))
				}} pageCount={meta?.total_pages} pageRangeDisplayed={meta?.current_page} />
			}
		</div>
	)
}

export default Main
