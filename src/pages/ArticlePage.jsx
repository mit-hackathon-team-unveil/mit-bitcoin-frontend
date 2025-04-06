"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useArticles } from "../context/ArticleContext"
import { useWallet } from "../context/WalletContext"
import { useUser } from "../context/UserContext"
import VoteButtons from "../components/VoteButtons"
import axios from "axios"
// Import the fetchArticleById function
import { fetchArticleById } from "../utils/articleApi"

const ArticlePage = () => {
  const navigate = useNavigate()
  const { articleId } = useParams()
  const { getArticleById, getCategoryById, deleteArticle } = useArticles()
  const { isConnected, walletAddress } = useWallet()
  const { isAdmin } = useUser()
  const [article, setArticle] = useState(null)
  const [category, setCategory] = useState(null)
  const [isAuthor, setIsAuthor] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const REACT_APP_API_URL = "http://localhost:5050"

  useEffect(() => {
    const getArticle = async () => {
      if (!articleId) return
      
      setLoading(true)
      setError(null)
      
      try {
        // First try to fetch from API
        try {
          console.log("Fetching article from API with ID:", articleId)
          const response = await fetchArticleById(articleId)
          console.log("API article response:", response)

          
          // Check for valid article in response - inspect response structure
          const apiArticle = response.article || response;
          
          // More flexible check for article ID in the response
          if (apiArticle && (apiArticle.id || apiArticle._id || apiArticle.articleId)) {
            console.log("Valid article found in API response:", apiArticle);
            
            console.log(apiArticle.categoryId)

            // Normalize the article data to ensure consistency
            const normalizedArticle = {
              id: apiArticle.articleId,
              title: apiArticle.title,
              content: apiArticle.content,
              author: apiArticle.author,
              authorName: apiArticle.authorName,
              categoryId: apiArticle.categoryId,
              category: apiArticle.category,
              imageUrl: apiArticle.imageUrl,
              createdAt: apiArticle.createdAt || new Date().toISOString(),
              updatedAt: apiArticle.updatedAt,
              votes: 0,
              views: 0
            };
            
            setArticle(normalizedArticle)
            
            // Handle category information
            if (apiArticle.category) {
              setCategory(apiArticle.category)
            } else if (apiArticle.categoryId) {
              // If only categoryId, try to get category from context
              setCategory(getCategoryById(apiArticle.categoryId))
            }
            
            // Check if current user is author
            setIsAuthor(isConnected && apiArticle.author === walletAddress)
            setLoading(false)
            return
          } else {
            console.warn("API response doesn't contain a valid article:", response);
            throw new Error("Invalid article data from API");
          }
        } catch (apiError) {
          console.log("API fetch failed, falling back to local data:", apiError)
        }
        
        // Fallback: Try to get from local context
        const localArticle = getArticleById(articleId)
        
        if (localArticle) {
          setArticle(localArticle)
          setCategory(getCategoryById(localArticle.categoryId))
          setIsAuthor(isConnected && localArticle.author === walletAddress)
        } else {
          setError("Article not found")
        }
      } catch (err) {
        console.error("Error loading article:", err)
        setError("Failed to load article. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    
    getArticle()
  }, [articleId, isConnected, walletAddress, getArticleById, getCategoryById])

  const handleDeleteArticle = async () => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      setIsDeleting(true)

      try {
        // Try to delete via API first
        try {
          await axios.delete(`${REACT_APP_API_URL}/api/v1/articles/${articleId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            withCredentials: false
          });
          
          console.log("Article successfully deleted via API");
          navigate("/");
          return;
        } catch (apiError) {
          console.log("API delete failed, falling back to local delete:", apiError)
        }
        
        // Fallback to local deletion
        deleteArticle(articleId)
        navigate("/")
      } catch (err) {
        console.error("Error deleting article:", err)
        alert("Failed to delete article. Please try again.")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center py-12">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
          <Link to="/" className="text-cyan-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="pt-24 pb-16 container mx-auto px-4">
        <div className="text-center py-12">
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-6">
            <p className="font-medium">Article not found</p>
          </div>
          <Link to="/" className="text-cyan-600 hover:underline">Return to Home</Link>
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
                  {article.category}
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
                      {article.author?.slice(0, 6)}...{article.author?.slice(-4)}
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

