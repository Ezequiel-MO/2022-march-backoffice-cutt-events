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
import GeneralLayout from "./layouts/GeneralLayout";

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

              <Route path="project" element={<GeneralLayout />}>
                <Route index element={<MasterProject />} />
                <Route path="list" element={<ProjectList />} />
                <Route path="specs" element={<ProjectSpecs />} />
                <Route path="schedule" element={<GeneralLayout />}>
                  <Route index element={<AddScheduleToProject />} />
                  <Route path=":eventId" element={<AddEventToSchedule />} />
                  <Route
                    path="transfers_in_out"
                    element={<AddTransfersINOUTToSchedule />}
                  />
                </Route>
              </Route>

              <Route path="hotel" element={<GeneralLayout />}>
                <Route index element={<MasterHotel />} />
                <Route path="list" element={<HotelList />} />
                <Route path="specs" element={<HotelSpecs />} />
                <Route path=":hotelId" element={<AddHotelToProject />} />
              </Route>

              <Route path="restaurant" element={<GeneralLayout />}>
                <Route index element={<MasterRestaurant />} />
                <Route path="list" element={<RestaurantList />} />
                <Route path="specs" element={<RestaurantSpecs />} />
              </Route>

              <Route path="event" element={<GeneralLayout />}>
                <Route index element={<MasterEvent />} />
                <Route path="list" element={<EventList />} />
                <Route path="specs" element={<EventSpecs />} />
              </Route>

              <Route path="transfer" element={<GeneralLayout />}>
                <Route index element={<MasterTransfer />} />
                <Route path="list" element={<TransferList />} />
                <Route path="specs" element={<TransferSpecs />} />
              </Route>

              <Route path="client" element={<GeneralLayout />}>
                <Route index element={<MasterClient />} />
                <Route path="list" element={<ClientList />} />
                <Route path="specs" element={<ClientSpecs />} />
              </Route>
            </Route>

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
