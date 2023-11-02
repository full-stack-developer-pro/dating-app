import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Chats from "./pages/Chat";
import NotFound from "./pages/NotFound";
import SingleLProfile from "./pages/SingleLProfile";
import EditProfile from "./pages/EditProfile";
import { RestrictedAccess } from "./private-component/RestrictedAccess";
import SearchResults from "./pages/SearchResults";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/single-profile/:id" element={<SingleLProfile />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/single-blog/:id" element={<SingleBlog />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/search-results" element={<SearchResults />} />
        {/* <Route path="/search-results/:gender" element={<SearchResults />} /> */}
        {/* <Route path="/search-results/:location" element={<SearchResults />} /> */}
        <Route element={<RestrictedAccess />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/chats/:id" element={<Chats />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}





