//This file is includes function of pagination.js file


const page = "search";
let searchKey = null;
const paginationEl = document.querySelector('.pagination');
//User must login to use this function
checkLogin();


//This function for search button submit event
async function search() {


  searchKey = document.getElementById("input-query").value.trim();
  if (!searchKey) {
    alert("Enter keyword to input field");
    return;
  }

  const searchNewsUrl = `https://gnews.io/api/v4/search?q=${searchKey}&max=${currentSetting.pagesize}&page=${1}&apikey=e30a0ff769da2e16bd45a562f592e383`
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
  $(document).ready(function () {

    $('#btn-prev').click(prevPage)
    $('#btn-next').click(nextPage);


  })
}

//Add even for search button submit
submidBtnEl.addEventListener("click", search);

