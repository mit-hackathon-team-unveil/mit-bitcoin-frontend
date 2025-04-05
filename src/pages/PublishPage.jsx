"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../context/WalletContext"
import { useArticles } from "../context/ArticleContext"
import ConnectWalletPrompt from "../components/ConnectWalletPrompt"
import RichTextEditor from "../components/RichTextEditor"
import Captcha from "../components/Captcha"

const PublishPage = () => {
  const { isConnected, walletAddress } = useWallet()
  const { publishArticle, getArticleById, categories } = useArticles()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const editArticleId = queryParams.get("edit")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=800")
  const [authorName, setAuthorName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (editArticleId) {
      const article = getArticleById(editArticleId)
      if (article) {
        setTitle(article.title)
        setContent(article.content)
        setCategoryId(article.categoryId)
        setImageUrl(article.imageUrl)
        setAuthorName(article.authorName || "")
        setIsEditing(true)
      }
    }
  }, [editArticleId])

  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!content.trim()) {
      newErrors.content = "Content is required"
    }

    if (!categoryId) {
      newErrors.categoryId = "Category is required"
    }

    if (!isCaptchaVerified) {
      newErrors.captcha = "Please complete the captcha"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const articleData = {
      title,
      content,
      categoryId,
      imageUrl,
      author: walletAddress,
      authorName: authorName || "Anonymous",
    }

    // Simulate network delay
    setTimeout(() => {
      const newArticleId = publishArticle(articleData)
      setIsSubmitting(false)
      navigate(`/article/${newArticleId}`)
    }, 1000)
  }

  if (!isConnected) {
    return <ConnectWalletPrompt message="Connect your wallet to publish an article" />
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-6">{isEditing ? "Edit Article" : "Publish New Article"}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter article title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 ${
                    errors.categoryId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
              </div>

              {/* Author Name */}
              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
                  Author Name (optional)
                </label>
                <input
                  type="text"
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter your name or pseudonym"
                />
                <p className="mt-1 text-xs text-gray-500">If left blank, you'll be shown as "Anonymous"</p>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Enter image URL"
                />
                <p className="mt-1 text-xs text-gray-500">Use a direct link to an image (JPG, PNG, etc.)</p>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <RichTextEditor value={content} onChange={setContent} />
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              </div>

              {/* Captcha */}
              <div>
                <Captcha onVerify={setIsCaptchaVerified} />
                {errors.captcha && <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Publishing..." : isEditing ? "Update Article" : "Publish Article"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PublishPage

