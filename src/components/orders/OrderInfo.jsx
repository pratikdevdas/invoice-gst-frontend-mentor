import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import leftArrow from '../../assets/icon-arrow-left.svg'
import DeliveryStatus from './DeliveryStatus'
import orderSlipSlice from '../../redux/orderSlipSlice'
import formatDate from '../../functions/formatDate'
import DeleteModal from './DeleteModal'
import CreateOrders from './CreateOrders'

function OrderInfo({ onDelete }) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const orderId = location.search.substring(1)
  const markDelivered = () => {
    dispatch(
      orderSlipSlice.actions.updateOrderStatus({
        id: orderId,
        status: 'delivered',
      }),
    )
    dispatch(orderSlipSlice.actions.getOrderById({ id: orderId }))
  }

  useEffect(() => {
    dispatch(orderSlipSlice.actions.getOrderById({ id: orderId }))
  }, [orderId, markDelivered])

  const onDeleteButtonClick = () => {
    navigate('/dashboard')
    setIsDeleteModalOpen(false)
    onDelete(orderId)
  }

  const order = useSelector((state) => state.orders.orderById)

  return (
    <div>
      {order ? (
        <motion.div
          key="order-info"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '200%' }}
          transition={{ duration: 0.5 }}
          className="dark:bg-[#141625] mx-auto duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px] "
        >
          <div className="">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className=" flex items-center space-x-4  group  dark:text-white font-thin "
            >
              <img className="" src={leftArrow} alt="left-arrow" />
              <p className=" group-hover:opacity-80">Go back</p>
            </button>

            <div className=" mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div className=" flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
                <DeliveryStatus type={order.status} />
              </div>
              <div className=" md:block hidden">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(true)}
                  className=" text-[#7e88c3] text-center dark:bg-[#252945] hover:opacity-80  bg-slate-100 p-3 px-7 rounded-full "
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className=" ml-3 text-center dark:bg-[#252945] text-[#7e88c3] bg-slate-100 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  Create Invoice
                </button>
                {order.status === 'pending' && (
                  <button
                    type="button"
                    onClick={markDelivered}
                    className=" ml-3 text-center  text-white bg-[#7c5dfa] hover:opacity-80 p-3 px-7 rounded-full"
                  >
                    Make as Delivered
                  </button>
                )}
              </div>
            </div>

            <div className=" mt-4 rounded-lg w-full  px-6 py-6 bg-white dark:bg-[#1e2139]">
              <div className=" flex flex-col md:flex-row items-start justify-between w-full ">
                <div className=" mt-4 md:mt-0 text-left text-gray-400 text-sm md:text-right flex flex-col items-center">
                  <h1 className=" font-semibold dark:text-white text-lg">
                    {order.vendorName}
                  </h1>
                  <p>{order.outlet}</p>
                </div>
                <div>
                  <h1 className=" font-semibold dark:text-white text-lg">
                    <span className="text-[#7e88c3]">#</span>
                    {order.customId}
                  </h1>
                  <p className=" text-sm text-gray-500">{order.clientName}</p>
                </div>

              </div>

              <div className=" mt-10 grid grid-cols-2 w-full  md:grid-cols-3">
                <div className=" flex flex-col justify-between">
                  <div>
                    <h3 className=" text-gray-400 font-thin ">Order Date</h3>
                    <h1 className=" text-lg font-semibold dark:text-white">
                      {formatDate(order.createdAt)}
                    </h1>
                  </div>
                  <div>
                    <h3 className=" text-gray-400 font-thin ">Delivery Date</h3>
                    <h1 className=" dark:text-white text-lg font-semibold">
                      {formatDate(order.deliveryDate)}
                    </h1>
                  </div>
                </div>

                <div className="">
                  <p className=" text-gray-400 font-thin">Bill to</p>
                  <h1 className=" dark:text-white text-lg font-semibold">
                    {order.clientName}
                  </h1>
                  <p className=" text-gray-400 font-thin">
                    {order.clientAddress}
                  </p>
                  <p className=" text-gray-400 font-thin">
                    {order.clientCity}
                  </p>
                </div>

                <div className=" mt-8 md:mt-0">
                  <p className=" text-gray-400 font-thin">Send to</p>
                  <h1 className=" dark:text-white">
                    {order.clientPhone}
                    <br />
                    {order?.clientEmail }
                  </h1>
                  <div className="flex gap-2 items-start">

                    <button
                      type="button"
                      onClick={() => {
                        console.log('send invoice')
                      }}
                      className=" text-center  text-sm text-white bg-[#786aaf] hover:opacity-80 p-0.5 px-1 rounded-md"
                    >
                      Send Order
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('send invoice')
                      }}
                      className=" text-center  text-sm text-white bg-[#786aaf] hover:opacity-80 p-0.5 px-1 rounded-md"
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>

              {/*
              <div className=" sm:hidden mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4  p-10">
                {order.items.map((item) => (
                  <div className=" justify-between text-lg dark:text-white flex">
                    <h1>{item.name}</h1>
                    <h1>
                      ₹
                      {item.total}
                    </h1>
                  </div>
                ))}
              </div> */}

              <div className=" hidden sm:block mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4  p-10">
                {order.items.map((item) => (
                  <div key={item.name} className=" flex justify-around  ">
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Item name</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        {item.name}
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Qty.</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        {item.quantity}
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Item price</p>

                      <h1 className=" dark:text-white text-base font-semibold">
                        ₹
                        {item.price}
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">GST</p>

                      <h1 className=" dark:text-white text-base font-semibold">

                        18%
                      </h1>
                    </div>
                    <div className=" space-y-4">
                      <p className=" text-gray-400 font-thin">Total</p>
                      <h1 className=" dark:text-white text-base font-semibold">
                        ₹
                        {item.total}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
              <div className="print:bg-red-700 p-10 font-semibold text-white rounded-lg rounded-t-none justify-between w-full flex flex-col dark:bg-black bg-gray-700 ">
                <div className="w-full flex items-center justify-between">

                  <h3 className=" text-lg ">Amount Total</h3>

                  <h3 className=" text-lg">
                    ₹
                    {order.total}
                  </h3>
                </div>
                <div className="w-full flex items-center justify-between">

                  <h3 className=" text-lg ">Advance Paid</h3>

                  <h3 className=" text-lg">
                    ₹
                    {order.advancePayment}
                  </h3>
                </div>
                <div className="w-full flex items-center justify-between">

                  <h3 className=" text-lg ">Discount</h3>

                  <h3 className=" text-lg">
                    ₹
                    {order.discount}
                  </h3>
                </div>
                <div className="w-full flex items-center justify-between">

                  <h3 className=" text-lg ">Balance</h3>

                  <h3 className=" text-lg">
                    ₹
                    {order.leftToPay}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <>loading</>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteButtonClick={onDeleteButtonClick}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          orderId={order.id}
        />
      )}
      <AnimatePresence>
        {isEditOpen && (
          <CreateOrders
            order={order}
            type="edit"
            setOpenCreateOrders={setIsEditOpen}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default OrderInfo
