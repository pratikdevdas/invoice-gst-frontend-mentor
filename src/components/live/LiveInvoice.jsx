/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
// /* eslint-disable */
import { motion } from 'framer-motion'
import { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { TrashIcon } from '@heroicons/react/24/solid'

import { Formik, Form, FieldArray } from 'formik'
import { usePDF } from 'react-to-pdf'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
// import AddItemToLiveInvoice from './AddItemToLiveInvoice'
import { invoiceValidation } from '../../utils/validationSchema'
import { LiveField, LiveNumber } from '../utils/Fields'
import invoiceSlice from '../../redux/invoiceSlice'
// import generateID from '../../functions/generateId'
function LiveInvoice() {
  // const [items, setItems] = useState([])
  const [advance, setAdvance] = useState(0)
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.allProducts)
  // console.log(items)
  return (
    <motion.div
      key="invoice-info"
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={{ x: '200%' }}
      transition={{ duration: 0.5 }}
      className="dark:bg-[#141625] mx-auto duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 max-w-5xl lg:py-[72px] "
    >
      <Formik
        initialValues={{
          vendorName: 'Asian Optics',
          outlet: 'Golmuri',
          vendorPostCode: '831009',
          client: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: 'Jamshedpur',
            pinCode: '',
          },
          id: 'fsfdf',
          invoiceDate: moment().format('YYYY-MM-DD'),
          deliveryDate: '',
          isPaymentCompleted: false,
          isDeliveryDone: false,
          amounts: {
            taxable: 0,
            advancePayment: 0,
            gstAmount: 0,
            totalAmount: 0,
            leftToPay: 0,
          },
          items: [],
          otherDetails: '',
        }}
        validationSchema={invoiceValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values, 'formikValues')
            dispatch(invoiceSlice.actions.addInvoice({ ...values }))
            toPDF()
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ values }) => (
          <Form ref={targetRef}>
            <div className="rounded-lg w-full  px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div>
                <h1 className="text-4xl text-center font-semibold dark:text-[#f8f8fb] py-4">
                  Invoice
                </h1>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-3xl font-semibold dark:text-[#f8f8fb] pt-4 pb-2">
                    Asian Optics
                  </h1>
                  <p className="text-gray-700 dark:text-gray-400">
                    <select
                      name="cars"
                      id="cars"
                      form="carform"
                      className="dark:bg-[#1e2139] cursor-pointer bg-[#f8f8fb] border-0"
                    >
                      <option value="volvo">Golmuri</option>
                      <option value="saab">Mango</option>
                      <option value="opel">Sackchi</option>
                    </select>
                    {/* Golmuri */}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 ">831019</p>
                  <p className="text-gray-700 dark:text-gray-400 ">
                    7979901261
                  </p>
                </div>

                <div className="text-right">
                  <h1 className=" font-semibold dark:text-[#f8f8fb] pt-4">
                    #FE4GE3
                  </h1>
                  <p className="text-gray-800 dark:text-gray-400">14-03-2024</p>
                  <h1 className=" text-[#f8f8fb] text-xl font-medium pt-4">
                    <LiveField
                      type="text"
                      name="clientName"
                      placeholder="Client Name"
                    />
                  </h1>
                  <p className="text-gray-700 dark:text-gray-400 ">
                    <LiveField
                      type="text"
                      name="clientAddress"
                      placeholder="Client Address"
                    />
                  </p>

                  <p className="text-gray-700 dark:text-gray-400 ">
                    {' '}
                    <LiveField
                      type="text"
                      name="clientCity"
                      placeholder="Client City"
                    />
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 ">
                    {' '}
                    <LiveField
                      type="number"
                      name="clientPostCode"
                      placeholder="Client Pincode"
                    />
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 ">
                    {' '}
                    <LiveField
                      type="text"
                      name="clientEmail"
                      placeholder="Client Email"
                    />
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 ">
                    {' '}
                    <LiveField
                      type="number"
                      name="clientPhone"
                      placeholder="Client Phone"
                    />
                  </p>
                </div>
              </div>
              <hr className="mt-8  border-gray-700" />

              <FieldArray name="items">
                {({ remove, push, replace }) => (
                  <div>
                    <table className="w-full border-spacing-y-16">
                      <thead>
                        <tr className="uppercase font-semibold text-gray-700 dark:text-gray-400 text-xs">
                          <th className="py-4">Item Name</th>
                          <th className="py-4">Rate</th>
                          <th className="py-4">Qty</th>
                          <th className="py-4">Disc(̥₹)</th>
                          <th className="py-4">CGST</th>
                          <th className="py-4">SGST</th>
                          <th className="py-4">Taxable</th>
                          <th className="py-4">To Pay</th>
                          <th className="py-4">del</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.items.length > 0
                          && values.items.map((item, index) => {
                            console.log(item, 'item')
                            const total = item.price * item.quantity - item.discount
                            const gst = total
                              - total / (1 + (item.cgst + item.sgst) / 100)
                            const taxable = total - gst
                            const halfGst = gst / 2
                            const amountToPay = total - gst + gst
                            return item.name ? (
                              <tr
                                className="text-center text-white text-sm "
                                key={index}
                              >
                                <td className="te">{item.name}</td>
                                <td className="col">
                                  {/* <label htmlFor={`items.${index}.email`}>Email</label> */}
                                  {item.price}
                                </td>
                                {/* <td className="w-[200px]">{item.name}</td> */}
                                {/* <td>{itemDetails.price}</td> */}
                                <td className="text-center">
                                  <LiveNumber
                                    name={`items.${index}.quantity`}
                                    type="number"
                                    width="12"
                                  />
                                </td>
                                <td className="text-center">
                                  {' '}
                                  <LiveNumber
                                    name={`items.${index}.discount`}
                                    type="number"
                                    width="16"
                                  />
                                </td>
                                <td className="w-28">
                                  {halfGst.toFixed(2)}
                                  (
                                  {item.cgst}
                                  %)
                                </td>
                                <td className="w-28">
                                  {halfGst.toFixed(2)}
                                  (
                                  {item.sgst}
                                  %)
                                </td>
                                <td className="w-24">{taxable.toFixed(2)}</td>
                                <td className="w-24">{amountToPay}</td>
                                <td className="col">
                                  <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => remove(index)}
                                  >
                                    <TrashIcon className=" text-gray-500 shrink hover:text-red-500 cursor-pointer h-6 w-6" />
                                  </button>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td className="relative">
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
                                          (p) => p.productName
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                            || p.specialCode
                                              .toLowerCase()
                                              .includes(input.toLowerCase()),
                                        )
                                        .map((p, i) => (
                                          <li
                                            className="list-none pt-2 py-2 px-4 hover:cursor-pointer  hover:bg-purple-600"
                                            key={i}
                                            onClick={() => replace(index, {
                                              name: p.productName,
                                              price: p.sellingPrice,
                                              specialCode: p.specialCode,
                                              cgst: p.cgst,
                                              sgst: p.sgst,
                                              quantity: 1,
                                              discount: 0,
                                            })}
                                          >
                                            {p ? (
                                              <p className="inline-flex gap-2">
                                                <span>
                                                  {p.productName}
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
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      className=" bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6"
                      onClick={() => {
                        if (values.items.length === 0) {
                          return push({ name: '' })
                        }
                        if (values.items[values.items.length - 1].name === '') {
                          return alert('Please fill the previous item')
                        }
                        return push({ name: '' })
                      }}
                    >
                      + Add New Item
                    </button>
                  </div>
                )}
              </FieldArray>
              <hr className="mt-4 mb-8 border-gray-700" />
              <div className="flex justify-between text-gray-300">
                <div>dkf</div>
                <div className="flex flex-col gap-2">
                  <div>
                    Total Goods Amount :
                    {' '}
                    <span className="font-semibold text-lg text-white">
                      ₹
                      {/* {Number(
                        items.reduce((acc, curr) => acc + curr.taxable, 0),
                      ).toFixed(2)} */}
                    </span>
                  </div>
                  <div>
                    Total GST Amount :
                    {' '}
                    {/* <span className="font-semibold text-white text-lg">
                      ₹
                      {Number(
                        items.reduce((acc, curr) => acc + curr.gst, 0),
                      ).toFixed(2)}
                    </span> */}
                  </div>
                  <div>
                    Advance Payment : ₹
                    <input
                      className="w-16 text-center  dark:bg-[#141625] py-2 px-2 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white"
                      name="quantity"
                      value={advance}
                      type="number"
                      onChange={(e) => {
                        setAdvance(e.target.value)
                      }}
                    />
                    {' '}
                    <span className="font-semibold text-white text-lg" />
                  </div>
                  <div>
                    Total Amount Left :
                    {' '}
                    <span className="font-semibold text-white text-lg">
                      ₹
                      {/* {Number(
                        items.reduce((acc, curr) => acc + curr.amountToPay, 0),
                      ) - advance} */}
                    </span>
                  </div>
                </div>
                {' '}
                {/* {items.reduce((acc, item) => acc + item.amountToPay, 0)} */}
              </div>
            </div>
            <button type="submit">save invoice</button>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
}

export default LiveInvoice
