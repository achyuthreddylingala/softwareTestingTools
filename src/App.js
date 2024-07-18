import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import Settings from "./components/home/pages/Settings";
import WeatherApp from "./components/home/pages/Weather";
import WeatherMain from "./components/home/pages/WeatherMain";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/weather",
      element: <WeatherApp />,
    },
    {
      path: "/weathermain",
      element: <WeatherMain />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },

  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
