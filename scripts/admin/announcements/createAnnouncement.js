import axios from "axios";

import {BASE_URL, getAuthToken} from "../../main.js";

document.getElementById('announcementForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    const headers = {
     "x-auth-token": getAuthToken()
    }
    const response = await axios.post(BASE_URL + 'api/v1/announcements', {
      title,
      content
    }, {headers});
    console.log(response.data); 
    // Clear form fields after successful submission
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  } catch (error) {
    if (error.response) {
      const errors = error.response.data.errors;
      if (errors.title) {
        document.getElementById('titleError').innerText = errors.title;
      } else {
        document.getElementById('titleError').innerText = '';
      }
      if (errors.content) {
        document.getElementById('contentError').innerText = errors.content;
      } else {
        document.getElementById('contentError').innerText = '';
      }
    } else {
      console.error('Error:', error.message);
    }
  }
});
