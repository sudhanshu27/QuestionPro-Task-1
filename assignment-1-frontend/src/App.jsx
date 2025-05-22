import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllResults from "./pages/allResults/allResults";
import UserResult from "./pages/userResult/UserResult";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-result" element={<UserResult />} />
        <Route path="/all-results" element={<AllResults />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
