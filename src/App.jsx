import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import AllProduct from './pages/AllProduct'
import ProductDetail from './component/ProductDetail'
import BeautyPage from './pages/BeautyPage'
import FragrancePage from './pages/fragrancePage'
import FurniturePage from './pages/FurniturePage'
import GroceriesPage from './pages/GroceriesPage'
import ContactPage from './pages/ContactPage'
import ContactMe from './pages/ContactMe'


function App() {

  return (
    <>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<AllProduct />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="/beautypage" element={<BeautyPage />} />
            <Route path='/fragrancepage' element={<FragrancePage />} />
            <Route path='/furniturepage' element={<FurniturePage />} />
            <Route path='/groceriespage' element={<GroceriesPage />} />
            <Route path="/contactpage" element={<ContactPage />} />
            <Route path="/contactme" element={<ContactMe />} />
          </Routes> 
        </Router>
    </>
  )
}

export default App
