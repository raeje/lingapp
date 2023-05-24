import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Achievements,
  Event,
  EventAttendance,
  EventChat,
  EventInfo,
  EventForm,
  Events,
  Home,
  Login,
  MyCalendar,
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
        children: [
          {
            path: "/events/:id/info",
            element: <EventInfo />,
          },
          {
            path: "/events/:id/attendance",
            element: <EventAttendance />,
          },
          {
            path: "/events/:id/chat",
            element: <EventChat />,
          },
        ],
      },
      {
        path: "/my-events",
        element: <MyEvents />,
      },
      {
        path: "/my-calendar",
        element: <MyCalendar />,
      },
      {
        path: "/users/:id/achievements",
        element: <Achievements />,
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
