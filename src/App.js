import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/PetsOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, ThemeProvider } from '@mui/material';
import ColorModeContext from './context/ColorModeContext';
import MUISwitch from './components/MUISwitch';

const App = () => {
  const [dogsPages, setDogsPages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [lastId, setLastId] = useState(0);

  const theme = useTheme();
  const context = useContext(ColorModeContext);

  useEffect(() => {
    axios.get('http://localhost:3001/dogs').then((response) => {
      setDogsPages(response.data);
      setLastId(response.data[response.data.length - 1].id + 1);
    });
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <ThemeProvider theme={context.currentTheme}>
      {console.log(context)}
      <Box
        className="main"
        sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          bgcolor: `${context.currentTheme.palette.primary.main}`,
          overflowY: 'hidden',
        }}
      >
        <Box
          className="navBar"
          sx={{
            height: '100vh',
            width: '15%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            bgcolor: `${context.currentTheme.palette.primary.light}`,
            borderBottomRightRadius: '16px',
            borderTopRightRadius: '16px',
            position: 'fixed',
            overflowY: 'auto',
            boxShadow: '1px 1px 3px 1px rgba(34, 21, 51, 0.3)',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ alignSelf: 'center', position: 'relative', bottom: '55px' }}
          >
            <Typography
              sx={{
                color: `${context.currentTheme.palette.text.primary}`,
                fontWeight:
                  context.currentTheme.palette.mode === 'light'
                    ? 'bold'
                    : 'regular',
              }}
            >
              Light
            </Typography>
            <MUISwitch onClick={context.colorMode.toggleColorMode} />
            <Typography
              sx={{
                color: `${context.currentTheme.palette.text.primary}`,
                fontWeight:
                  context.currentTheme.palette.mode === 'dark'
                    ? 'bold'
                    : 'regular',
              }}
            >
              Dark
            </Typography>
          </Stack>
          <List>
            <ListItem
              component={Link}
              to="/"
              sx={{
                color:
                  selectedIndex === -1
                    ? context.currentTheme.palette.mode === 'light'
                      ? `${context.currentTheme.palette.primary.dark}`
                      : `${context.currentTheme.palette.text.primary}`
                    : `${context.currentTheme.palette.text.secondary}`,
              }}
            >
              <ListItemButton
                selected={selectedIndex === -1}
                onClick={(event) => handleListItemClick(event, -1)}
              >
                <ListItemIcon>
                  <HomeIcon
                    sx={{
                      color:
                        selectedIndex === -1
                          ? context.currentTheme.palette.mode === 'light'
                            ? `${context.currentTheme.palette.primary.dark}`
                            : `${context.currentTheme.palette.text.primary}`
                          : `${context.currentTheme.palette.text.secondary}`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            {dogsPages.map((page) => (
              <ListItem
                component={Link}
                to={`/DogPage/${page.id}`}
                sx={{
                  color:
                    selectedIndex === page.id
                      ? context.currentTheme.palette.mode === 'light'
                        ? `${context.currentTheme.palette.primary.dark}`
                        : `${context.currentTheme.palette.text.primary}`
                      : `${context.currentTheme.palette.text.secondary}`,
                }}
              >
                <ListItemButton
                  selected={selectedIndex === page.id}
                  onClick={(event) => handleListItemClick(event, page.id)}
                >
                  <ListItemIcon>
                    <PetsIcon
                      sx={{
                        color:
                          selectedIndex === page.id
                            ? context.currentTheme.palette.mode === 'light'
                              ? `${context.currentTheme.palette.primary.dark}`
                              : `${context.currentTheme.palette.text.primary}`
                            : `${context.currentTheme.palette.text.secondary}`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem>
              <ListItemButton
                selected={selectedIndex === -2}
                onClick={(event) => handleListItemClick(event, -2)}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={Link}
                  to={`/AddDog/${lastId}`}
                  sx={{
                    background: `${context.currentTheme.palette.primary.dark}`,
                    color: `${context.currentTheme.palette.text.contrast}`,
                    ':hover': {
                      backgroundColor: `${context.currentTheme.palette.action.hover}`,
                    },
                  }}
                >
                  Add Dog
                </Button>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};
export default App;
