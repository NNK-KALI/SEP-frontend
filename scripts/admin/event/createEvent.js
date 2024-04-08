import axios from "axios";
import { BASE_URL, authAdmin, getAuthToken } from "../../main.js";

// Check if the user has admin access. If not redirect to login page.
authAdmin();
const authToken = getAuthToken();

async function submitForm(event, form, authToken) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    console.log(formData)

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data)

    const headers = {
      "x-auth-token": authToken
    }

    try {
      const response = await axios.post(BASE_URL + "api/v1/events", data, { headers });
      console.log(response);
      document.getElementById('success-message').classList.remove('d-none'); // Show success message
      form.reset(); // Reset the form after successful submission
      document.getElementById('error-message').innerText = "";
      document.getElementById('error-message').classList.add('d-none'); // disable error message box
    } catch (error) {
      console.error(error);
      // Check if there's a response from the server and it contains error message
      if (error.response && error.response.data ) {
        document.getElementById('success-message').classList.add('d-none'); // diable success message box
        document.getElementById('error-message').classList.remove('d-none'); 
        const errorMessage = error.response.data;
        document.getElementById('error-message').innerText = errorMessage; // Display error message
      } else {
        document.getElementById('success-message').classList.add('d-none'); // disable success message box
        document.getElementById('error-message').innerText = "An error occurred. Please try again later."; // Generic error message
      }
    }
  }

const createEventForm = document.getElementById("create-event-form");
createEventForm.addEventListener("submit", (event) => {
  submitForm(event, createEventForm, authToken);
});
