import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardMedia,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const EditDog = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [newDogInfo, setNewDogInfo] = useState({
    name: '',
    age: '',
    sex: '',
    size: '',
    info: '',
    image: '',
    id: '',
  });
  const theme = useTheme();

  useEffect(() => {
    axios.get('http://localhost:3001/dogs').then((response) => {
      setNewDogInfo(response.data[params.dogId]);
    });
  }, []);

  const handleInputChange = (event) => {
    setNewDogInfo({
      ...newDogInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/dogs/${params.dogId}`, {
        name: newDogInfo.name,
        age: newDogInfo.age,
        sex: newDogInfo.sex,
        size: newDogInfo.size,
        info: newDogInfo.info,
        image: newDogInfo.image,
        id: newDogInfo.id,
      })
      .then((response) => {
        console.log(response);
        navigate('/');
      });
  };

  return (
    <Box
      className="editMainPage"
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        width: '100vw',
        height: '100vh',
        marginLeft: '205px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        overflowY: 'scroll',
      }}
    >
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
        sx={{
          backgroundColor:
            theme.palette.mode === 'light'
              ? `${theme.palette.primary.dark}`
              : `${theme.palette.primary.light}`,
          color: `${theme.palette.text.contrast}`,
          mx: '1rem',
          mb: '1rem',
          ':hover': { backgroundColor: `${theme.palette.action.hover}` },
          alignSelf: 'flex-start',
        }}
      >
        Save
      </Button>
      <Box
        className="whiteContainer"
        sx={{
          width: '95%',
          backgroundColor: `${theme.palette.primary.light}`,
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Box
          className="basicInfoCont"
          sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}
        >
          <TextField
            required
            variant="standard"
            name="name"
            value={newDogInfo.name}
            onChange={handleInputChange}
            inputProps={{
              style: {
                fontSize: '3rem',
                fontWeight: 'bold',
                color: `${theme.palette.text.primary}`,
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                color: `${theme.palette.text.secondary}`,
                fontWeight: 'regular',
              }}
            >
              Age:
            </Typography>
            <TextField
              required
              variant="standard"
              name="age"
              type="number"
              value={newDogInfo.age}
              onChange={handleInputChange}
              sx={{ width: '10%' }}
              inputProps={{
                style: {
                  fontSize: '2rem',
                  fontWeight: 'regular',
                  textAlign: 'center',
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                color: `${theme.palette.text.secondary}`,
                fontWeight: 'regular',
              }}
            >
              Sex:
            </Typography>
            <Select
              required
              variant="standard"
              name="sex"
              value={newDogInfo.sex}
              onChange={handleInputChange}
              sx={{ fontSize: '2rem', textAlign: 'center' }}
            >
              <MenuItem value={'male'} sx={{ fontSize: '1.5rem' }}>
                Male
              </MenuItem>
              <MenuItem value={'female'} sx={{ fontSize: '1.5rem' }}>
                Female
              </MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: '2rem',
                color: `${theme.palette.text.secondary}`,
                fontWeight: 'regular',
              }}
            >
              Size:
            </Typography>
            <Select
              required
              variant="standard"
              name="size"
              value={newDogInfo.size}
              onChange={handleInputChange}
              sx={{ fontSize: '2rem' }}
            >
              <MenuItem value={'small'} sx={{ fontSize: '2rem' }}>
                Small
              </MenuItem>
              <MenuItem value={'medium'} sx={{ fontSize: '2rem' }}>
                Medium
              </MenuItem>
              <MenuItem value={'big'} sx={{ fontSize: '2rem' }}>
                Big
              </MenuItem>
            </Select>
          </Box>
        </Box>
        <Card sx={{ width: '550px' }}>
          <CardMedia
            component="img"
            height="300px"
            image={`/./${newDogInfo.image}`}
            alt="dog"
          />
          <Button
            variant="contained"
            component="label"
            onChange={handleInputChange}
            sx={{
              width: '100%',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
              backgroundColor: `${theme.palette.primary.dark}`,
              color: `${theme.palette.text.contrast}`,
              ':hover': { backgroundColor: `${theme.palette.action.hover}` },
            }}
          >
            Upload image
            <input hidden accept="image/*" multiple type="file" name="image" />
          </Button>
        </Card>
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          padding: '1rem',
          color: `${theme.palette.text.primary}`,
        }}
      >
        More about {newDogInfo.name}
      </Typography>
      <TextField
        required
        variant="standard"
        name="info"
        multiline
        rows={4}
        value={newDogInfo.info}
        onChange={handleInputChange}
        sx={{ width: '97%' }}
      />
    </Box>
  );
};

export default EditDog;
