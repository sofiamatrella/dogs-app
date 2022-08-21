import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const DogCard = ({ name, age, sex, image, id }) => {
  const theme = useTheme();

  return (
    <Card sx={{ width: 270 }}>
      <Link to={`/DogPage/${id}`} key={id} style={{ textDecoration: 'none' }}>
        <CardActionArea
          sx={{ ':active': { color: '#482C6B' }, ':hover': { color: 'white' } }}
        >
          <CardMedia component="img" height="150" image={image} alt="dog" />
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: `${theme.palette.text.primary}` }}
            >
              {name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: `${theme.palette.text.primary}` }}
            >
              {sex}, {age}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default DogCard;
