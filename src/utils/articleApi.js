import axios from 'axios';

const REACT_APP_API_URL = "http://localhost:5050";

/**
 * Fetches all articles from the API
 * @param {Object} options - Optional parameters like page, limit, category, etc
 * @returns {Promise} Promise resolving to article data
 */
export const fetchAllArticles = async (options = {}) => {
  try {
    const { page = 1, limit = 20, category = null, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    
    let url = `${REACT_APP_API_URL}/api/v1/articles?page=${page}&limit=${limit}&sort=${sortBy}&order=${sortOrder}`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

/**
 * Fetches a single article by ID
 * @param {string} articleId - The ID of the article to fetch
 * @returns {Promise} Promise resolving to article data
 */
export const fetchArticleById = async (articleId) => {
  try {
    console.log(`Fetching article with ID ${articleId} from ${REACT_APP_API_URL}/api/v1/articles/${articleId}`);
    
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    });
    
    console.log("Article fetch response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article ${articleId}:`, error);
    throw error;
  }
};