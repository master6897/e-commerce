
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
import ScrollToTop from './components/helpers/ScrollToTop/ScrollToTop';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Profile from './components/Pages/Profile/Profile';
import { useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLoggedIn);
  const expiresIn = useSelector(state => state.auth.expires);
  setTimeout(() => {
    dispatch(authActions.logout());
  }, expiresIn);
  return (
    <div className="App">
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        {isLogged && <Route path='/new-product' element={<NewProduct />} />}
        <Route path='/products' element={<Products />} />
        <Route path='/products/details/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        {!isLogged && <Route path='/register' element={<Register />} />}
        {isLogged && <Route path='/profile' element={<Profile />} />}
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
