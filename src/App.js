import './style/App.css';

import {
  Routes,
  Route,
} from "react-router-dom";
import AppProvider, { AppContext } from './context/appContext';
import UploadPage from './components/pages/upload';
import SigninPage from './components/pages/signinPage';
import Creator from './components/pages/creator';
import MainPage from './components/pages/mainPage/main';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  // const { theme } = useContext(AppContext) 

  const [theme, setTheme] = useState('light')
  
  return (
    <div className={`${theme}`}>
      <AppProvider theme={theme} setTheme={setTheme}>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/creator" element={<Creator />} />
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
