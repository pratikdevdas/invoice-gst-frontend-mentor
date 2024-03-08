/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import data from '../assets/data/data.json'
import getForwardDate from '../functions/forwardDate'
import generateID from '../functions/generateId'

const today = moment().format('YYYY-MM-DD')

const invoiceSlice = createSlice({
  name: 'invoices',

  initialState: {
    allInvoice: data,
    filteredInvoice: [],
    invoiceById: null,
  },

  reducers: {
    filterInvoice: (state, action) => {
      const { allInvoice } = state
      if (action.payload.status === '') {
        state.filteredInvoice = allInvoice
      } else {
        const filteredData = allInvoice.filter(
          (invoice) => invoice.status === action.payload.status,
        )
        console.log(filteredData)
        state.filteredInvoice = filteredData
      }
    },
    getInvoiceById: (state, action) => {
      const { allInvoice } = state
      const invoice = allInvoice.find((item) => item.id === action.payload.id)
      state.invoiceById = invoice
    },
    deleteInvoice: (state, action) => {
      const { allInvoice } = state
      const index = allInvoice.findIndex(
        (invoice) => invoice.id === action.payload.id,
      )
      if (index !== -1) {
        allInvoice.splice(index, 1)
      }
    },
    updateInvoiceStatus: (state, action) => {
      const { id, status } = action.payload
      const invoiceToUpdate = state.allInvoice.find(
        (invoice) => invoice.id === id,
      )
      if (invoiceToUpdate) {
        invoiceToUpdate.status = status
      }
    },
    addInvoice: (state, action) => {
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
      } = action.payload

      const finalData = {
        id: `${generateID()}`,
        createdAt: today,
        paymentDue: getForwardDate(paymentTerms),
        description,
        paymentTerms,
        clientName,
        clientEmail,
        status: 'pending',
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => acc + Number(i.total), 0),
      }
      state.allInvoice.push(finalData)
    },
    editInvoice: (state, action) => {
      const { allInvoice } = state
      const {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
        item,
        id,
      } = action.payload

      const invoiceIndex = allInvoice.findIndex((invoice) => invoice.id === id)
      const edittedObject = {
        description,
        paymentTerms,
        clientName,
        clientEmail,
        senderAddress: {
          street: senderStreet,
          city: senderCity,
          postCode: senderPostCode,
          country: senderCountry,
        },
        clientAddress: {
          street: clientStreet,
          city: clientCity,
          postCode: clientPostCode,
          country: clientCountry,
        },
        items: item,
        total: item.reduce((acc, i) => acc + Number(i.total), 0),
      }

      if (invoiceIndex !== -1) {
        allInvoice[invoiceIndex] = {
          ...allInvoice[invoiceIndex],
          ...edittedObject,
        }
      }
    },
  },
})

export default invoiceSlice
