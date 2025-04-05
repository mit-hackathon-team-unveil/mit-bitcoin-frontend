"use client"

import { createContext, useState, useContext, useCallback } from "react"
import { mockArticles, mockCategories } from "../data/mockData"

const ArticleContext = createContext()

export const useArticles = () => {
  const context = useContext(ArticleContext)
  if (!context) {
    throw new Error("useArticles must be used within an ArticleProvider")
  }
  return context
}

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState(mockArticles)
  const [categories, setCategories] = useState(mockCategories)
  const [error, setError] = useState(null)

  const getArticlesByCategory = useCallback((categoryId) => {
    try {
      return articles.filter((article) => article.categoryId === categoryId)
    } catch (err) {
      setError("Failed to filter articles by category")
      return []
    }
  }, [articles])

  const getArticleById = useCallback((articleId) => {
    try {
      return articles.find((article) => article.id === articleId)
    } catch (err) {
      setError("Failed to find article")
      return null
    }
  }, [articles])

  const getCategoryById = useCallback((categoryId) => {
    try {
      return categories.find((category) => category.id === categoryId)
    } catch (err) {
      setError("Failed to find category")
      return null
    }
  }, [categories])

  const getTrendingArticles = useCallback((categoryId, limit = 3) => {
    try {
      const categoryArticles = categoryId ? articles.filter((article) => article.categoryId === categoryId) : articles
      return [...categoryArticles].sort((a, b) => b.votes - a.votes).slice(0, limit)
    } catch (err) {
      setError("Failed to get trending articles")
      return []
    }
  }, [articles])

  const voteArticle = useCallback((articleId, voteType, walletAddress) => {
    if (!walletAddress) {
      setError("Wallet address is required to vote")
      return
    }

    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article.id === articleId) {
          // Check if user already voted
          const existingVote = article.userVotes.find((vote) => vote.walletAddress === walletAddress)

          let userVotes
          if (existingVote) {
            // If same vote type, remove vote
            if (existingVote.voteType === voteType) {
              userVotes = article.userVotes.filter((vote) => vote.walletAddress !== walletAddress)
            } else {
              // If different vote type, change vote
              userVotes = article.userVotes.map((vote) =>
                vote.walletAddress === walletAddress ? { ...vote, voteType } : vote,
              )
            }
          } else {
            // Add new vote
            userVotes = [...article.userVotes, { walletAddress, voteType }]
          }

          // Calculate new vote count
          const upvotes = userVotes.filter((vote) => vote.voteType === "up").length
          const downvotes = userVotes.filter((vote) => vote.voteType === "down").length

          return {
            ...article,
            userVotes,
            votes: upvotes - downvotes,
          }
        }
        return article
      }),
    )
  }, [])

  const publishArticle = useCallback((newArticle) => {
    try {
      if (!newArticle.title || !newArticle.content) {
        setError("Title and content are required")
        return null
      }

      const articleWithId = {
        ...newArticle,
        id: `article-${Date.now()}`,
        createdAt: new Date().toISOString(),
        votes: 0,
        userVotes: [],
      }

      setArticles((prevArticles) => [articleWithId, ...prevArticles])
      return articleWithId.id
    } catch (err) {
      setError("Failed to publish article")
      return null
    }
  }, [])

  const deleteArticle = useCallback((articleId) => {
    try {
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId))
      return true
    } catch (err) {
      setError("Failed to delete article")
      return false
    }
  }, [])

  return (
    <ArticleContext.Provider
      value={{
        articles,
        categories,
        error,
        getArticlesByCategory,
        getArticleById,
        getCategoryById,
        getTrendingArticles,
        voteArticle,
        publishArticle,
        deleteArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  )
}

