import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import UserInMessage from './UserInMessage';

const UserInMessContainer = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/students/");
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

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
        {students.map(student => (
          <UserInMessage
            key={student.id} // Ensure you use a unique key for each component
            userId={student.id}
            dp={student.profilePicture} // Adjust based on your actual data structure
            name={student.name} // Adjust based on your actual data structure
          />
        ))}
      </div>
    </div>
  );
};

export default UserInMessContainer;
