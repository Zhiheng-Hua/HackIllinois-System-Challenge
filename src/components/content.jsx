import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from "../styles/index.module.scss";

const formatDate = (date) => {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    (date.getDate()).toString().padStart(2, '0'),
  ].join('/');
}

const EventItem = ({event}) => {
  const { id, name, description, startTime, endTime, locations, sponsor, eventType, points, isAsync } = event;
  const eventTypeColor = {
    'QNA': '#ff66cc',
    'OTHER': '#0ed245',
    'WORKSHOP': '#33ccff',
    'MINIEVENT': 'orange'
  }
  return (
    <div key={id}>
      <h1>{name}</h1>
      {eventType && <p className={styles.eventType} style={{backgroundColor: eventTypeColor[eventType]}}>{eventType}</p>}
      {
        (isAsync) ? (
          <p>Asynchronous</p>
        ) : (
          <p>{`${formatDate(new Date(startTime))} - ${formatDate(new Date(endTime))}`}</p>
        )
      }
      <p>{description}</p>
      {sponsor && <p>{`sponsor: ${sponsor}`}</p>}
    </div>
  )
}

const Content = () => {
	const [allEvents, setAllEvents] = useState([]);
	useEffect(() => {
		const getAllEvents = async () => {
			const {data: response} = await axios.get("https://api.hackillinois.org/event/");
			console.log(response.events)
			setAllEvents(response.events);
		}
		getAllEvents();
	}, [])

	return (
    <div className={styles.contentContainer}>
      {
        allEvents.map(e => <EventItem event={e}/>)
      }
    </div>
	);
};

export default Content;
