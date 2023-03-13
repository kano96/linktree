import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./routes/LoginView";
import DashboardView from "./routes/DashboardView";
import EditProfileView from "./routes/EditProfileView";
import SignOutView from "./routes/SignOutView";
import PublicProfileView from "./routes/PublicProfileView";
import ChooseUsernameView from "./routes/ChooseUsernameView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginView />} />
      <Route path="dashboard" element={<DashboardView />} />
      <Route path="dashboard/profile" element={<EditProfileView />} />
      <Route path="signout" element={<SignOutView />} />
      <Route path="u/:username" element={<PublicProfileView />} />
      <Route path="choose-username" element={<ChooseUsernameView />} />
    </Routes>
  </BrowserRouter>
);
