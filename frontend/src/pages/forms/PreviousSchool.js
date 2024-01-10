import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import StudentContext from "../../StudentContext";
import { useContext } from "react";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function PreviousSchool() {
  const { phoneNumber } = useAuth();
  const [studentId, updateStudentId] = useState("");
  const history = useHistory();

  useEffect(() => {
    const storedValue = localStorage.getItem("studentId");
    if (storedValue) {
      updateStudentId(storedValue);
    }
  }, []);

  const redirectToHome = () => {
    history.push("/");
  };

  const redirectToAdmission = () => {
    history.push("/admission");
  };

  const [formData, setFormData] = useState({
    FatherName: null,
    MotherName: null,
    DOBAsPerTC: null,
    NameAsPerTC: null,
  });

  const handleInputChange = (e) => {
    const { id, value, type } = e.target;

    if (type === "date") {
      // Format the date to "yyyy-mm-dd"
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [id]: formattedDate });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        `http://localhost:8800/previousschool/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log(result);
      await toast.success("Form Submitted!");

      redirectToAdmission();

      // Handle success or error accordingly
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      {phoneNumber ? (
        <>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="container mt-5 ms-5  mx-auto d-flex flex-column justify-content-center align-items-center ">
            <h1 className="display-6">Application Flow : Step 3</h1>
            <div className="d-flex flex-column justify-content-center gap-3 mt-4">
              <div className="flex-item">
                <h2 className="h4">Student Information (As per TC)</h2>
              </div>
              <div className="flex-item">
                <form onSubmit={handleSubmit}>
                  <div className="form-group  col-auto mb-3">
                    <label htmlFor="NameAsPerTC">Name of Student:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="NameAsPerTC"
                      placeholder=""
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="DOBAsPerTC">Date of Birth:</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="DOBAsPerTC"
                      placeholder=""
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="MotherName">MOTHER NAME:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="MotherName"
                      placeholder=""
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-auto mb-3">
                    <label htmlFor="FatherName">FATHER NAME:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="FatherName"
                      placeholder=""
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        redirectToHome()
      )}
    </>
  );
}
