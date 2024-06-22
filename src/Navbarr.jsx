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
        <Navbar.Collapse id="basic-navbar-nav" className=''>
          <Nav className="me-auto d-flex justify-content-between w-100 align-items-center gap-2">
            <div className='d-flex align-items-center flex-column flex-lg-row'>
              {localStorage.getItem('authenticated') == 'true' && <><NavDropdown title="Insulin Infusion Calculator for Non-DKA" id="basic-nav-dropdown">
                <Link to="/IICInitiation" data-rr-ui-dropdown-item="" className='dropdown-item'>Initiation</Link>
                <Link to="/IICMaintenance" data-rr-ui-dropdown-item="" className='dropdown-item'>Maintenance</Link>

              </NavDropdown>
                <NavDropdown title="Heparin Infusion Calculator" id="basic-nav-dropdown">
                  <Link to="/HICInitialization" data-rr-ui-dropdown-item="" className='dropdown-item'>Initialization</Link>
                  <Link to="/HICModification" data-rr-ui-dropdown-item="" className='dropdown-item'>Modification</Link>


                </NavDropdown>
                <NavDropdown title="DKA Insulin Infusion Calculator" id="basic-nav-dropdown">
                  <Link to="/DKAInitiation" data-rr-ui-dropdown-item="" className='dropdown-item'>Initiation</Link>
                  <Link to="/DKAModification" data-rr-ui-dropdown-item="" className='dropdown-item'>Modification</Link>


                </NavDropdown>
              </>
              }
            </div>
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <div className='d-flex align-items-center justify-content-center flex-column flex-lg-row gap-2'>
              {localStorage.getItem('authenticated') == 'true' ? null : <Link className='text-decoration-none text-black' to="/register">Register</Link>}
              {localStorage.getItem('admin') == 'true' ? <Link className='text-decoration-none text-black' to="/admin">Admin</Link> : null}
              {localStorage.getItem('authenticated') == 'true' ? <div onClick={() => {
                localStorage.clear()
                window.location.reload()
              }} className='text-decoration-none text-black pointer' to="/login">Logout</div> : <Link className='text-decoration-none text-black' to="/login">Login</Link>}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;