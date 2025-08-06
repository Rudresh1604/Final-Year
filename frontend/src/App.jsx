import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./Pages/Appointment";
import { ThemeInit } from "../.flowbite-react/init";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./Pages/LoginPage";
import NavbarComponent from "./components/Layout/Header";
import FooterComponent from "./components/Layout/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-100">
        <NavbarComponent />
        <div className="px-4 pt-4 mt-15 md:px-6 md:py-9 ">
          <ThemeInit />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Appointment />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </div>
        <FooterComponent />
      </div>
    </Provider>
  );
}

export default App;
