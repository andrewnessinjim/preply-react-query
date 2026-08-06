import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import PokemonQuery from "./routes/PokemonQuery/PokemonQuery";
import Deduplication from "./routes/Deduplication/Deduplication";
import Leaderboard from "./routes/Leaderboard/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-query" element={<PokemonQuery />} />
        <Route path="/deduplication" element={<Deduplication />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
