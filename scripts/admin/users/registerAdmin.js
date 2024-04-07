import axios from "axios";
import { BASE_URL, getAuthToken } from "../../main.js";

const createUserForm = document.getElementById("create-user-form");
createUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const createUserFormData = new FormData(createUserForm);
  const firstname = createUserFormData.get("input-first-name");
  const middlename = createUserFormData.get("input-middle-name");
  const lastname = createUserFormData.get("input-last-name");
  const email = createUserFormData.get("input-email");
  const password = createUserFormData.get("input-password");
  const passwordConfirm = createUserFormData.get("input-password-confirm");
  let isAdmin = false;
  if (createUserFormData.get("is-admin") === "true") {
    isAdmin = true;
  }

  if (password !== passwordConfirm) {
    displayMessage("message-box", "error", "passwords didn't match.");
    return;
  }

  const payload = {
    firstname,
    middlename,
    lastname,
    email,
    password,
    isAdmin,
  };

  const headers = {
    "x-auth-token": getAuthToken(),
  };

  try {
    const res = await submitCreateUserForm(
      BASE_URL + "api/v1/admin",
      payload,
      headers,
    );
    if (res.status == 200) {
      displayMessage("message-box", "success", "Created successfully.");
    } 
  } catch (error) {
    displayMessage("message-box", "error", error.response.data);
  }
});

async function submitCreateUserForm(url, payload, headers) {
  const response = await axios.post(url, payload, { headers });
  return response;
}

function displayMessage(elementId, type, message) {
  const messageBox = document.getElementById(elementId);
  messageBox.textContent = message;

  if (type === "success") {
    messageBox.classList.add("alert-success");
    messageBox.classList.remove("alert-danger");
  } else if(type === "error") {
    messageBox.classList.add("alert-danger");
    messageBox.classList.remove("alert-success");
  }

  messageBox.style.display = "block";
}
