"use client"
import { useWallet } from "../context/WalletContext"
import { motion } from "framer-motion"

const ConnectWalletPrompt = ({ message = "Connect your wallet to continue" }) => {
  const { connectWallet, isConnecting } = useWallet()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-cyan-50 to-pink-50 p-8 rounded-xl shadow-lg text-center max-w-md mx-auto my-12"
    >
      <div className="mb-6 text-6xl">🔐</div>
      <h2 className="text-2xl font-bold mb-4 gradient-text">Wallet Required</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={connectWallet}
        disabled={isConnecting}
        className={`btn-primary w-full ${isConnecting ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </motion.button>
      <p className="mt-4 text-sm text-gray-500">Your wallet is your identity in the Web3 world</p>
    </motion.div>
  )
}

export default ConnectWalletPrompt

