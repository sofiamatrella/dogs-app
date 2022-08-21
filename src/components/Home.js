import DogCard from './DogCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';

const Home = () => {
  const [dogsInfo, setDogsInfo] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios.get('http://localhost:3001/dogs').then((response) => {
      setDogsInfo(response.data);
    });
  }, []);

  return (
    <Box
      className="home"
      sx={{
        width: '100vw',
        height: '100vh',
        marginLeft: '210px',
        bgcolor: `${theme.palette.primary.main}`,
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          marginTop: '1rem',
          color: `${theme.palette.text.primary}`,
        }}
      >
        Welcome back!
      </Typography>
      <Box
        className="DogsContainer"
        sx={{
          width: '80%',
          display: 'flex',
          gap: '3rem',
          flexWrap: 'wrap',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        {dogsInfo.map((dog) => (
          <DogCard {...dog} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
