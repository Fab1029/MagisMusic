import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainView from "@/components/MainView";
import FilterView from "@/components/FilterView";
import SectionView from "@/components/SectionView";
import Home from "@/pages/Home";
import ContentView from "@/components/ContentView";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "sonner";
import JamView from "@/components/JamView";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function AppRoutes() {
  return (
    <Router>
      <Toaster position="top-center"/>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<MainView />} />
          <Route path="search/:query/:filter" element={<FilterView />} />
          <Route path="section/:filter" element={<SectionView />} />
          <Route path="content/:id/:filter" element={<ContentView />} />
          <Route path="jam/:jamId" element={<JamView />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <ScrollToTop/>
    </Router>
  );
}

export default AppRoutes;
