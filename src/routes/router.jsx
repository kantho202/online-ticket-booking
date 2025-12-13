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
import TicketDetails from "../pages/Home/LatestTickets/TicketDetails";
import MyBookedTickets from "../pages/Dashboard/MyBookedTickets/MyBookedTickets";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payment/PaymentCancel";
import TransactionHistory from "../pages/Dashboard/TransactionHistory/TransactionHistory";
import ManageTickets from "../pages/Dashboard/ManageTickets/ManageTickets";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
// import TicketDetails from "../pages/Home/LatestTickets/TicketDetails";

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
        path:'/seeDetails/:id',
        element:<TicketDetails></TicketDetails>
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
        path: 'myBookedTickets',
        Component: MyBookedTickets
      },
      {
        path: 'transactionHistory',
        Component: TransactionHistory
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
      {
        path: 'manageTickets',
        Component: ManageTickets
      },
      {
        path: 'mangeUsers',
        Component: ManageUsers
      },
      {
        path:'payment/:ticketId',
        Component:Payment
      },
      {
        path:'payment-success',
        Component:PaymentSuccess
      },
      {
        path:'payment-canceled',
        Component:PaymentCancel
      }

    ]
  }
]);