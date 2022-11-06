import logo from './logo.svg';
import './App.css';
import Welcome from './pages/Welcome';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Booklist from './pages/Booklist';

function App() {
  return (
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Welcome/>} exact/>
      <Route path='/list' element={<Booklist/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;
