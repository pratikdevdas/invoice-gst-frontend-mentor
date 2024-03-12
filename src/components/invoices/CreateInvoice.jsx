/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import AddItem from './AddItem'
import invoiceSlice from '../../redux/invoiceSlice'
import { CustomField } from '../utils/Fields'
// import {
//   validateItemCount,
//   validateItemName,
//   validateItemPrice,
// } from '../../functions/createInvoiceValidator'
import { invoiceValidation } from '../../utils/validationSchema'

function CreateInvoice({
  // openCreateInvoice,
  setOpenCreateInvoice,
  // invoice,
  type,
}) {
  const dispatch = useDispatch()

  // const [isFirstLoad, setIsFirstLoad] = useState(true)
  // const [isValidatorActive, setIsValidatorActive] = useState(false)
  // const [isValid, setIsValid] = useState(true)

  const [item, setItem] = useState([])
  const onDelete = (id) => {
    setItem((pervState) => pervState.filter((el) => el.id !== id))
  }

  const handelOnChange = (id, e) => {
    const data = [...item]

    const foundData = data.find((el) => el.id === id)

    if (e.target.name === 'quantity') {
      foundData[e.target.name] = e.target.value
      foundData.total = (
        Number(foundData.quantity) * Number(foundData.price)
      ).toFixed(2)
    } else {
      foundData[e.target.name] = e.target.value
    }

    setItem(data)
  }

  // const onSubmit = () => {
  //   if (type === 'edit') {
  //     dispatch(
  //       invoiceSlice.actions.editInvoice({
  //         description,
  //         paymentTerms,
  //         clientName,
  //         clientEmail,
  //         senderStreet,
  //         senderCity,
  //         senderPostCode,
  //         senderCountry,
  //         clientStreet,
  //         clientCity,
  //         clientPostCode,
  //         clientCountry,
  //         item,
  //         id: invoice.id,
  //       }),
  //     )
  //     setOpenCreateInvoice(false)
  //   } else {
  //     dispatch(
  //       invoiceSlice.actions.addInvoice({
  //         description,
  //         paymentTerms,
  //         clientName,
  //         clientEmail,
  //         senderStreet,
  //         senderCity,
  //         senderPostCode,
  //         senderCountry,
  //         clientStreet,
  //         clientCity,
  //         clientPostCode,
  //         clientCountry,
  //         item,
  //       }),
  //     )
  //     dispatch(invoiceSlice.actions.filterInvoice({ status: filterValue }))
  //   }
  // }

  // if (type === 'edit' && isFirstLoad) {
  //   const updatedItemsArray = invoice.items.map((obj, index) => ({
  //     ...obj,
  //     id: index + 1,
  //   }))

  //   setClientName(invoice.clientName)
  //   setClientCity(invoice.clientAddress.city)
  //   setClientStreet(invoice.clientAddress.street)
  //   setClientPostCode(invoice.clientAddress.postCode)
  //   setClientCountry(invoice.clientAddress.country)
  //   setClientEmail(invoice.clientEmail)
  //   setpaymentTerms(invoice.paymentTerms)
  //   setDescription(invoice.description)
  //   setSenderCity(invoice.senderAddress.city)
  //   setSenderStreet(invoice.senderAddress.street)
  //   setSenderCountry(invoice.senderAddress.country)
  //   setSenderPostCode(invoice.senderAddress.postCode)
  //   setItem(updatedItemsArray)

  //   setIsFirstLoad(false)
  // }

  // function itemsValidator() {
  //   const itemName = item.map((i) => validateItemName(i.name))
  //   const itemCount = item.map((i) => validateItemCount(i.quantity))
  //   const itemPrice = item.map((i) => validateItemPrice(i.price))

  //   const allItemsElement = itemCount.concat(itemPrice, itemName)

  //   return allItemsElement.includes(false) !== true
  // }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setOpenCreateInvoice(false)
      }}
      className="  fixed top-0 bottom-0 left-0 right-0  bg-[#000005be]"
    >
      <motion.div
        key="createInvoice-sidebar"
        initial={{ x: -500, opacity: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 40,
            duration: 0.4,
          },
        }}
        exit={{ x: -700, transition: { duration: 0.2 } }}
        className="  scrollbar-hide flex flex-col dark:text-white dark:bg-[#141625] bg-white  md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl"
      >
        <h1 className=" font-semibold dark:text-white text-3xl">
          {type === 'edit' ? 'Edit' : 'Create'}
          {' '}
          Invoice
        </h1>
        <div className="overflow-y-auto scrollbar-hide">
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
            onSubmit={(values, { setSubmitting }) => {
              console.log(values, 'submitted')
              setTimeout(() => {
                alert(values)
                dispatch(invoiceSlice.actions.addInvoice({ ...values, item }))
                dispatch(invoiceSlice.actions.filterInvoice({ status: '' }))

                console.log(values, 'submitted')
                setOpenCreateInvoice(false)
                setSubmitting(false)
              }, 400)
            }}
          >
            <Form>
              <div className=" overflow-y-scroll scrollbar-hide my-14">
                <h1 className=" text-[#7c5dfa] mb-4 font-medium">Bill From</h1>

                <div className=" grid grid-cols-3 mx-1 gap-x-4  space-y-4 ">
                  <div className=" flex flex-col col-span-3">
                    <label className=" text-gray-400 font-light">
                      Vendor Name
                    </label>
                    <Field
                      name="vendorName"
                      type="text"
                      className="dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg border-gray-300 focus:outline-none  dark:border-gray-800"
                    />
                  </div>

                  <div className=" flex flex-col col-span-1">
                    <label className=" text-gray-400 font-light">Outlet</label>
                    <Field
                      type="text"
                      name="outlet"
                      className="dark:bg-[#1e2139] py-2 px-4 border-[.2px]  rounded-lg   border-gray-300 dark:border-gray-800"
                    />
                  </div>
                  <div className=" flex flex-col col-span-1">
                    <CustomField
                      type="number"
                      name="vendorPostCode"
                      label="Pincode"
                    />
                  </div>
                </div>

                {/* Bill to Section */}

                <h1 className=" text-[#7c5dfa] my-4 mt-10 font-medium">
                  Bill To
                </h1>

                <div className=" grid grid-cols-3 gap-x-4 mx-2 space-y-4 ">
                  <div className=" flex flex-col col-span-3">
                    <CustomField
                      type="text"
                      name="clientName"
                      label="Client Name"
                    />
                  </div>

                  <div className=" flex flex-col col-span-1">
                    <CustomField
                      type="number"
                      name="clientPhone"
                      label="Client Phone"
                    />
                  </div>

                  <div className=" flex flex-col col-span-2">
                    <CustomField
                      type="email"
                      name="clientEmail"
                      label="Client Email"
                    />
                  </div>
                  <div className=" flex flex-col col-span-3">
                    <CustomField
                      type="text"
                      name="clientAddress"
                      label="Client Address"
                    />
                  </div>

                  <div className=" flex flex-col col-span-1">
                    <CustomField
                      type="text"
                      name="clientCity"
                      label="Client City"
                    />
                  </div>
                  <div className=" flex flex-col col-span-1">
                    <CustomField
                      type="number"
                      name="clientPostCode"
                      label="Pincode"
                    />
                  </div>
                </div>

                <h1 className=" text-[#7c5dfa] mt-10 font-medium">
                  Invoice Details
                </h1>
                <div className=" grid mx-1 grid-cols-2 gap-4 mt-2 ">
                  <div className=" flex flex-col col-span-2">
                    <CustomField
                      type="date"
                      name="deliveryDate"
                      label="Delivery Date"
                    />
                  </div>
                  <div className=" flex flex-col col-span-2 ">
                    <CustomField
                      type="text"
                      name="otherDetails"
                      label="Other Details"
                    />
                  </div>
                  <div className=" flex flex-col col-span-1  ">
                    <CustomField
                      type="number"
                      name="advancePayment"
                      label="Advance Payment (₹)"
                    />
                  </div>
                  <div className=" flex flex-col col-span-1  ">
                    <CustomField
                      type="number"
                      name="discount"
                      label="Overall Discount (₹)"
                    />
                  </div>
                </div>

                {/* Item List Section */}

                <h2 className=" text-2xl text-gray-500 mt-10 ">Item List</h2>
                {item.map((itemDetails, index) => (
                  <div className=" border-b pb-2 border-gray-300 mb-4 ">
                    <AddItem
                      // isValidatorActive={isValidatorActive}
                      key={index}
                      handelOnChange={handelOnChange}
                      setItem={setItem}
                      onDelete={onDelete}
                      itemDetails={itemDetails}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setItem((state) => [
                      ...state,
                      {
                        name: '',
                        quantity: 1,
                        price: 0,
                        total: 0,
                        id: uuidv4(),
                      },
                    ])
                  }}
                  className=" bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#252945] justify-center rounded-xl  w-full mt-6"
                >
                  + Add New Item
                </button>
              </div>

              <div className=" flex  justify-between">
                <div>
                  <button
                    onClick={() => {
                      setOpenCreateInvoice(false)
                    }}
                    className=" bg-gray-200  hover:opacity-80 mx-auto py-4 items-center dark:text-white  dark:bg-[#252945] justify-center  px-8 rounded-full "
                  >
                    Discard
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className=" text-white  hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center  px-8 rounded-full "
                  >
                    Save & Send
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateInvoice
