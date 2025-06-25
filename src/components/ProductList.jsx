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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onSelect} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
      {products.length > 3 && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-green-700 text-white rounded-full font-semibold shadow hover:bg-green-800 transition"
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
