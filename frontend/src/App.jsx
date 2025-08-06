import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./Pages/Appointment";
import { ThemeInit } from "../.flowbite-react/init";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./Pages/LoginPage";
import DoctorSignup from "./components/Auth/DoctorSignup";
import PatientSignUp from './components/Auth/PatientSignUp';

function App() {
  return (
    <Provider store={store}>
      <div className="px-4 pt-4 md:px-6 md:py-9 bg-gray-100">
        <ThemeInit />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Appointment />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Doctor/signup" element={<DoctorSignup />} />
            <Route path="/Patient/signup" element={<PatientSignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
