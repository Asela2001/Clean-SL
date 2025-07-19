import { Route , Routes } from "react-router";
import JobCreate from "./Pages/JobCreate";
import Home from "./Pages/Home";
import JobView from "./Pages/JobView";
import Booking from "./Pages/Booking";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<JobCreate/>} />
        <Route path="/job" element={<Booking/>} />
        <Route path="/jobs/:id" element={<JobView/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
};

export default App;
