import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom'

import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

function App() {

  const [mode, setMode] = useState(false);

  return (
    <Router>
      <div className={`container ${mode ? 'dark' : ''}`}>
        <div className='app'>
        <Header mode={mode} setMode={setMode}/>
          <Routes>
            <Route path='/' element={<NotesListPage/>}/>
            <Route path="/note/:noteId" element={<NotePage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
