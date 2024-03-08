/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import productSlice from '../../redux/productSlice'
// import { v4 as uuidv4 } from 'uuid'
// import AddItem from '../AddItem'
// import invoiceSlice from '../../redux/invoiceSlice'

function AddProduct({ setOpenAddProduct }) {
  const dispatch = useDispatch()

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setOpenAddProduct(false)
      }}
      className="fixed top-0 bottom-0 left-0 right-0  bg-[#000005be]"
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
          {/* {type === 'edit' ? 'Edit' : 'Create'} */}
          {' '}
          Add Product
        </h1>
        <Formik
          initialValues={{
            productName: '',
            description: '',
            specialCode: '',
            sellingPrice: 0,
            defaultDiscount: 0,
            cgst: 0,
            igst: 0,
            sgst: 0,
            hsnCode: '',
            // sku: 0,
          }}
          validationSchema={Yup.object({
            productName: Yup.string()
              .min(5, 'Must be 5 characters or more')
              .required('Required'),
            description: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              dispatch(productSlice.actions.addProduct({ ...values }))
              setSubmitting(false)
            }, 400)
          }}
        >
          <Form>
            <div className=" overflow-y-scroll scrollbar-hide my-7">
              {/* Bill to Section */}

              <h1 className=" text-[#7c5dfa] my-4 mt-10 font-medium">
                Adding a product
              </h1>

              <div className=" grid grid-cols-3 mx-1   space-y-4 ">
                <div className=" flex flex-col col-span-3">
                  <label
                    htmlFor="productName"
                    className=" text-gray-400 font-light"
                  >
                    Product Name
                  </label>
                  <Field
                    type="text"
                    name="productName"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="productName"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
                <div className=" flex flex-col col-span-3">
                  <label
                    htmlFor="description"
                    className=" text-gray-400 font-light"
                  >
                    Description
                  </label>
                  <Field
                    type="text"
                    name="description"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="description"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>

                <div className=" flex flex-col mr-4 col-span-1">
                  <label
                    htmlFor="specialCode"
                    className=" text-gray-400 font-light"
                  >
                    Special Code (if any)
                  </label>
                  <Field
                    type="text"
                    name="specialCode"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="specialCode"
                    className="border-red-500 mt-4  dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <label
                    htmlFor="sellingPrice"
                    className=" text-gray-400 font-light"
                  >
                    Selling Price (incl. tax)
                  </label>
                  <Field
                    type="number"
                    name="sellingPrice"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="sellingPrice"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
                <div className=" flex flex-col col-span-1">
                  <label
                    htmlFor="defaultDiscount"
                    className=" text-gray-400 font-light"
                  >
                    Default Discount %
                  </label>
                  <Field
                    type="number"
                    name="defaultDiscount"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="defaultDisount"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
              </div>

              <h1 className=" text-[#7c5dfa] my-4 mt-10 font-medium">
                Tax Details
              </h1>
              <div className=" grid mx-1 grid-cols-3 mt-4 ">
                <div className=" flex flex-col mr-4 col-span-1">
                  <label
                    htmlFor="cgst"
                    className=" text-gray-400 font-light"
                  >
                    CGST %
                  </label>
                  <Field
                    type="number"
                    name="cgst"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="cgst"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <label
                    htmlFor="sgst"
                    className=" text-gray-400 font-light"
                  >
                    SGST %
                  </label>
                  <Field
                    type="number"
                    name="sgst"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="sgst"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <label
                    htmlFor="igst"
                    className=" text-gray-400 font-light"
                  >
                    IGST %
                  </label>
                  <Field
                    type="number"
                    name="igst"
                    className=" dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none   dark:border-gray-800"
                  />
                  <ErrorMessage
                    name="igst"
                    className="border-red-500 dark:border-red-500 outline-red-500 border-2"
                  />
                </div>
              </div>
            </div>

            <div className=" flex  justify-between">
              <div>
                <button
                  onClick={() => {
                    setOpenAddProduct(false)
                  }}
                  className=" bg-gray-200  hover:opacity-80 mx-auto py-4 items-center dark:text-white  dark:bg-[#252945] justify-center  px-8 rounded-full "
                >
                  Discard
                </button>
              </div>

              <div>
                <button type="submit" className=" text-white  hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center  px-8 rounded-full ">
                  Save Item
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </motion.div>
    </div>
  )
}

export default AddProduct
