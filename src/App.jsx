import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import Center from './components/invoices/Center'
// import Header from './components/Header'
import InvoiceInfo from './components/invoices/InvoiceInfo'
import invoiceSlice from './redux/invoiceSlice'
import Products from './components/products/Products'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  const onDelete = (id) => {
    dispatch(invoiceSlice.actions.deleteInvoice({ id }))
  }

  return (
    <div className=" dark:bg-[#141625] duration-300 min-h-screen bg-[#f8f8fb]">

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Dashboard />} path="/dashboard">
            <Route element={<Products />} path="products" />
            <Route element={<InvoiceInfo onDelete={onDelete} />} path="invoice" />
          </Route>
          <Route element={<Login />} path="/" />
        </Routes>
      </AnimatePresence>

    </div>
  )
}

export default App
