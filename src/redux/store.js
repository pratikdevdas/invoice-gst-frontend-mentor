import { configureStore } from '@reduxjs/toolkit'
import invoiceSlice from './invoiceSlice'
import productSlice from './productSlice'

const store = configureStore({
  reducer: {
    invoices: invoiceSlice.reducer,
    products: productSlice.reducer,
  },
})

export default store
