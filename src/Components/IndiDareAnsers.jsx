import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(() => ({
  background: 'rgba(255, 255, 255, 0.15)', // Glassmorphism background
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)', // Nice subtle shadow
  backdropFilter: 'blur(10px)', // Blur effect
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)', // Border for glassmorphism
  padding: '20px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)', // Lift effect on hover
  },
}));

const IndiDareAnsers = (props) => {
  return (
    <StyledCard className="max-w-md mx-auto mb-6">
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {/* Display anonymous avatar if anonymous is true, otherwise show user DP */}
          {props.anonymous ? (
            <>
              <Avatar
                alt="Anonymous"
                src="defaultdp.png"
                sx={{ width: 56, height: 56, bgcolor: '#ff4458' }}
              />
              <Typography variant="h6" color="white" fontWeight="bold">
                Anonymous
              </Typography>
            </>
          ) : (
            <>
              <Avatar
                alt={props.name}
                src={props.dp}
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant="h6" color="white" fontWeight="bold">
                {props.name}
              </Typography>
            </>
          )}
        </Box>

        {/* The answer text */}
        <Box
          className="bg-gradient-to-r from-[#ff4458] via-[#fe5b3b] to-[#fe2c73] text-white p-4 rounded-lg shadow-md"
        >
          <Typography variant="body1" gutterBottom>
            {props.answer}
          </Typography>
        </Box>

        {/* Display the time of the answer */}
        <Typography
          variant="body2"
          color="white" // Changed to white
          textAlign="right"
          className="mt-3"
        >
          {props.time}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default IndiDareAnsers;
