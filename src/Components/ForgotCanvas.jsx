import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./LoginCanvas.css"; // Ensure you import your CSS file for styling

const ForgotCanvas = () => {
  const [removeModalBlur, setModalBlur] = useState(""); // Manage modal blur
  const [hideOtp, setHideOtp] = useState("hidden"); // Hide OTP input initially
  const [hidePassword, setHidePassword] = useState("hidden"); // Hide password inputs initially
  const [email, setEmail] = useState(""); // Email state
  const [otp, setOtp] = useState(""); // OTP state
  const [password, setPassword] = useState(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });


  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/students/updatePassword", { email });
      if (response.status === 200) {
        setSnackbar({ open: true, message: "OTP sent successfully!", severity: "success" });
        setHideOtp(""); // Show OTP input
        setHidePassword(""); // Keep password inputs hidden initially
        setEmail((prevEmail) => prevEmail); // Keep email disabled
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSnackbar({ open: true, message: "Email not found, please register.", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Something went wrong, try again.", severity: "error" });
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/students/updatePasswordOtp", {
        email,
        otp,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        setSnackbar({ open: true, message: "Password updated successfully!", severity: "success" });
        setTimeout(()=>{
          navigate("../home");
          console.log("")
        },3000);
        // Add any additional logic (e.g., redirect to login page)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSnackbar({ open: true, message: "Invalid OTP or password mismatch.", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Something went wrong, try again.", severity: "error" });
      }
    }
  };

  return (
    <div className="login-canvas">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <div className={`overlay ${removeModalBlur}`}></div>
      <div className={`modal ${removeModalBlur}`}>
        <div className="modal-header">
          <h3 className="flex justify-center align-middle pb-3">
            <WhatshotIcon sx={{ fontSize: 38, color: "#ff4458" }} />
          </h3>
          <h3 className="text-xl font-semibold text-gray-900 text-center pl-2 ">
            Can we get your Email please?
          </h3>
        </div>
        <div className="modal-body">
          <form className="space-y-4" onSubmit={handleSendOtp}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your college email?
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="20bcar139@gcu.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={hideOtp === ""} // Disable when OTP is sent
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-cpink to-corange hover:from-cpink hover:to-corange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get OTP to change password
            </button>
          </form>

          {/* OTP and Password inputs are hidden initially */}
          <form className={`space-y-4 ${hideOtp}`} onSubmit={handleVerifyOtp}>
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter the OTP sent to your college email
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                className="input-field"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className={`${hidePassword}`}>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="input-field"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="input-field"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-cpink to-corange hover:from-cpink hover:to-corange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Verify OTP and Change Password
            </button>
          </form>
        </div>
{/* to go to login and create account page */}
        Click here to goto :-
        <Link to="../home"
                href="forgotPass"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
               Login Page
        </Link>

<br/>
        Create new account :-
        <Link to="../create"
                href="forgotPass"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
              Click here
        </Link>
{/* to go to login and create accoutn page */}
      </div>
    </div>
  );
};

export default ForgotCanvas;
