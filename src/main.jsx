import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './routes/router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './pages/context/AuthProvider.jsx'
import { Bounce, ToastContainer } from 'react-toastify'
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
    </QueryClientProvider>
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  </StrictMode>
)
