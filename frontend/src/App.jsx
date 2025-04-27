
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import ViewProfile from "./components/ViewProfile"
import JobDetails from "./components/JobDetails"
import Companies from "./components/Companies"
import AdminJobs from "./components/AdminJobs"
import NewCompany from "./components/NewCompany"
import CompanySetup from "./components/CompanySetup"
import NewJob from "./components/NewJob"
import JobApplicants from "./components/JobApplicants"
import ProtectedRoute from "./components/ProtectedRoute"
import ProtectUserRoute from "./components/ProtectUserRoute"



const appRouter=createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path:"/jobs",
      element:<ProtectUserRoute><Jobs/></ProtectUserRoute>
    },
    {
      path:'/browse',
      element: <ProtectUserRoute><Browse/></ProtectUserRoute>
    },
    {
      path: "/profile",
      element:<ProtectUserRoute> <ViewProfile /></ProtectUserRoute>
    },
    {
      path: "/job/:id/details",
      element: <JobDetails />,
    },
    {
      path:"/admin/companies",
      element:<ProtectedRoute><Companies/></ProtectedRoute>
    },
    {
      path:"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
      path:"/admin/company/register",
      element:<ProtectedRoute><NewCompany/></ProtectedRoute>
    },
    {
      path:"/admin/company/:id",
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
    },
    {
      path:"/admin/job/register",
      element:<ProtectedRoute><NewJob/></ProtectedRoute>
    },
    {
      path:'/admin/jobs/:id/applicants',
      element:<ProtectedRoute><JobApplicants/></ProtectedRoute>
    }
  ])

function App() {
  return (
   <>
   <RouterProvider router={appRouter}/>
   </>
  )
}

export default App
