// import { Button } from 'bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './pages/Welcome';
import Header from './components/Header';
import NormalTest from './pages/NormalTest';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Test from './pages/Test';
import Services from './components/Services';
import SequentialTest from './components/SequentialTest';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {


  return (
    <div className="App">
   
      <HashRouter>
        <Routes>
         <Route path="/" element={<Welcome />} />
         <Route path="/normalTest" element={<NormalTest />} >
              <Route path="" element={<SequentialTest />} />
              <Route path="/normalTest/services" element={<Services />} />
        </Route>
         <Route path="/runScript" element={<Test />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
