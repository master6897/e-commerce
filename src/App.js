
import Navigation from './components/Navigation/Navigation';
import './App.css';
import WelcomePage from './components/Pages/WelcomePage/WelcomePage';
import Footer from './components/Pages/Footer/Footer';
import NotFound from './components/Pages/NotFound/NotFound';
import NewProduct from './components/Products/NewProduct';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import {Routes, Route} from 'react-router-dom';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/details/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
