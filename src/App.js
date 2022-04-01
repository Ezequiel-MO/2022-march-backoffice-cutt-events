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
import AddEventToSchedule from "./screens/projects/AddEventToSchedule/AddEventToSchedule";
import AddTransfersINOUTToSchedule from "./screens/projects/AddTransfersINOUTToSchedule/AddTransfersINOUTToSchedule";

function App() {
  return (
    <div className="bg-black-50 text-lg text-orange-50 p-2 h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project" element={<MasterProject />} />
          <Route path="/hotel/:hotelId/add" element={<AddHotelToProject />} />
          <Route path="/project/schedule" element={<AddScheduleToProject />} />
          <Route
            path="/project/schedule/:eventId/event"
            element={<AddEventToSchedule />}
          />
          <Route
            path="/project/schedule/transfers_in_out"
            element={<AddTransfersINOUTToSchedule />}
          />
          <Route path="/project/specs" element={<ProjectSpecs />} />
          <Route path="/project/update" element={<ProjectUpdate />} />
          <Route path="/project/list" element={<ProjectList />} />
          <Route path="/hotel" element={<MasterHotel />} />
          <Route path="/hotel/specs" element={<HotelSpecs />} />
          <Route path="/hotel/:hotelId/update" element={<HotelUpdate />} />
          <Route path="/hotel/list" element={<HotelList />} />
          <Route path="/restaurant" element={<MasterRestaurant />} />
          <Route path="/restaurant/specs" element={<RestaurantSpecs />} />
          <Route
            path="/restaurant/:restaurantId/update"
            element={<RestaurantUpdate />}
          />
          <Route path="/restaurant/list" element={<RestaurantList />} />
          <Route path="/event" element={<MasterEvent />} />
          <Route path="/event/specs" element={<EventSpecs />} />
          <Route path="/event/:eventId/update" element={<EventUpdate />} />
          <Route path="/event/list" element={<EventList />} />
          <Route path="/transfer" element={<MasterTransfer />} />
          <Route path="/transfer/specs" element={<TransferSpecs />} />
          <Route path="/transfer/list" element={<TransferList />} />
          <Route
            path="/transfer/:transferId/update"
            element={<TransferUpdate />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
