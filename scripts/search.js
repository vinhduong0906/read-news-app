//This file is includes function of pagination.js file

"use strict";
const page = "search";
let searchKey = null;
const paginationEl = document.querySelector('.pagination');
//User must login to use this function
checkLogin();


//This function for search button submit event
async function search() {

  paginationInit();
  searchKey = document.getElementById("input-query").value.trim();
  if (!searchKey) {
    alert("Enter keyword to input field");
    return;
  }

  const searchNewsUrl = `https://gnews.io/api/v4/search?q=${searchKey}&max=${currentSetting.pagesize}&page=${1}&apikey=328585dc62faf671432c5d4c274bef84`
  const news = await getNews(searchNewsUrl);

  totalPage = Math.ceil(news.totalArticles / currentSetting.pagesize);
  if (totalPage) {
    paginationEl.removeAttribute("hidden");
    paginationInit();
  }
  else {
    alert("No data found");
    return;
  }
  renderNews(news, page);
  pagination();
  document
    .querySelector("[data-page='1']")
    .parentElement.classList.add("active");
}

//Add even for search button submit
submidBtnEl.addEventListener("click", search);

// Onclick even of pagination click
// async function displayPage(pageId) {
//   const itemEl = document.getElementById(pageId);
//   const lastCurrentPage = currentPage;
//   currentPage = Number(itemEl.dataset.page);
//   rePaginate(itemEl, lastCurrentPage);
//   const news = await getNews(currentPage, category);
//   renderNews(news);
//   const itemEl = document.getElementById(pageId);
//   currentPage = Number(itemEl.dataset.page);
//   const news = await fetchData();
//   renderNews(news, page);
//   rePaginate(itemEl);
// }
