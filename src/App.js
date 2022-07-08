import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './pages/Home';
import Backups from './pages/Backups'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backups" element={<Backups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
