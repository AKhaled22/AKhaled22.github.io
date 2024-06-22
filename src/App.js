// import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CalculatorsHome, HICInitialization, HICModification, IICInitiation, IICMaintenance, DKAInitiation, DKAModification } from './pages'
import Navbarr from './Navbarr';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/credentials/Login';
import Register from './pages/credentials/Register';
import AdminPortal from './pages/AdminPortal';


function App() {

  const HandleRoutes = ({ element }) => {
    if (localStorage.getItem('authenticated') == 'true') {
      return element
    }
    return <Navigate to="/login" />
  }



  return (
    <div className="App">
      <Router>
        <Navbarr />
        <Routes>

          <Route path="/home" element={<HandleRoutes element={<CalculatorsHome />} />} />
          <Route path="/login" element={localStorage.getItem('authenticated') != 'true' ? <Login /> : <CalculatorsHome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/HICInitialization" element={<HandleRoutes element={<HICInitialization />} />} />
          <Route path="/HICModification" element={<HandleRoutes element={<HICModification />} />} />
          <Route path="/IICInitiation" element={<HandleRoutes element={<IICInitiation />} />} />
          <Route path="/DKAInitiation" element={<HandleRoutes element={<DKAInitiation />} />} />
          <Route path="/DKAModification" element={<HandleRoutes element={<DKAModification />} />} />
          <Route path='/admin' element={<HandleRoutes element={<AdminPortal />} />} />
          <Route
            path="/IICMaintenance"
            element={<HandleRoutes element={<IICMaintenance />} />} />
          <Route path="*" element={<Navigate to="/home" />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
