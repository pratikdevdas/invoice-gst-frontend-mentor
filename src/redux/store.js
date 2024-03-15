import { configureStore } from '@reduxjs/toolkit'
import invoiceSlice from './invoiceSlice'
import productSlice from './productSlice'
import orderSlipSlice from './orderSlipSlice'

const store = configureStore({
  reducer: {
    invoices: invoiceSlice.reducer,
    products: productSlice.reducer,
    orders: orderSlipSlice.reducer,
  },
})

export default store
