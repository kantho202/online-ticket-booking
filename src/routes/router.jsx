import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllTickets from "../pages/AllTickets/AllTickets";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/Auth/LogIn";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import VendorProfile from "../pages/Dashboard/VendorProfile/VendorProfile";
import AddTicket from "../pages/Dashboard/AddTicket/AddTicket";
import MyAddedTickets from "../pages/Dashboard/MyAddedTickets/MyAddedTickets";
import RequestedBooking from "../pages/Dashboard/RequestedBooking/RequestedBooking";
import RevenueOverview from "../pages/Dashboard/RevenueOverview/RevenueOverview";
import Error from "../components/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/allTickets',
        element: <PrivateRoute>
          <AllTickets></AllTickets>
        </PrivateRoute>
      },
      {
        path:'*',
        Component:Error
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
        Component: Register
      },
      {
        path: 'forget-password',
        Component: ForgetPassword
      }


    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'vendorProfile',
        Component: VendorProfile
      },
      {
        path: 'addTicket',
        loader: () => fetch('/serviceCenter.json').then(res => res.json()),
        Component: AddTicket
      },
      {
        path: 'myAddedTickets',
        Component: MyAddedTickets
      },
      {
        path: 'RequestedBooking',
        Component: RequestedBooking
      },
      {
        path: 'RevenueOverview',
        Component: RevenueOverview
      },

    ]
  }
]);