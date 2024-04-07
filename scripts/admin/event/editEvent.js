import axios from "axios";
import { BASE_URL, authAdmin, getAuthToken } from "../../main.js";

// Check if the user has admin access. If not redirect to login page.
authAdmin();
const authToken = getAuthToken();

const editEventForm = document.getElementById("edit-event-form");

async function fetchEventDetails(eventId) {
  try {
    const response = await axios.get(BASE_URL + `api/v1/events/${eventId}`, { headers: { "x-auth-token": authToken } });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to format date to yyyy-MM-ddThh:mm format
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

async function populateForm(eventId) {
  try {
    const eventData = await fetchEventDetails(eventId);
    const formFields = ['title', 'teamSize', 'regStartDate', 'regEndDate', 'eventDate', 'venue', 'imageUri', 'description'];

    formFields.forEach(field => {
      const inputElement = editEventForm.querySelector(`[name="${field}"]`);
      if (inputElement) {
        // Check if the field is a date field
        if (['regStartDate', 'regEndDate', 'eventDate'].includes(field)) {
          inputElement.value = formatDate(eventData[field]);
        } else {
          inputElement.value = eventData[field];
        }
      }
    });
  } catch (error) {
    console.error(error);
    // Handle error, e.g., show error message to user
  }
}

async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(editEventForm);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data._id = eventId;

  const headers = {
    "x-auth-token": authToken
  };

  try {
    const response = await axios.patch(BASE_URL + `api/v1/events`, data, { headers });
    console.log(response);
    document.getElementById('success-message').classList.remove('d-none'); // Show success message
    document.getElementById('error-message').innerText = "";
    document.getElementById('error-message').classList.add('d-none'); // Disable error message box
    window.location.href = "/admin/events/listEvents.html";
  } catch (error) {
    console.error(error);
    // Handle error, display error message to user
    document.getElementById('success-message').classList.add('d-none'); // Disable success message box
    document.getElementById('error-message').innerText = "An error occurred. Please try again later."; // Generic error message
    document.getElementById('error-message').classList.remove('d-none');
  }
}

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

populateForm(eventId);
editEventForm.addEventListener("submit", submitForm);
