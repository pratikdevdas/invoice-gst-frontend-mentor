/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { v4 as uuid4 } from 'uuid'
import data from '../assets/data/data.json'
import { generateSerialNumber } from '../utils/functions'

const today = moment().format('YYYY-MM-DD')

const orderSlipSlice = createSlice({
  name: 'orders',

  initialState: {
    allOrder: data,
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
    deleteOrder: (state, action) => {
      const { allOrder } = state
      const index = allOrder.findIndex(
        (order) => order.id === action.payload.id,
      )
      if (index !== -1) {
        allOrder.splice(index, 1)
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
    addOrder: (state, action) => {
      const {
        items, advancePayment, discount, outlet,
      } = action.payload
      const finalObject = {
        ...action.payload,
        createdAt: today,
        total: items.reduce((acc, i) => acc + Number(i.total), 0),
        customId: generateSerialNumber(state, outlet),
        id: uuid4(),
        leftToPay:
          items.reduce((acc, i) => acc + Number(i.total), 0)
          - advancePayment
          - discount,
        status: 'pending',
      }
      state.allOrder.push(finalObject)
    },
    editOrder: (state, action) => {
      const { allOrder } = state
      const {
        id, items, advancePayment, discount,
      } = action.payload
      const edittedObject = {
        ...action.payload,
        leftToPay:
        items.reduce((acc, i) => acc + Number(i.total), 0)
        - advancePayment
        - discount,
        total: items.reduce((acc, i) => acc + Number(i.total), 0),
        editedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      }
      const orderIndex = allOrder.findIndex((order) => order.id === id)

      if (orderIndex !== -1) {
        allOrder[orderIndex] = {
          ...allOrder[orderIndex],
          ...edittedObject,
        }
      }
    },
  },
})

export default orderSlipSlice
