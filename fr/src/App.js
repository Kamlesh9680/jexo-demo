import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/BottomNav';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Team from './pages/Team';
import Membership from './pages/Membership';
import Records from './pages/Records';
import Profile from './pages/Profile';
import InviteFriend from "./components/Invite";
import RegistrationForm from "./components/RegistrationForm";
import KYCForm from "./components/KYCForm";
import LoginForm from "./components/LoginForm";
import LoginPassword from "./components/LoginPass";
import TradePassword from "./components/TradePass";
import Product from "./pages/Product";
// import CityPartner from "./components/CityPartner";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes basename="/client">
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/nav" element={<Navbar />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/invite-friend" element={<InviteFriend />} />
            <Route path="/team" element={<Team />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/records" element={<Records />} />
            <Route path="/user-kyc" element={<KYCForm />} />
            <Route path="/login-password" element={<LoginPassword />} />
            <Route path="/transaction-password" element={<TradePassword />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
