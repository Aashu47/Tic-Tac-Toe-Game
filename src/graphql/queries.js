import { gql } from '@apollo/client';

// Query to fetch all products
export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      title
      price
      description
      imageUrl
      category
      averageRating
      ratingCount
    }
  }
`;

// Query to fetch all categories
export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories
  }
`;

// Query to fetch products by category
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query ($category: String!) {
    getProductByCategory(category: $category) {
      id
      title
      price
      description
      imageUrl
      category
      averageRating
      ratingCount
    }
  }
`;

// Query to search for products by a search term
export const SEARCH_PRODUCTS = gql`
  query SearchProducts($keyword: String!) {
    searchProducts(keyword: $keyword) {
      id
      name
      price
      description
      image
      category
      averageRating
      ratingCount
    }
  }
`;

// Query to fetch product details by ID (useful for details page)
export const GET_PRODUCT_BY_ID = gql`
  query ($id: String!) {
    getProductById(id: $id) {
      id
      title
      price
      description
      imageUrl
      category
      averageRating
      ratingCount
    }
  }
`;
