/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable */
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { TrashIcon } from '@heroicons/react/24/solid'

function AddItemToLiveInvoice({ items, setItems, itemDetails }) {
  const products = useSelector((state) => state.products.allProducts)
  const [input, setInput] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [viewQuantity, setViewQuantity] = useState(true)
  const [viewDiscount, setViewDiscount] = useState(true)

  const total = itemDetails.price * quantity - discount
  const gst = total - total / (1 + (itemDetails.cgst + itemDetails.sgst) / 100)
  const taxable = total - gst
  const halfGst = gst / 2
  const amountToPay = total - gst + gst

  const onDelete = (id) => {
    setItems((pervState) => pervState.filter((el) => el.id !== id))
  }

  return (
    <tr className="w-full relative text-center text-white text-sm ">
      {!itemDetails.name ? (
        <td>
          <input
            name="Search"
            required
            onChange={(e) => {
              setInput(e.currentTarget.value)
            }}
            value={input}
            type="text"
            className="dark:bg-[#141625]  text-white w-full col-span-1 py-2 px-4 border-[.2px] border-b-0  rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800"
            placeholder="Search with brandName or special code"
          />
          <ul className="cols-span-1 absolute dark:bg-[#1e2139] rounded-b-lg top-12 border-gray-300 dark:border-gray-800 dark:text-white ">
            {input
              && products
                .filter(
                  (p) => p.productName.toLowerCase().includes(input.toLowerCase())
                    || p.specialCode.toLowerCase().includes(input.toLowerCase()),
                )
                .map((p, i) => (
                  <li
                    className="list-none pt-2 py-2 px-4 hover:cursor-pointer  hover:bg-purple-600"
                    key={i}
                    onClick={() => {
                      setItems((state) => state.map((item) => (item.id === itemDetails.id
                        ? {
                          ...item,
                          name: p.productName,
                          price: p.sellingPrice,
                          specialCode: p.specialCode,
                          cgst: p.cgst,
                          sgst: p.sgst,
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
                    ) : (
                      'No product with this name'
                    )}
                  </li>
                ))}
          </ul>
        </td>
      ) : (
        <>
          <td className="w-[200px]">{itemDetails.name}</td>
          <td>{itemDetails.price}</td>
          <td className="text-center">
            {viewQuantity ? (
              <input
                className="w-12 text-center  dark:bg-[#141625] py-2 px-2 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value)
                }}
                onBlur={() => {
                  setItems(
                    items.map((i) => (i.id === itemDetails.id
                      ? {
                        ...i,
                        quantity,
                        discount,
                        taxable,
                        gst,
                        amountToPay,
                      }
                      : i)),
                  )
                  setViewQuantity(false)
                }}
                placeholder={0}
                required
              />
            ) : (
              <span>{quantity}</span>
            )}
          </td>
          <td className="text-center">
            {' '}
            {viewDiscount ? (
              <input
                className="w-16 text-center  dark:bg-[#141625] py-2 px-2 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
                name="quantity"
                value={discount}
                type="number"
                onChange={(e) => {
                  setDiscount(e.target.value)
                }}
                onBlur={() => {
                  setItems(
                    items.map((i) => (i.id === itemDetails.id
                      ? {
                        ...i,
                        quantity,
                        discount,
                        taxable,
                        gst,
                        amountToPay,
                      }
                      : i)),
                  )
                  setViewDiscount(false)
                }}
                placeholder="0"
                required
              />
            ) : (
              <span>{discount}</span>
            )}
          </td>
          <td className="w-28">
            {halfGst.toFixed(2)}
            (
            {itemDetails.cgst}
            %)
          </td>
          <td className="w-28">
            {halfGst.toFixed(2)}
            (
            {itemDetails.sgst}
            %)
          </td>
          <td className="w-24">{taxable.toFixed(2)}</td>
          <td className="w-24">{amountToPay}</td>
          <td>
            {' '}
            <button
              type="button"
              aria-label="delete"
              onClick={() => {
                onDelete(itemDetails.id)
              }}
            >
              <TrashIcon className=" text-gray-500 shrink hover:text-red-500 cursor-pointer h-6 w-6" />
            </button>
          </td>
        </>
      )}
    </tr>
  )
}

export default AddItemToLiveInvoice
