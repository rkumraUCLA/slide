import React from 'react';
import { ChakraProvider, Box, Text, Image, ListItem, OrderedList } from '@chakra-ui/react';

const About = () => {
  return (
    <ChakraProvider>
      <Box className="homepage-content">
        <Box className="section hero-container" display="flex">
        <Box className="hero-text">
            <Text className="hero-title" fontSize="5xl" mt="300" ml="40">Welcome to Slide!</Text>
            <Text className="hero-subtext" fontSize="xl" mt="2" ml="40">Create or find events with fellow Bruins in an instant!</Text>
            <Box className="HomeButton"></Box>
          </Box>
          <Box className="hero-image">
            <Image
              src={process.env.PUBLIC_URL + '../banner.png'}
              alt="Hero Image"
              w="600px"
              h="500px"
              mt="100px"
              ml="100px"
            />
          </Box>
        </Box>
        <Box className="section light-gray-background" display="flex">
          <Box className="left-half">
            <Box className="left-image">
              <Image
                src={process.env.PUBLIC_URL + ''}
                alt="Left Image"
                w="400px"
                h="360px"
                mt="62px"
                borderRadius="20px"
                ml="120px"
              />
            </Box>
          </Box>
          <Box className="right-half">
            <Text className="light-red-text" fontSize="3xl" mt="70px" ml="5">Steps for finding/creating an event</Text>
            <Box className="steps">
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
          </Box>
        </Box>
        <Box className="section" display="flex">
          <Box className="left-half">
            <Text className="light-red-text2" fontSize="3xl" mt="40px" ml="15px">Accessing Profile Page</Text>
            <Box className="profile">
              <OrderedList ml="50px">
                <ListItem>
                  Your profile page contains all of your personal information, especially including your events.
                </ListItem>
                <ListItem>
                  Here, you'll be able to see your upcoming events. You can update the time if you created it or leave the event if you would like.
                </ListItem>
                <ListItem>
                  You'll also be able to see your previous events if you ever want to take a look back to what you've been a part of.
                </ListItem>
              </OrderedList>
            </Box>
          </Box>
          <Box className="right-half" display="flex">
            <Box className="right-image">
              <Image
                src={process.env.PUBLIC_URL + ''}
                alt="Right Image"
                w="250px"
                h="200px"
                mt="70px"
                ml="130px"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default About;
