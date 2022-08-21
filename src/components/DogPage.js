import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CardMedia,
  Card,
  Button,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './DeleteDog';

const DogPage = () => {
  const [dogInfo, setDogInfo] = useState([]);
  let params = useParams();
  const theme = useTheme();

  useEffect(() => {
    axios.get('http://localhost:3001/dogs').then((response) => {
      setDogInfo(response.data[params.dogId]);
    });
  }, [params.dogId]);

  return (
    <Box
      className="mainDogPage"
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
      <Box
        className="actions"
        sx={{ alignSelf: 'flex-start', display: 'flex' }}
      >
        <Button
          component={Link}
          to={`/EditDog/${params.dogId}`}
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            background:
              theme.palette.mode === 'light'
                ? `${theme.palette.primary.dark}`
                : `${theme.palette.primary.light}`,
            color: `${theme.palette.text.contrast}`,
            mx: '1rem',
            mb: '1rem',
            ':hover': { backgroundColor: `${theme.palette.action.hover}` },
          }}
        >
          Edit
        </Button>
        <AlertDialog dogId={params.dogId} />
      </Box>
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
        <Box className="basicInfoCont">
          <Typography
            variant="h1"
            sx={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: `${theme.palette.text.primary}`,
            }}
          >
            {dogInfo.name}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2rem',
              color: `${theme.palette.text.secondary}`,
              fontWeight: 'regular',
            }}
          >
            Age: {dogInfo.age}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2rem',
              color: `${theme.palette.text.secondary}`,
              fontWeight: 'regular',
            }}
          >
            Sex: {dogInfo.sex}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2rem',
              color: `${theme.palette.text.secondary}`,
              fontWeight: 'regular',
            }}
          >
            Size: {dogInfo.size}
          </Typography>
        </Box>
        <Card sx={{ width: '550px' }}>
          <CardMedia
            component="img"
            height="300px"
            image={`/./${dogInfo.image}`}
            alt="dog"
          />
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
        More about {dogInfo.name}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: '1rem',
          fontWeight: 'regular',
          color: `${theme.palette.text.secondary}`,
          px: '1rem',
        }}
      >
        {dogInfo.info}
      </Typography>
    </Box>
  );
};

export default DogPage;
