async function loadMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get("id");

    if (!imdbID) {
        document.getElementById("movie-details").innerHTML = "<p>ფილმის ID ვერ მოიძებნა.</p>";
        return;
    }

    const API_KEY = "80114ffb";
    const API_URL = `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;

    try {
        const response = await fetch(API_URL);
        const movie = await response.json();

        if (movie.Response === "True") {
            document.getElementById("movie-details").innerHTML = `
                <div class="movie-card">
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}" alt="${movie.Title}">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <p><strong>ჟანრი:</strong> ${movie.Genre}</p>
                    <p><strong>IMDB რეიტინგი:</strong> ${movie.imdbRating}</p>
                    <p><strong>აღწერა:</strong> ${movie.Plot}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("🚨 შეცდომა API-სთან კავშირისას:", error);
    }
}

loadMovieDetails();