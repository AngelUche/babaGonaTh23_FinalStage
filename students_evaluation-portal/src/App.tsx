import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/login/LandingPage";
import { Login, SignUp } from "./components";
import { AdminLayout ,RequireAuth} from "./layouts";

import { UserProfileView , AddUserView} from "./views/admin";
// import { auth } from "./firebase/firebaseAuth";
// import { useEffect } from "react";
import { Home, UserProfilePage,  PasswordReset, AddUserPage } from "./pages/admin/subroutes/";
// import {  onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import {ErrorPage,EditProfilePage} from "./pages";

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {

  //   Set persistence to 'local' to enable session persistence
  //   setPersistence(auth, browserLocalPersistence);

  //   Listen for changes in the user's login state
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       navigate("/login");
  //     }
  //   });

  //   Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  // }, [navigate]);


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
          <Route path="adduser/view" element={<AddUserView />} />
          <Route path="resetpassword" element={<PasswordReset />} />
          <Route path="setting" element={<EditProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage to="/login" />} />
    </Routes>

  );
}

export default App;
