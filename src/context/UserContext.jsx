"use client"

import { createContext, useState, useContext } from "react"
import { useWallet } from "./WalletContext"

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const { walletAddress, isConnected } = useWallet()
  const [isAdmin, setIsAdmin] = useState(false)

  // For demo purposes, we'll make the first connected wallet an admin
  const checkAdminStatus = (address) => {
    // In a real app, you would check against a list of admin addresses
    // For demo, we'll just use a simple check
    if (address && address.toLowerCase().endsWith("a1b2c3")) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }

  // Toggle admin status for demo purposes
  const toggleAdminStatus = () => {
    setIsAdmin(!isAdmin)
  }

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        checkAdminStatus,
        toggleAdminStatus,
        walletAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

