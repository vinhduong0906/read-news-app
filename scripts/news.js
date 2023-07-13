//This file is includes function of pagination.js file

"use strict";
let category = 'general'
checkLogin();

showPagination(category);


//Render pagination and display news
async function showPagination(category) {
  paginationInit();
  const newsUrl = `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&max=${currentSetting.pagesize}&page=${1}&apikey=328585dc62faf671432c5d4c274bef84`
  const news = await getNews(newsUrl);

  renderNews(news);
  pagination();
  document
    .querySelector("[data-page='1']")
    .parentElement.classList.add("active");
}


//Category change function
$('#input-category').change(async function () {
  category = $(this).val();
  localStorage.setItem('newsCategory', category);
  showPagination(category);
})