import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AlertDialog(params) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/dogs/${params.dogId}`)
      .then(navigate('/'));
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        sx={{
          color:
            theme.palette.mode === 'light'
              ? `${theme.palette.primary.dark}`
              : `${theme.palette.primary.ultraLight}`,
          borderColor:
            theme.palette.mode === 'light'
              ? `${theme.palette.primary.dark}`
              : `${theme.palette.primary.ultraLight}`,
          ':hover': {
            color: `${theme.palette.action.hover}`,
            borderColor: `${theme.palette.action.hover}`,
          },
          mx: '0.5rem',
          mb: '1rem',
        }}
      >
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {'Are you sure you want to delete this page?'}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleDelete}
            sx={{
              color: `${theme.palette.primary.dark}`,
              ':hover': {
                color: `${theme.palette.action.hover}`,
              },
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: `${theme.palette.primary.dark}`,
              ':hover': {
                color: `${theme.palette.action.hover}`,
              },
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
