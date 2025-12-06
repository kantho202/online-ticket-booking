import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllTickets from "../pages/AllTickets/AllTickets";
import Dashboard from "../pages/Dashboard/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/Auth/LogIn";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/allTickets',
        element:<PrivateRoute>
          <AllTickets></AllTickets>
        </PrivateRoute>
      },
      {
        path:'/dashboard',
        element:<PrivateRoute>
          <Dashboard></Dashboard>
        </PrivateRoute>
      }
    ]
  },
   {
        path: '/',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                Component: LogIn
            },
            {
                path: '/register',
                Component:Register
            },
            {
              path:'forget-password',
              Component:ForgetPassword
            }
           

        ]
    },
]);