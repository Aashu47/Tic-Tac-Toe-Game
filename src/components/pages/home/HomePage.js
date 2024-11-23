import './HomePage.css';
import React, { useState, useEffect, useContext } from 'react';
import NavigationBlock from '../../blocks/navbar/NavigationBlock';
import ProductListSection from '../../sections/product-list/ProductListSection';
import { useQuery, useLazyQuery } from '@apollo/client';
import { SearchContext } from '../../../context/SearchContext';
import {GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, GET_PRODUCTS_BY_CATEGORY, SEARCH_PRODUCTS } from '../../../graphql/queries';

const HomePage = () =>  {
  const { searchQuery } = useContext(SearchContext);

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_ALL_CATEGORIES);
  const { data: productData, loading: productLoading, error: productError } = useQuery(GET_ALL_PRODUCTS);
  const [fetchProductsByCategory] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY);
  const [searchProducts] = useLazyQuery(SEARCH_PRODUCTS);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  //fetch categories
  useEffect( () => {
    if(categoryData){
      setCategories(categoryData.getAllCategories)
    }
  }, [categoryData]);

  // Fetch products
  useEffect(() => {
    if (productData) {
      setProducts(productData.getAllProducts);
    }
  }, [productData]);
  
   // Fetch products by category
   const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setProducts(productData.getAllProducts);
    } else {
      fetchProductsByCategory({ variables: { category } }).then((response) => {
        setProducts(response?.data?.getProductByCategory || []);
      });
    }
  };

  //search products
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProducts({ variables: { keyword: searchQuery } })
        .then((response) => {
          setProducts(response?.data?.searchProducts || []);
        })
        .catch((error) => console.error("Search Error:", error));
    } else if (productData) {
      // Reset to all products if search query is cleared
      setProducts(productData.getAllProducts);
    }
  }, [searchQuery, searchProducts, productData]);
  

  if (categoryLoading || productLoading) return <p>Loading...</p>;
  if (categoryError || productError) return <p>Error: {categoryError?.message || productError?.message}</p>;

  return (
    <div className="home-layout">
      <NavigationBlock navigationData={['All', ...categories]} onCategorySelect={handleCategorySelect} />
      <ProductListSection products={products} />
    </div>
  );
}

export default HomePage;
