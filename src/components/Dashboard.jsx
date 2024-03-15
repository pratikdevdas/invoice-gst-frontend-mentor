import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Center from './orders/Center'

function Dashboard() {
  const location = useLocation()
  return (
    <div className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]">
      <Header />
      {location.pathname === '/dashboard' ? <Center /> : <Outlet />}
    </div>
  )
}

export default Dashboard
