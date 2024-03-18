import { configureStore } from '@reduxjs/toolkit'
import invoiceSlice from './invoiceSlice'
import productSlice from './productSlice'
import orderSlipSlice, { setOrders } from './orderSlipSlice'
import orderService from '../server/orderSlip'
import authSlice from './authSlice'
import { api } from '../server/authRedux'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    invoices: invoiceSlice.reducer,
    products: productSlice.reducer,
    orders: orderSlipSlice.reducer,
    // rtk query
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: true,
})

orderService.getAll().then((orderSlips) => store.dispatch(setOrders(orderSlips)))

export default store
