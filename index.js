import Movie from "./Movie.js"

const searchBar = document.querySelector('.input')
const submitBtn = document.querySelector('.submit-btn')
let moviesWatchlist = JSON.parse(localStorage.getItem("movies")) || []

submitBtn.addEventListener('click', searchResults)

function searchResults() {
    document.querySelector('.movie-list').innerHTML = ``
    let searchQuery = searchBar.value
    
    fetch(`https://www.omdbapi.com/?apikey=317bd43c&s=${searchQuery}`)
        .then(res => res.json())
        .then(async data => {
            if (data.Response === "True"){
                const lastIndex = data.Search.length-1
                let html = ``
                data.Search.map((movie, index) => {
                    fetch(`https://www.omdbapi.com/?apikey=317bd43c&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(data => {
                            const title = new Movie(data)
                            html += title.getHtml("Watchlist")
                        })
                        .then(() => {
                            if(index === lastIndex) {
                                document.querySelector('.movie-list').innerHTML = html
                                document.querySelectorAll('.watchlist-btn').forEach(btn => btn.addEventListener('click', () => addToWatchist(btn)))
                            }
                        })
                })
            } else {
                document.querySelector('.movie-list').innerHTML = `
                <div class="error">
                    <p>Unable to find what you’re looking for.<br> Please try another search.</p>
                </div>`
            }
            
        })
        .catch(error => console.log(error))
}



//function to add to and remove from localStorage
function addToWatchist(button){
    const movieID = button.parentElement.parentElement.parentElement.getAttribute("id")
    const index = moviesWatchlist.findIndex(id => id == movieID)   
    // console.log("entered addToWatchlist function")
    if (index > -1) { //removes id from moviesWatchlist array
        // console.log("movie removed")
        moviesWatchlist.splice(index, 1)
    } else { //adds id to moviesWatchlist array
        // console.log("movie added")
        moviesWatchlist.push(movieID)
    }        
    localStorage.setItem("movies", JSON.stringify(moviesWatchlist))
}




