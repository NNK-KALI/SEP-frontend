import axios from "axios";
const BASE_URL = "http://localhost:7000/";
const url = BASE_URL + "api/v1/auth/adminLogin";
console.log(url);


function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login");
  const errorMessageDiv = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Assuming your backend endpoint for authentication is '/login'
    const data = { email: email, password: password };

    // Send POST request to backend using Axios
    axios
      .post(url, data)
      .then((response) => {
        if (response.data.athmeetApiKey) {
          // Save API key in local storage
          const token = response.data.athmeetApiKey;
          localStorage.setItem("athmeetApiKey", token);
          // decode the logged in user
          const user = parseJwt(token);
          localStorage.setItem("athmeetUserDetails", JSON.stringify({
            _id: user._id,
            email: user.email,
            iat: user.iat,
            isAdmin: user.isAdmin,
            name: user.name,
          }));
          // Redirect user to dashboard or any other desired page
          if (user.isAdmin) {
            window.location.replace("admin/adminDashboard.html");
          } else {
            window.location.replace("hc/hcHomePage.html");
          }
        } else {
          console.log("error occured while stroring api key to localstorage.");
          // Handle login failure
          errorMessageDiv.innerText = error.response.data;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorMessageDiv.innerText = error.response.data;
      });
  });
});
