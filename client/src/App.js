import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Event,
  EventForm,
  Events,
  Home,
  Login,
  MyEvents,
  Notifications,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      {
        path: "/events/:id",
        element: <Event />,
      },
      {
        path: "/my-events",
        element: <MyEvents />,
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
