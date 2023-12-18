import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import NewSection from "../components/NewSection";
import ExamFlow from "../components/ExamFlow";
import ApplicationFlow from "../components/ApplicationFlow";
import { useAuth } from "../AuthContext";
import { useHistory } from "react-router-dom";
import { AuthProvider } from "../AuthContext";

const Admission = () => {

  const { phoneNumber } = useAuth();
  const history = useHistory();

  const redirectToHome = () => {
    history.push("/");
  };

  return (
    <>
      <Navbar />
      {phoneNumber ? (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Dashboard</h2>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="item mb-4 col-lg-4 col-sm-12 col-md-6">
              <AuthProvider>
                <NewSection />
              </AuthProvider>
            </div>
            <div className="item mb-4 col-lg-4 col-sm-12 col-md-6">
              <AuthProvider>
                <ApplicationFlow />
              </AuthProvider>
            </div>
            <div className="item col-lg-4 col-sm-12 col-md-6">
              <AuthProvider>
                <ExamFlow />
              </AuthProvider>
            </div>
          </div>
        </div>
      ) : (
        redirectToHome()
      )}
    </>
  );
};

export default Admission;
