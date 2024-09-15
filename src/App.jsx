import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Main from './Pages/Main/Main'
import Cart from './Pages/Cart/Cart'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import FItem from './Pages/FItem/FItem'
import NotFound from './Pages/NotFound/NotFound'
import qs from 'qs'
import { changeParams } from './Redux/Slices/paramsSlice'

function App() {
  const page = useSelector(state => state.params.page)
  const sort = useSelector(state => state.params.sort)
  const category = useSelector(state => state.params.category)
  const search = useSelector(state => state.params.search)
  const items = useSelector(state => state.cart.items)
  const isMountedQuery = useRef(false)
  const isMountedStorage = useRef(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (isMountedQuery.current) {
      const queryString = qs.stringify({
        page, sort, category
      })
      navigate(`?${queryString}${search ? `&search=${search}` : ''}`)
    }
  }, [page, sort, category, search])
  useEffect(() => {
    if (window.location.search) {
      const queryObject = qs.parse(window.location.search.substring(1))
      dispatch(changeParams(queryObject))
    }
    isMountedQuery.current = true
  }, [])
  useEffect(() => {
  if (isMountedStorage.current) {
    window.localStorage.setItem('items', JSON.stringify(items))
  }
  isMountedStorage.current = true
  }, [items])
  return (
    <div className='App'>
      <div className='App-content'>
        <Header/>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pizza/:id' element={<FItem />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
      <Toaster position='top-right' reverseOrder={true} />
    </div>
  )
}

export default App
