import axios from "axios";
import { BASE_URL , showAlert, getAuthToken} from "../../main.js";


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

    // Add event listener for edit button
    document.getElementById('editButton').addEventListener('click', function() {
      window.location.href = `/admin/announcements/editAnnouncement?id=${id}`;
    });

    // Add event listener for delete button
    document.getElementById('deleteButton').addEventListener('click', async function() {
      const headers = {
        "x-auth-token": getAuthToken()
      }
      try {
        const confirmDelete = confirm("Are you sure you want to delete this announcement?");
        if (confirmDelete) {
          const response = await axios.delete(BASE_URL + `api/v1/announcements`, {data: {id}, headers: headers});
          if (response.data.success) {
            window.location.href = "/admin/announcements/viewAnnouncements";
          } else {
            showAlert("messages","Failed to delete the announcement. Please try again.", "danger");
          }
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
        showAlert("messages","Failed to delete the announcement. Please try again.", "danger");
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    showAlert("messages","Failed to fetch announcement details. Please try again later.", "danger");
  }
});

