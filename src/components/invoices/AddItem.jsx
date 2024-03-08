/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { TrashIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import {
  // validateItemCount,
  validateItemName,
} from '../../functions/createInvoiceValidator'
// import productSlice from '../../redux/productSlice'

function AddItem({
  itemDetails, isValidatorActive, onDelete, setItem,
}) {
  const products = useSelector((state) => state.products.allProducts)
  const [input, setInput] = useState('')
  const [value, setValue] = useState('')
  const [quantity, setQuantity] = useState(0)
  // let product
  console.log(quantity)
  return (
    <div>
      <div className=" flex dark:text-white justify-between items-center">
        <div className=" flex flex-wrap ">
          <div className="  flex px-2 py-2   flex-col items-start">
            {/* <h1>Search Product</h1> */}
            {value ? (
              <div className="flex">
                <div className=" flex px-2 py-2  flex-col items-start">
                  <h1>Item Name</h1>
                  <div className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                    {value.productName}
                  </div>
                </div>
                <div className=" flex px-2 py-2  flex-col items-start">
                  <h1>Selling Price</h1>
                  <div className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                    {value.sellingPrice}
                  </div>
                </div>
                <div className=" flex px-2 py-2  flex-col items-start">
                  <h1>GST</h1>
                  <div className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                    {value.igst + value.cgst + value.sgst}
                    {' '}
                    %
                  </div>
                </div>
                <div className=" flex px-2 py-2  flex-col items-start">
                  <h1>Quantity</h1>
                  <input
                    className=" max-w-[50px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value)
                      setItem((state) => state.map((item) => (item.id === itemDetails.id
                        ? { ...item, quantity: e.target.value, total: e.target.value * value.sellingPrice }
                        : item)))
                    }}
                    placeholder="0"
                    type="number"
                    required
                  />
                </div>
                <div className=" flex px-2 py-2  flex-col items-start">
                  Total
                  <div className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                    {quantity * value.sellingPrice}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <input
                  name="name"
                  onChange={(e) => {
                    setInput(e.currentTarget.value)
                  }}
                  value={input}
                  type="text"
                  className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${
                    isValidatorActive
                    && !validateItemName(itemDetails.name)
                    && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  }   dark:border-gray-800`}
                  placeholder="Search From your product"
                />
                <div>
                  {input
                    && products
                      .filter((p) => p.productName
                        .toLowerCase()
                        .includes(input.toLowerCase()))
                      .map((p, i) => (
                        <li
                          className="list-none my-4 dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
                          key={i}
                          onClick={() => {
                            setValue(p)
                            setItem((state) => state.map((item) => (item.id === itemDetails.id
                              ? { ...item, name: p.productName, price: p.sellingPrice }
                              : item)))
                          }}
                        >
                          {p ? p.productName : 'No product with this name'}
                        </li>
                      ))}
                </div>
              </div>
            )}
          </div>

          {/* <div className=" flex px-2 py-2  flex-col items-start">
            <h1>Qty.</h1>
            <input
              name="quantity"
              type="number"
              onChange={(e) => {
                handelOnChange(itemDetails.id, e)
              }}
              value={itemDetails.quantity}
              min={0}
              className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 max-w-[60px] border-gray-300 focus:outline-none ${
                isValidatorActive
                && !validateItemCount(itemDetails.quantity)
                && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
              }   dark:border-gray-800`}
            />
          </div>

          <div className=" flex px-2 py-2  flex-col items-start">
            <h1>Price</h1>
            <div className=" max-w-[100px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
              {itemDetails.total}
              {' '}
              / unit
            </div>
          </div>

          <div className=" flex px-2 py-2  flex-col items-start">
            <h1>Total</h1>
            <div className=" max-w-[100px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
              {itemDetails.total}
            </div>
          </div> */}
        </div>
        <button
          type="button"
          aria-label="delete"
          onClick={() => {
            onDelete(itemDetails.id)
          }}
        >
          <TrashIcon className=" text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default AddItem
