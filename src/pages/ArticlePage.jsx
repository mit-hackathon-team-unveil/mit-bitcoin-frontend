"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useArticles } from "../context/ArticleContext"
import { useWallet } from "../context/WalletContext"
import { useUser } from "../context/UserContext"
import VoteButtons from "../components/VoteButtons"
import axios from "axios";

const ArticlePage = () => {
  const { articleId } = useParams()
  const { getArticleById, getCategoryById, deleteArticle } = useArticles()
  const { isConnected, walletAddress } = useWallet()
  const { isAdmin } = useUser()
  const [article, setArticle] = useState(null)
  const [category, setCategory] = useState(null)
  const [isAuthor, setIsAuthor] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (articleId) {
      const fetchedArticle = getArticleById(articleId)
      setArticle(fetchedArticle)

      if (fetchedArticle) {
        setCategory(getCategoryById(fetchedArticle.categoryId))
        setIsAuthor(isConnected && fetchedArticle.author === walletAddress)
      }
    }
  }, [articleId, isConnected, walletAddress])

  const handleDeleteArticle = () => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      setIsDeleting(true)

      // Simulate deletion delay
      setTimeout(() => {
        deleteArticle(articleId)
        window.location.href = "/"
      }, 1000)
    }
  }

  if (!article) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Link
                  to={`/category/${article.categoryId}`}
                  className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium hover:bg-cyan-200 transition-colors"
                >
                  {category?.name || article.categoryId.toUpperCase()}
                </Link>
                <span className="text-gray-500 text-sm">
                  {new Date(article.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 mr-3">
                    {article.authorName?.charAt(0) || "A"}
                  </div>
                  <div>
                    <p className="font-medium">{article.authorName || "Anonymous"}</p>
                    <p className="text-sm text-gray-500">
                      {article.author.slice(0, 6)}...{article.author.slice(-4)}
                    </p>
                  </div>
                </div>

                {(isAuthor || isAdmin) && (
                  <div className="flex space-x-2">
                    {isAuthor && (
                      <Link
                        to={`/publish?edit=${article.id}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </Link>
                    )}
                    <button
                      onClick={handleDeleteArticle}
                      disabled={isDeleting}
                      className={`px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors ${
                        isDeleting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <img src={article.imageUrl || "/placeholder.svg"} alt={article.title} className="w-full h-auto" />
            </div>

            {/* Article Content and Voting */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-16 order-2 md:order-1">
                <div className="md:sticky md:top-24">
                  <VoteButtons article={article} />
                </div>
              </div>

              <div className="flex-1 order-1 md:order-2">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage

