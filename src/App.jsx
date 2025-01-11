import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "../src/components/Movies";
import MovieDetails from "../src/components/DetailedMovie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* Detailed view route */}
      </Routes>
    </Router>
  );
}

export default App;
