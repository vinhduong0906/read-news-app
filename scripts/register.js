"use strict";

//Register process, validate data and write to local
submidBtnEl.addEventListener("click", function () {
  const user = {
    firstname: inputFirstNameEl.value,
    lastname: inputLastNameEl.value,
    username: inputUsernameEl.value,
    password: inputPasswordEl.value,
    passwordConfirm: inputPasswordConfirmEl.value,
  };
  if (validateUserData(user)) {
    const setting = {
      username: user.username,
      pagesize: 5,
      category: "General",
    };
    delete user["passwordConfirm"];
    userArr.push(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    settingArr.push(setting);
    saveToStorage(SETTINGKEY, JSON.stringify(settingArr));
    alert("Register successful!");
    window.location.href = "../pages/login.html";
  }
});
