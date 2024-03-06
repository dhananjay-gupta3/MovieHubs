

import { Container } from '@material-ui/core';
import { BrowserRouter ,Route,Router, Routes} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import MainNav from './Components/MainNav';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Search from './Pages/Search';
import Series from './Pages/Series';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="App">
    <Container>
    <Routes>
    <Route path='/' element={<Trending/>} />
    <Route path='/movies' element={<Movies/>} />
    <Route path='/series' element={<Series/>} />
    <Route path='/search' element={<Search/>} />
    </Routes>
    </Container>

    </div>
    
    <MainNav/>
    </BrowserRouter>
  );
}

export default App;
