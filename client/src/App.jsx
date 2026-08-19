import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Actors from "./pages/Actors";
import ActorDetails from "./pages/ActorDetails";
import Directors from "./pages/Directors";
import ExploreConnections from "./pages/ExploreConnections";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:id" element={<ActorDetails />} />
        <Route path="/directors" element={<Directors />} />
        <Route path="/explore" element={<ExploreConnections />} />
        <Route
          path="*"
          element={
            <div className="page" style={{ paddingTop: 60 }}>
              <div className="state-block">
                <div className="state-title">Page not found</div>
                <p>That page doesn't exist. Use the navigation above to get back on track.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </>
  );
}
