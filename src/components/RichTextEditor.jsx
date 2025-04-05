"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

const RichTextEditor = ({ value, onChange }) => {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [activeHeading, setActiveHeading] = useState(null)
  const editorRef = useRef(null)
  
  const handleBold = () => {
    setIsBold(!isBold)
    document.execCommand("bold", false, null)
    if (editorRef.current) editorRef.current.focus()
  }

  const handleItalic = () => {
    setIsItalic(!isItalic)
    document.execCommand("italic", false, null)
    if (editorRef.current) editorRef.current.focus()
  }

  const handleUnderline = () => {
    setIsUnderline(!isUnderline)
    document.execCommand("underline", false, null)
    if (editorRef.current) editorRef.current.focus()
  }

  const handleHeading = (level) => {
    if (activeHeading === level) {
      document.execCommand("formatBlock", false, "p")
      setActiveHeading(null)
    } else {
      document.execCommand("formatBlock", false, `h${level}`)
      setActiveHeading(level)
    }
    if (editorRef.current) editorRef.current.focus()
  }

  const handleLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      document.execCommand("createLink", false, url)
      if (editorRef.current) editorRef.current.focus()
    }
  }

  const handleImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      document.execCommand("insertImage", false, url)
      if (editorRef.current) editorRef.current.focus()
    }
  }

  const handleContentChange = (e) => {
    onChange(e.target.innerHTML)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-2 border-b border-gray-300 flex flex-wrap gap-1" role="toolbar" aria-label="Text formatting options">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => handleHeading(2)}
          className={`p-2 rounded ${activeHeading === 2 ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-200"}`}
          aria-pressed={activeHeading === 2}
          aria-label="Heading 2"
        >
          H2
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => handleHeading(3)}
          className={`p-2 rounded ${activeHeading === 3 ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-200"}`}
          aria-pressed={activeHeading === 3}
          aria-label="Heading 3"
        >
          H3
        </motion.button>
        <div className="h-6 w-px bg-gray-300 mx-1" role="separator"></div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleBold}
          className={`p-2 rounded ${isBold ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-200"}`}
          aria-pressed={isBold}
          aria-label="Bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z"
            />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleItalic}
          className={`p-2 rounded ${isItalic ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-200"}`}
          aria-pressed={isItalic}
          aria-label="Italic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleUnderline}
          className={`p-2 rounded ${isUnderline ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-200"}`}
          aria-pressed={isUnderline}
          aria-label="Underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 18h16" />
          </svg>
        </motion.button>
        <div className="h-6 w-px bg-gray-300 mx-1" role="separator"></div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleLink}
          className="p-2 rounded hover:bg-gray-200"
          aria-label="Insert Link"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleImage}
          className="p-2 rounded hover:bg-gray-200"
          aria-label="Insert Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </motion.button>
      </div>
      <div
        className="p-4 min-h-[300px] focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        ref={editorRef}
      />
    </div>
  )
}

export default RichTextEditor

