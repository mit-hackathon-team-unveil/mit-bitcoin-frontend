"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../context/WalletContext"
import { useUser } from "../context/UserContext"
import { useArticles } from "../context/ArticleContext"
import ConnectWalletPrompt from "../components/ConnectWalletPrompt"

const AdminDashboard = () => {
  const { isConnected } = useWallet()
  const { isAdmin } = useUser()
  const { articles, categories, deleteArticle } = useArticles()
  const [filteredArticles, setFilteredArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState({})

  useEffect(() => {
    filterArticles()
  }, [articles, selectedCategory, searchTerm])

  const filterArticles = () => {
    let filtered = [...articles]

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.categoryId === selectedCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (article) => article.title.toLowerCase().includes(term) || article.content.toLowerCase().includes(term),
      )
    }

    // Sort by newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    setFilteredArticles(filtered)
  }

  const handleDeleteArticle = (articleId) => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      setIsDeleting((prev) => ({ ...prev, [articleId]: true }))

      // Simulate deletion delay
      setTimeout(() => {
        deleteArticle(articleId)
        setIsDeleting((prev) => ({ ...prev, [articleId]: false }))
      }, 1000)
    }
  }

  if (!isConnected) {
    return <ConnectWalletPrompt message="Connect your wallet to access the admin dashboard" />
  }

  if (!isAdmin) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-md mx-auto text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin dashboard.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
            <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Back to Site
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">Total Articles</h3>
              <p className="text-3xl font-bold">{articles.length}</p>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">Categories</h3>
              <p className="text-3xl font-bold">{categories.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-medium mb-2">Total Votes</h3>
              <p className="text-3xl font-bold">
                {articles.reduce((total, article) => total + article.userVotes.length, 0)}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Articles Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Votes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            <Link to={`/article/${article.id}`} className="hover:text-cyan-600 transition-colors">
                              {article.title.length > 50 ? article.title.substring(0, 50) + "..." : article.title}
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{article.authorName || "Anonymous"}</div>
                          <div className="text-xs text-gray-400">
                            {article.author.slice(0, 6)}...{article.author.slice(-4)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                            {categories.find((c) => c.id === article.categoryId)?.name || article.categoryId}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.votes}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/article/${article.id}`} className="text-cyan-600 hover:text-cyan-900 mr-4">
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            disabled={isDeleting[article.id]}
                            className={`text-red-600 hover:text-red-900 ${
                              isDeleting[article.id] ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {isDeleting[article.id] ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No articles found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard

