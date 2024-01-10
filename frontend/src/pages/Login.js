import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const Login = () => {
  const { setAuthData } = useAuth();
  const [phone, setphone] = useState("");
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem("studentId");
    if (storedValue) {
      history.push("/admission");
    }
  }); // Add an empty dependency array to ensure the effect runs only once on mount

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8800/authprogress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await response.json();

      // Assuming the backend responds with a student ID
      const studentId = data.studentId;

      // Save the student ID in local storage
      localStorage.setItem("studentId", studentId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function onCaptchVerify() {
    const auth = getAuth();
    auth.languageCode = "en";
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignup();
        },
      },
      auth
    );
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        setphone(formatPh);

        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setAuthData(phone);
        setLoading(false);
        await fetchData();
        history.push("/admission");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Incorrect OTP!");
        setLoading(false);
      });
  }

  return (
    <section className="bg-light d-flex align-items-center justify-content-center vh-100">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>

        <div className="w-80 d-flex flex-column gap-4 rounded-lg p-4">
          <h2 className="h3 text-muted mx-auto">Login using Phone Number</h2>

          {showOTP ? (
            <>
              <div className="d-flex flex-column gap-3 mt-4 mx-auto">
                <div className="d-flex gap-2 justify-content-center">
                  <div>
                    <BsFillShieldLockFill size={20} />
                  </div>
                  <label
                    htmlFor="otp"
                    className="font-weight-bold h5 text-black text-center"
                  >
                    Enter your OTP
                  </label>
                </div>
                <div className=" bg-light border border-black rounded ">
                  <div className="form-group d-flex justify-content-center align-items-center">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      autoFocus
                      className="opt-container form-control ms-3 h5 bg-light mb-0"
                      style={{ border: "none" }}
                    />
                  </div>
                </div>

                <button
                  onClick={onOTPVerify}
                  className="btn btn-primary w-60 d-flex gap-1 align-items-center justify-content-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex flex-column gap-3 mt-4 mx-auto">
                <div className="d-flex gap-4">
                  <div>
                    <IoCall size={20} />
                  </div>

                  <label
                    htmlFor=""
                    className="font-weight-bold h5 text-black text-center"
                  >
                    Verify your phone number
                  </label>
                </div>

                <PhoneInput
                  country={"in"}
                  value={ph}
                  onChange={setPh}
                  inputclassName="form-control"
                />
                <button
                  onClick={onSignup}
                  id="signin"
                  className="btn btn-primary w-60 d-flex gap-1 align-items-center justify-content-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
