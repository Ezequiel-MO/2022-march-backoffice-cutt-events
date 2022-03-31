import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/Dashboard/Dashboard";
import EventList from "./screens/events/EventList/EventList";
import EventSpecs from "./screens/events/EventSpecs/EventSpecs";
import EventUpdate from "./screens/events/EventUpdate/EventUpdate";
import MasterEvent from "./screens/events/MasterEvent";
import AddHotelToProject from "./screens/projects/AddHotelToProject/AddHotelToProject";
import HotelList from "./screens/hotels/HotelList/HotelList";
import HotelSpecs from "./screens/hotels/HotelSpecs/HotelSpecs";
import HotelUpdate from "./screens/hotels/HotelUpdate/HotelUpdate";
import MasterHotel from "./screens/hotels/MasterHotel";
import MasterProject from "./screens/projects/MasterProject";
import ProjectList from "./screens/projects/ProjectList/ProjectList";
import ProjectSpecs from "./screens/projects/ProjectSpecs/ProjectSpecs";
import ProjectUpdate from "./screens/projects/ProjectUpdate/ProjectUpdate";
import MasterRestaurant from "./screens/restaurants/MasterRestaurant";
import RestaurantList from "./screens/restaurants/RestaurantList/RestaurantList";
import RestaurantSpecs from "./screens/restaurants/RestaurantSpecs/RestaurantSpecs";
import RestaurantUpdate from "./screens/restaurants/RestaurantUpdate/RestaurantUpdate";
import AddScheduleToProject from "./screens/projects/AddScheduleToProject/AddScheduleToProject";
import MasterTransfer from "./screens/transfers/MasterTransfer";
import TransferSpecs from "./screens/transfers/TransferSpecs/TransferSpecs";
import TransferList from "./screens/transfers/TransferList/TransferList";
import TransferUpdate from "./screens/transfers/TransferUpdate/TransferUpdate";
import AddEventToSchedule from "./screens/events/AddEventToSchedule/AddEventToSchedule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project" element={<MasterProject />} />
        <Route path="/hotel-add/:hotelId" element={<AddHotelToProject />} />
        <Route path="/project/schedule" element={<AddScheduleToProject />} />
        <Route path="/project/specs" element={<ProjectSpecs />} />
        <Route path="/project/update" element={<ProjectUpdate />} />
        <Route path="/project/list" element={<ProjectList />} />
        <Route path="/hotel" element={<MasterHotel />} />
        <Route path="/hotel/specs" element={<HotelSpecs />} />
        <Route path="/hotel-update/:hotelId" element={<HotelUpdate />} />
        <Route path="/hotel/list" element={<HotelList />} />
        <Route path="/restaurant" element={<MasterRestaurant />} />
        <Route path="/restaurant/specs" element={<RestaurantSpecs />} />
        <Route path="/restaurant-update" element={<RestaurantUpdate />} />
        <Route path="/restaurant/list" element={<RestaurantList />} />
        <Route path="/event" element={<MasterEvent />} />
        <Route path="/event/specs" element={<EventSpecs />} />
        <Route path="/event-update" element={<EventUpdate />} />
        <Route path="/event/list" element={<EventList />} />
        <Route
          path="/project/schedule/add/:eventId"
          element={<AddEventToSchedule />}
        />
        <Route path="/transfer" element={<MasterTransfer />} />
        <Route path="/transfer/specs" element={<TransferSpecs />} />
        <Route path="/transfer/list" element={<TransferList />} />
        <Route
          path="/transfer-update/:transferId"
          element={<TransferUpdate />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
