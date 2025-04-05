"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const ArticleCard = ({ article }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="card h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</span>
          <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium">
            {article.categoryId.toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">By {article.authorName}</span>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-pink-500 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="text-sm font-medium">{article.votes}</span>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Link
          to={`/article/${article.id}`}
          className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center rounded-lg transition-colors"
        >
          Read Article
        </Link>
      </div>
    </motion.div>
  )
}

export default ArticleCard

