class Movie {
    constructor(data) {
        Object.assign(this, data)
    }

    getHtml(text) {

        return `
            <div class="movie-container" id="${this.imdbID}">
                    <div class="left">
                        <img src="${this.Poster}" alt="cover image">
                    </div>
                    <div class="right">
                        <div class="title-div">
                            <span class="title">${this.Title}</sp>
                            <img src="/images/star-icon.png" alt="star icon">
                            <span class="metascore">${this.Metascore/10}</span>
                        </div>
                        <div class="movie-info-div">
                            <span>${this.Runtime}</span>
                            <span>${this.Genre}</span>
                            <button class="watchlist-btn">
                                <img src="/images/add-icon.png" alt="add to watch list btn" >
                                <span>${text}</span>
                            </button>
                        </div>
                        <div class="plot-div">
                            <p>${this.Plot}</p>
                        </div>
                    </div>
                </div>
                <hr>  `
    }
}

export default Movie