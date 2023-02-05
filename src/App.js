import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';
import {  BrowserRouter, Routes, Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Inotebook from './components/Inotebook';

function App() {
  const [alert,setAlert]= useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000); 
  }
  return (
    <NoteState>
      <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
        <div className='container my-3'>
          <Routes>
            <Route exact path="/home" element={<Home showAlert={showAlert}/>}/>
            <Route exact path="/inotebook" element={<Inotebook />}/>
            <Route exact path="/about" element={<About showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}
export default App;