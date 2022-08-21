import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import App from './App';
import DogPage from './components/DogPage';
import AddDog from './components/AddDog';
import EditDog from './components/EditDog';
import React from 'react';
import { ColorModeProvider } from './context/ColorModeContext';

const AppNavigation = () => {
  return (
    <ColorModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="DogPage/:dogId" element={<DogPage />} />
            <Route path="AddDog/:newDogId" element={<AddDog />} />
            <Route path="EditDog/:dogId" element={<EditDog />} />
          </Route>
          <Route path="*" element={<p>There's nothing here!</p>} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  );
};

export default AppNavigation;
