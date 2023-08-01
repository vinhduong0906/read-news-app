


const loginModalEl = document.getElementById("login-modal");
const mainContentEl = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const logoutBtnEl = document.getElementById("btn-logout");

if (!currentUser) {
  mainContentEl.setAttribute("hidden", "");
} else {
  loginModalEl.setAttribute("hidden", "");
  welcomeMessage.innerHTML = `Welcome ${currentUser.firstname} `;
}
logoutBtnEl.addEventListener("click", function () {
  deleteFromStorage(CURRENTKEY);
  deleteFromStorage(SETTINGKEY);
  location.reload();
});
