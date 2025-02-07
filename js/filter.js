async function searchMovies() {
    const searchQuery = document.getElementById("search").value.trim();
    const year = document.getElementById("yearInput").value.trim();
    const genre = document.getElementById("genre").value.toLowerCase();
    const imdbID = document.getElementById("imdb").value;

    if (!searchQuery && !imdbID) {
        alert("გთხოვთ, შეიყვანოთ ფილმის სახელი ან IMDb ID.");
        return;
    }

    document.getElementById("latest-movies-title").style.display = "none";  
    document.getElementById("search-results-title").style.display = "block";

    let apiUrl = "";

    if (imdbID) {
        apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&r=json`;
    } 
    else if (searchQuery && year) {
        apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&y=${year}&r=json`;
    } 
    else {
        apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&r=json&page=1`;
    }

    console.log(`API მოთხოვნა: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === "True") {
            console.log("საძიებო შედეგები:", data);

            let movies = imdbID ? [data] : data.Search || [];

            if (genre) {
                const genreFilteredMovies = await filterMoviesByGenre(movies, genre);
                displayMovies(genreFilteredMovies);
            } else {
                displayMovies(movies);
            }
        } else {
            document.getElementById("movies-list").innerHTML = `<p>ფილმები ვერ მოიძებნა.</p>`;
        }
    } catch (error) {
        console.error("API შეცდომა:", error);
    }
}

async function filterMoviesByGenre(movies, genre) {
    const filteredMovies = [];

    for (let movie of movies) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&r=json`);
            const movieDetails = await response.json();

            if (movieDetails.Response === "True" && movieDetails.Genre) {
                const movieGenres = movieDetails.Genre.toLowerCase().trim();
                
                console.log(`ფილმის ჟანრი: ${movieGenres} (ვიპოვეთ: ${movie.Title})`);

                if (movieGenres.includes(genre.toLowerCase().trim())) {
                    filteredMovies.push(movieDetails);
                }
            } else {
                console.warn(`ჟანრის ინფორმაცია არ მოიძებნა: ${movie.Title}`);
            }
        } catch (error) {
            console.error("ჟანრის გაფილტვრის შეცდომა:", error);
        }
    }
    
    console.log(`გაფილტრული ფილმების რაოდენობა: ${filteredMovies.length}`);
    return filteredMovies;
}

function displayMovies(movies) {
    const moviesList = document.getElementById("movies-list");
    if (!moviesList) return;

    const placeholderImage = "./img/no-image.jpg";

    moviesList.innerHTML = movies.map(movie => `
        <a href="movie.html?id=${movie.imdbID}" class="movie-link">
            <div class="movie">
                <img src="${(movie.Poster && movie.Poster !== "N/A") ? movie.Poster : placeholderImage}" 
                     alt="${movie.Title}" 
                     onerror="this.onerror=null; this.src='${placeholderImage}';"> <!-- fallback -->
                <h3>${movie.Title} (${movie.Year})</h3>
            </div>
        </a>
    `).join('');
}
