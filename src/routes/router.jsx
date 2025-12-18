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
import AdvertiseTickets from "../pages/Dashboard/AdvertiseTickets/AdvertiseTickets";
import AdminRoute from "./AdminRoute";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import VendorRoute from "./VendorRoute";
import Loader from "../components/Loading/Loading";
// import TicketDetails from "../pages/Home/LatestTickets/TicketDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement:Loader,
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
        element:<PrivateRoute><TicketDetails></TicketDetails></PrivateRoute>
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
        path: 'userProfile',
        Component: UserProfile
      },
      {
        path: 'vendorProfile',
        Component: VendorProfile
      },
      {
        path: 'adminProfile',
        Component: AdminProfile
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
      },
      {
        path: 'addTicket',
        loader: () => fetch('/serviceCenter.json').then(res => res.json()),
       element:<VendorRoute><AddTicket></AddTicket> </VendorRoute>
      },
      {
        path: 'myAddedTickets',
        element:<VendorRoute><MyAddedTickets></MyAddedTickets></VendorRoute>
      },
      {
        path: 'RequestedBooking',
        element:<VendorRoute><RequestedBooking></RequestedBooking> </VendorRoute>
      },
      {
        path: 'RevenueOverview',
        element:<VendorRoute><RevenueOverview></RevenueOverview> </VendorRoute>
      },
      {
        path: 'manageTickets',
        element:<AdminRoute><ManageTickets></ManageTickets> </AdminRoute>
      },
      {
        path: 'mangeUsers',
        // Component:ManageUsers
        element:<AdminRoute><ManageUsers></ManageUsers> </AdminRoute>
      },
      {
        path: 'advertiseTickets',
        element:<AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
      },
     

    ]
  }
]);