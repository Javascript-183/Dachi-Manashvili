const API_KEY = "80114ffb"; 

async function fetchLatestMovies() {
    const currentYear = new Date().getFullYear(); 
    const previousYear = currentYear - 1; 

    try {
        const response1 = await fetch(`https://www.omdbapi.com/?s=movie&y=${currentYear}&apikey=${API_KEY}`);
        const response2 = await fetch(`https://www.omdbapi.com/?s=movie&y=${previousYear}&apikey=${API_KEY}`);

        const data1 = await response1.json();
        const data2 = await response2.json();

        let latestMovies = [];

        if (data1.Response === "True") {
            latestMovies = latestMovies.concat(data1.Search);
        }
        if (data2.Response === "True") {
            latestMovies = latestMovies.concat(data2.Search);
        }

        if (latestMovies.length > 0) {
            displayMovies(latestMovies, "movies-list");
        } else {
            console.warn("უახლესი ფილმები ვერ მოიძებნა.");
        }
    } catch (error) {
        console.error("API შეცდომა უახლესი ფილმების გადმოწერისას:", error);
    }
}

function displayMovies(movies, containerId) {
    const movieList = document.getElementById(containerId);
    if (!movieList) {
        console.error(`ელემენტი '${containerId}' ვერ მოიძებნა.`);
        return;
    }

    movieList.innerHTML = movies.map(movie => `
        <div class="movie" onclick="redirectToMovie('${movie.imdbID}')">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : './img/no-image.jpg'}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
        </div>
    `).join('');
}

function redirectToMovie(imdbID) {
    window.location.href = `movie.html?id=${imdbID}`;
}
