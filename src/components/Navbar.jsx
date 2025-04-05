"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useWallet } from "../context/WalletContext"
import { useUser } from "../context/UserContext"
import { motion } from "framer-motion"

const Navbar = () => {
  const { isConnected, walletAddress, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const { isAdmin, toggleAdminStatus } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const truncateAddress = (address) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.div whileHover={{ rotate: 10 }} className="text-3xl mr-2">
            📰
          </motion.div>
          <motion.h1 className="text-2xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
            Web3News
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-cyan-500 transition-colors">
            Home
          </Link>
          <Link to="/publish" className="text-gray-700 hover:text-cyan-500 transition-colors">
            Publish
          </Link>
          {isConnected && (
            <Link to="/profile" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Profile
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Admin
            </Link>
          )}

          {isConnected ? (
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {truncateAddress(walletAddress)}
              </span>
              <button onClick={disconnectWallet} className="btn-secondary text-sm py-1">
                Disconnect
              </button>
              {/* Admin toggle for demo purposes */}
              <button
                onClick={toggleAdminStatus}
                className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                title="Demo: Toggle admin status"
              >
                {isAdmin ? "👑" : "👤"}
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`btn-primary ${isConnecting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-cyan-500 py-2 transition-colors">
              Home
            </Link>
            <Link to="/publish" className="text-gray-700 hover:text-cyan-500 py-2 transition-colors">
              Publish
            </Link>
            {isConnected && (
              <Link to="/profile" className="text-gray-700 hover:text-cyan-500 py-2 transition-colors">
                Profile
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-cyan-500 py-2 transition-colors">
                Admin
              </Link>
            )}

            {isConnected ? (
              <div className="flex flex-col space-y-2 py-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 w-fit">
                  {truncateAddress(walletAddress)}
                </span>
                <div className="flex space-x-2">
                  <button onClick={disconnectWallet} className="btn-secondary text-sm py-1">
                    Disconnect
                  </button>
                  <button
                    onClick={toggleAdminStatus}
                    className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    title="Demo: Toggle admin status"
                  >
                    {isAdmin ? "👑" : "👤"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className={`btn-primary w-full ${isConnecting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar

