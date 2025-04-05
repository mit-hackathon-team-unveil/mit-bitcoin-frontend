"use client"

import { createContext, useState, useContext, useCallback } from "react"

const WalletContext = createContext()

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState(null)

  // Placeholder for Mutiny wallet connection
  const connectWallet = useCallback(() => {
    setIsConnecting(true)
    setError(null)

    // Simulate connection delay
    try {
      setTimeout(() => {
        const randomAddress = "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join("")
        setWalletAddress(randomAddress)
        setIsConnected(true)
        setIsConnecting(false)
      }, 1000)
    } catch (err) {
      setError("Failed to connect wallet")
      setIsConnecting(false)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setWalletAddress("")
    setIsConnected(false)
    setError(null)
  }, [])

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

