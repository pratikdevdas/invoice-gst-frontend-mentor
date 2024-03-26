/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { v4 as uuid4 } from 'uuid'
import { generateSerialNumber } from '../utils/functions'
import orderService from '../server/orderSlip'

const today = moment().format('YYYY-MM-DD, h:mm:ss a')

const orderSlipSlice = createSlice({
  name: 'orders',

  initialState: {
    allOrder: [],
    filteredOrder: [],
    orderById: null,
  },

  reducers: {
    filterOrder: (state, action) => {
      const { allOrder } = state
      if (action.payload.status === '') {
        state.filteredOrder = allOrder
      } else {
        const filteredData = allOrder.filter(
          (order) => order.status === action.payload.status,
        )
        state.filteredOrder = filteredData
      }
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload
      const orderToUpdate = state.allOrder.find((order) => order.customId === id)
      if (orderToUpdate) {
        orderToUpdate.status = status
      }
    },
    getOrderById: (state, action) => {
      const { allOrder } = state
      const order = allOrder.find(
        (item) => String(item.customId) === String(action.payload.id),
      )
      state.orderById = order
    },
    appendOrder: (state, action) => {
      state.allOrder.push(action.payload)
    },
    updateEditOrder: (state, action) => {
      const { id } = action.payload
      console.log(state)
      const orderToUpdate = state.find((n) => n.id === id)
      console.log(orderToUpdate)
      return state.map((order) => {
        console.log(order.id !== id ? order : orderToUpdate)
        return order.id !== id ? order : orderToUpdate
      })
    },
    setOrders: (state, action) => {
      state.allOrder = action.payload
      state.filteredOrder = action.payload
    },
  },
})

export const {
  appendOrder, updateEditOrder, setOrders, filterOrder,
} = orderSlipSlice.actions

// thunks: these are the functions that are used to make async calls via action creators
export const addOrder = (orderData) => async (dispatch, getState) => {
  const {
    items, advancePayment, discount, outlet,
  } = orderData
  const total = items.reduce((acc, item) => acc + Number(item.total), 0)
  const customId = generateSerialNumber(getState().orders, outlet)
  const leftToPay = total - advancePayment - discount
  const finalObject = {
    ...orderData,
    createdAt: today,
    total,
    customId,
    id: uuid4(),
    leftToPay,
    status: 'pending',
  }

  const newOrder = await orderService.createNew(finalObject, getState().auth.token)
  dispatch(appendOrder(newOrder))
  dispatch(filterOrder({ status: '' }))
}

export const editOrder = (editedOrder) => async (dispatch, getState) => {
  const { items, advancePayment, discount } = editedOrder
  const total = items.reduce((acc, item) => acc + Number(item.total), 0)
  const leftToPay = total - advancePayment - discount

  const updatedOrder = {
    ...editedOrder,
    leftToPay,
    total,
    editedAt: today,
  }
  console.log(updatedOrder)
  await orderService.updateOrder(updatedOrder.id, updatedOrder, getState().auth.token)
  dispatch(updateEditOrder(updatedOrder))
  dispatch(filterOrder({ status: '' }))
}

export default orderSlipSlice
