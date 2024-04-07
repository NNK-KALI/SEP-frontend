import axios from "axios";

import {BASE_URL} from "../../main.js";


document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await axios.get(BASE_URL + 'api/v1/announcements');
    const announcements = response.data;

    const announcementsList = document.getElementById('announcementsList');
    
    if (announcements.length === 0) {
      const noAnnouncementMessage = document.createElement('div');
      noAnnouncementMessage.textContent = 'No announcements available.';
      announcementsList.appendChild(noAnnouncementMessage);
    } else {
      announcements.forEach(announcement => {
        const announcementDiv = document.createElement('div');
        announcementDiv.classList.add('mb-3', 'announcement', 'border', 'border-light', 'rounded');
        announcementDiv.innerHTML = `
          <h3>${announcement.title}</h3>
          <p>Published At: ${announcement.publishedAt}</p>
        `;
        announcementDiv.addEventListener('click', function() {
          window.location.href = `announcement.html?id=${announcement._id}`;
        });
        announcementDiv.classList.add('shadow-sm'); // Add shadow for better visual effect
        announcementDiv.classList.add('bg-light'); // Add light background color
        announcementDiv.classList.add('p-3'); // Add padding
        announcementDiv.style.cursor = 'pointer'; // Change cursor to pointer on hover
        announcementDiv.addEventListener('mouseenter', function() {
          announcementDiv.classList.add('bg-white'); // Change background color on hover
        });
        announcementDiv.addEventListener('mouseleave', function() {
          announcementDiv.classList.remove('bg-white'); // Revert background color on mouse leave
        });
        announcementsList.appendChild(announcementDiv);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

