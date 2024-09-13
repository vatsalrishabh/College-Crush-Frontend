import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/loginContext"; // Adjust the import path if needed
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./LoginCanvas.css"; // Ensure you import your CSS file for styling

const LoginCanvas = () => {
  const { login } = useAuth();
  const [removeModalBlur, setModalBlur] = useState(""); // Initial state: modal is visible
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  // Toggle function to show/hide modal and blur
  const handleModalBlur = () => {
    setModalBlur(removeModalBlur === "" ? "hidden" : "");
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}api/students/login`, {
        studentEmail: email,
        studentPassword: password,
      });

      if (response.status === 200) {
        login(response.data.jwt, email ,response.data.name); // Store JWT and email
        sessionStorage.setItem("jwt", response.data.token); // Assuming JWT token is in response.data.token
        setSnackbarMessage("Logged in successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(()=>{
          navigate("/dash");
        },3000)
        // Redirect or update UI accordingly
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            setSnackbarMessage("User not found.");
            setSnackbarSeverity("error");
            break;
          case 400:
            setSnackbarMessage("Incorrect password.");
            setSnackbarSeverity("error");
            break;
          default:
            setSnackbarMessage("An unexpected error occurred.");
            setSnackbarSeverity("error");
        }
        setOpenSnackbar(true);
      }
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="login-canvas">
      <div className={`overlay ${removeModalBlur}`}></div>{" "}
      {/*this is to create blurr effect */}
      {/* sign in modal starts */}
      <div className={`modal ${removeModalBlur}`}>
        {/* Only the close button starts */}
        <div className="closebutton flex justify-end">
          <button type="button" className="close-button" onClick={handleModalBlur}>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Only the close button ends */}

        <div className="modal-header">
          {/* Icon and heading */}
          <div className="">
            <h3 className="flex justify-center align-middle pb-3">
              <WhatshotIcon sx={{ fontSize: 38, color: "#ff4458" }} />
            </h3>
            <h3 className="text-xl font-semibold text-gray-900 text-center pl-2 ">
              Can we get your Number please ?
            </h3>
          </div>
          {/* Icon and heading  */}
        </div>
        <div className="modal-body">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your college email or number
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="20bcar139@gcu.edu.in or 8123573669"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="checkbox"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 "
                >
                  Remember me
                </label>
              </div>
              <Link
                to="../forgotPass"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-cpink to-corange hover:from-cpink hover:to-corange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link
                to="../create"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* sign in modal ends */}

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginCanvas;
