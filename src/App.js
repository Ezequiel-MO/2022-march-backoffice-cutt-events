import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import EventList from "./screens/events/EventList/EventList";
import EventSpecs from "./screens/events/EventSpecs/EventSpecs";
import EventUpdate from "./screens/events/EventUpdate/EventUpdate";
import HotelList from "./screens/hotels/HotelList/HotelList";
import HotelSpecs from "./screens/hotels/HotelSpecs/HotelSpecs";
import HotelUpdate from "./screens/hotels/HotelUpdate/HotelUpdate";
import ProjectList from "./screens/projects/ProjectList/ProjectList";
import ProjectSpecs from "./screens/projects/ProjectSpecs/ProjectSpecs";
import ProjectUpdate from "./screens/projects/ProjectUpdate/ProjectUpdate";
import RestaurantList from "./screens/restaurants/RestaurantList/RestaurantList";
import RestaurantSpecs from "./screens/restaurants/RestaurantSpecs/RestaurantSpecs";
import RestaurantUpdate from "./screens/restaurants/RestaurantUpdate/RestaurantUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/project-specs" element={<ProjectSpecs />} />
        <Route path="/project-update" element={<ProjectUpdate />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/hotel-specs" element={<HotelSpecs />} />
        <Route path="/hotel-update" element={<HotelUpdate />} />
        <Route path="/hotel-list" element={<HotelList />} />
        <Route path="/restaurant-specs" element={<RestaurantSpecs />} />
        <Route path="/restaurant-update" element={<RestaurantUpdate />} />
        <Route path="/restaurant-list" element={<RestaurantList />} />
        <Route path="/event-specs" element={<EventSpecs />} />
        <Route path="/event-update" element={<EventUpdate />} />
        <Route path="/event-list" element={<EventList />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
