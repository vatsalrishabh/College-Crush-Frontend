import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/loginContext";
import InfoIcon from "@mui/icons-material/Info";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import LikedIt from "./LikedIt";
import DisLikedIt from "./DisLikedIt";
import CrushedOn from "./CrushedOn";
import DraggableCards from "./DragableCards";

const Mid = () => {
  const { loggedInUser } = useAuth();
  const { email } = useParams();
  const [userDetails, setUserDetails] = useState(null); // current user showing to logged in user to be liked crush or disliked
  const [userSeq, setUserSeq] = useState(1); // Starting with 1 or a valid initial sequence
  const [totalUsers, setTotalUsers] = useState(1); // Total number of users

  const [showLiked, setShowLiked] = useState(false);
  const [showDisliked, setShowDisliked] = useState(false);
  const [showCrushed, setShowCrushed] = useState(false);

  // Fetch the student details based on userSeq
  useEffect(() => {
    const fetchStudent = async (studentId) => {
      try {
        const response = await axios.get(
          `${BaseUrl}api/students/swipe/${studentId}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchStudent(userSeq);
  }, [userSeq]);

  // Fetch the total number of students
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.post(`${BaseUrl}api/students/totalStu`);
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    fetchTotalUsers();
  }, []);

  // Decrease userSeq with boundary check (Dislike functionality)
  const previousStudentHate = async () => {
    setUserSeq((prevSeq) => Math.min(prevSeq + 1, totalUsers)); // Skipping backward navigation for now
  
    try {
      const response = await axios.post(`${BaseUrl}api/students/match/dislike`, {
        dislikedby: loggedInUser.collegeEmail,
        dislikedto: userDetails.email,
      });
      
      if (response.status === 200) {
        triggerDisliked(); // Show the dislike animation
      }
    } catch (error) {
      console.error("Error posting dislike:", error);
    }
  };
  

  // Increase userSeq with boundary check (Like functionality)
  const nextStudentLike = async () => {
    setUserSeq((prevSeq) => Math.min(prevSeq + 1, totalUsers));


    try {
      const response = await axios.post(`${BaseUrl}api/students/match/like`, {
        likedby: loggedInUser.collegeEmail,
        likedto: userDetails.email,
      });
      
      if (response.status === 200) {
        triggerLiked(); // Show the dislike animation
      }
    } catch (error) {
      console.error("Error posting dislike:", error);
    }

   
  };

  // Mark as Crush (Crush functionality)
  const markAsCrush = async () => {
    setUserSeq((prevSeq) => Math.min(prevSeq + 1, totalUsers));
    try {
      const response = await axios.post(`${BaseUrl}api/students/match/crush`, {
        crushby: loggedInUser.collegeEmail,
        crushto: userDetails.email,
      });
      
      if (response.status === 200) {
        triggerCrushed(); // Show the dislike animation
      }
    } catch (error) {
      console.error("Error posting dislike:", error);
    }

 
  };

  // Show LikedIt animation for 1.6 seconds
  const triggerLiked = () => {
    setShowLiked(true);
    setTimeout(() => {
      setShowLiked(false);
    }, 1600); // 1.6 seconds
  };

  // Show DisLikedIt animation for 1.6 seconds
  const triggerDisliked = () => {
    setShowDisliked(true);
    setTimeout(() => {
      setShowDisliked(false);
    }, 1600); // 1.6 seconds
  };

  // Show CrushedOn animation for 1.6 seconds
  const triggerCrushed = () => {
    setShowCrushed(true);
    setTimeout(() => {
      setShowCrushed(false);
    }, 1600); // 1.6 seconds
  };

  // Ripple effect
  const handleRipple = (event) => {
    const ripple = document.createElement("span");
    const size = Math.max(event.target.clientWidth, event.target.clientHeight);
    const rect = event.target.getBoundingClientRect();

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple";

    event.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // Remove ripple after the animation
  };

  if (!userDetails) return <div>Loading...</div>;

  return (
    <div className="h-[84vh]">
      <div className="card bg-gray-900 h-full text-white p-2">
        <div className="slider mb-4">
          <div className="pagination flex justify-center space-x-2">
            {[...Array(totalUsers)].map((_, index) => (
              <div
                key={index}
                className={`w-10 h-1 bg-gray-500 rounded-full ${
                  index + 1 === userSeq ? "bg-white" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>

{/* DragableCards starts */}

{/* <DraggableCards userDetails={userDetails}/> */}
        <div className="dps mb-4 flex justify-center h-[60vh]">
          <img
            src={userDetails.dp}
            alt="Profile"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover rounded-lg"
          />
        </div>
{/* DragableCards ends */}

        <div className="Name-College-infoIcon flex justify-between items-center mb-4 h-[7vh]">
          <div className="Name-College w-4/5">
            <div className="name text-2xl font-bold">{userDetails.name}</div>
            <div className="College text-gray-400">{userDetails.college}</div>
          </div>
          <div className="infoIcon w-1/5 flex justify-end">
            <InfoIcon className="text-white" />
          </div>
        </div>

        <div className="RejectLikeConfess flex justify-around h-[7vh]">
          <div className="Dislike" onClick={previousStudentHate}>
            <div className="Reject ripple-parent" onClick={handleRipple}>
              <CancelIcon
                className="text-red-600"
                style={{ fontSize: "40px" }}
              />
            </div>
          </div>
          <div className="Crush button" onClick={markAsCrush}>
            <div className="Confess ripple-parent" onClick={handleRipple}>
              <VolunteerActivismIcon
                className="text-pink-600"
                style={{ fontSize: "40px" }}
              />
            </div>
          </div>
          <div className="nextStudentLike" onClick={nextStudentLike}>
            <div className="Love ripple-parent" onClick={handleRipple}>
              <FavoriteIcon
                className="text-red-500"
                style={{ fontSize: "40px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display animations */}
      {showLiked && <LikedIt />}
      {showDisliked && <DisLikedIt />}
      {showCrushed && <CrushedOn />}
    </div>
  );
};

export default Mid;
