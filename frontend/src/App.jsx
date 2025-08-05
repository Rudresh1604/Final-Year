import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<h1>Home</h1>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
