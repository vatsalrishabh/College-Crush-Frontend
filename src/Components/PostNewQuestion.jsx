import React, { useState } from 'react';
import { Button, Modal, TextField, MenuItem, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';

// Custom styled components for the button and modal
const StyledButton = styled(Button)({
  position: 'fixed',
  bottom: '60px',
  left: '20px',
  background: '#ff4458',
  color: 'white',
  borderRadius: '20px',
  padding: '10px 20px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  '&:hover': {
    background: '#fe5b3b',
  },
});

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  background: 'rgba(255, 255, 255, 0.25)',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  padding: '20px',
  width: '90%',
  maxWidth: '500px', // Limit modal size for better visibility
});

const PostNewQuestion = (props) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('question', question);             // Question input from the user
    formData.append('questionBy', props.userEmail);    // Passed from props or auth context
    formData.append('timeDate', new Date());       // Current time
    formData.append('anonymous', anonymous);           // Whether the question is anonymous or not

    try {
      // Axios POST request to send question to the server
      const response = await axios.post(`${BaseUrl}api/questions/postNewQue`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set multipart for formData
        },
      });
      console.log('Question submitted successfully:', response.data);
      setQuestion(''); // Clear the input box
      handleClose();   // Close the modal
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <StyledButton onClick={handleOpen} endIcon={<ArrowForwardIcon />}>
        Ask New Question
      </StyledButton>

      {/* Modal */}
      <StyledModal open={open} onClose={handleClose}>
        <StyledBox>
          <Typography variant="h6" mb={2} color="white">
            Post a New Question
          </Typography>
          <TextField
            label="Your Question"
            multiline
            rows={4}
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            margin="normal"
            sx={{ mb: 2, background: 'rgba(255, 255, 255, 0.85)', borderRadius: '10px' }}
          />
          <TextField
            select
            label="Post As"
            fullWidth
            value={anonymous ? 'Anonymous' : 'Show Your Identity'}
            onChange={(e) => setAnonymous(e.target.value === 'Anonymous')}
            margin="normal"
            sx={{ mb: 2, background: 'rgba(255, 255, 255, 0.85)', borderRadius: '10px' }}
          >
            <MenuItem value="Anonymous">Anonymous</MenuItem>
            <MenuItem value="Show Your Identity">Show Your Identity</MenuItem>
          </TextField>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={handleClose} sx={{ mr: 1, color: 'white', borderColor: 'white' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ backgroundColor: '#ff4458', '&:hover': { backgroundColor: '#fe5b3b' } }}
            >
              Post
            </Button>
          </Box>
        </StyledBox>
      </StyledModal>
    </>
  );
};

export default PostNewQuestion;
