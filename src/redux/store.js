import { configureStore } from '@reduxjs/toolkit'
import invoiceSlice from './invoiceSlice'
import productSlice from './productSlice'
import orderSlipSlice, { setOrders } from './orderSlipSlice'
import orderService from '../server/orderSlip'

const store = configureStore({
  reducer: {
    invoices: invoiceSlice.reducer,
    products: productSlice.reducer,
    orders: orderSlipSlice.reducer,
  },
})

orderService.getAll().then((orderSlips) => store.dispatch(setOrders(orderSlips)))

export default store
