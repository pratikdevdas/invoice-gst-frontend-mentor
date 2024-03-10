/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useState } from 'react'
import { motion } from 'framer-motion'
import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import productSlice from '../../redux/productSlice'
import { CustomField } from '../utils/Fields'
import { productValidation } from '../../utils/validationSchema'
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
            hsnCode: '',
            defaultDiscount: 0,
            cgst: 0,
            igst: 0,
            sgst: 0,
            // sku: 0,
          }}
          validationSchema={productValidation}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(productSlice.actions.addProduct({ ...values }))
              setSubmitting(false)
            }, 400)
            setOpenAddProduct(false)
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
                  <CustomField
                    type="text"
                    name="productName"
                    label="Product Name"
                  />
                </div>
                <div className=" flex flex-col col-span-3">
                  <div className=" flex flex-col col-span-3">
                    <CustomField
                      type="text"
                      name="description"
                      label="Description"
                    />
                  </div>
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField
                    type="text"
                    name="specialCode"
                    label="Special Code"
                  />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField type="text" name="hsnCode" label="HSN Code" />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField
                    type="number"
                    name="sellingPrice"
                    label="Selling Price (₹)"
                  />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField
                    type="number"
                    name="defaultDiscount"
                    label="Discount %"
                  />
                </div>
              </div>

              <h1 className=" text-[#7c5dfa] my-4 mt-10 font-medium">
                Tax Details
              </h1>
              <div className=" grid mx-1 grid-cols-3 mt-4 ">
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField type="number" name="cgst" label="CGST %" />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField type="number" name="sgst" label="SGST %" />
                </div>
                <div className=" flex flex-col mr-4 col-span-1">
                  <CustomField type="number" name="igst" label="IGST %" />
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
                <button
                  type="submit"
                  className=" text-white  hover:opacity-80 mx-auto py-4 items-center bg-[#7c5dfa] justify-center  px-8 rounded-full "
                >
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
