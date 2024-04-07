import axios from "axios";
import { BASE_URL } from "./main.js";

document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  try {
    const response = await axios.get(BASE_URL + `api/v1/announcements/${id}`);
    const announcement = response.data;

    // Convert UTC time to local time
    const publishedAtLocal = new Date(announcement.publishedAt).toLocaleString();

    const announcementTitle = document.getElementById('announcementTitle');
    announcementTitle.classList.add("m-5");
    const announcementContent = document.getElementById('announcementContent');
    const publishedAt = document.getElementById('publishedAt');

    announcementTitle.innerText = announcement.title;
    announcementTitle.classList.add('text-center'); // Centering the title
    announcementContent.innerText = announcement.content;
    publishedAt.innerText = `Published At: ${publishedAtLocal}`;
  } catch (error) {
    console.error('Error:', error.message);
  }
});


