import ReactPaginate from 'react-paginate'
import './Pagination.css'
import { useSelector } from 'react-redux'

function Pagination({ pageCount, handlePageClick }) {
	const currentPage = useSelector(state => state.params.page)
	return (
		<div className='Pagination'>
			<ReactPaginate
				breakLabel="..."
				onPageChange={(event) => {
					handlePageClick(event)
					window.scrollTo(0, 0)
				}}
				pageCount={pageCount}
				forcePage={currentPage > pageCount ? 0 : currentPage - 1}
				nextLabel=">"
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</div>
	)
}

export default Pagination
