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
  axios.get(`${API_BASE_URL}?page=${pageNum}`);

// Function to search articles by keyword
export const searchArticles = (keyword, pageNum) =>
  axios.get(`${API_BASE_URL}/?keyword=${keyword}&page=${pageNum}`);

// Function to get a single article by ID
export const getSingleArticle = (id) =>
  axios.get(`${API_BASE_URL}/show?id=${id}`);
