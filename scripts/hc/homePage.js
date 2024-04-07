import axios from "axios";
import { BASE_URL } from "../main.js";

function createHorizontalCard(data) {
  // Create div element with class 'card'
  const cardDiv = document.createElement("div");
  cardDiv.className = "card mb-5";
  cardDiv.style.width = "70vw";

  // Create div element with class 'row'
  const rowDiv = document.createElement("div");
  rowDiv.className = "row no-gutters";

  // Create div element with class 'col-md-4'
  const imgColDiv = document.createElement("div");
  imgColDiv.className = "col-md-4";

  // Create img element
  const imgElement = document.createElement("img");
  imgElement.src = data.imageUri;
  imgElement.className = "card-img";
  imgElement.alt = data.title;
  imgElement.style.height = "250px";

  // Append img element to imgColDiv
  imgColDiv.appendChild(imgElement);

  // Create div element with class 'col-md-8'
  const contentColDiv = document.createElement("div");
  contentColDiv.className = "col-md-8";

  // Create div element with class 'card-body'
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  // Create h5 element with class 'card-title'
  const titleElement = document.createElement("h5");
  titleElement.className = "card-title";
  titleElement.textContent = data.title;

  // Create p elements with class 'card-text'
  const teamSizeElement = document.createElement("p");
  teamSizeElement.className = "card-text";
  teamSizeElement.textContent = "Team Size: " + data.teamSize;

  const regStartDateElement = document.createElement("p");
  regStartDateElement.className = "card-text";
  regStartDateElement.textContent =
    "Registration Start Date: " + new Date(data.regStartDate).toLocaleString();

  const regEndDateElement = document.createElement("p");
  regEndDateElement.className = "card-text";
  regEndDateElement.textContent =
    "Registration End Date: " + new Date(data.regEndDate).toLocaleString();

  const eventDateElement = document.createElement("p");
  eventDateElement.className = "card-text";
  eventDateElement.textContent =
    "Event Date: " + new Date(data.eventDate).toLocaleString();

  const venueElement = document.createElement("p");
  venueElement.className = "card-text";
  venueElement.textContent = "Venue: " + data.venue;

  // Create a element with class 'btn btn-primary'
  const linkElement = document.createElement('a');
  linkElement.href = `/hc/addParticipant?eventId=${data._id}&participantDocId=${data.participantDocId}`;
  linkElement.className = 'btn btn-primary';
  linkElement.textContent = 'Add participant';

  // Append elements to each other to form the structure
  cardBodyDiv.appendChild(titleElement);
  cardBodyDiv.appendChild(teamSizeElement);
  cardBodyDiv.appendChild(regStartDateElement);
  cardBodyDiv.appendChild(regEndDateElement);
  cardBodyDiv.appendChild(eventDateElement);
  cardBodyDiv.appendChild(venueElement);
  cardBodyDiv.appendChild(linkElement);
  contentColDiv.appendChild(cardBodyDiv);

  // Append imgColDiv and contentColDiv to rowDiv
  rowDiv.appendChild(imgColDiv);
  rowDiv.appendChild(contentColDiv);

  // Append rowDiv to cardDiv
  cardDiv.appendChild(rowDiv);

  // Append the whole card to a container in your HTML document
  const container = document.getElementById("container"); // Replace 'cardContainer' with the id of the container where you want to append the card
  container.appendChild(cardDiv);
}

const url = BASE_URL + "api/v1/events";

async function getEvents(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("unable to get events.", error.response);
  }
}

let events = await getEvents(url);
if (events) {
  console.log(events);
  events.forEach((element) => {
    console.log(element);
    createHorizontalCard(element);
  });
} else {
  console.log("no events found");
}
