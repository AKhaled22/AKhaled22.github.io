// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import {CalculatorsHome , HICInitialization , HICModification , IICInitiation , IICMaintenance , DKAInitiation , DKAModification} from './pages'
import Navbarr from './Navbarr';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbarr />
        <Routes>

          <Route path="/home" element={<CalculatorsHome />} />
          <Route path="/HICInitialization" element={<HICInitialization />} />
          <Route path="/HICModification" element={<HICModification />} />
          <Route path="/IICInitiation" element={<IICInitiation />} />
          <Route path="/DKAInitiation" element={<DKAInitiation />} />
          <Route path="/DKAModification" element={<DKAModification />} />

          <Route
            path="/IICMaintenance"
            element={<IICMaintenance />}
          />
          <Route path="*" element={<Navigate to="/home" />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
