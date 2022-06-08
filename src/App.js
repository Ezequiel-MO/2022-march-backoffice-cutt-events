import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmAccount from "./screens/users/ConfirmAccount";
import ForgotPassword from "./screens/users/ForgotPassword";
import NewPassword from "./screens/users/NewPassword";
import {
  Login,
  SignUp,
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
  RestaurantList,
  RestaurantSpecs,
  TransferList,
  TransferSpecs,
} from "./screens";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./layouts/ProtectedRoute";

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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/app" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="project" element={<MasterProject />} />
              <Route path="hotel" element={<MasterHotel />} />
              <Route path="restaurant" element={<MasterRestaurant />} />
              <Route path="event" element={<MasterEvent />} />
              <Route path="transfer" element={<MasterTransfer />} />
              <Route path="client" element={<MasterClient />} />
            </Route>

            <Route path="/hotel/:hotelId/add" element={<AddHotelToProject />} />
            <Route
              path="/project/schedule"
              element={<AddScheduleToProject />}
            />
            <Route
              path="/project/schedule/:eventId/event"
              element={<AddEventToSchedule />}
            />
            <Route
              path="/project/schedule/transfers_in_out"
              element={<AddTransfersINOUTToSchedule />}
            />
            <Route path="/project/specs" element={<ProjectSpecs />} />
            <Route path="/project/list" element={<ProjectList />} />
            <Route path="/hotel/specs" element={<HotelSpecs />} />
            <Route path="/hotel/list" element={<HotelList />} />
            <Route path="/restaurant/specs" element={<RestaurantSpecs />} />
            <Route path="/restaurant/list" element={<RestaurantList />} />
            <Route path="/event/specs" element={<EventSpecs />} />
            <Route path="/event/list" element={<EventList />} />
            <Route path="/transfer/specs" element={<TransferSpecs />} />
            <Route path="/transfer/list" element={<TransferList />} />
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
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
