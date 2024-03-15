/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import arrowDown from '../../assets/icon-arrow-down.svg'
import plus from '../../assets/plus.png'
import OrderCard from './OrderCard'
import orderSlipSlice from '../../redux/orderSlipSlice'
import CreateOrders from './CreateOrders'
import Header from '../Header'

function Center() {
  const location = useLocation()
  const controls = useAnimation()
  const dispatch = useDispatch()
  const filter = ['delivered', 'pending']
  const [isDropdown, setIsDropdown] = useState(false)
  const [openCreateOrders, setOpenCreateOrders] = useState(false)

  const [filterValue, setfilterValue] = useState('')

  const orders = useSelector((state) => state.orders.filteredOrder)

  useEffect(() => {
    dispatch(orderSlipSlice.actions.filterOrder({ status: filterValue }))
  }, [filterValue, dispatch])

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    })
  }, [controls])

  const transition = {
    stiffness: 200,
  }

  const varients = {
    open: {
      opacity: 1,
      x: -20,
      duration: 200,
      transition,
    },
    close: {
      opacity: 0,
      x: -100,
      duration: 500,
      transition,
    },
  }

  return (
    <div>
      <Header />
      <div className="dark:bg-[#141625] scrollbar-hide duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]  ">
        <motion.div
          key={location.pathname}
          initial={{ x: '0' }}
          animate={{ x: 0 }}
          exit={{ x: '-150%' }}
          transition={{ duration: 0.5 }}
          className="   max-w-3xl flex flex-col   mx-auto my-auto"
        >
          {/* Center Header */}

          <div className=" min-w-full max-h-[64px] flex items-center justify-between">
            <div>
              <h1 className=" lg:text-4xl md:text-2xl  text-xl  dark:text-white tracking-wide font-semibold">
                Order Slips
              </h1>
              <p className=" text-gray-500 font-light">
                There are
                {orders.length}
                {' '}
                total orders.
              </p>
            </div>

            <div className=" flex  max-h-full  items-center ">
              <div className=" flex items-center">
                <p className=" hidden md:block dark:text-white font-medium">
                  Filter by status
                </p>
                <p className="  md:hidden dark:text-white font-medium">
                  Filter
                </p>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                 jsx-a11y/control-has-associated-label, jsx-a11y/interactive-supports-focus */}
                <div
                  role="button"
                  onClick={() => {
                    setIsDropdown((state) => !state)
                  }}
                  className=" cursor-pointer ml-3 "
                >
                  <motion.img
                    src={arrowDown}
                    animate={
                      isDropdown
                        ? { transition, rotate: -180 }
                        : { transition, rotate: 0 }
                    }
                  />
                </div>
              </div>
              {isDropdown && (
                <motion.div
                  as="select"
                  variants={varients}
                  animate={isDropdown ? 'open' : 'close'}
                  className="  w-40 bg-white dark:bg-[#1E2139] dark:text-white flex px-6 py-4 flex-col  top-[160px] lg:top-[120px]  absolute  shadow-2xl rounded-xl space-y-2    "
                >
                  {filter.map((item, i) => (
                    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                    <div
                      role="button"
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      onClick={() => {
                        // eslint-disable-next-line no-unused-expressions
                        item === filterValue
                          ? setfilterValue('')
                          : setfilterValue(item)
                      }}
                      className=" items-center cursor-pointer flex space-x-2 "
                    >
                      <input
                        value={item}
                        checked={filterValue === item}
                        type="checkbox"
                        className=" accent-[#7c5dfa] hover:accent-[#7c5dfa] "
                      />
                      <p>{item}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => setOpenCreateOrders(true)}
                className=" hover:opacity-80 ml-4 md:ml-10 flex items-center py-2 px-2 md:space-x-3 space-x-2 bg-[#7c5dfa] rounded-full"
              >
                <img src={plus} alt="" />
                <p className=" md:block hidden text-white font-semibold text-lg">
                  New order
                </p>
                <p className=" md:hidden block text-white font-semibold text-base">
                  New
                </p>
              </button>
            </div>
          </div>

          {/* Invoice Cards */}

          <div className=" mt-10   space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.customId}
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2 },
                }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <OrderCard order={order} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {openCreateOrders && (
          <CreateOrders
            openCreateOrders={openCreateOrders}
            setOpenCreateOrders={setOpenCreateOrders}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Center
