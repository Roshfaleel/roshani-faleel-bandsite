// const events = [
//   {
//     date: "Mon Sept 09 2024",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//     buttonLabel: "Buy Tickets",
//   },
//   {
//     date: "Tue Sept 17 2024",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//     buttonLabel: "Buy Tickets",
//   },
//   {
//     date: "Sat Oct 12 2024",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//     buttonLabel: "Buy Tickets",
//   },
//   {
//     date: "Sat Nov 16 2024",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//     buttonLabel: "Buy Tickets",
//   },
//   {
//     date: "Fri Nov 29 2024",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//     buttonLabel: "Buy Tickets",
//   },
//   {
//     date: "Wed Dec 18 2024",
//     venue: "Press Club",
//     location: "San Francisco, CA",
//     buttonLabel: "Buy Tickets",
//   },
// ];

const apiKey = "8a658617-935c-48e4-9ff3-129aeac3fbe0";
const api = new BandsiteApi(apiKey);

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function displayEvents() {
  const eventContainer = document.querySelector(
    ".event-section__event-container"
  );
  //header labels for tablet and the desktop
  const eventHeader = document.createElement("div");
  eventHeader.classList.add("event-section__header");

  const dateHeader = document.createElement("p");
  dateHeader.textContent = "DATE";
  dateHeader.classList.add("event-section__header-label");
  eventHeader.appendChild(dateHeader);

  const venueHeader = document.createElement("p");
  venueHeader.textContent = "VENUE";
  venueHeader.classList.add("event-section__header-label");
  eventHeader.appendChild(venueHeader);

  const locationHeader = document.createElement("p");
  locationHeader.textContent = "LOCATION";
  locationHeader.classList.add("event-section__header-label");
  eventHeader.appendChild(locationHeader);

  eventContainer.appendChild(eventHeader);

  try {
    const events = await api.getShows();
    console.log("API response:", events);

    //looping the events
    events.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event-section__event");

      const eventDetails = document.createElement("div");
      eventDetails.classList.add("event-section__details");

      //DATE
      const dateDiv = document.createElement("div");
      dateDiv.classList.add("event-section__date-container");

      const dateLabel = document.createElement("p");
      dateLabel.textContent = "DATE"; //this is for the mobile value
      dateLabel.classList.add("event-section__label", "mobile-only");
      dateDiv.appendChild(dateLabel);

      const date = document.createElement("p");
      date.textContent = formatDate(event.date);
      date.classList.add("event-section__date");
      dateDiv.appendChild(date);

      eventDetails.appendChild(dateDiv);

      //VENUE
      const venueDiv = document.createElement("div");
      venueDiv.classList.add("event-section__venue-container");

      const venueLabel = document.createElement("p");
      venueLabel.textContent = "VENUE"; //this is for the mobile value
      venueLabel.classList.add("event-section__label", "mobile-only");
      venueDiv.appendChild(venueLabel);

      const venue = document.createElement("p");
      venue.textContent = event.place;
      venue.classList.add("event-section__venue");
      venueDiv.appendChild(venue);

      eventDetails.appendChild(venueDiv);

      //LOCATION
      const locationDiv = document.createElement("div");
      locationDiv.classList.add("event-section__location-container");

      const locationLabel = document.createElement("p");
      locationLabel.textContent = "LOCATION"; //this is for the mobile value
      locationLabel.classList.add("event-section__label", "mobile-only");
      locationDiv.appendChild(locationLabel);

      const location = document.createElement("p");
      location.textContent = event.location;
      location.classList.add("event-section__location");
      locationDiv.appendChild(location);

      eventDetails.appendChild(locationDiv);

      const button = document.createElement("button");
      button.textContent = "Buy Tickets";
      button.classList.add("event-section__button");
      eventDetails.appendChild(button);

      eventDiv.appendChild(eventDetails);
      //attaching the whole details to the main div
      eventContainer.appendChild(eventDiv);
    });

    //highlighting the selected event

    const eventItems = document.querySelectorAll(".event-section__event");

    function handleClick(e) {
      eventItems.forEach((item) => {
        item.classList.remove("selected");
      });
      e.currentTarget.classList.add("selected");
    }
    eventItems.forEach((eventItems) => {
      eventItems.addEventListener("click", handleClick);
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
displayEvents();
