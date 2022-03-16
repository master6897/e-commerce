
import Navigation from './components/Navigation/Navigation';
import './App.css';
import WelcomePage from './components/Pages/WelcomePage/WelcomePage';
import Footer from './components/Pages/Footer/Footer';
import NotFound from './components/Pages/NotFound/NotFound';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
