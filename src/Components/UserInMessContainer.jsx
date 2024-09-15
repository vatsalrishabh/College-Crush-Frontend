import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/loginContext";  // Assume you have a context to get logged-in user info
import { BaseUrl } from './BaseUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import UserInMessage from './UserInMessage';



const UserInMessContainer = () => {
  const { loggedInUser } = useAuth();  // Assume context provides the logged-in user's collegeEmail
  const [students, setStudents] = useState([]);  // State to store students and their last messages

  useEffect(() => {

    // code for online offline lastseen using socket io
   



    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BaseUrl}api/students/`, {
          params: {
            sentFrom: loggedInUser.collegeEmail  // Pass logged-in user's email to the backend
          }
        });

        // Set students along with their last messages
        setStudents(response.data);
     
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();  // Call the fetchStudents function on component mount
  }, [loggedInUser.collegeEmail]);  // Re-run when loggedInUser's email changes

  return (
    <div className='Container h-[84vh] overflow-y-auto'>
      {/* Message Navbar starts */}
      <div className="Message-Navbar flex">
        <Stack spacing={2} direction="row" sx={{ color: 'action.active' }}>
          <Link to="/matches">
            <div className="Matches text-white font-semibold text-xl p-2 ml-2">
              <Badge color="secondary" badgeContent={100} max={5}>
                Matches
              </Badge>
            </div>
          </Link>
          <Link to="/message">
            <div className="Messages text-white font-semibold text-xl p-2 border-b-4 border-[#fe2c73] inline-block">
              <Badge color="secondary" badgeContent={1000} max={999}>
                Messages
              </Badge>
            </div>
          </Link>
        </Stack>
      </div>
      {/* Message Navbar ends */}

      <div className="user-list">
        {students.map(studentData => (
          <UserInMessage
            key={studentData.student._id} // Ensure unique key
            dp={studentData.student.dp}    // Student's display picture
            name={studentData.student.name} // Student's name
            email={studentData.student.email} // Student's email
            lastMessage={studentData.latestMessage} // The latest message exchanged
            lastSeenOnlineStatus={studentData.student.onlineStatus}
            lastSeenTime={studentData.student.lastSeen}
          />
        ))}
      </div>
    </div>
  );
};

export default UserInMessContainer;
