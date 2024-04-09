import axios from "axios";
import { BASE_URL, getAuthToken, displayMessage } from "../../main.js";


const headers = {
  "x-auth-token": getAuthToken(),
};
createUserCard(BASE_URL + "api/v1/admin", headers, "content");


async function createUserCard(url, headers, contentElementId) {
  try {
    const response = await axios.get(url, { headers: headers });
    const data = response.data;
    const content = document.getElementById(contentElementId);

    data.forEach((user) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "m-3");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const nameElem = document.createElement("p");
      nameElem.classList.add("card-title");
      nameElem.textContent = `Name: ${user.firstname} ${user.middlename} ${user.lastname}`;
      const emailElem = document.createElement("p");
      emailElem.classList.add("card-text");
      emailElem.textContent = `Email: ${user.email}`;
      const isAdminElem = document.createElement("p");
      isAdminElem.classList.add("card-text");
      isAdminElem.textContent = `Admin: ${user.isAdmin}`;
      const editBtn = document.createElement("a"); // metaphor
      editBtn.classList.add("btn");
      editBtn.classList.add("btn-primary");
      editBtn.innerText = "edit";
      editBtn.href = `/admin/users/editUser?id=${user._id}`
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "m-2");
      deleteBtn.classList.add("btn-danger");
      deleteBtn.textContent = "delete";
      deleteBtn.value = user._id;
      deleteBtn.addEventListener("click", function (event) {
        deleteUser(BASE_URL + "api/v1/admin", this.value)
      });

      cardBody.appendChild(nameElem);
      cardBody.appendChild(emailElem);
      cardBody.appendChild(isAdminElem);
      cardBody.appendChild(editBtn);
      cardBody.appendChild(deleteBtn);

      cardDiv.appendChild(cardBody);

      content.appendChild(cardDiv);
    });
  } catch (error) {
    console.log(error);
  }
}


async function deleteUser(url, id) {
  console.log("fired deleteBtn")
  const headers = {"x-auth-token": getAuthToken()}
  const data = {
    "_id": id
  }
  console.log(id)
  console.log(headers)
  console.log(data)
  try {
    const response = await axios.delete(url, {data, headers})
    if (response.data.success) {
      console.log("success");
      displayMessage("message", "success", "deleted successfully");
      setInterval(() => {location.reload();}, 500);
      
    } else {
      console.log("failed")
    }
  } catch (error) {
    displayMessage("message", "error", "some error occured")
    console.error(error)
  }
}


