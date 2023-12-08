import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const userId = localStorage.getItem('userId');
    const [error, setError] = useState(null)
    const jsonId = {myEvents: eventId}
    console.log(JSON.stringify(jsonId))
    console.log(userId)

    const handleSubmit = async(e) =>{
        try {
            const response2 = await fetch(`/api/user/addEvent/${userId}`,{
                method:'PATCH',
                body: JSON.stringify(jsonId),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            console.log("Old event", event)

            const decSpots = await fetch(`/api/events/decSpots/${eventId}`, {
                method:'PATCH'
            })
            if (!decSpots.ok) {
                throw new Error('Dec spots not working');
            }
            const updatedEvent = await decSpots.json();
            console.log('Event updated:', updatedEvent);
            if (!response2.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedUser = await response2.json();
            console.log('User updated:', updatedUser);
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    }

    useEffect(() => {
        // Function to fetch event details based on eventId
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`);
                const eventData = await response.json();
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            bgGradient="linear(to-r, #7dd3fc, #075985)"
            color="white"
            p="8"
            borderRadius="lg"
            boxShadow="xl"
            maxW="xl"
            mx="auto"
            mt="20"
        >
            <Box maxW="md">
                <Heading as="h2" size="xl">
                    {event.title}
                </Heading>
                <Text fontSize="bold">Sports: {event.sport}</Text>
                <Text fontSize="bold">Description: {event.description}</Text>
                <Text fontSize="bold">Total Spots: {event.spotsTotal}</Text>
                <Text fontSize="bold">Open Spots: {event.spotsOpen}</Text>
                <Text fontSize="bold">People Going: {event.usersAssociated}</Text>
                <Text fontSize="bold">Date: {new Date(event.eventDate).toLocaleDateString('en-US')}</Text>
                {/* Add other details as needed */}
                
                <Link to={`/findevents`}>
                    <Button mt={4} bg="#075985" color="white" size="sm">
                        Find More Events
                    </Button>
                </Link>
                
                {/* Add margin-left to create space between the two buttons */}
                <Link to={`/signupconfirmed`} ml={4}> {/* Adjust ml value as needed */}
                    <Button mt={4} bg="#0284c7" color="white" size="sm" onClick={handleSubmit}>
                        Slide!
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default EventDetails;
