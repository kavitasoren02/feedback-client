import { Navigate, Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import CommanLayout from './components/layout/comman-layout'
import { DEFAULT_ROUTE_MAPPING_BY_USER_ROLE } from './config/config'
import Login from './pages/auth/login'
import Register from './pages/auth/sign-up'
import Dashboard from './pages/dashboard/Dashboard'
import Employees from './pages/employee/manager/Employees'
import FeebbackForm from './pages/forms/manager/FeedbackForm'
import FormList from './pages/forms/manager/FormList'
import { useAuth } from './protected-route/auth-provider'
import NoAuthRoute from './protected-route/no-auth'
import ProtectedRoute from './protected-route/protected-route'
import Feedbacks from './pages/feedback/Feedbacks'
import FeebbackFormForEmployee from './pages/feedback/FeedbackForm'
import Profile from './pages/profile'

function App() {
  const { user } = useAuth()
  return (
    <>
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
      <Routes>
        <Route 
          path='/auth/login'
          element={
            <NoAuthRoute>
              <Login />
            </NoAuthRoute>
          }
        />

        <Route 
          path='/auth/register'
          element={
            <NoAuthRoute>
              <Register />
            </NoAuthRoute>
          }
        />

        <Route 
          path='/dashboard'
          element={
            <ProtectedRoute allowedRoles={["manager", "employee"]}>
              <CommanLayout>
                <Dashboard />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/manager/forms'
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <CommanLayout>
                <FormList />
              </CommanLayout>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path='/manager/forms/add'
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <CommanLayout>
                <FeebbackForm />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/manager/forms/edit/:formId'
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <CommanLayout>
                <FeebbackForm />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/manager/employees'
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <CommanLayout>
                <Employees />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/employee/forms'
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <CommanLayout>
                <Feedbacks />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/employee/form/:formId'
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <CommanLayout>
                <FeebbackFormForEmployee />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/profile'
          element={
            <ProtectedRoute allowedRoles={["employee", "manager"]}>
              <CommanLayout>
                <Profile />
              </CommanLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path='*'
          element={<Navigate to={DEFAULT_ROUTE_MAPPING_BY_USER_ROLE[user?.role] ?? '/auth/login'} />}
        />
      </Routes>
    </>
  )
}

export default App