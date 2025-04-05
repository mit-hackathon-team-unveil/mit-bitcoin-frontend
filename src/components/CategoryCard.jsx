"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const CategoryCard = ({ category }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-md overflow-hidden">
      <Link to={`/category/${category.id}`} className="block h-full">
        <div className="p-6 flex flex-col items-center text-center">
          <span className="text-5xl mb-4">{category.icon}</span>
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard