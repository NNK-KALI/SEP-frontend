const BASE_URL = process.env.BASE_URL;

function getAuthToken() {
  const token = localStorage.getItem("athmeetApiKey");
  if (!token) {
    console.error("auth token not found");
  }
  return token;
}

function authAdmin() {
  if (!isAdmin()) {
    window.location.replace("/adminLogin");
  }
}

function isAdmin() {
  const user = getUserDetails()
  return user.isAdmin;
}

function getUserDetails() {
  const user = JSON.parse(localStorage.getItem("athmeetUserDetails"));
  return user;
}

function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function displayMessage(elementId, type, message) {
  const messageBox = document.getElementById(elementId);
  messageBox.textContent = message;

  if (type === "success") {
    messageBox.classList.add("alert");
    messageBox.classList.add("alert-success");
    messageBox.classList.remove("alert-danger");
  } else if(type === "error") {
    messageBox.classList.add("alert");
    messageBox.classList.add("alert-danger");
    messageBox.classList.remove("alert-success");
  }
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.classList.add("btn-close");
  closeBtn.classList.add("alert-dismissible");
  closeBtn.classList.add("fade");
  closeBtn.classList.add("show");
  closeBtn.setAttribute("data-bs-dismiss", "alert");
  closeBtn.setAttribute("aria-label", "close");
  messageBox.appendChild(closeBtn);
  messageBox.setAttribute("role", "alert");
  messageBox.style.display = "block";
}

// Function to display Bootstrap alert
// supported types
// primary
// secondary
// success
// danger
// warning
// info
// light
// dark
function showAlert( message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show', 'position-fixed', 'top-3', 'end-0');
  alertDiv.setAttribute('role', 'alert');
  alertDiv.style.maxWidth = 'calc(100% - 20px)';
  alertDiv.style.zIndex = '9999'; // Ensure it's on top of other elements

  alertDiv.innerHTML = `
    <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  const body = document.body;
  const firstDiv = body.querySelector('div:first-child');
  body.insertBefore(alertDiv, firstDiv.nextSibling);
}




export {
  BASE_URL,
  getAuthToken,
  authAdmin,
  isAdmin,
  getUserDetails,
  displayMessage,
  getUrlParameter,
  showAlert
};
