async function app() {
  const search = document.getElementById("js-nav-search");
  search.addEventListener("submit", (e) => {
    e.preventDefault();
    const { value } = e.currentTarget.elements.keyword;
    window.location = `/vi-vi/${value}`;
  });
}
app();
