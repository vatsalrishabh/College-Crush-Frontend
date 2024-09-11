import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { BaseUrl } from "./BaseUrl";
import "./LoginCanvas.css"; // Ensure you import your CSS file for styling
import { SuccessSnackbar } from "./Snackbars";
import HorizontalLinearStepper from "./HorizontalLinearStepper";


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
        <div className="closebutton flex justify-end"></div>
        {/* ONly the close button ends */}

        <HorizontalLinearStepper/>


        Click here to goto :-
        <Link to="../home"
                href="forgotPass"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
               Login Page
        </Link>
      </div>
      {/* sign in modal ends */}
    </div>
  );
};

export default CreateCanvas;
