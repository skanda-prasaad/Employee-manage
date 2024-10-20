import React, { useContext, useEffect } from "react"
import Login from './components/Auth/Loigin'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import { setLocalStorage } from "./utils/localStorage"
import { getLocalStorage } from "./utils/localStorage"
import { AuthContext } from "./context/AuthProvider"
const App = () => {

  const [user, setUser] = React.useState(null);
  const authData = useContext(AuthContext)


  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === '123') {
      console.log('Admin Login');
      setUser('admin');
    } else if (authData && authData.employees.find((e)=>e.email && e.password == password)) {
      console.log('Employee Login');
      setUser('employee');
    }
    else {
      alert('Invalid Credentials');
    }
  }

  return (
    <>
      {/* <Login/> */}
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
      {/* <EmployeeDashboard/> */}
      {/* <AdminDashboard/> */}
    </>
  )
}

export default App