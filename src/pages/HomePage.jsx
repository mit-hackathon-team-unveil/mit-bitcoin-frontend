"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useArticles } from "../context/ArticleContext"
import { fetchAllArticles } from "../utils/articleApi"

const HomePage = () => {
  const { articles: localArticles, categories } = useArticles()
  const [articles, setArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Try to fetch from API first
        try {
          const options = selectedCategory !== "all" ? { category: selectedCategory } : {};
          const apiResponse = await fetchAllArticles(options)
          
          if (apiResponse && Array.isArray(apiResponse.articles)) {
            setArticles(apiResponse.articles)
            setLoading(false)
            return
          } else if (apiResponse && Array.isArray(apiResponse)) {
            // Handle case where API returns direct array
            setArticles(apiResponse)
            setLoading(false)
            return
          }
        } catch (apiError) {
          console.log("API fetch failed, falling back to local data:", apiError)
        }
        
        // Fallback to local articles if API fails
        const filtered = selectedCategory === "all" 
          ? localArticles 
          : localArticles.filter(article => {
              // Check for both category ID and category.id to handle different structures
              return article.categoryId === selectedCategory || 
                    (article.category && article.category.id === selectedCategory)
            })
          
        setArticles(filtered)
      } catch (err) {
        console.error("Error loading articles:", err)
        setError("Failed to load articles. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [selectedCategory, localArticles])

  // Get unique categories from articles if needed
  const getUniqueCategories = () => {
    // Use provided categories or extract from articles
    if (categories && categories.length > 0) {
      return categories;
    }

    const uniqueCategories = new Map();
    
    articles.forEach(article => {
      if (article.category) {
        uniqueCategories.set(article.category.id, {
          id: article.category.id,
          name: article.category.name
        });
      } else if (article.categoryId) {
        uniqueCategories.set(article.categoryId, {
          id: article.categoryId,
          name: article.categoryId // Use ID as name if name not available
        });
      }
    });
    
    return Array.from(uniqueCategories.values());
  };

  return (
    <div className="pt-20">
      {/* Category Filter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Filter Articles by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a category to view articles specific to your interest
            </p>
          </div>

          {/* Inline CategoryFilter */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } transition-colors font-medium`}
            >
              All Categories
            </button>
            
            {getUniqueCategories().map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-cyan-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-colors font-medium`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through the articles available in the selected category
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-2xl mx-auto text-center">
              {error}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              <p className="mb-4">No articles found in this category.</p>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-cyan-600 hover:underline"
                >
                  View all articles
                </button>
              )}
            </div>
          ) : (
            // Inline ArticlesList
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <motion.div
                  key={article.articleId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link to={`/article/${article.articleId}`} className="block">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={article.imageUrl || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full">
                          {article.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {new Date(article.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {article.excerpt || article.content?.replace(/<[^>]*>/g, '').slice(0, 120) + '...'}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 mr-2">
                            {article.authorName?.charAt(0) || "A"}
                          </div>
                          <span className="text-sm text-gray-700">
                            {article.authorName || "Anonymous"}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-xs">{article.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage;