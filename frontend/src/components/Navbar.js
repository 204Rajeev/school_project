import React from "react";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
function Navbar(props) {
  const { phoneNumber, logout } = useAuth();
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light m-2 border border-dark rounded ">
        <div className="container-fluid ">
          <a className="navbar-brand fs-3" href="/">
            <b>GIC PURBALIYAN</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div
            className="collapse navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
              <li className="nav-item ms-4">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link to="/login" className="nav-link">
                  Admission
                </Link>
              </li>

              <li className="nav-item dropdown ms-4">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Activities
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Maths Club
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Science Club
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sports
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center  gap-2 mt-1">
              {phoneNumber ? (
                <>
                  <span className="text-muted flex-item">{phoneNumber}</span>
                  <div>
                  <button
                    className="btn btn-outline-secondary flex-item float-right w-100"
                    onClick={logout}
                  >
                    Logout
                  </button>
                  </div>
                  
                </>
              ) : (
                <div className="d-flex gap-2 justify-content-center align-items-center ">
                  <div className="flex-item">
                    <FaUser size={25} />
                  </div>
                  <div className="flex-item">
                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={handleLogin}
                    >
                      Signup/Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
