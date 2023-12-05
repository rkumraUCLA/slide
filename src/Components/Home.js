import React, { useState } from 'react';
import { ChakraProvider, Box, Text, Flex, Heading, Icon } from '@chakra-ui/react';
import { FaPeoplePulling } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { GrSchedules } from 'react-icons/gr';
import Footer from './Footer';


const FeatureComponent = ({ icon, title, description }) => {
  return (
    <Box width={{ base: '100%', md: '30%' }} textAlign="center">
      <Icon as={icon} boxSize={12} color="#38bdf8" />
      <Heading mt={4} fontSize="3xl" fontWeight="bold" color="black">
        {title}
      </Heading>
      <Text mt={2} color="black">
        {description}
      </Text>
    </Box>
  );
};

function Home() {
  const [videoError, setVideoError] = useState(false);

  return (
    <ChakraProvider>
      <Box position="relative" height="100vh" overflow="auto">
        {/* Video Background */}
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
            onError={() => setVideoError(true)}
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
          zIndex={videoError ? -1 : 0}
        ></Box>

        {/* Title Content */}
        <Box textAlign="center" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Text fontSize="8xl" fontWeight="bold" color="white">
            Welcome to Slide
          </Text>
          <Text fontSize="1xl" color="white">
            Where People & Plans Align
          </Text>
        </Box>

        {/* Feature Section */}
        <Flex
          position="absolute"
          top="100vh"
          width="100%"
          bg="#f0f9ff"
          padding="4"
          zIndex={1}
          direction={{ base: 'column', md: 'row' }}
          justify="space-around"
          align="center"
        >
          {/* Feature 1 */}
          <FeatureComponent
            icon={FaSearch}
            title="Discover"
            description="Find events that match your interests, from sports to music to parties."
          />

          {/* Feature 2 */}
          <FeatureComponent
            icon={GrSchedules}
            title="Schedule"
            description="Create and host your own events and open it up to others to attend. "
          />

          {/* Feature 3 */}
          <FeatureComponent
            icon={FaPeoplePulling}
            fontWeight="bold"
            fontSize="8xl"
            title="Slide"
            description="Slide right into fun events, new friendships, and unique experiences!"
          />
        </Flex>  
        
      </Box>
      <Footer/>
    </ChakraProvider>
  );
}

export default Home;
