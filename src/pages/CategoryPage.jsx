"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useArticles } from "../context/ArticleContext"
import ArticleCard from "../components/ArticleCard"
import axios from "axios";

const CategoryPage = () => {
  const { categoryId } = useParams()
  const { getArticlesByCategory, getCategoryById } = useArticles()
  const [recentArticles, setRecentArticles] = useState([])
  const [previousArticles, setPreviousArticles] = useState([])
  const [category, setCategory] = useState(null)
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    if (categoryId) {
      const categoryArticles = getArticlesByCategory(categoryId)
      setCategory(getCategoryById(categoryId))

      // Separate articles into recent (last 24 hours) and previous
      const currentDate = new Date()
      const recentArticlesList = categoryArticles.filter(article => {
        const articleDate = new Date(article.createdAt)
        const diffTime = Math.abs(currentDate - articleDate)
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
        return diffHours <= 24
      })
      
      const previousArticlesList = categoryArticles.filter(article => {
        const articleDate = new Date(article.createdAt)
        const diffTime = Math.abs(currentDate - articleDate)
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
        return diffHours > 24
      })

      // Sort articles based on selected option
      sortArticles(recentArticlesList, previousArticlesList, sortBy)
    }
  }, [categoryId, sortBy, getArticlesByCategory, getCategoryById])

  const sortArticles = (recentList, previousList, sortOption) => {
    const sortedRecentArticles = [...recentList]
    const sortedPreviousArticles = [...previousList]

    // Define sort function based on option
    const sortFunction = (a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "most-voted":
          return b.votes - a.votes
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    }

    // Apply sorting
    sortedRecentArticles.sort(sortFunction)
    sortedPreviousArticles.sort(sortFunction)

    setRecentArticles(sortedRecentArticles)
    setPreviousArticles(sortedPreviousArticles)
  }

  if (!category) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="text-5xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
        </motion.div>

        {/* Sort Controls */}
        <div className="mb-8 flex justify-end items-center">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-voted">Most Voted</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Recent Articles (Last 24 Hours) */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Articles (Last 24 Hours)</h2>
          
          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-4">🕒</div>
              <h3 className="text-xl font-medium mb-2">No recent articles</h3>
              <p className="text-gray-600">There are no articles published in the last 24 hours.</p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10"></div>

        {/* Previous Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Previous Articles</h2>
          
          {previousArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {previousArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-medium mb-2">No previous articles</h3>
              <p className="text-gray-600">No articles older than 24 hours were found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage