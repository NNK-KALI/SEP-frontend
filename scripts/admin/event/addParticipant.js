import axios from "axios";
import { BASE_URL, getAuthToken, showAlert } from "../../main";

function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const participantDocId = getUrlParameter("participantDocId");
const eventDocId = getUrlParameter("eventId");

const addParticipantForm = document.getElementById("add-participant-form");
addParticipantForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const authToken = getAuthToken();
  const headers = {
    "x-auth-token": authToken,
  };
  const payload = {
    participantDocId: participantDocId,
    rollno: document.getElementById("roll-no").value,
  };
  try {
    const response = await axios.patch(
      BASE_URL + "api/v1/participants/adduser",
      payload,
      { headers: headers },
    );
    addParticipantForm.reset();
    window.location.reload();
  } catch (error) {
    console.log(error);
    showAlert(error.response.data, "danger");
    // addParticipantForm.reset();
  }
});

// Fetch registered users from database
async function getRegUsers(participantDocId) {
  const regUsers = await axios.get(
    BASE_URL + `api/v1/participants/${participantDocId}`,
  );
  return regUsers.data;
}

// Function to create table row
function createTableRow(participantDocId, data) {
  const row = document.createElement("tr");
  const keys = Object.keys(data);
  for (const key in keys) {
    if (keys[key] === "id") delete keys[key];
  }
  keys.forEach(function (key) {
    const cell = document.createElement("td");
    cell.textContent = data[key];
    row.appendChild(cell);
  });

  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.addEventListener("click", function () {
    deleteParticipant(participantDocId, data.id);
  });
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  return row;
}

// Function to populate table with registered students
function populateTable(data, elementId) {
  const tableBody = document.getElementById(elementId);

  for (let item of data) {
    const row = createTableRow(participantDocId, item);
    tableBody.appendChild(row);
  }
}

async function deleteParticipant(participantDocId, userDocId) {
  const authToken = getAuthToken();
  const headers = {
    "x-auth-token": authToken,
  };
  try {
    await axios.delete(BASE_URL + `api/v1/participants/removeuser`, {
      data: { participantDocId, userDocId },
      headers: headers,
    });
    // Assuming you want to refresh the table after deletion
    const regUsers = await getRegUsers(participantDocId);
    const tableBody = document.getElementById("students-table-body");
    tableBody.innerHTML = "";
    populateTable(regUsers, "students-table-body");
  } catch (error) {
    console.log(error);
  }
}

// Call the function to populate the table
populateTable(await getRegUsers(participantDocId), "students-table-body");

const fetchEventDetails = async (id) => {
  try {
    // Make GET request to fetch event details
    const response = await axios.get(BASE_URL + `api/v1/events/${id}`);
    return response.data; // Assuming the response contains the event details
  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
};

// Function to construct div with event details
const constructEventDiv = async (eventId) => {
  // Fetch event details
  const eventDetails = await fetchEventDetails(eventId);

  if (eventDetails) {
    // Create main div
    const mainDiv = document.getElementById("event-div");
    mainDiv.style.textAlign = "center";

    // Create title div
    const titleDiv = document.createElement("div");
    titleDiv.textContent = eventDetails.title;
    titleDiv.style.fontWeight = "bold";
    titleDiv.style.fontSize = "24px";
    titleDiv.style.marginBottom = "20px";
    mainDiv.appendChild(titleDiv);

    // Create container div for details and image
    const containerDiv = document.createElement("div");
    containerDiv.style.display = "flex";
    containerDiv.style.justifyContent = "space-between";
    mainDiv.appendChild(containerDiv);

    // Create div for details

    const detailsDiv = document.createElement("div");
    detailsDiv.innerHTML = `
    <p><strong>Description:</strong> ${eventDetails.description}</p>
    <p><strong>Team Size:</strong> ${eventDetails.teamSize}</p>
    <p><strong>Registration Start Date:</strong> ${new Date(eventDetails.regStartDate).toLocaleString()}</p>
    <p><strong>Registration End Date:</strong> ${new Date(eventDetails.regEndDate).toLocaleString()}</p>
    <p><strong>Event Date:</strong> ${new Date(eventDetails.eventDate).toLocaleString()}</p>
    <p><strong>Venue:</strong> ${eventDetails.venue}</p>
`;

    // Create a button element
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Event";
    editButton.classList.add("btn", "btn-primary");
    // Set the href attribute to the edit page URL with the event ID
    editButton.setAttribute(
      "onclick",
      `window.location.href = '/admin/events/editEvent.html?eventId=${eventDetails._id}'`,
    );

    // Append the button to the detailsDiv
    detailsDiv.appendChild(editButton);

    containerDiv.appendChild(detailsDiv);

    // Create div for image
    const imageDiv = document.createElement("div");
    const image = document.createElement("img");
    image.src = eventDetails.imageUri;
    image.style.maxWidth = "300px"; // Adjust size as needed
    imageDiv.appendChild(image);
    containerDiv.appendChild(imageDiv);

    // Append main div to document body
    document.body.appendChild(mainDiv);
  }
};

// Call function to construct event div
constructEventDiv(eventDocId);
