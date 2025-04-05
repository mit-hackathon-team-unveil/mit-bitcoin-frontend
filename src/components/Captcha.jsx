"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Captcha = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    setUserInput("")
    setError("")
    setIsVerified(false)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsVerified(true)
      setError("")
      onVerify(true)
    } else {
      setError("Incorrect captcha. Please try again.")
      generateCaptcha()
      onVerify(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Verify you're human</h3>

      {!isVerified ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="bg-gray-100 p-3 rounded-lg text-center">
              <span
                className="select-none text-lg font-mono tracking-widest text-gray-800 
                inline-block transform -skew-x-12"
              >
                {captchaText.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      transform: `translateY(${Math.sin(index) * 5}px) rotate(${Math.random() * 10 - 5}deg)`,
                      color: `hsl(${Math.random() * 360}, 70%, 40%)`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter the text above"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Verify
            </motion.button>
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="mt-2 flex justify-between items-center">
            <button type="button" onClick={generateCaptcha} className="text-sm text-cyan-600 hover:text-cyan-800">
              Refresh
            </button>
            <span className="text-xs text-gray-500">Case insensitive</span>
          </div>
        </form>
      ) : (
        <div className="text-center py-2">
          <span className="text-green-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </span>
        </div>
      )}
    </div>
  )
}

export default Captcha

