import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import EventPage from "./pages/EventPage/EventPage";
import EventPageAdmin from "./pages/EventPageAdmin/EventPageAdmin";
import NotFound from "./pages/NotFound/NotFound";
import CartPage from "./pages/CartPage/CartPage";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function App() {
  const [userType, setUserType] = useState();
  // const navi = useNavigate();
  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      const info = jwtDecode(hasToken);

      setUserType(info.type);
      // console.log(info.idUser);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          {userType === 100 ? (
            <Route
              path="/ticketsByEventAdmin/:id"
              element={<EventPageAdmin />}
            />
          ) : (
            ""
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
