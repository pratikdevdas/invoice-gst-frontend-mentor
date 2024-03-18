import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './Header'
import Center from './orders/Center'
import { selectCurrentToken } from '../redux/authSlice'

function Dashboard() {
  const location = useLocation()
  const token = useSelector(selectCurrentToken)
  console.log(token)
  return (
    <div className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]">
      <Header />
      {token ? <Center /> : <Navigate to="/login" state={{ from: location }} replace />}
      {/* {location.pathname === '/dashboard' ? <Center /> : <Outlet />} */}
    </div>
  )
}

export default Dashboard
