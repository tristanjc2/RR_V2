import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onSelect, isAdmin, onEdit, onDelete }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [products]);

  const visibleProducts = showAll ? products : products.slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onSelect} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
      {products.length > 3 && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition"
            onClick={() => setShowAll(true)}
          >
            See More
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
