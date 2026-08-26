import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Pokedex from "./routes/Pokedex/Pokedex";
import QueryDeduplication from "./routes/QueryDeduplication/QueryDeduplication";
import ArcadeLeaderboard from "./routes/ArcadeLeaderboard/ArcadeLeaderboard";
import NewObserverNewFetch from "./routes/NewObserverNewFetch/NewObserverNewFetch";
import FetchOnDemand from "./routes/FetchOnDemand/FetchOnDemand";
import GarbageCollection from "./routes/GarbageCollection/GarbageCollection";
import PlaceAnOrder from "./routes/PlaceAnOrder/PlaceAnOrder";
import OrderTracker from "./routes/OrderTracker/OrderTracker";
import OrderManage from "./routes/OrderTracker/OrderManage";
import DependentQueries from "./routes/DependentQueries/DependentQueries";
import ParallelQueries from "./routes/ParallelQueries/ParallelQueries";
import CombinedParallelQueries from "./routes/ParallelQueries/CombinedParallelQueries";
import BestOfBothWorlds from "./routes/ParallelQueries/BestOfBothWorlds";
import DynamicParallelQueries from "./routes/DynamicParallelQueries/DynamicParallelQueries";
import ManualCacheUpdate from "./routes/ManualCacheUpdate/ManualCacheUpdate";
import PartialCacheUpdate from "./routes/PartialCacheUpdate/PartialCacheUpdate";
import SortedListInvalidation from "./routes/SortedListInvalidation/SortedListInvalidation";
import OptimisticUpdatesWithoutCache from "./routes/OptimisticUpdatesWithoutCache/OptimisticUpdatesWithoutCache";
import OptimisticUpdatesInCache from "./routes/OptimisticUpdatesInCache/OptimisticUpdatesInCache";
import PlantCatalog from "./routes/PrefetchOnHover/PlantCatalog";
import PlantDetail from "./routes/PrefetchOnHover/PlantDetail";
import PlaceholderCatalog from "./routes/PrefetchOnHover/PlaceholderCatalog";
import PlaceholderDetail from "./routes/PrefetchOnHover/PlaceholderDetail";
import Pagination from "./routes/Pagination/Pagination";
import InfiniteScroll from "./routes/InfiniteScroll/InfiniteScroll";
import InfiniteScrollAuto from "./routes/InfiniteScroll/InfiniteScrollAuto";
import QueryConfigurationLevels from "./routes/QueryConfigurationLevels/QueryConfigurationLevels";
import DefaultQueryFunction from "./routes/DefaultQueryFunction/DefaultQueryFunction";
import QueryKeyFactories from "./routes/QueryKeyFactories/QueryKeyFactories";
import OptimizedSearch from "./routes/OptimizedSearch/OptimizedSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-query" element={<Pokedex />} />
        <Route path="/deduplication" element={<QueryDeduplication />} />
        <Route path="/leaderboard" element={<ArcadeLeaderboard />} />
        <Route path="/mount-refetch" element={<NewObserverNewFetch />} />
        <Route path="/on-demand" element={<FetchOnDemand />} />
        <Route path="/garbage-collection" element={<GarbageCollection />} />
        <Route path="/place-order" element={<PlaceAnOrder />} />
        <Route path="/order-tracker" element={<OrderTracker />} />
        <Route path="/order-tracker/manage" element={<OrderManage />} />
        <Route path="/dependent-queries" element={<DependentQueries />} />
        <Route path="/parallel-queries" element={<ParallelQueries />} />
        <Route
          path="/combined-parallel-queries"
          element={<CombinedParallelQueries />}
        />
        <Route path="/best-of-both-worlds" element={<BestOfBothWorlds />} />
        <Route
          path="/dynamic-parallel-queries"
          element={<DynamicParallelQueries />}
        />
        <Route path="/manual-cache-update" element={<ManualCacheUpdate />} />
        <Route path="/partial-cache-update" element={<PartialCacheUpdate />} />
        <Route
          path="/sorted-list-invalidation"
          element={<SortedListInvalidation />}
        />
        <Route
          path="/optimistic-updates-without-cache"
          element={<OptimisticUpdatesWithoutCache />}
        />
        <Route
          path="/optimistic-updates-in-cache"
          element={<OptimisticUpdatesInCache />}
        />
        <Route path="/prefetch-on-hover" element={<PlantCatalog />} />
        <Route path="/prefetch-on-hover/:plantId" element={<PlantDetail />} />
        <Route path="/placeholder-data" element={<PlaceholderCatalog />} />
        <Route
          path="/placeholder-data/:plantId"
          element={<PlaceholderDetail />}
        />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/infinite-scroll-auto" element={<InfiniteScrollAuto />} />
        <Route path="/config-levels" element={<QueryConfigurationLevels />} />
        <Route path="/default-query-fn" element={<DefaultQueryFunction />} />
        <Route path="/query-key-factories" element={<QueryKeyFactories />} />
        <Route path="/optimized-search" element={<OptimizedSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
