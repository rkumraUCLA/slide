import React, {useState} from 'react';
import { ChakraProvider, Box, Text, Image, ListItem, OrderedList } from '@chakra-ui/react';

function Home() {
  const[videoError, setVideoError] = useState(false);

  return (
    <ChakraProvider>
        <Box position="relative" height="100vh" overflow="auto">
          {/* Video Background -- this is a placeholder for the real slide animation! */}
          {!videoError ? (
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
            
            onError={() => setVideoError(true)} //makes sure the video error is caught & addressed
          >
            <source src="stars.mp4" type="video/mp4" /> 
            Your browser does not support the video tag.
          </video>
          ) : null}

          {/* Default Background Image */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            backgroundImage="url('your-default-image.jpg')" //default image!
            backgroundSize="cover"
            zIndex={videoError ? -1 : 0} // Set zIndex to -1 only if the video fails to load
          ></Box>
          
          {/* Title Content */}
          <Box textAlign="center" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
            <Text fontSize="4xl" fontWeight="bold" color="white">
              Welcome to Slide
            </Text>
            <Text fontSize="1xl" color="white">
              Where People & Plans Align
            </Text>
            {/* Add more content here */}
          </Box>

          {/* About Section */}
          <Box
            position="absolute"
            top="100vh" // Adjust this value to control the scroll position where the "About" section appears
            width="100%"
            height="100%"
            bg="#007bffbb" // Adjust background color
            padding="4"
            zIndex={1}
          >
            <Text fontSize="2xl" fontWeight="bold" color="black">
              About Us
            </Text>
            <Text fontSize="1xl" color="black">
              Your about content goes here. This section will be visible after scrolling past the image. CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT CONTENT CONNEXT
            </Text>
          </Box>
       </Box>
    </ChakraProvider>
  );
}


export default Home;