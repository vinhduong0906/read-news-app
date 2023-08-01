
function logIn(inputUser) {
  if (inputUser.username.trim() === "") {
    alert("User name must required");
    return 0;
  }
  if (inputUser.password.trim() === "") {
    alert("Password must required");
    return 0;
  }
  const userIndex = userArr.findIndex(
    (user) => user.username === inputUser.username
  );
  if (userIndex >= 0 && userArr[userIndex].password == inputUser.password) {
    const currentUser = userArr[userIndex];
    saveToStorage(CURRENTKEY, JSON.stringify(currentUser));

    window.location.href = "../index.html";
  } else alert("User name or password is wrong");
}

submidBtnEl.addEventListener("click", function () {
  const inputUser = {
    username: inputUsernameEl.value,
    password: inputPasswordEl.value,
  };
  logIn(inputUser);
});
