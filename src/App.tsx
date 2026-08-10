import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import PokemonQuery from "./routes/PokemonQuery/PokemonQuery";
import Deduplication from "./routes/Deduplication/Deduplication";
import Leaderboard from "./routes/Leaderboard/Leaderboard";
import MountRefetch from "./routes/MountRefetch/MountRefetch";
import OnDemand from "./routes/OnDemand/OnDemand";
import GarbageCollection from "./routes/GarbageCollection/GarbageCollection";
import PlaceOrder from "./routes/PlaceOrder/PlaceOrder";
import OrderTracker from "./routes/OrderTracker/OrderTracker";
import OrderManage from "./routes/OrderTracker/OrderManage";
import DependentQueries from "./routes/DependentQueries/DependentQueries";
import ManualCacheUpdate from "./routes/ManualCacheUpdate/ManualCacheUpdate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-query" element={<PokemonQuery />} />
        <Route path="/deduplication" element={<Deduplication />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/mount-refetch" element={<MountRefetch />} />
        <Route path="/on-demand" element={<OnDemand />} />
        <Route path="/garbage-collection" element={<GarbageCollection />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-tracker" element={<OrderTracker />} />
        <Route path="/order-tracker/manage" element={<OrderManage />} />
        <Route path="/dependent-queries" element={<DependentQueries />} />
        <Route path="/manual-cache-update" element={<ManualCacheUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
