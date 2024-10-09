import axios from "axios";

// Base URL for the API
const API_BASE_URL = "https://www.almarkazia.com/ar/api/news";

// Function to get categories
export const getCategories = () => axios.get(`${API_BASE_URL}/categories/`);

// Function to get articles by category
export const getArticlesByCategory = (categoryId) =>
  axios.get(`${API_BASE_URL}/?category=${categoryId}`);

// Function to get latest news
export const getLatestNews = (pageNum) =>
  axios.get(`${API_BASE_URL}/?page=${pageNum}`);

// Function to search articles by keyword
export const searchArticles = (keyword, pageNum) =>
  axios.get(`${API_BASE_URL}/?keyword=${keyword}&page=${pageNum}`, {
    timeout: 10000, // Set timeout to 10 seconds (10000 milliseconds)
    //yaani in 10 seconds eza ma tele3 result ha ybattel yaamol load
  });

// Function to get a single article by ID
export const getSingleArticle = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/show?id=${id}`);
    return response;
  } catch (error) {
    if (!navigator.onLine) {
      console.error("You are offline. Unable to fetch the article.");
      // You can return a cached fallback here or show a user-friendly message
      return { data: { title: "Offline", content: "No internet connection" } };
    } else {
      console.error("Error fetching the article:", error);
      throw error; // Throw the error so you can handle it in the UI
    }
  }
};
