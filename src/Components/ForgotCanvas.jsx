import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import "./LoginCanvas.css"; // Ensure you import your CSS file for styling

const ForgotCanvas = () => {
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
        </div>
        {/* ONly the close button ends */}

        <div className="modal-header">
          {/* Icon and heading */}
          <div className="">
            <h3 className="flex justify-center align-middle pb-3">
              <WhatshotIcon sx={{ fontSize: 38, color: "#ff4458" }} />
            </h3>
            <h3 className="text-xl font-semibold text-gray-900 text-center pl-2 ">
              Can we get your Email please ?
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
                Your college email ?
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-field"
                placeholder="20bcar139@gcu.edu.in "
                required
              />
            </div>
            <button type="submit" className="w-full text-white bg-gradient-to-r from-cpink to-corange hover:from-cpink hover:to-corange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Get OTP to change password
</button>
            <div>
              <label
                htmlFor="Otp"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
              Enter the Otp sent to college mail
              </label>
              <input
                type="num"
                name="password"
                id="Otp"
                placeholder="Enter your Otp"
                className="input-field"
                required
              />
            </div>
            
            <div className="flex justify-between">
              <div className="flex items-start">
               
              </div>
              
            </div>
            <button type="submit" className="w-full text-white bg-gradient-to-r from-cpink to-corange hover:from-cpink hover:to-corange focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Verify Otp
</button>


<div className="flex">

</div>
      
          </form>
        </div>
      </div>
      {/* sign in modal ends */}
    </div>
  );
};

export default ForgotCanvas;
