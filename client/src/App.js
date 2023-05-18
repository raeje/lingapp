import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventForm, Events, Home, Login, Notifications } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Events />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/events/new",
        element: <EventForm />,
      },
    ],
  },
  {
    path: "/signup",
    element: <></>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
