import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { BaseUrl } from './BaseUrl';

const steps = ['Validate', 'Name', 'College', 'Dp'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [college, setCollege] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [dp, setDp] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [cpassword, setCPassword] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');

  const navigate = useNavigate(); // To redirect to login

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        const response = await fetch(`${BaseUrl}api/students/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        if (response.status === 200) {
          setSnackbarMessage('OTP sent to the email');
          setSnackbarOpen(true);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } if(response.status === 400){
          setAlertMessage('Email already registered. Please go to the login page.');
        }
        if(response.status === 500){
          setAlertMessage('Sorry our servers are facing downtime !');
        }

      } catch (error) {
        setAlertMessage('Something went wrong. Please try again later.');
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCreateAccount = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('contact', contact);
      formData.append('college', college);
      formData.append('gender', gender);
      formData.append('dp', dp);
      formData.append('password', password);
      formData.append('otp', otp);

      const response = await fetch('http://localhost:3000/api/students/verifyOtp', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        setSnackbarMessage('Account created successfully, redirecting to login page');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/home'); // Redirect to login page
        }, 3000);
      } else {
        setAlertMessage('Failed to create account. Please check your details.');
      }
    } catch (error) {
      setAlertMessage('Something went wrong. Please try again later.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isButtonDisabled = () => {
    if (activeStep === 0) return email === '';
    if (activeStep === 1) return name === '' || contact === '';
    if (activeStep === 2) return college === '' || gender === '';
    return false;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you're finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <div className="modal-body">
              <div className="modal-header">
                <div className="">
                  <h3 className="flex justify-center align-middle pb-3">
                    <WhatshotIcon sx={{ fontSize: 38, color: "#ff4458" }} />
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-900 text-center pl-2 ">
                    Can we get your Number please?
                  </h3>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 p-3 text-sm font-medium text-gray-900"
                  >
                    Your college email or number
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-field"
                    placeholder="20bcar139@gcu.edu.in or 8123573669"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          )}

          {activeStep === 1 && (
            <div className="modal-body">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="input-field"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    id="contact"
                    className="input-field"
                    placeholder="8123456789"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          )}

          {activeStep === 2 && (
            <div className="modal-body">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="college"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    College
                  </label>
                  <input
                    type="text"
                    name="college"
                    id="college"
                    className="input-field"
                    placeholder="Garden City University"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="input-field"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </form>
            </div>
          )}

          {activeStep === 3 && (
            <div className="modal-body">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="dp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    name="dp"
                    id="dp"
                    className="input-field"
                    onChange={(e) => setDp(e.target.files[0])}
                    required
                  />
                   <label
                    htmlFor="dp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                   Choose a password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                   <label
                    htmlFor="dp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                  Confimr Password
                  </label>
                  <input
                    type="cpassword"
                    name="cpassword"
                    id="cpassword"
                    className="input-field"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    required
                  />
                   <label
                    htmlFor="dp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Otp sent to college mail.
                  </label>
                  <input
                    type="num"
                    name="Otp"
                    id="otp"
                    className="input-field"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              onClick={activeStep === steps.length - 1 ? handleCreateAccount : handleNext}
              disabled={isButtonDisabled()}
            >
              {activeStep === steps.length - 1 ? 'Create your account' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}

      {/* Snackbar for Success Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Alert for Errors */}
      {alertMessage && (
        <Alert severity="error" onClose={() => setAlertMessage('')}>
          {alertMessage} <Link to="/home" className='font-bold text-blue-700'>Login</Link>
        </Alert>
      )}
    </Box>
  );
}
