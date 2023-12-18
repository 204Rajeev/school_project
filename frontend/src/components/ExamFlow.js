import React from "react";

export default function ExamFlow() {
  return (
    
    <div className="d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body text-center p-3 bg-light rounded">
          <h5 className="card-title m-0">Exam Flow</h5>
        </div>
        {/* <hr className="divider m-0" /> */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p style={{ margin: '0' }}><b>Application form</b></p>
            <a href="#" style={{ textDecoration: "none"}}>
              Coming soon
            </a>
          </li>
          <li className="list-group-item">
            <p style={{ margin: '0' }}><b>Admit Card</b></p>
            <a href="#" style={{ textDecoration: "none" }}>
              Coming soon
            </a>
          </li>
          <li className="list-group-item">
            <p style={{ margin: '0' }}><b>Results</b></p>
            <a href="#" style={{ textDecoration: "none"}}>
              Coming soon
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
