import React from "react";

export default function NewSection() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body text-center p-3 bg-light rounded">
          <h5 className="card-title m-0">News Section</h5>
        </div>
        <hr className="divider m-0" />
        <div className="text-center mt-2 mb-2">
          <p className="card-text">
            The last date to submit the application form has been postponed to
            12 May 2024. <a href="#">Click Here</a>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href="#" style={{ textDecoration: "none" }}>
              Brochure
            </a>
          </li>
          <li className="list-group-item">
            <a href="#" style={{ textDecoration: "none" }}>
              Important Dates
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
