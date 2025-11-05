import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainView from "@/components/MainView";
import FilterView from "@/components/FilterView";
import SectionView from "@/components/SectionView";
import Home from "@/pages/Home";
import ContentView from "@/components/ContentView";
import { ScrollToTop } from "@/components/ScrollToTop";

function AppRoutes() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<MainView />} />
          <Route path="search/:query/:filter" element={<FilterView />} />
          <Route path="section/:filter" element={<SectionView />} />
          <Route path="content/:id/:filter" element={<ContentView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
