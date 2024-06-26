fetch("../../admin/adminNav.html")
  .then((res) => res.text())
  .then((text) => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
  })
  .then(() => {
    document.getElementById("logout").addEventListener("click", (event) => {
      logout("/login");
    })
  });

function logout(url) {
  localStorage.removeItem("athmeetApiKey");
  localStorage.removeItem("athmeetUserDetails");
  window.location.replace(url);
}
