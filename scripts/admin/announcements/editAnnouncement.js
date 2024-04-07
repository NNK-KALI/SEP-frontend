import axios from "axios";
import { BASE_URL, getAuthToken } from "../../main.js";

const urlParams = new URLSearchParams(window.location.search);
const announcementId = urlParams.get("id");

const titleField = document.getElementById("title");
const contentField = document.getElementById("content");

async function fetchAnnouncement() {
  try {
    const response = await axios.get(
      `${BASE_URL}api/v1/announcements/${announcementId}`,
    );
    const announcement = response.data;
    titleField.value = announcement.title;
    contentField.value = announcement.content;
  } catch (error) {
    console.error("Error fetching announcement:", error.message);
  }
}

document
  .getElementById("editAnnouncementForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = titleField.value;
    const content = contentField.value;

    try {
      const headers = {
        "x-auth-token": getAuthToken(),
      };
      const response = await axios.put(
        `${BASE_URL}api/v1/announcements`,
        {
          id: announcementId,
          title,
          content,
        },
        { headers },
      );
      console.log(response.data);
      window.location.href = `announcement.html?id=${announcementId}`;
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;
        if (errors.title) {
          document.getElementById("titleError").innerText = errors.title;
        } else {
          document.getElementById("titleError").innerText = "";
        }
        if (errors.content) {
          document.getElementById("contentError").innerText = errors.content;
        } else {
          document.getElementById("contentError").innerText = "";
        }
        document.getElementById("errorMessage").innerText =
          "An error occurred while editing the announcement.";
      } else {
        console.error("Error:", error.message);
      }
    }
  });

fetchAnnouncement();
