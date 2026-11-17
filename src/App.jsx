import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tournaments from "./pages/Tournaments";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";

import Footer from "./components/Footer";

import "./App.css";
import Navbar from "./components/Navbar";
import TournamentDetails from "./pages/TournamentDetails";
import PlayerProfile from "./pages/PlayerProfile";
import Registration from "./pages/Registration";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import MyRegistrations from "./pages/MyRegistrations";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PageTitle from "./components/PageTitle";

function App() {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <PageTitle />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tournaments" element={<Tournaments />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/tournaments/:id" element={<TournamentDetails />} />

        <Route path="/profile" element={<PlayerProfile />} />

        <Route path="/tournaments/:id/register" element={<Registration />} />

        <Route path="/registration-success" element={<RegistrationSuccess />} />

        <Route path="/my-registrations" element={<MyRegistrations />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;