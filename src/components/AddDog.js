import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDog = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [newDog, setNewDog] = useState({
    name: '',
    age: '',
    sex: '',
    size: '',
    info: '',
    image: 'img/default.jpg',
    id: parseInt(params.newDogId),
  });

  const handleInputChange = (event) => {
    // console.log(event);
    // console.log(event.target.name);
    // console.log(event.target.value);
    setNewDog({
      ...newDog,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/dogs', {
        name: newDog.name,
        age: newDog.age,
        sex: newDog.sex,
        size: newDog.size,
        info: newDog.info,
        image: newDog.image,
        id: newDog.id,
      })
      .then((response) => {
        console.log(response);
        navigate('/');
      });
  };

  const theme = useTheme();

  return (
    <Box
      className="mainContainer"
      sx={{
        width: '100vw',
        height: '100vh',
        marginLeft: '205px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: '2.5rem',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          paddingBottom: '2.5rem',
          color: `${theme.palette.text.primary}`,
        }}
      >
        Add a new dog
      </Typography>
      <Box
        component="form"
        id="form"
        noValidate
        autoComplete="off"
        sx={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          padding: '1.5rem',
          borderRadius: '6px',
          backgroundColor: `${theme.palette.primary.light}`,
        }}
      >
        <Box
          className="inputs"
          sx={{
            width: '100%',
            display: 'flex',
            gap: '1rem',
          }}
        >
          <TextField
            required
            name="name"
            label="Name"
            color="secondary"
            variant="filled"
            onChange={handleInputChange}
            sx={{
              width: '50%',
            }}
          />
          <TextField
            required
            name="age"
            label="Age"
            type="number"
            variant="filled"
            color="secondary"
            onChange={handleInputChange}
            sx={{ width: '50%' }}
          />
        </Box>
        <Box
          className="inputs"
          sx={{
            width: '100%',
            display: 'flex',
            gap: '1rem',
          }}
        >
          <FormControl sx={{ width: '50%' }} color="secondary" required>
            <InputLabel id="sexLabel">Sex</InputLabel>
            <Select
              labelId="sexLabel"
              name="sex"
              value={newDog.sex}
              label="Sex"
              variant="filled"
              onChange={handleInputChange}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '50%' }} color="secondary" required>
            <InputLabel id="sizeLabel">Size</InputLabel>
            <Select
              labelId="sizeLabel"
              name="size"
              value={newDog.size}
              label="Size"
              variant="filled"
              onChange={handleInputChange}
            >
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'big'}>Big</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          className="inputs"
          sx={{
            width: '100%',
            display: 'flex',
            gap: '1rem',
          }}
        >
          <TextField
            required
            label="More info"
            name="info"
            multiline
            rows={4}
            value={newDog.info}
            variant="filled"
            color="secondary"
            onChange={handleInputChange}
            sx={{ width: '78%' }}
          />
          <Button
            variant="contained"
            component="label"
            onChange={handleInputChange}
            sx={{
              color: `${theme.palette.text.contrast}`,
              background: `${theme.palette.primary.dark}`,
              ':hover': { backgroundColor: `${theme.palette.action.hover}` },
            }}
          >
            Upload image
            <input hidden accept="image/*" multiple type="file" name="image" />
          </Button>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          sx={{
            width: '100%',
            color: `${theme.palette.text.contrast}`,
            background: `${theme.palette.primary.dark}`,
            ':hover': { backgroundColor: `${theme.palette.action.hover}` },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddDog;
