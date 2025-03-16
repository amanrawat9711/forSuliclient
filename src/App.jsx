import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Add from "./pages/AddSomething";
import Show from "./pages/Show";
import Showimgbio from "./pages/Showimgbio";
import Login from "./pages/Login";
import Message from "./pages/Message";

function App() {
  const [authKey, setAuthKey] = useState(localStorage.getItem("authKey"));

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthKey(localStorage.getItem("authKey"));
    };

    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const PrivateRoute = ({ element }) => {
    return authKey ? element : <Navigate to="/login" />;
  };

  return (
    <div className="m-1">
      <Routes>
      <Route path="/login" element={<Login />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/add" element={<PrivateRoute element={<Add />} />} />
        <Route path="/show" element={<PrivateRoute element={<Show />} />} />
        <Route path="/showimg/:id" element={<PrivateRoute element={<Showimgbio />} />} />
        <Route path="/message" element={<PrivateRoute element={<Message />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
