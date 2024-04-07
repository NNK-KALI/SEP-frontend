import { BASE_URL, getAuthToken, authAdmin } from "../../main.js";
import axios from "axios";

// Check if user has admin access or not. If not redirect to login page.
authAdmin()
const authToken = getAuthToken();

async function displayEvents() {
  try {
    const eventsResponse = await axios.get(BASE_URL + "api/v1/events");
    const events = eventsResponse.data;

    const eventsList = document.getElementById("eventsList");

    if (events.length > 0) {
      // Display events
      events.forEach((event) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "mb-3");
        cardDiv.style.width = "55vw";

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");

        const titleElement = document.createElement("h5");
        titleElement.classList.add("card-title");
        titleElement.textContent = event.title;

        const teamSizeElement = document.createElement("p");
        teamSizeElement.classList.add("card-text");
        teamSizeElement.textContent = "Team Size: " + event.teamSize;

        const regStartDateElement = document.createElement("p");
        regStartDateElement.classList.add("card-text");
        regStartDateElement.textContent =
          "Registration Start Date: " +
          new Date(event.regStartDate).toLocaleString();

        const regEndDateElement = document.createElement("p");
        regEndDateElement.classList.add("card-text");
        regEndDateElement.textContent =
          "Registration End Date: " +
          new Date(event.regEndDate).toLocaleString();

        const eventDateElement = document.createElement("p");
        eventDateElement.classList.add("card-text");
        eventDateElement.textContent =
          "Event Date: " + new Date(event.eventDate).toLocaleString();

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteEvent(event._id));

        cardBodyDiv.appendChild(titleElement);
        cardBodyDiv.appendChild(teamSizeElement);
        cardBodyDiv.appendChild(regStartDateElement);
        cardBodyDiv.appendChild(regEndDateElement);
        cardBodyDiv.appendChild(eventDateElement);
        cardBodyDiv.appendChild(deleteButton);

        cardDiv.appendChild(cardBodyDiv);

        eventsList.appendChild(cardDiv);
      });
    } else {
      // No events
      const noEventsMessage = document.createElement("p");
      noEventsMessage.textContent = "No events found.";
      eventsList.appendChild(noEventsMessage);
    }
  } catch (error) {
    console.error("Unable to fetch events:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Error fetching events. Please try again later.";
    eventsList.appendChild(errorMessage);
  }
}
const url = BASE_URL + "api/v1/events";
async function deleteEvent(eventId) {
  try {
    await axios.delete(url, {
      headers: {
        "x-auth-token": authToken,
      },
      data: {
        "_id": eventId,
      },
    });

    // Reload events after deletion
    location.reload();
  } catch (error) {
    console.error("Unable to delete event:", error);
    alert("Error deleting event. Please try again later.");
  }
}

displayEvents();
