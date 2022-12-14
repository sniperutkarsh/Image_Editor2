import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import ImageEditor from './components/ImageEditor';
import Auth from './components/Auth';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element= {<Navigate to="/login" />} path='/'/>
          <Route element= {<Login></Login>} path='login'/>
          <Route element= {<Signup></Signup>} path='signup'/>
          <Route element= {
          <Auth>
            <ImageEditor/>
          </Auth>
          } path='editor'/>
          
        

        </Routes>
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
