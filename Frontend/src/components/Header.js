import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
  {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
    {/* Container wrapper */}
    <div className="container-fluid">
      {/* Navbar brand */}
      
      {/* Toggle button */}
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
      </button>
      {/* Collapsible wrapper */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* Link */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              signup
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/editor">
            editor
            </NavLink>
          </li>
        </ul>
        {/* Icons */}
        
      </div>
    </div>
    {/* Container wrapper */}
  </nav>
  {/* Navbar */}
</>

  )
}

export default Header