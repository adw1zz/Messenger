import './styles/App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import { AuthorizationContext } from './context/context';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  return (
    <AuthorizationContext.Provider value={{ nav: navigate, user: userData }}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login setUserData={setUserData}/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthorizationContext.Provider>
  )
}

export default App; 
