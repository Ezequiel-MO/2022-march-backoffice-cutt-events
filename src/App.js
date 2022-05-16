import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Header from "./components/header/Header";
import {
  AddEventToSchedule,
  AddHotelToProject,
  AddScheduleToProject,
  AddTransfersINOUTToSchedule,
  ClientList,
  ClientSpecs,
  Dashboard,
  EventList,
  EventSpecs,
  HotelList,
  HotelSpecs,
  MasterClient,
  MasterEvent,
  MasterHotel,
  MasterProject,
  MasterRestaurant,
  MasterTransfer,
  ProjectList,
  ProjectSpecs,
  ProjectUpdate,
  RestaurantList,
  RestaurantSpecs,
  TransferList,
  TransferSpecs,
} from "./screens";

function App() {
  return (
    <div className="bg-black-50 text-lg text-orange-50 p-2 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Header />
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
          <Route path="/hotel/list" element={<HotelList />} />
          <Route path="/restaurant" element={<MasterRestaurant />} />
          <Route path="/restaurant/specs" element={<RestaurantSpecs />} />
          <Route path="/restaurant/list" element={<RestaurantList />} />
          <Route path="/event" element={<MasterEvent />} />
          <Route path="/event/specs" element={<EventSpecs />} />
          <Route path="/event/list" element={<EventList />} />
          <Route path="/transfer" element={<MasterTransfer />} />
          <Route path="/transfer/specs" element={<TransferSpecs />} />
          <Route path="/transfer/list" element={<TransferList />} />
          <Route path="/client" element={<MasterClient />} />
          <Route path="/client/specs" element={<ClientSpecs />} />
          <Route path="/client/list" element={<ClientList />} />

          <Route
            path="*"
            element={
              <main className="indent-10">
                <h1 className="text-xl">
                  Page not found! Pls click on the logo
                </h1>
              </main>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
