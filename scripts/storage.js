"use strict";

const KEY = "USER_ARRAY";
const CURRENTKEY = "CURRENT_USER";
const SETTINGKEY = "SETTING_ARRAY";
const TODO = "TODO_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = parseUser(JSON.parse(getFromStorage(CURRENTKEY))) || "";
const settingArr = JSON.parse(getFromStorage(SETTINGKEY)) || [];
const currentSetting = settingArr.find(
  (setting) => setting.username === currentUser.username
);
const todoArr = JSON.parse(getFromStorage(TODO)) || [];

//Save data to local
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Get data from local
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//Delete data from local, use to test
function deleteFromStorage(key) {
  return localStorage.removeItem(key);
}
