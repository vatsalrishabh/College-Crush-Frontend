import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useAuth } from "../context/loginContext";
import { BaseUrl } from "./BaseUrl";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import axios from "axios";

const Top = () => {
  const { logout, loggedInUser } = useAuth();  // logged in userDetails and logout function of context API
  const [dpName, setDpName] = useState();
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const fetchLastSeen = async () => {
      try {
        const response = await axios.get(`${BaseUrl}api/students/${loggedInUser.collegeEmail}`);
        setDpName(response.data.dp);
      } catch (error) {
        console.error('Error fetching last seen status:', error);
      }
    };

    fetchLastSeen();
    // console.log(loggedInUser.collegeEmail + "top nav");
  }, [loggedInUser]);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="bg-black h-[8vh] text-logoColor flex">
        {/* Left Section */}
        <div className="left flex w-1/2">
          <div className="text-2xl font-bold h-full p-3">
            <WhatshotIcon />
          </div>
          <div className="text-2xl font-bold h-full p-3">CollegeCrush</div>
        </div>

        {/* Right Section */}
        <div className="right w-1/2 flex justify-end items-center relative">
          <div className="text-2xl font-bold h-full p-3">
            <Avatar
              alt="User Avatar"
              src={dpName}
              sx={{ width: 48, height: 48 }}
              onClick={toggleDropdown} // Toggle dropdown on click
              className="cursor-pointer"
            />
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="dropdown bg-white z-50 absolute top-[8vh] right-0 w-32 rounded-lg shadow-lg">
              <ol className="p-2">
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={logout} // Trigger logout on click
                >
                  Logout
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Top;
