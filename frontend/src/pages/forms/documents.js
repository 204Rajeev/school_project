import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast, Toaster } from "react-hot-toast";

export default function SubmitDocuments() {
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

  const [documentFormData, setDocumentFormData] = useState({
    aadharCard: null,
    transferCertificate: null,
    results: null,
    passportPhoto: null,
    signature: null,
    affidavit: null,
  });

  const handleFileChange = (e) => {
    const { id } = e.target;
    const file = e.target.files[0];

    setDocumentFormData({ ...documentFormData, [id]: file });
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("aadharCard", documentFormData.aadharCard);
    formData.append("transferCertificate", documentFormData.transferCertificate);
    formData.append("results", documentFormData.results); // Add this line
    formData.append("passportPhoto", documentFormData.passportPhoto); // Add this line
    formData.append("signature", documentFormData.signature); // Add this line
    formData.append("affidavit", documentFormData.affidavit); // Add this line
  
    try {
      const response = await fetch(
        `http://localhost:8800/submitdocuments/${studentId}`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        // If the response status is not in the range 200-299, consider it an error
        const errorData = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorData}`);
      }
  
      const result = await response.json();
      console.log(result);
      await toast.success("Documents Submitted!");
  
      redirectToAdmission();
  
      // Handle success or error accordingly
    } catch (error) {
      console.error("Error submitting documents:", error);
    }
  };
  
  return (
    <>
      <Navbar />
      {phoneNumber ? (
        <>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div className="container mt-5 ms-5  mx-auto d-flex flex-column justify-content-center align-items-center ">
            <h1 className="display-6">Application Flow : Step 4</h1>
            <div className="d-flex flex-column justify-content-center gap-3 mt-4">
              <div className="flex-item">
                <h2 className="h4">Submit Documents</h2>
              </div>
              <div className="flex-item">
                <form onSubmit={handleDocumentSubmit}>
                  <div className="form-group col-auto mb-3">
                    <label htmlFor="aadharCard">Upload Aadhar Card:</label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="aadharCard"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="transferCertificate">
                      Upload Transfer Certificate:
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="transferCertificate"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="passportPhoto">
                      Upload Passport Photo:
                    </label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="passportPhoto"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="signature">Upload Signature:</label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="signature"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="affidavit">Upload Affidavit:</label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="affidavit"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="form-group col-auto mb-3">
                    <label htmlFor="results">Upload Results:</label>
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      id="results"
                      accept=".jpg, .jpeg, .png, .pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Submit Documents
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
