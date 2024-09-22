import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/loginContext';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import UserInMessage from './UserInMessage';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

const UserInMatchContainer = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.post(`${BaseUrl}api/students/match/getCrushLikes`, {
          email: loggedInUser.collegeEmail,
        });

        // Handle the new structure of the response
        const { mutualMatches, powerCouples } = response.data;

        // Log mutualMatches and powerCouples after initialization
        // console.log(mutualMatches, "Mutual Matches");
        // console.log(powerCouples, "Power Couples");

        setMatches([...mutualMatches, ...powerCouples]); // Combine both arrays if needed
      } catch (err) {
        setError(err.message); // Set the error message
      } finally {
        setLoading(false); // Set loading to false at the end
      }
    };

    fetchMatches();
  }, [loggedInUser.collegeEmail]);

  const gotoMessage = (emailtogo) => {
    navigate(`/message/user/${emailtogo}`);
  };

  return (
    <div className='Container h-[84vh] overflow-y-auto flex flex-col'>
      {/* Message Navbar starts */}
      <div className="Message-Navbar flex mb-4">
        <Stack spacing={2} direction="row" sx={{ color: 'action.active' }}>
          <Link to="/matches">
            <div className="Matches text-white font-semibold text-xl ml-2 p-2 border-b-4 border-[#fe2c73] inline-block">
              <Badge color="secondary" badgeContent={matches.length} max={5}>
                Matches
              </Badge>
            </div>
          </Link>
          <Link to="/message">
            <div className="Messages text-white font-semibold text-xl p-2">
              <Badge color="secondary" badgeContent={1000} max={999}>
                Messages
              </Badge>
            </div>
          </Link>
        </Stack>
      </div>
      {/* Message Navbar ends */}

      {/* Loading, Error, and No Matches States */}
      {loading && <div className='text-white'>Loading...</div>}
      {error && <div className='text-white'>Error: {error}</div>}
      {!loading && !error && matches.length === 0 && <div className='text-white'>No matches yet.</div>}

      {/* Render matches */}
      {matches.map((match, index) => (
        <div key={index} onClick={() => gotoMessage(match.userB.email)}>
          <UserInMessage
            dp={match.userB.dp}
            name={match.userB.name}
            type={match.type} // 'match' or 'power couple'
          />
        </div>
      ))}
    </div>
  );
};

export default UserInMatchContainer;
