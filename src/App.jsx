import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProfilePhotoUploader from "./pages/ProfilePhotoUploader";
import Search from "./pages/Search";
import ViewProfile from "./pages/viewprofile";

function App() {  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/profile-photo" element={<ProfilePhotoUploader />} />
      <Route path="/search" element={<Search />} />     
<Route path="/viewprofile/:id" element={<ViewProfile />} />

<Route path="/viewprofile/:userId" element={<ViewProfile />} />


    </Routes>
  );
}

export default App;
