import { Home } from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route index path="/" element={<Home/>}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes