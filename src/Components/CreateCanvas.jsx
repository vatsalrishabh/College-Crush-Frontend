import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./LoginCanvas.css"; // Ensure you import your CSS file for styling

const CreateCanvas = () => {
  const [removeModalBlur, setModalBlur] = useState(""); // Initial state: modal is visible

  // Toggle function to show/hide modal and blur
  const handleModalBlur = () => {
    setModalBlur(removeModalBlur === "" ? "hidden" : "");
  };

  return (
    <div className="login-canvas">
      <div className={`overlay ${removeModalBlur}`}></div>{" "}
      {/*this is to create blurr effect */}
      {/* sign in modal starts */}
      <div className={`modal ${removeModalBlur}`}>
        {/* ONly the close button starts */}
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
        {/* ONly the close button ends */}

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
          <form className="space-y-4" action="#">
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
                required
              />
            </div>
            {/* <div>
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
                required
              />
            </div> */}
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
              <Link to="../home"
                href="forgotPass"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
               Login Page
              </Link>
            </div>
            <button type="submit" className="w-full text-white bg-gradient-to-r from-cpink to-corange hover:from-cpink hover:to-corange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Create your account !
</button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="#"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* sign in modal ends */}
    </div>
  );
};

export default CreateCanvas;
