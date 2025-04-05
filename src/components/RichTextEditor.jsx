"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null)
  const [editorValue, setEditorValue] = useState(value || "")

  useEffect(() => {
    // Set value when component receives a new value prop
    if (value !== editorValue) {
      setEditorValue(value)
    }
  }, [value])

  const handleChange = (content) => {
    setEditorValue(content)
    onChange(content)
  }

  // Custom Quill modules and formats
  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-gray-300 rounded-lg overflow-hidden rich-text-container"
    >
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write your content here..."
        className="large-editor text-left"
        dir="ltr"
      />
      
      {/* Add more extensive custom styling */}
      <style jsx global>{`
        .rich-text-container {
          display: flex;
          flex-direction: column;
          height: 400px; /* Overall container height */
        }
        
        .large-editor {
          height: 400px !important;
          display: flex;
          flex-direction: column;
        }
        
        .large-editor .ql-container {
          flex: 1;
          overflow: auto;
        }
        
        .large-editor .ql-editor {
          min-height: 300px;
          max-height: none; /* Let it fill available space */
          font-size: 16px; /* Optionally increase font size too */
          line-height: 1.6;
        }
        
        /* Optionally make toolbar sticky */
        .large-editor .ql-toolbar {
          position: sticky;
          top: 0;
          z-index: 1;
          background: white;
          border-bottom: 1px solid #ccc;
        }
      `}</style>
    </motion.div>
)
}

export default RichTextEditor