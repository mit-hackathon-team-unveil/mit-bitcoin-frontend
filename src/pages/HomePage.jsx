"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../context/WalletContext"
import { useArticles } from "../context/ArticleContext"
import CategoryCard from "../components/CategoryCard"
import ArticleCard from "../components/ArticleCard"

const HomePage = () => {
  const { isConnected, connectWallet, isConnecting } = useWallet()
  const { categories, getTrendingArticles } = useArticles()

  const trendingArticles = getTrendingArticles(null, 6)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Web3 News That Matters
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          >
            Stay informed with the latest developments in DeFi, NFTs, and DAOs
          </motion.p>

          {!isConnected ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              disabled={isConnecting}
              className={`text-lg px-8 py-4 bg-white text-cyan-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all ${
                isConnecting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                to="/publish"
                className="text-lg px-8 py-4 bg-white text-cyan-600 rounded-full font-bold shadow-lg hover:shadow-xl transition-all inline-block"
              >
                Publish an Article
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the latest news and updates across different Web3 domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The most popular and highly voted articles from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/category/defi"
              className="inline-block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              View More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-100 to-pink-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Web3 Conversation</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Connect your wallet to vote on articles, publish your own content, and become part of our growing community.
          </p>

          {!isConnected ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              disabled={isConnecting}
              className={`px-8 py-4 bg-cyan-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all ${
                isConnecting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </motion.button>
          ) : (
            <Link
              to="/publish"
              className="px-8 py-4 bg-cyan-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all inline-block"
            >
              Publish Your First Article
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage

