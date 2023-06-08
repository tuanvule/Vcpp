import './style/App.css';

import {
  Routes,
  Route,
} from "react-router-dom";
import AppProvider from './context/appContext';
import UploadPage from './components/pages/upload';
import SigninPage from './components/pages/signinPage';
import Creator from './components/pages/creator';
import MainPage from './components/pages/mainPage/main';

function App() {
  
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/creator" element={<Creator />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
