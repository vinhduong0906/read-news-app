
let currentPage = 1;
let totalPage = Number(localStorage.getItem("totalPage"));
const settingPage = { pagenum: 8, pagestep: 4 }; //Setting pagination//pagenum: number of page display in pagination
// pagestep: scroll pagination to pagestep number
let pageStart = 1;
let pageEnd = 0;
let prevBtnEl = null;
let nextBtnEl = null;
let leftDotEl = null;
let rightDotEl = null;

async function getNews(newsUrl) {
  try {
    const news = await fetch(
      newsUrl

    );
    const data = await news.json();
    const totalPage = Math.ceil(data.totalArticles / currentSetting.pagesize);
    localStorage.setItem("totalPage", totalPage);
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
function renderNews(news) {
  newsContainerEl.innerHTML = "";
  news.articles.map((article) => {
    const div = document.createElement("div");
    div.className = "card flex-row flex-wrap mt-5";
    div.innerHTML = `<div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src="${article.image != null
        ? article.image
        : ""
      }"
                class="card-img"
                alt=${article.title}
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  ${article.title}
                </h5>
                <p class="card-text">
                  ${article.description}
                </p>
                <a
                  href=${article.url}
                  class="btn btn-primary"
                  >View</a
                >
              </div>
            </div>
          </div>
        </div>`;
    newsContainerEl.appendChild(div);
  });
}
function paginationReset() {
  const paginationEl = document.querySelector('.pagination');
  paginationEl.innerHTML = `<li class="page-item">
  <button class="page-link" href="#" id="btn-prev">Previous</button>
 </li>
 <li class="page-item "id="left-dot" hidden>
  <a class="page-link" >...</a>
 </li>
<li hidden id="start-paginate"></li>
 <li class="page-item  "id="right-dot" hidden>
  <a class="page-link" >...</a>
 </li>
 <li class="page-item">
  <button class="page-link" id="btn-next">Next</button>
 </li>`;
  prevBtnEl = document.getElementById("btn-prev");
  nextBtnEl = document.getElementById("btn-next");
  leftDotEl = document.getElementById("left-dot");
  rightDotEl = document.getElementById("right-dot");
}
// //Init page to reset the pagination when take a new search
function paginationInit() {
  paginationReset();
  currentPage = 1;
  pageStart = 1;
  pageEnd = 0;

  nextBtnEl.addEventListener("click", nextPage);
  prevBtnEl.addEventListener("click", prePage);
}
//Nextpage button click function
function nextPage() {
  console.log("next");
  if (Number(currentPage) < (totalPage)) {
    document.querySelector(`[data-page='${Number(currentPage) + 1}']`).click();
  }
}

//Previous page button click function
function prePage() {
  if (Number(currentPage) > 1) {
    document.querySelector(`[data-page='${Number(currentPage) - 1}']`).click();
  }
}
//Rerender Pagination
function rePaginate(itemEl, lastCurrentPage) {

  document.getElementById('page-num-' + lastCurrentPage).parentElement.classList.remove('active');
  if (currentPage === totalPage)
    nextBtnEl.parentElement.classList.add("disabled");
  else nextBtnEl.parentElement.classList.remove("disabled");
  if (currentPage === 1) prevBtnEl.parentElement.classList.add("disabled");
  else prevBtnEl.parentElement.classList.remove("disabled");



  if (currentPage === pageEnd) {
    paginationReset();
    pageStart += settingPage.pagestep;
    pageEnd += settingPage.pagestep;
    renderPagination(pageStart, pageEnd);

  }
  else
    if (currentPage === pageStart && pageStart > 1) {
      paginationReset();
      pageStart -= settingPage.pagestep;
      pageEnd -= settingPage.pagestep;
      while (pageStart < 1) { pageStart++; pageEnd++ };
      renderPagination(pageStart, pageEnd);

    }


  if (pageEnd === totalPage) rightDotEl.setAttribute("hidden", "");
  else rightDotEl.removeAttribute("hidden");
  if (pageStart === 1) leftDotEl.setAttribute("hidden", "");
  else leftDotEl.removeAttribute("hidden");
  document.getElementById('page-num-' + currentPage).parentElement.classList.add('active')
}

//Render pagination
function renderPagination(pageStart, pageEnd) {
  console.log('render', pageStart, pageEnd)
  for (let i = pageStart; i <= pageEnd; i++) {
    if (i > totalPage) break;


    const li = document.createElement("li");
    li.className = "page-item";
    // if (j > settingPage.pagenum) li.setAttribute("hidden", "");
    li.innerHTML = `<a class='page-link' id = 'page-num-${i}' data-page='${i}' onClick =' displayPage(this.id)' >${i}</a>`;
    document.getElementById('start-paginate').insertAdjacentElement("beforebegin", li)
  }
}
// Onclick even of pagination click
async function displayPage(pageId) {
  let newsUrl = '';
  const pageType = document.querySelector('#page-id').dataset.page;
  const itemEl = document.getElementById(pageId);
  const lastCurrentPage = currentPage;
  currentPage = Number(itemEl.dataset.page);

  localStorage.setItem('currentPage', currentPage);
  if (pageType === "search") {
    const searchKey = document.getElementById("input-query").value.trim();
    newsUrl = `https://gnews.io/api/v4/search?q=${searchKey}&max=${currentSetting.pagesize}&page=${currentPage}&apikey=328585dc62faf671432c5d4c274bef84`
  }
  else {
    const category = localStorage.getItem('newsCategory') || 'general';
    newsUrl = `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&max=${currentSetting.pagesize}&page=${currentPage}&apikey=328585dc62faf671432c5d4c274bef84`
  }

  rePaginate(itemEl, lastCurrentPage);
  const news = await getNews(newsUrl);
  renderNews(news);

}
function pagination() {
  pageEnd = totalPage < settingPage.pagenum ? totalPage : settingPage.pagenum; //set value to pageEnd( the end page of present pagination)
  renderPagination(1, 8);
  if (pageEnd === totalPage) rightDotEl.setAttribute("hidden", "");
  else rightDotEl.removeAttribute("hidden");
}
