const events = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
    buttonLabel: "Buy Tickets",
  },
  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
    buttonLabel: "Buy Tickets",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
    buttonLabel: "Buy Tickets",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
    buttonLabel: "Buy Tickets",
  },
  {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
    buttonLabel: "Buy Tickets",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
    buttonLabel: "Buy Tickets",
  },
];

const eventContainer = document.querySelector(".event-section__event-container");

function generateEvent(event) {
  //div to wrap the event
  const eventDiv = document.createElement("div");
  eventDiv.classList.add("event-section__event");

  const eventDetails = document.createElement("div");
  eventDetails.classList.add("event-section__details");

  const dateDiv = document.createElement("div");
  dateDiv.classList.add("event-section__date-container");

  const dateLabel = document.createElement("p");
  dateLabel.textContent = "DATE";
  dateLabel.classList.add("event-section__label");
  dateDiv.appendChild(dateLabel);

  const date = document.createElement("p");
  date.textContent = event.date;
  date.classList.add("event-section__date");
  dateDiv.appendChild(date);

  eventDetails.appendChild(dateDiv);

  const venueDiv = document.createElement("div");
  venueDiv.classList.add("event-section__venue-container");

  const venueLabel = document.createElement("p");
  venueLabel.textContent = "VENUE";
  venueLabel.classList.add("event-section__label");
  venueDiv.appendChild(venueLabel);

  const venue = document.createElement("p");
  venue.textContent = event.venue;
  venue.classList.add("event-section__venue");
  venueDiv.appendChild(venue);

  eventDetails.appendChild(venueDiv);

  const locationDiv = document.createElement("div");
  locationDiv.classList.add("event__location-container");

  const locationLabel = document.createElement("p");
  locationLabel.textContent = "LOCATION";
  locationLabel.classList.add("event-section__label");
  locationDiv.appendChild(locationLabel);

  const location = document.createElement("p");
  location.textContent = event.location;
  location.classList.add("event-section__location");
  locationDiv.appendChild(location);

  eventDetails.appendChild(locationDiv);



  const button = document.createElement("button");
  button.textContent = event.buttonLabel;
  button.classList.add("event-section__button");
  eventDiv.appendChild(button);

      eventDetails.appendChild(button);

    eventDiv.appendChild(eventDetails);
  //attaching the whole details to the main div
  eventContainer.appendChild(eventDiv);
}

events.forEach((event) => generateEvent(event));
