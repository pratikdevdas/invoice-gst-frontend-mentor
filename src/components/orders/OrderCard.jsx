import { Link } from 'react-router-dom'
import DeliveryStatus from './DeliveryStatus'
import rightArrow from '../../assets/icon-arrow-right.svg'

function OrderCard({ order }) {
  return (
    <Link
      to={`order?${order.customId}`}
    >
      {/* Big Screen  */}
      <div className=" hidden md:flex cursor-pointer duration-100  ease-in-out  hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between">
        <div className=" flex items-center ">
          <h2 className=" dark:text-white ">
            <span className=" text-[#7e88c3]">
              #
            </span>
            {order.customId}
          </h2>

          <h2 className=" text-sm text-gray-400 font-light ml-6">
            Delivery
            {' '}
            {order.deliveryDate}
          </h2>

          <h2 className=" text-sm text-gray-400 font-light ml-10">
            {order.clientName}
          </h2>

        </div>

        <div className="  flex  items-center ">

          <h1 className=" text-xl mr-8  dark:text-white">
            ₹
            {' '}
            {order.total}
          </h1>

          <DeliveryStatus type={order.status} />

          <img src={rightArrow} className=" ml-4" alt="rightArrow" />

        </div>

      </div>

      {/* Phone Screen */}
      <div className=" md:hidden flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between">

        <div className=" flex flex-col">
          <h2 className=" dark:text-white ">
            <span className=" text-[#7e88c3]">
              #
            </span>
            {order.id}
          </h2>

          <h2 className=" text-sm text-gray-400 font-light mt-3 ">
            Due
            {' '}
            {order.paymentDue}
          </h2>
          <h1 className=" text-xl  dark:text-white">
            ₹
            {' '}
            {order.total}
          </h1>
        </div>

        <div className=" flex   flex-col">
          <h2 className=" text-sm mb-4 text-gray-400 font-light  text-right  ">
            {order.clientName}
          </h2>

          <DeliveryStatus type={order.status} />

        </div>
      </div>
    </Link>
  )
}

export default OrderCard
