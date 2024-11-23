import React from 'react';
import ProductCardBlock from '../../blocks/productCard/ProductCardBlock';
import './ProductListSection.css';

function ProductListSection({ products = [] }) {

  return (
    <section className="product-list-section">
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCardBlock key={product.id} product={product} />
      ))
    ) : (
      <div>
        <h4>No products available</h4>
      </div>

    )}
  </section>
);
}

export default ProductListSection;
