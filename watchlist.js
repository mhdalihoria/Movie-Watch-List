import Movie from "./Movie.js"

let moviesWatchlist = JSON.parse(localStorage.getItem('movies'))

function getMoviesFromLocalStorage() {
    document.querySelector('.movie-list').innerHTML = ``
    
    if (moviesWatchlist === null || moviesWatchlist.length === 0) {
        document.querySelector('.movie-list').innerHTML = 
            `<div class="watchlist-default">
                <p >Your watchlist is looking a little empty...</p>
                <a href="/index.html" class="add-movies"><img src="/images/add-icon.png" alt=""> <span>Let's add some movies!</span></a>
            </div>`
    } else {
        let html = ``
        const lastIndex = moviesWatchlist.length-1
        moviesWatchlist.map((movie, index) => {
            fetch(`https://www.omdbapi.com/?apikey=317bd43c&i=${movie}`)
                .then(res => res.json())
                .then(data => {
                    const title = new Movie(data)
                    html += title.getHtml("Remove")
                })
                .then(() => {
                    if(index === lastIndex) {
                        document.querySelector('.movie-list').innerHTML = html
                        document.querySelectorAll('.watchlist-btn').forEach(btn => btn.addEventListener('click', () => removeFromWatchlist(btn)))
                    }
                })
        })
    }
}

getMoviesFromLocalStorage()
 
function removeFromWatchlist(button) {
    const movie = button.parentElement.parentElement.parentElement
    const movieID = movie.getAttribute("id")
    const index = moviesWatchlist.findIndex(id => id == movieID) 
    moviesWatchlist.splice(index, 1)
    localStorage.setItem("movies", JSON.stringify(moviesWatchlist))
    movie.remove()
}

