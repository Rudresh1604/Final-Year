import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./Pages/Appointment";

function App() {
  return (
    <div className="mx-4 mt-4 md:mx-6 md:my-9 ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
