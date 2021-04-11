
const searchBar = document.getElementById('searchBar');

console.log(campgrounds);

searchBar.addEventListener('keyup', (e) => {
    const searchStr = e.target.value;
    const filteredCamp = campgrounds.features.filter(c => c.title.includes(searchStr));
    displayCampgrounds(filteredCamp)

});