import React from 'react'
import { useAuth } from '../../contexts/authContext'
import Home1 from "./pages/Home1";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import WeatherApp from "./pages/Weather";
import WeatherMain from "./pages/WeatherMain";
import NotFound from "./pages/404";
import Settings from "./pages/Settings";
import { db } from "./backend/app_backend";
import "./autoload";

const Home = () => {
    const { currentUser } = useAuth()
    // let homePageSeen = db.get("HOME_PAGE_SEEN");
    let DEFAULT_ROUTE_PAGE;
    // homePageSeen
    // ? (DEFAULT_ROUTE_PAGE = <WeatherApp />)
    // : (DEFAULT_ROUTE_PAGE = <Home1 />);
    DEFAULT_ROUTE_PAGE = <WeatherApp />
    return (
        // <Settings />
        // <WeatherApp />
        <Routes>
          <Route index element={DEFAULT_ROUTE_PAGE} />
          <Route path="weather" element={<WeatherApp />} />
          <Route path="weathermain" element={<WeatherMain />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
    
}

export default Home