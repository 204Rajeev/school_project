import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useContext } from "react";
import StudentContext from "../../StudentContext";
export default function StudentRegistration() {
  const { studentId } = useContext(StudentContext);
  const { phoneNumber } = useAuth();
  const history = useHistory();

  const redirectToHome = () => {
    history.push("/");
  };
  const redirectToAdmission = ()=>{
    history.push('/admission')
  }

  const [formData, setFormData] = useState({
    MotherTongue: "",
    SocialCategory: "",
    MinorityGroup: "",
    BPLBeneficiary: "",
    AAYBeneficiary: "",
    EWSDisadvantageGroup: "",
    IsCWSN: "",
    CWSNImpairmentType: "",
    ChildIsIndianNational: "",
    ChildIsOutOfSchoolChild: "",
    MainstreamedDate: "",
    // Add other form fields as needed
  });

  const handleInputChange = (e) => {
    console.log(studentId)
    const { id, value, type } = e.target;

  if (type === 'date') {
    // Format the date to "yyyy-mm-dd"
    const formattedDate = new Date(value).toISOString().split('T')[0];
    setFormData({ ...formData, [id]: formattedDate });
  } else {
    setFormData({ ...formData, [id]: value });
  };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform validation if needed

    // Send the form data to your backend
    fetch(`http://localhost:8800/studentregistration/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        console.log("Form submitted successfully", data);
        redirectToAdmission()
      })
      .catch((error) => {
        console.error("Error submitting form", error);
      });
  };

  return (
    <>
      <Navbar />
      {phoneNumber ? (
        <div className="container mt-5 ms-5 mx-auto d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-6">Application Flow: Step 2</h1>
          <div className="d-flex flex-column justify-content-center gap-3 mt-4">
            <div className="flex-item">
              <h2 className="h4">Student Registration</h2>
            </div>
            <div className="flex-item">
              <form onSubmit={handleSubmit}>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="MotherTongue">MOTHER TONGUE:<span className="text-danger ms-2 fs-5 mb-0 mb-0">*</span></label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="MotherTongue"
                    placeholder=""
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="SocialCategory">SOCIAL CATEGORY:</label>
                  <select
                    className="form-select"
                    id="SocialCategory"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select category</option>
                    <option value="sc">1.SC</option>
                    <option value="st">2.ST</option>
                    <option value="obc">3.OBC</option>
                    <option value="gen">4.Gen</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="MinorityGroup">MINORITY GROUP:<span className="text-danger ms-2 fs-5 mb-0 mb-0">*</span></label>
                  <select
                    className="form-select"
                    id="MinorityGroup"
                    onChange={handleInputChange}
                    required
                  >
                    <option defaultValue>Select minority group</option>
                    <option value="muslim">Muslim</option>
                    <option value="christian">Christian</option>
                    <option value="sikh">Sikh</option>
                    <option value="buddhist">Buddhist</option>
                    <option value="parsi">Parsi</option>
                    <option value="jain">Jain</option>
                    <option value="notMinority">Not Minority</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="BPLBeneficiary">Is BPL BENEFAICIARY?</label>
                  <select
                    className="form-select"
                    id="BPLBeneficiary"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="AAYBeneficiary">
                    Whether Antyodaya Anna Yojana (AAY) beneficiary?:
                  </label>
                  <select
                    className="form-select"
                    id="AAYBeneficiary"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="EWSDisadvantageGroup">
                    BELONGS TO EWS/DISADVANTAGED GROUP?
                  </label>
                  <select
                    className="form-select"
                    id="EWSDisadvantageGroup"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="IsCWSN">IS CWSN?</label>
                  <select
                    className="form-select"
                    id="IsCWSN"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="CWSNImpairmentType">
                    CWSN IMPAIRMENT TYPE:
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="CWSNImpairmentType"
                    placeholder=""
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="ChildIsIndianNational">
                    CHILD IS INDIAN NATIONAL?
                  </label>
                  <select
                    className="form-select"
                    id="ChildIsIndianNational"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="ChildIsOutOfSchoolChild">
                    CHILD IS OUT-OF-SCHOOL-CHILD?{" "}
                  </label>
                  <select
                    className="form-select"
                    id="ChildIsOutOfSchoolChild"
                    onChange={handleInputChange}
                  >
                    <option defaultValue>Select option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="form-group col-auto mb-3">
                  <label htmlFor="MainstreamedDate">
                    When the child is mainstreamed?
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="MainstreamedDate"
                    placeholder=""
                    onChange={handleInputChange}
                  />
                </div>
                {/* Add similar form groups for other details */}
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        redirectToHome()
      )}
    </>
  );
}