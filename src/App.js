
import Navigation from './components/Navigation/Navigation';
import './App.css';
import WelcomePage from './components/Pages/WelcomePage/WelcomePage';
import Footer from './components/Pages/Footer/Footer';
import NotFound from './components/Pages/NotFound/NotFound';
import NewProduct from './components/Products/NewProduct';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/new-product' element={<NewProduct />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
