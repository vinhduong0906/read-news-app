//This file is includes function of pagination.js file

"use strict";
let category = 'general'
checkLogin();

showPagination(category);


//Render pagination and display news
async function showPagination(category) {
  paginationInit();
  const newsUrl = `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&max=${currentSetting.pagesize}&page=${1}&apikey=e30a0ff769da2e16bd45a562f592e383`
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
$(document).ready(function () {
  $('#btn-prev').click(prevPage)
  $('#btn-next').click(nextPage);
  // $('#btn-prev').on('click', function () {
  //   console.log('prev');
  // })
  // $('#btn-next').on('click', function () {
  //   console.log('next');
  // })

})