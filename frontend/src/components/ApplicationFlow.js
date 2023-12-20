import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { TiTick } from "react-icons/ti";

export default function ApplicationFlow() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body text-center p-3 bg-light rounded">
          <h5 className="card-title m-0">Application Flow</h5>
        </div>
        <hr className="m-0" />
        <div className="ms-3 mt-2 mb-2">
          <p className="card-text">
            <b>Fill Application Form</b>
          </p>
        </div>
        <ul
          className="list-group list-unstyled list-group-flush"
          style={{ border: "1px solid transparent" }}
        >
          <li
            className="list-group-item"
            style={{ border: "1px solid transparent" }}
          >
            <b>Step 1:</b>{" "}
            <Link to="/studentidentity" style={{ textDecoration: "none" }}>
              Identity Info 
            </Link> <TiTick className="mb-1" size={20} style={{ color: 'green' }} />

          </li>
          <li
            className="list-group-item"
            style={{ border: "1px solid transparent" }}
          >
            <b>Step 2:</b>{" "}
            <Link to="/studentregistration" style={{ textDecoration: "none" }}>
              Enrollment Related Info
            </Link>
          </li>
          <li
            className="list-group-item"
            style={{ border: "1px solid transparent" }}
          >
            <b>Step 3:</b>{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Previous School Info
            </Link>
          </li>
          <li
            className="list-group-item"
            style={{ border: "1px solid transparent" }}
          >
            <b>Step 4:</b>{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Upload Documents
            </Link>
          </li>
          <li
            className="list-group-item"
            style={{ border: "1px solid transparent" }}
          >
            <b>Step 5:</b>{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Submit Application
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
