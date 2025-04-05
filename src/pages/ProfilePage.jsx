"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../context/WalletContext"
import { useArticles } from "../context/ArticleContext"
import ConnectWalletPrompt from "../components/ConnectWalletPrompt"
import ArticleCard from "../components/ArticleCard"

const ProfilePage = () => {
  const { isConnected, walletAddress } = useWallet()
  const { articles } = useArticles()
  const [userArticles, setUserArticles] = useState([])
  const [userVotes, setUserVotes] = useState([])
  const [activeTab, setActiveTab] = useState("articles")

  useEffect(() => {
    if (isConnected && walletAddress) {
      // Get user's published articles
      const publishedArticles = articles.filter((article) => article.author === walletAddress)
      setUserArticles(publishedArticles)

      // Get user's votes
      const votes = []
      articles.forEach((article) => {
        const userVote = article.userVotes.find((vote) => vote.walletAddress === walletAddress)
        if (userVote) {
          votes.push({
            article,
            voteType: userVote.voteType,
          })
        }
      })
      setUserVotes(votes)
    }
  }, [isConnected, walletAddress, articles])

  if (!isConnected) {
    return <ConnectWalletPrompt message="Connect your wallet to view your profile" />
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-cyan-500 text-2xl font-bold mr-4">
                  {walletAddress.slice(2, 4).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Your Profile</h1>
                  <p className="text-white/80">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </p>
                </div>
              </div>
              <Link
                to="/publish"
                className="px-6 py-2 bg-white text-cyan-600 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Publish New Article
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("articles")}
                className={`pb-4 font-medium ${
                  activeTab === "articles"
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Your Articles
              </button>
              <button
                onClick={() => setActiveTab("votes")}
                className={`pb-4 font-medium ${
                  activeTab === "votes"
                    ? "text-cyan-500 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Your Votes
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "articles" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Your Published Articles</h2>

              {userArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="text-xl font-medium mb-2">No articles yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't published any articles yet. Share your knowledge with the community!
                  </p>
                  <Link
                    to="/publish"
                    className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors"
                  >
                    Publish Your First Article
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "votes" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Articles You've Voted On</h2>

              {userVotes.length > 0 ? (
                <div className="space-y-4">
                  {userVotes.map((vote, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-full mr-4 ${
                          vote.voteType === "up" ? "bg-cyan-100 text-cyan-600" : "bg-pink-100 text-pink-600"
                        }`}
                      >
                        {vote.voteType === "up" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <Link
                          to={`/article/${vote.article.id}`}
                          className="font-medium text-gray-900 hover:text-cyan-600 transition-colors"
                        >
                          {vote.article.title}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span>{new Date(vote.article.createdAt).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">{vote.article.categoryId}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <div className="text-5xl mb-4">👍</div>
                  <h3 className="text-xl font-medium mb-2">No votes yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't voted on any articles yet. Explore and engage with the community!
                  </p>
                  <Link
                    to="/"
                    className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors"
                  >
                    Browse Articles
                  </Link>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage

