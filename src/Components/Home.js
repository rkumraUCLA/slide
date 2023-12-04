import React, {useState} from 'react';
import { ChakraProvider, Box, Text, Image, ListItem, OrderedList, Flex, List } from '@chakra-ui/react';

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
<Flex
          position="absolute"
          top="100vh" // Adjust this value to control the scroll position where the "About Us" section appears
          width="100%"
          bg="white" // Adjust background color
          padding="4"
          zIndex={1}
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
        >
          {/* Left-aligned "About Slide" section */}
          <Box width={{ base: '100%', md: '48%' }} textAlign={{ base: 'left', md: 'left' }}>
            <Text fontSize="4xl" fontWeight="bold" color="black">
              About Slide
            </Text>
            <Box className="steps">
              <Text fontSize="2xl" color="#007bffbb">
              Find, Schedule, Play -- Coordination Made Easy!
              </Text>
              <OrderedList>
                <ListItem>
                </ListItem>
                <ListItem>
                  If there are events that interest you, go ahead and join!
                </ListItem>
                <ListItem>
                  Can't find what you are looking for? Go ahead and click create so that other users may join your event.
                </ListItem>
                <ListItem>
                  Either way, you'll receive an email shortly after confirming your event!
                </ListItem>
              </OrderedList>
            </Box>
          </Box>
          {/* Left-aligned image */}
          <Box width={{ base: '100%', md: '20%' }}>
            <Image src="/left-image.jpg" alt="Left Image" w="50%" h="auto" mt="4" />
          </Box>
        </Flex>

        {/* How It Works Section */}
        <Flex
          position="absolute"
          top="150vh" // Adjust this value to control the scroll position where the "How It Works" section appears
          width="100%"
          bg="white" // Adjust background color
          padding="4"
          zIndex={1}
          direction={{ base: 'column', md: 'row-reverse' }} // Change direction to row-reverse
          justify="space-between"
          align="center"
        >
          {/* Right-aligned "How It Works" section */}
          <Box width={{ base: '100%', md: '48%' }} textAlign={{ base: 'left', md: 'right' }}>
            <Text fontSize="4xl" fontWeight="bold" color="black">
              How It Works
            </Text>
            <Text fontSize="1xl" color="black">
            <Box className="order" textAlign="left">
              <OrderedList>
              <ListItem>
              Look for events that interest you or create an event where other people can join you.
              </ListItem>
              <ListItem>
              If there are events that interest you, go ahead and join!
              </ListItem>
              <ListItem>
              Can't find what you are looking for? Go ahead and click create so that other users may join your event.
              </ListItem>
              <ListItem>
              Either way, you'll receive an email shortly after confirming your event!
              </ListItem>
          </OrderedList>
            </Box>  
            </Text>         
          </Box>
          {/* Right-aligned image */}
          <Box width={{ base: '100%', md: '30%' }}>
            <Image src="/right-image.jpg" alt="Right Image" w="50%" h="auto" mt="4" align="left" />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}




export default Home;