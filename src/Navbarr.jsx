import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import calculator from './vector-calculator-icon.jpg'
import { Link } from 'react-router-dom';
// import "./bootstrap"

function Navbarr() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><img src={calculator} alt='calculator' width="30px" height="auto" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <NavDropdown title="Insulin Infusion Calculator for Non-DKA" id="basic-nav-dropdown">
              <Link to="/IICInitiation" data-rr-ui-dropdown-item="" className='dropdown-item'>Initiation</Link>
              <Link to="/IICMaintenance" data-rr-ui-dropdown-item="" className='dropdown-item'>Maintenance</Link>

              {/* <a href="#action/3.1" data-rr-ui-dropdown-item="" class="dropdown-item">Initiation</a> */}
            </NavDropdown>
            <NavDropdown title="Heparin Infusion Calculator" id="basic-nav-dropdown">
              <Link to="/HICInitialization" data-rr-ui-dropdown-item="" className='dropdown-item'>Initialization</Link>
              <Link to="/HICModification" data-rr-ui-dropdown-item="" className='dropdown-item'>Modification</Link>
             

            </NavDropdown>
            <NavDropdown title="DKA Insulin Infusion Calculator" id="basic-nav-dropdown">
              <Link to="/DKAInitiation" data-rr-ui-dropdown-item="" className='dropdown-item'>Initiation</Link>
              <Link to="/DKAModification" data-rr-ui-dropdown-item="" className='dropdown-item'>Modification</Link>
             

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;