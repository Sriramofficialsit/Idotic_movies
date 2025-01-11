    import { Link } from "react-router-dom";
    import { useEffect, useState } from "react";
    import placeholder from "../Images/placeholder.jpeg";

    const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(""); // State for the search query
    const [selectedGenre, setSelectedGenre] = useState(""); // State for the selected genre
    const [genres, setGenres] = useState([]); // State for the list of genres

    // Fetch genres from the API
    const fetchGenres = () => {
        const genreEndpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=yourapikey`;
        fetch(genreEndpoint)
        .then((response) => response.json())
        .then((data) => {
            setGenres(data.genres);
        })
        .catch((error) => {
            console.error("Error fetching genres:", error);
        });
    };

    const getMovies = (query, page = 1, genre = "") => {
        setLoading(true);
        setError(null);

        let endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&api_key=`
        : `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=`;

        // Add genre filter to the endpoint if a genre is selected
        if (genre) {
        endpoint += `&with_genres=${genre}`;
        }

        fetch(endpoint)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Failed to fetch movies");
            }
            return response.json();
        })
        .then((data) => {
            setMovies(data.results || []);
            console.log(data)
            setTotalPages(data.total_pages);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        getMovies(query, currentPage, selectedGenre);
    }, [query, currentPage, selectedGenre]); // Re-fetch when query, page, or selectedGenre changes

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const getStarRating = (vote_average) => {
        const maxRating = 10;
        const maxStars = 5;
        return Math.round((vote_average / maxRating) * maxStars);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? "text-yellow-400 text-3xl" : "text-gray-300 text-3xl"}>
            ★
            </span>
        );
        }
        return stars;
    };

    return (
        <div className="flex flex-col items-center mt-5">
        {/* Search Bar */}
        <div className="mb-5">
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update the query state
            placeholder="Search for movies..."
            className="border p-2 rounded-lg w-80"
            />
        </div>

        {/* Dropdown Filter for Genre */}
        <div className="mb-5">
            <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)} // Update selected genre state
            className="border p-2 rounded-lg w-80"
            >
            <option value="">All Genres</option>
            {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                {genre.name}
                </option>
            ))}
            </select>
        </div>

        {loading && <p className="text-2xl">Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
            <div className="flex flex-wrap items-center justify-center gap-5">
            {movies.length > 0 ? (
                movies.map((movie) => (
                <div
                    key={movie.id}
                    className="rounded-xl border p-5 shadow-2xl flex flex-col items-center justify-center w-50 h-50"
                >
                    <Link to={`/movie/${movie.id}`}>
                    <img
                        src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : placeholder}
                        alt={`${movie.title} poster`}
                        className="w-64 h-64 border rounded-xl"
                    />
                    <h1 className="text-xl mb-2 mt-2 font-bold w-64">{movie.title}</h1>
                    <h1>{movie.release_date}</h1>
                    <p className="mt-3 w-64">
  {movie.genre_ids && movie.genre_ids.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : null;
  }).join(", ")}
</p>
                    <div className="flex mt-3">
                        <div className="flex">{renderStars(getStarRating(movie.vote_average))}</div>
                    </div>
                    </Link>
                </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
            </div>
        )}

        <div className="flex justify-center gap-4 mt-10 mb-5">
            <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            className={`bg-blue-500 text-white p-2 rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
            Previous
            </button>
            <span>
            Page {currentPage} of {totalPages}
            </span>
            <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            className={`bg-blue-500 text-white p-2 rounded-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            >
            Next
            </button>
        </div>
        </div>
    );
    };

    export default Movies;
