$('#news-page').click(function () {
    if (checkLogin())
        if (window.location.href.includes('index'))
            location.href = './pages/news.html'; else
            location.href = "./news.html";
})
$('#todo-page').click(function () {
    if (checkLogin())
        if (window.location.href.includes('index'))
            location.href = './pages/todo.html'; else
            location.href = "./todo.html";
})
$('#search-page').click(function () {
    if (checkLogin())
        if (window.location.href.includes('index'))
            location.href = './pages/search.html'; else
            location.href = "./search.html";
})
$('#setting-page').click(function () {
    if (checkLogin())
        if (window.location.href.includes('index'))
            location.href = './pages/setting.html'; else
            location.href = "./setting.html";
})