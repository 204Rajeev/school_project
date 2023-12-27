import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function ApplicationFlow() {
  const studentId = localStorage.getItem("studentId");
  const [step, updatestep] = useState("");
  const [completedSteps, setCompletedSteps] = useState({});
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleButtonClickStudentIdentity = () => {
    if (isStepCompleted("studentidentity")) {
      // Show the modal
      updatestep("studentidentity");
      setShowModal(true);
    } else {
      // Redirect to /studentidentity

      history.push("/studentidentity");
    }
  };
  const handleButtonClickStudentRegistration = () => {
    if (isStepCompleted("studentregistration")) {
      // Show the modal
      updatestep("studentregistration");
      setShowModal(true);
    } else {
      // Redirect to /studentidentity

      history.push("/studentregistration");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8800/authprogress/status/${studentId}`
        );
        const data = await response.json();
        console.log("data", data);
        setCompletedSteps(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const isStepCompleted = (step) => completedSteps[step];
  return (
    <>
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
              <button
                type="button"
                className="btn btn-link p-0 mb-1 text-nowrap"
                style={{ textDecoration: "none" }}
                onClick={handleButtonClickStudentIdentity}
              >
                Identity Info
              </button>
              {isStepCompleted("studentidentity") ? (
                <TiTick className="mb-1" size={20} style={{ color: "green" }} />
              ) : null}
            </li>
            <li
              className="list-group-item"
              style={{ border: "1px solid transparent" }}
            >
              <b>Step 2:</b>{" "}
              <button
                type="button"
                className="btn btn-link p-0 mb-1 text-nowrap"
                style={{ textDecoration: "none" }}
                onClick={handleButtonClickStudentRegistration}
              >
                Enrollment Related Info
              </button>
              {isStepCompleted("studentregistration") ? (
                <TiTick className="mb-1" size={20} style={{ color: "green" }} />
              ) : null}
            </li>
            <li
              className="list-group-item"
              style={{ border: "1px solid transparent" }}
            >
              <b>Step 3:</b>{" "}
              <button
                type="button"
                className="btn btn-link p-0 mb-1 text-nowrap"
                style={{ textDecoration: "none" }}
                onClick={handleButtonClickStudentRegistration}
              >
                Previous School Info
              </button>
              {isStepCompleted("PrevSchoolInfo") ? (
                <TiTick className="mb-1" size={20} style={{ color: "green" }} />
              ) : null}
            </li>
            <li
              className="list-group-item"
              style={{ border: "1px solid transparent" }}
            >
              <b>Step 4:</b>{" "}
              <button
                type="button"
                className="btn btn-link p-0 mb-1 text-nowrap"
                style={{ textDecoration: "none" }}
                onClick={handleButtonClickStudentRegistration}
              >
                Upload Documents
              </button>
              {isStepCompleted("UploadDoc") ? (
                <TiTick className="mb-1" size={20} style={{ color: "green" }} />
              ) : null}
            </li>
            <li
              className="list-group-item"
              style={{ border: "1px solid transparent" }}
            >
              <b>Step 5:</b>{" "}
              <button
                type="button"
                className="btn btn-link p-0 mb-1 text-nowrap"
                style={{ textDecoration: "none" }}
                onClick={handleButtonClickStudentRegistration}
              >
                Submit Application
              </button>
              {isStepCompleted("SubmitForm") ? (
                <TiTick className="mb-1" size={20} style={{ color: "green" }} />
              ) : null}
            </li>
          </ul>
        </div>
      </div>
      <Modal show={showModal} steps={step} onHide={() => setShowModal(false)} />
    </>
  );
}
