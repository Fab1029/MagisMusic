import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainView from "@/components/MainView";
import FilterView from "@/components/FilterView";
import SectionView from "@/components/SectionView";
import Home from "@/pages/Home";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<MainView />} />
          <Route path="search/:query/:filter" element={<FilterView />} />
          <Route path="section/:filter" element={<SectionView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
