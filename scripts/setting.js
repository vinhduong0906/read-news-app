
const inputPageSizeEl = document.getElementById("input-page-size");
const currentSettingIndex =
  currentUser &&
  settingArr.findIndex((setting) => setting.username === currentUser.username);
checkLogin();

//load data from user setting to input field

inputPageSizeEl.value = currentSetting.pagesize || 8;

//Check submit value and save to local
submidBtnEl.addEventListener("click", function () {
  saveToStorage(SETTINGKEY, JSON.stringify(""));
  // If not yet login then can not use this function
  const setting = {
    username: currentUser.username,
    pagesize: inputPageSizeEl.value,
  };
  if (setting.pagesize < 1) {
    //News per page must larger than 0
    alert("News per page must larger than 0");
    return;
  }
  settingArr.splice(currentSettingIndex, 1, setting);
  saveToStorage(SETTINGKEY, JSON.stringify(settingArr));
  alert("Saved successfull!");
});
