import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeholder from "../Images/placeholder.jpeg";

const MovieDetails = () => {
  const { id } = useParams();  // Access the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=yourapikey`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="p-5">
      <div className="flex flex-col items-center justify-center">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholder}
          alt={movie.title}
          className="w-96 h-auto border rounded-lg shadow-2xl shadow-black"
        />
        <div className="flex flex-col">
        <h1 className="text-4xl font-bold mt-4">{movie.title}</h1>
        <p className="text-xl mt-2">{movie.release_date}</p>
        <p className="mt-3 text-xl">Genre: {movie.genres.map(genre => genre.name).join(", ")}</p>
        <p className="mt-2 text-lg">{movie.overview}</p>
        </div>     
      </div>
    </div>
  );
};

export default MovieDetails;
