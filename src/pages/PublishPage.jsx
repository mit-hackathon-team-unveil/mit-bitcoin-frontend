"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../context/WalletContext"
import { useArticles } from "../context/ArticleContext"
import ConnectWalletPrompt from "../components/ConnectWalletPrompt"
import RichTextEditor from "../components/RichTextEditor"
import { QRCodeSVG } from "qrcode.react" // Import QR code component

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
  const [satoshiAmount, setSatoshiAmount] = useState(100)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: "", text: "" })
  const [showSuccess, setShowSuccess] = useState(false)
  const [publishedArticleId, setPublishedArticleId] = useState(null)

  // For now, we'll assume captcha is always verified
  const isCaptchaVerified = true;

  // Generate random Bitcoin QR codes for display
  const generateRandomQrData = (count = 3) => {
    const codes = [];
    for (let i = 0; i < count; i++) {
      // Generate random Bitcoin addresses (for demo purposes)
      const randomAddress = `bc1q${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      const randomAmount = Math.floor(Math.random() * 500) + 100; // Random amount between 100-600 satoshis
      
      codes.push({
        address: randomAddress,
        amount: randomAmount,
        label: `Donation Option ${i + 1}`
      });
    }
    return codes;
  };

  // Generate QR codes once for consistent display
  const qrCodes = generateRandomQrData(1);

  useEffect(() => {
    if (editArticleId) {
      const article = getArticleById(editArticleId)
      if (article) {
        setTitle(article.title)
        setContent(article.content)
        setCategoryId(article.categoryId)
        setImageUrl(article.imageUrl || "/placeholder.svg?height=400&width=800")
        setAuthorName(article.authorName || "")
        setIsEditing(true)
      } else {
        // Handle article not found
        setFormMessage({ 
          type: "error", 
          text: "Article not found. You might be trying to edit an article that doesn't exist." 
        })
      }
    }
  }, [editArticleId, getArticleById])

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
    
    if (satoshiAmount < 100) {
      newErrors.satoshiAmount = "Minimum donation is 100 satoshis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Fixed handleSubmit function to ensure article is saved
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submission attempted")

    if (!validateForm()) {
      console.log("Form validation failed", errors)
      setFormMessage({ type: "error", text: "Please fill all required fields" })
      return
    }

    console.log("Form validation passed")
    setIsSubmitting(true)
    setFormMessage({ type: "", text: "" })

    try {
      // Create article data object with all required fields
      const articleData = {
        title,
        content,
        categoryId,
        imageUrl: imageUrl || "/placeholder.svg?height=400&width=800",
        author: walletAddress,
        authorName: authorName || "Anonymous",
        satoshiDonation: satoshiAmount,
      }
      
      console.log("Publishing article with data:", articleData)
      
      // Call publishArticle synchronously - it should return the new article ID
      const newArticleId = publishArticle(articleData)
      
      if (!newArticleId) {
        throw new Error("Failed to get article ID after publishing")
      }
      
      console.log("Article waiting for payment with ID:", newArticleId)
      setFormMessage({ type: "success", text: "Articlsse published successfully!" })
      setPublishedArticleId(newArticleId)
      setShowSuccess(true)
      
      // Navigate to the published article after a delay
      // setTimeout(() => {
      //   navigate(`/article/${newArticleId}`)
      // }, 10000) // Give users 10 seconds to see the QR codes
    } catch (error) {
      console.error("Error publishing article:", error)
      setFormMessage({ 
        type: "error", 
        text: "Failed to publish article. Please try again." 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return <ConnectWalletPrompt message="Connect your wallet to publish an article" />
  }

  // Display the success page with QR codes
  if (showSuccess && publishedArticleId) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800">Article waiting for payment!</h2>
                <p className="text-gray-600 mt-2">Your article is ready to be published and is now waiting for payment.</p>
                {/* <p className="text-gray-500 mt-1">You'll be redirected to your article shortly...</p> */}
              </div>
              
              <div className="mb-6">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Bitcoin Donation QR Code</h3>
  <p className="text-gray-600 mb-6 text-center">Scan this QR code to donate. This code is for demonstration purposes only.</p>
  
  {/* Changed from grid to flex container with justify-center */}
  <div className="flex justify-center">
    {qrCodes.map((qr, index) => (
      <motion.div 
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + (index * 0.2) }}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center max-w-xs"
      >
        <div className="mb-3 bg-white p-3 rounded-lg shadow-sm">
          <QRCodeSVG 
            value={`bitcoin:${qr.address}?amount=${qr.amount / 100000000}`} 
            size={180} // Increased the size for better visibility
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"M"}
            includeMargin={false}
          />
        </div>
        <p className="font-medium text-gray-800">{qr.label}</p>
        <p className="text-sm text-gray-500 mt-1">{qr.amount} satoshis</p>
        <p className="text-xs text-gray-400 mt-2 text-center">{qr.address.substring(0, 12)}...</p>
      </motion.div>
    ))}
  </div>
</div>
              
              <div className="flex justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/article/${publishedArticleId}`)}
                  className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors"
                >
                  View My Article Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold mb-6">{isEditing ? "Edit Article" : "Publish New Article"}</h1>

            {formMessage.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                formMessage.type === "error" 
                  ? "bg-red-50 text-red-700 border-l-4 border-red-500" 
                  : "bg-green-50 text-green-700 border-l-4 border-green-500"
              }`}>
                <p>{formMessage.text}</p>
              </div>
            )}

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

              {/* Satoshi Donation */}
              <div>
                <label htmlFor="satoshiAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Donation Amount (Satoshis)
                </label>
                <input
                  type="number"
                  id="satoshiAmount"
                  value={satoshiAmount}
                  onChange={(e) => setSatoshiAmount(Math.max(100, parseInt(e.target.value) || 100))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 ${
                    errors.satoshiAmount ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter satoshi amount (min 100)"
                  min="100"
                />
                <p className="mt-1 text-xs text-gray-500">Minimum donation is 100 satoshis</p>
                {errors.satoshiAmount && <p className="mt-1 text-sm text-red-600">{errors.satoshiAmount}</p>}
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <RichTextEditor value={content} onChange={setContent} />
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
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
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    isEditing ? "Update Article" : "Publish Article"
                  )}
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