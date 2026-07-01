
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'
import './App.css';
import Homepage from './pages/Homepage'
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App;
