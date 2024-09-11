import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Success Snackbar
export const SuccessSnackbar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Success Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
};

// Failed Snackbar
export const FailedSnackbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Failed Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" variant="filled" sx={{ width: '100%' }}>
          This is a failed Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
};

// Error Snackbar
export const ErrorSnackbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Error Snackbar</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          This is an error Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
};
