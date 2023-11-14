import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/login/LandingPage";
import { Login, SignUp } from "./components";
import { AdminLayout ,RequireAuth} from "./layouts";

import { UserProfileView } from "./views/admin";

import { Home, UserProfilePage,  PasswordReset, AddUserPage } from "./pages/admin/subroutes/";
import {
  // AdminPage,
  ErrorPage,EditProfilePage
} from "./pages";

function App() {
  return (

    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />

      {/* required */}
      <Route element={<RequireAuth/>}>

        {/* Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="userprofile" element={<UserProfilePage />} />
          <Route path="userprofile/:id" element={<UserProfileView />} />
          <Route path="adduser" element={<AddUserPage />} />
          <Route path="resetpassword" element={<PasswordReset />} />
          <Route path="setting" element={<EditProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage to="/login" />} />
    </Routes>

  );
}

export default App;
