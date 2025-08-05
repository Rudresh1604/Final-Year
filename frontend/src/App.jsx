import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./Pages/Appointment";

function App() {
  return (
    <div className="px-4 pt-4 md:px-6 md:py-9 bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
