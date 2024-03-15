import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [
      {
        productName: 'RayBan Sunglasses',
        id: '1',
        uniqueCode: '21DSDdf',
        description: 'Very cool rayban sunglasses',
        specialCode: '21DSD',

        sellingPrice: 3200,
        defaultDiscount: 10,
        cgst: 9,
        sgst: 9,
        igst: 0,
        hsnCode: '',
      },
      {
        productName: 'RayBan Cool Sunglasses',
        id: '2',
        uniqueCode: '21DfdsSD',
        description: 'Very cool rayban sunglasses',
        specialCode: '21DSD',
        sellingPrice: 3200,
        defaultDiscount: 10,
        cgst: 9,
        sgst: 9,
        igst: 0,
        hsnCode: '',
      },
      {
        productName: 'Idee Sunglasses',
        id: '3',
        uniqueCode: '21DfewSD',
        description: 'Very cool sunglasses',
        specialCode: '21FDA',
        sellingPrice: 3220,
        defaultDiscount: 10,
        cgst: 9,
        sgst: 9,
        igst: 0,
        hsnCode: '',
      },
      {
        productName: 'Rayban Glasses',
        id: '4',
        uniqueCode: '21DS32ewcD',
        description: 'Very cool sunglasses',
        specialCode: '21FDfsdA',
        sellingPrice: 6290,
        defaultDiscount: 0,
        cgst: 6,
        sgst: 6,
        igst: 0,
        hsnCode: '',
      },
      {
        productName: 'DVP Zeiss',
        id: '5',
        uniqueCode: '21D54gSD',
        description: 'Very cool sunglasses',
        specialCode: '21FDfsdA',
        sellingPrice: 2750,
        defaultDiscount: 0,
        cgst: 6,
        sgst: 6,
        igst: 0,
        hsnCode: '',
      },
      {
        productName: 'Iruss SUn',
        id: '6',
        uniqueCode: '2pbnds1DSD',
        description: 'Very cool sunglasses',
        specialCode: '21FDfsdA',
        sellingPrice: 1990,
        defaultDiscount: 0,
        cgst: 9,
        sgst: 9,
        igst: 0,
        hsnCode: '',
      },
    ],
    filteredProducts: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.allProducts.push(action.payload)
    },
    filterProducts: (state, action) => {
      const { allProducts } = state
      if (action.payload === '') {
        // eslint-disable-next-line no-param-reassign
        state.filteredProducts = allProducts
      } else {
        const filteredData = allProducts.filter(
          (product) => product.productName === action.payload,
        )
        // eslint-disable-next-line no-param-reassign
        state.filteredProducts = filteredData
      }
    },
  },
})

export const { addProduct, filterProducts } = productSlice.actions
export default productSlice
