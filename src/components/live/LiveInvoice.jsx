/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Formik, Form } from 'formik'
import { usePDF } from 'react-to-pdf'
import AddItemToLiveInvoice from './AddItemToLiveInvoice'
import { invoiceValidation } from '../../utils/validationSchema'
import { LiveField } from '../utils/Fields'

function LiveInvoice() {
  const [items, setItems] = useState([])
  const [advance, setAdvance] = useState(0)
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' })
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
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          clientAddress: '',
          clientCity: '',
          clientPostCode: '',
          invoiceDate: '',
          deliveryDate: '',
          otherDetails: '',
          advancePayment: 0,
        }}
        validationSchema={invoiceValidation}

      >
        <Form>
          <div ref={targetRef} className="rounded-lg w-full  px-6 py-6 bg-white dark:bg-[#1e2139]">
            <div>
              <h1 className="text-4xl text-center font-semibold text-[#f8f8fb] py-4">
                Invoice
              </h1>
            </div>
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-[#f8f8fb] pt-4 pb-2">
                  Asian Optics
                </h1>
                <p className="text-gray-400">
                  Golmuri
                </p>
                <p className="text-gray-400 ">
                  831019
                </p>
                <p className="text-gray-400 ">
                  7979901261
                </p>
              </div>

              <div className="text-right">
                <h1 className=" font-semibold text-[#f8f8fb] pt-4">
                  #FE4GE3
                </h1>
                <p className="text-gray-400">14-03-2024</p>
                <h1 className=" text-[#f8f8fb] text-xl font-medium pt-4">
                  <LiveField
                    type="text"
                    name="clientName"
                    placeholder="Client Name"
                  />
                </h1>
                <p className="text-gray-400 ">
                  <LiveField
                    type="text"
                    name="clientAddress"
                    placeholder="Client Address"
                  />
                </p>

                <p className="text-gray-400 ">
                  {' '}
                  <LiveField
                    type="text"
                    name="clientCity"
                    placeholder="Client City"
                  />
                </p>
                <p className="text-gray-400 ">
                  {' '}
                  <LiveField
                    type="text"
                    name="clientEmail"
                    placeholder="Client Email"
                  />
                </p>
                <p className="text-gray-400 ">
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

            <table className="w-full">
              <thead>
                <tr className="uppercase font-semibold text-gray-400 text-xs">
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

                {items.map((itemDetails, index) => (
                  <AddItemToLiveInvoice
                    // isValidatorActive={isValidatorActive}
                    key={index}
                    // handelOnChange={handelOnChange}
                    items={items}
                    setItems={setItems}
                    // onDelete={onDelete}
                    itemDetails={itemDetails}
                  />
                ))}

              </tbody>
              {/* {values.items.length > 0
              && <tbody>{values.items.map(() => <AddItemToLiveInvoice />)}</tbody>} */}
            </table>
            <button
              type="button"
              onClick={() => {
                if (items.length === 0) {
                  return setItems([{ id: uuidv4(), name: '' }])
                }
                if (items[items.length - 1].name === '') {
                  return alert('Please fill the previous item')
                }
                return setItems([...items, { id: uuidv4(), name: '' }])
              }}
              className=" bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6"
            >
              + Add New Item
            </button>
            <hr className="mt-4 mb-8 border-gray-700" />

            <div className="flex justify-between text-gray-300">
              <div>dkf</div>
              <div className="flex flex-col gap-2">
                <div>
                  Total Goods Amount :
                  {' '}
                  <span className="font-semibold text-lg text-white">
                    ₹
                    {Number(items.reduce((acc, curr) => acc + curr.taxable, 0)).toFixed(2)}
                  </span>
                </div>
                <div>
                  Total GST Amount :
                  {' '}
                  <span className="font-semibold text-white text-lg">
                    ₹
                    {Number(items.reduce((acc, curr) => acc + curr.gst, 0)).toFixed(2)}
                  </span>
                </div>
                <div>
                  Advance Payment :
                  {' '}
                  ₹
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
                  Total Amount Left  :
                  {' '}
                  <span className="font-semibold text-white text-lg">
                    ₹
                    {Number(items.reduce((acc, curr) => acc + curr.amountToPay, 0)) - advance}
                  </span>
                </div>
              </div>

            </div>
          </div>
          <button type="button" onClick={() => toPDF()}>save invoice</button>
        </Form>
      </Formik>
    </motion.div>
  )
}

export default LiveInvoice
