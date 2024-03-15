/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import AddItem from './AddItem'
import orderSlipSlice from '../../redux/orderSlipSlice'
import { CustomField, OutletDropDown } from '../utils/Fields'
import { invoiceValidation } from '../../utils/validationSchema'

function CreateOrders({
  order,
  setOpenCreateOrders,
  type,
}) {
  const dispatch = useDispatch()

  const [items, setItems] = useState(type === 'edit' ? order.items : [])
  const onDelete = (id) => {
    setItems((pervState) => pervState.filter((el) => el.id !== id))
  }

  const handelOnChange = (id, e) => {
    const data = [...items]

    const foundData = data.find((el) => el.id === id)

    if (e.target.name === 'quantity') {
      foundData[e.target.name] = e.target.value
      foundData.total = (
        Number(foundData.quantity) * Number(foundData.price)
      ).toFixed(2)
    } else {
      foundData[e.target.name] = e.target.value
    }

    setItems(data)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setOpenCreateOrders(false)
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
          Order
        </h1>
        <div className="overflow-y-auto scrollbar-hide">
          <Formik
            initialValues={type === 'edit' ? {
              vendorName: order.vendorName,
              outlet: order.outlet,
              clientName: order.clientName,
              clientEmail: order.clientEmail,
              clientPhone: order.clientPhone,
              clientAddress: order.clientAddress,
              clientCity: order.clientCity,
              clientPostCode: order.clientPostCode,
              clientGST: order.clientGST,
              clientBirthDate: order.clientBirthDate,
              deliveryDate: order.deliveryDate,
              advancePayment: order.advancePayment,
              discount: order.discount,
            } : {
              vendorName: 'Asian Optics',
              outlet: 'Golmuri',
              clientName: '',
              clientEmail: '',
              clientPhone: '',
              clientAddress: '',
              clientCity: '',
              clientPostCode: '',
              clientGST: '',
              clientBirthDate: '',
              deliveryDate: '',
              advancePayment: 0,
              discount: 0,
            }}
            validationSchema={invoiceValidation}
            onSubmit={(values, { setSubmitting }) => {
              if (items.length === 0) {
                alert('Please add atleast one items')
                return setSubmitting(false)
              }
              if (type === 'edit') {
                dispatch(orderSlipSlice.actions.editOrder({ ...values, items, id: order.id }))
                dispatch(orderSlipSlice.actions.filterOrder({ status: '' }))
                setOpenCreateOrders(false)
                return setSubmitting(false)
              }
              return setTimeout(() => {
                alert(values)
                dispatch(orderSlipSlice.actions.addOrder({ ...values, items }))
                dispatch(orderSlipSlice.actions.filterOrder({ status: '' }))
                setOpenCreateOrders(false)
                setSubmitting(false)
              }, 400)
            }}
          >
            <Form>
              <div className=" overflow-y-scroll scrollbar-hide mb-6">

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
                  <div className=" flex flex-col col-span-1">
                    <CustomField
                      type="date"
                      name="clientBirthDate"
                      label="DOB"
                    />
                  </div>
                  <div className=" flex flex-col col-span-3">
                    <CustomField
                      type="text"
                      name="clientGST"
                      label="Client GSTIN"
                    />
                  </div>
                </div>

                <h1 className=" text-[#7c5dfa] mt-10 font-medium">
                  Invoice Details
                </h1>
                <div className=" grid mx-1 grid-cols-2 gap-4 mt-2 ">
                  {type === 'edit' ? <div className="hidden" /> : (
                    <div className=" flex flex-col col-span-2">
                      <OutletDropDown name="outlet" label="Outlet" options={['Golmuri', 'Sakchi', 'Global Vision(Titan)']} />
                    </div>
                  )}

                  <div className=" flex flex-col col-span-2">
                    <CustomField
                      type="date"
                      name="deliveryDate"
                      label="Delivery Date"
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

                <h2 className=" text-2xl text-gray-500 mt-10 ">Item List</h2>
                {items.map((itemDetails) => (
                  <div className=" border-b pb-2 border-gray-300 mb-4 ">
                    <AddItem
                      key={itemDetails.id}
                      handelOnChange={handelOnChange}
                      items={items}
                      setItems={setItems}
                      onDelete={onDelete}
                      itemDetails={itemDetails}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setItems((state) => [
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
                    type="button"
                    onClick={() => {
                      setOpenCreateOrders(false)
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

export default CreateOrders
