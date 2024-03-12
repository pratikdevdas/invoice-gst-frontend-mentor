import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [{
      productName: 'RayBan Sunglasses',
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
      description: 'Very cool sunglasses',
      specialCode: '21FDfsdA',
      sellingPrice: 2750,
      defaultDiscount: 0,
      cgst: 6,
      sgst: 6,
      igst: 0,
      hsnCode: '',
    }, {
      productName: 'Iruss SUn',
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
      console.log(action.payload)
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
