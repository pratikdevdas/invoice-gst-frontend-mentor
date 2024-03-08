/* eslint-disable max-len */
import { motion } from 'framer-motion'
// import { useLocation } from 'react-router-dom'
import ProductCard from './ProductCard'

function ProductList({ products }) {
  // const location = useLocation()
  return (

    <div className=" mt-10   space-y-4">
      {products.map((product, index) => (
        <motion.div
          key={product.name}
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.2 },
          }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}

export default ProductList
