// src/components/ImageSlider.js
import React, { useState } from 'react';
import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import image from '../images/1s.jpg';
import log from '../images/2s.jpg';
import logo from '../images/3s.jpg';

const images = [
  image,
  log,
  logo,
  // Add more images as needed
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box 
      display="flex" 
      
      flexDirection="column" 
      alignItems="center" 
      mt={4}
      sx={{ px: 2 }} // Add some padding on small screens
    >
      <img
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex + 1}`}
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          borderRadius: 8,
          boxShadow: theme.shadows[2] // Add some shadow for better visibility
        }}
      />
      <Box 
        mt={2} 
        display="flex" 
        justifyContent="space-between" 
        width="100%"
        sx={{ 
          flexDirection: isSmallScreen ? 'column' : 'row', // Stack buttons vertically on small screens
          alignItems: isSmallScreen ? 'center' : 'flex-start'
        }}
      >
        <Button
          onClick={handlePrev}
          variant="outlined"
          color="primary"
          sx={{ mb: isSmallScreen ? 1 : 0, mr: isSmallScreen ? 0 : 2 }}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ImageSlider;
