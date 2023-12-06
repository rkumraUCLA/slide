import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const userId = localStorage.getItem('userId');
    const [error, setError] = useState(null)
    const jsonId = {id: eventId}
    console.log(JSON.stringify(jsonId))

    const handleSubmit = async(e) =>{
        // const response = await fetch(`/api/events/${eventId}`,{
        //     method:'PATCH',
        //     body: JSON.stringify(jsonId),
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        // })

        // const json = await response.json()

        // if (!response.ok) {
        //   setError(json.error)
        // }
        // if (response.ok){
        //   setError(null)
        //   console.log('user added to event', json)
        // }
        try {
            const response2 = await fetch(`/api/user/${userId}/addEvent`,{
                method:'PATCH',
                body: JSON.stringify(eventId),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
    
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
        <Box mt="20">
            <Heading as="h2" size="xl">
                {event.title}
            </Heading>
            <Text>Sport: {event.sport}</Text>
            <Text>Description: {event.description}</Text>
            <Text>Total Spots: {event.spotsTotal}</Text>
            <Text>Open Spots: {event.spotsOpen}</Text>
            <Text>People Going: {event.usersAssociated}</Text>
            {/* Add other details as needed */}
            
            <Link to={`/findevents`}>
                <Button mt={4} colorScheme="teal" size="sm">
                    Find More Events
                </Button>
            </Link>
            <Link to={`/signupconfirmed`}>
                <Button mt={4} colorScheme="teal" size="sm" onClick={handleSubmit}>
                    Slide In!
                </Button>
            </Link>
        </Box>
    );
};

export default EventDetails;
