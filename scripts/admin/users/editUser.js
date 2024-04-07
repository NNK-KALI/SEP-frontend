import axios from "axios";
import {BASE_URL, getAuthToken, getUrlParameter, displayMessage} from "../../main.js"

const userId = getUrlParameter("id");

async function getUserDetails(url, id) {
  try {
    const response = await axios.get(url + "/" + id, { headers: { "x-auth-token": getAuthToken() }});
    return response;
  } catch(error)  {
    console.error(error);
  }
}

async function fillForm() {
  getUserDetails(BASE_URL + "api/v1/admin" , userId).then((response) => {
    const userDetails = response.data;

    const firstnameField = document.querySelector("input[name='input-first-name']");
    firstnameField.value = userDetails.firstname;
    
    const middlenameField = document.querySelector("input[name='input-middle-name']");
    middlenameField.value = userDetails.middlename;

    const lastnameField = document.querySelector("input[name='input-last-name']");
    lastnameField.value = userDetails.lastname;

    const emailField = document.querySelector("input[name='input-email']");
    emailField.value = userDetails.email;

    const isAdminCheckbox = document.querySelector("input[name='is-admin']");
    if (userDetails.isAdmin) {
      isAdminCheckbox.checked = true;
    } else {
      isAdminCheckbox.checked = false;
    }
  });
}


const userForm = document.getElementById("edit-user-form");
userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userFormData = new FormData(userForm);
  const firstname = userFormData.get("input-first-name");
  const middlename = userFormData.get("input-middle-name");
  const lastname = userFormData.get("input-last-name");
  let isAdmin = false;
  if (userFormData.get("is-admin") === "true") {
    isAdmin = true;
  }

  const payload = {
    _id: userId, 
    firstname,
    middlename,
    lastname,
    isAdmin,
  };

  const headers = {
    "x-auth-token": getAuthToken(),
  };

  try {
    const res = await submitUserForm(
      BASE_URL + "api/v1/admin",
      payload,
      headers,
    );
    if (res.status == 200) {
      displayMessage("message-box", "success", "Edited successfully.");
    } 
  } catch (error) {
    displayMessage("message-box", "error", error.response.data);
  }
});

async function submitUserForm(url, payload, headers) {
  const response = await axios.put(url, payload, { headers });
  return response;
}

// function displayMessage(elementId, type, message) {
//   const messageBox = document.getElementById(elementId);
//   messageBox.textContent = message;
//
//   if (type === "success") {
//     messageBox.classList.add("alert-success");
//     messageBox.classList.remove("alert-danger");
//   } else if(type === "error") {
//     messageBox.classList.add("alert-danger");
//     messageBox.classList.remove("alert-success");
//   }
//
//   messageBox.style.display = "block";
// }

console.log(userId)
fillForm(userId)

