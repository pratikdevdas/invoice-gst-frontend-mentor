/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import { TrashIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { useState } from 'react'
// import productSlice from '../../redux/productSlice'

function AddItem({
  itemDetails, onDelete, setItems,
}) {
  const products = useSelector((state) => state.products.allProducts)
  const [input, setInput] = useState('')
  const [quantity, setQuantity] = useState(itemDetails.quantity || 1)
  // let product
  return (
    <div className="flex dark:text-white justify-between items-center">
      <div className="grow flex px-2 py-2  flex-col">
        {itemDetails.name !== '' ? (
          <div className="flex">
            <div className=" flex px-2 py-2  flex-col items-start">
              <h1>Item Name</h1>
              <div className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                {itemDetails.name}
              </div>
            </div>
            <div className=" flex px-2 py-2  flex-col items-start">
              <h1>Selling Price</h1>
              <div className="print:bg-red dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                {itemDetails.price}
              </div>
            </div>
            <div className=" flex px-2 py-2  flex-col items-start">
              <h1>GST</h1>
              <div className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white">
                {itemDetails.gst}
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
                  setItems((state) => state.map((item) => (item.id === itemDetails.id
                    ? { ...item, quantity: e.target.value, total: e.target.value * itemDetails.price }
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
                {quantity * itemDetails.price}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <input
              name="Search"
              onChange={(e) => {
                setInput(e.currentTarget.value)
              }}
              value={input}
              type="text"
              className="dark:bg-[#1e2139] w-full my-auto col-span-1 py-2 px-4 border-[.2px] border-b-0  rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
              placeholder="Search From your product or inventory"
            />
            {input
                    && products
                      .filter((p) => p.productName
                        .toLowerCase()
                        .includes(input.toLowerCase()))
                      .map((p) => (
                        <li
                          className="list-none mt-1 pt-2 py-2 px-4 hover:cursor-pointer  hover:bg-purple-600"
                          key={p.id}
                          onClick={() => {
                            setItems((state) => state.map((item) => (item.id === itemDetails.id
                              ? {
                                ...item,
                                name: p.productName,
                                price: p.sellingPrice,
                                total: p.sellingPrice * item.quantity,
                                gst: p.igst + p.cgst + p.sgst,
                                specialCode: p.specialCode,
                              }
                              : item)))
                          }}
                        >
                          {p ? (
                            <p className="inline-flex gap-2">
                              <span>
                                {p.productName}
                                {' '}
                                ,
                              </span>
                              <span>{p.specialCode}</span>
                              <span>
                                , ₹
                                {p.sellingPrice}
                              </span>
                            </p>
                          ) : 'No product with this name'}
                        </li>
                      ))}
          </div>
        )}
      </div>
      <button
        type="button"
        aria-label="delete"
        onClick={() => {
          onDelete(itemDetails.id)
        }}
      >
        <TrashIcon className=" text-gray-500 shrink hover:text-red-500 cursor-pointer h-6 w-6" />
      </button>
    </div>
  )
}

export default AddItem
