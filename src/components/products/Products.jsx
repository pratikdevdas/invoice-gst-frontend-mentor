import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AddProduct from './AddProduct'
import ProductList from './ProductList'
import plus from '../../assets/plus.png'

function Product() {
  const [openAddProduct, setOpenAddProduct] = useState(false)
  const products = useSelector((state) => state.products.allProducts)
  const location = useLocation()
  console.log(location)
  return (
    <div className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] pb-8 px-2 md:px-8 lg:px-12 lg:pb-[72px]  ">
      <motion.div
        key="sfdd"
        initial={{ x: '0' }}
        animate={{ x: 0 }}
        exit={{ x: '-150%' }}
        transition={{ duration: 0.5 }}
        className="   max-w-3xl flex flex-col   mx-auto my-auto"
      />

      <div className="max-w-3xl lg:py-[72px]  text-white flex flex-col mx-auto my-auto text">
        <div className=" min-w-full max-h-[64px] flex items-center justify-between">
          <div>
            <h1 className=" lg:text-4xl md:text-2xl  text-xl  dark:text-white tracking-wide font-semibold">
              Products
            </h1>
            <p className=" text-gray-500 font-light">
              There are
              <span className="mx-1">{products.length}</span>
              total Products.
            </p>
          </div>

          <div className=" flex  max-h-full  items-center ">
            <div className=" flex items-center">
              <p className=" hidden md:block dark:text-white font-medium">
                Filter by status
              </p>
              <p className="  md:hidden dark:text-white font-medium">Filter</p>
            </div>
            <button
              type="button"
              onClick={() => setOpenAddProduct(true)}
              className=" hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full"
            >
              <img src={plus} alt="plus " />
              <p className=" md:block hidden text-white font-semibold text-lg">
                Add Product
              </p>
              <p className=" md:hidden block text-white font-semibold text-base">
                New
              </p>
            </button>
          </div>
        </div>

        <ProductList products={products} />
        <AnimatePresence>
          {openAddProduct && (
            <AddProduct
              openAddProduct={openAddProduct}
              setOpenAddProduct={setOpenAddProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Product
