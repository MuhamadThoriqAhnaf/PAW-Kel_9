import logo from './logo.svg';
import './App.css';
import Welcome from './pages/Welcome';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Booklist from './pages/Booklist';
import SignUp from './pages/SignUp';
import AdminPage from './pages/AdminPage';

function App() {
  return (
  <>
  <Router>
    <Routes>
      <Route path='/' element={<Welcome/>} exact/>
      <Route path='/list' element={<Booklist/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/adminpage' elemt={<AdminPage/>}/>
    </Routes>
  </Router>
  </>
  );
}

export default App;
