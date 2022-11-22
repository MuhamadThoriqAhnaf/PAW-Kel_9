import logo from './logo.svg';
import './App.css';
import Welcome from './pages/Welcome';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Booklist from './pages/Booklist';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';

function App() {
  return (
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Welcome/>} exact/>
      <Route path='/list' element={<Booklist/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/adminpage' element={<AdminPage/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;
