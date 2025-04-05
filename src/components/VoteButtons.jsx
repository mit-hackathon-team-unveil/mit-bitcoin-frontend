"use client"
import { useWallet } from "../context/WalletContext"
import { useArticles } from "../context/ArticleContext"
import { motion } from "framer-motion"

const VoteButtons = ({ article }) => {
  const { isConnected, walletAddress, connectWallet } = useWallet()
  const { voteArticle } = useArticles()

  const userVote = article.userVotes.find((vote) => vote.walletAddress === walletAddress)?.voteType

  const handleVote = (voteType) => {
    if (!isConnected) {
      connectWallet()
      return
    }

    voteArticle(article.id, voteType, walletAddress)
  }

  return (
    <div className="flex flex-col items-center space-y-2 bg-gray-50 p-4 rounded-lg">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote("up")}
        className={`p-2 rounded-full ${
          userVote === "up" ? "bg-cyan-100 text-cyan-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>

      <span className="text-xl font-bold text-gray-700">{article.votes}</span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote("down")}
        className={`p-2 rounded-full ${
          userVote === "down" ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {!isConnected && <p className="text-xs text-gray-500 text-center mt-2">Connect wallet to vote</p>}
    </div>
  )
}

export default VoteButtons

