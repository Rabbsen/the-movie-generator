//API KEY

const OMDB_KEY ="d17efc69"

//Retrive element const

const moodSelect =
document.getElementById("mood");
const genreSelect =
document.getElementById("genre");
const findMovie =
document.getElementById("findMovie");
const movieDisplay =
document.getElementById("movieDisplay");
const randomMovie =
document.getElementById("randomMovie");

//Matching mood+genre

function getMatch(mood, genre) {
    if (mood === "Happy" && genre === "Comedy")
        return "avengers";
    if (mood === "Sad" && genre === "Romantic")
        return "Romance";
    if (mood === "Happy" && genre === "Romantic")
        return "romance";
    if (mood === "" && genre === "")
        return "random";


    return genre;
}
//Finding the Movie

findMovie.addEventListener("click", async () => {
    const chosenMood = moodSelect.value;
    const chosenGenre = genreSelect.value;

    const keyword = getMatch(chosenMood,chosenGenre);

    //logging what the fuck im even sending smh
    console.log("moodSelect", chosenMood);
    console.log("chosenGenre", chosenGenre);
    console.log("keyword", keyword);

    try {
        const searchUrl = 
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(keyword)}&type=movie`;

        const Response = await fetch(searchUrl);
        //logging here too fuckt this
        console.log("keyword", keyword);
        console.log("URL:", searchUrl);
        const data = await Response.json();
        //Console log to check why OMBD is fucking with me
        console.log("DATA FROM OMBD:" , data);

        if (data.Response === "False" || !data.Search || data.Search.length === 0) {
            movieDisplay.innerHTML = "<p>No movie matching your criteria was found :(</p>";
            return;
        }

        //choosing a movie from the keyword results
        const movies = data.Search;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        
        const detailsUrl = `http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${randomMovie.imdbID}&plot=short`;
            const detailsResponse = await
            fetch(detailsUrl);
            const detailsData = await
            detailsResponse.json();
        // Displaying recomended movie on the Div
        movieDisplay.innerHTML = `
        <h2>${detailsData.Title} (${detailsData.Year})</h2>
        <p>${detailsData.Genre}</p>
        <p>${detailsData.Plot}</p>
        <p>${detailsData.imdbRating}<p>
        
        ${detailsData.Poster && detailsData.Poster !== "N/A" ? 
            `<img class="poster" src="${detailsData.Poster}" alt="Poster for ${detailsData.Title}">`
                : ""
        }`;
    } catch (error) {
        console.error(error);
        movieDisplay.innerHTML = "<p>Something went wrong</p>";
    }
});