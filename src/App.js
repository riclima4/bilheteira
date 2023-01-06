import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import EventPage from "./pages/EventPage/EventPage";
import EventPageAdmin from "./pages/EventPageAdmin/EventPageAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/ticketsByEventAdmin/:id" element={<EventPageAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
