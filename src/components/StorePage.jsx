import React, { useState } from "react";
import ProductCard from "./ProductCard";

import AdminProductForm from "./AdminProductForm";

const CATEGORY_CONFIG = {
  Flower: ["Indica", "Hybrid", "Sativa"],
  Concentrate: ["Shatter", "Badder", "Terps"],
  Edible: ["Brownie", "Cookie", "Drink"],
};

export default function StorePage({
  products,
  isAdmin,
  onAdd,
  onEdit,
  onDelete,
  onSelect = () => {},
}) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  // Group products by category and subcategory
  const grouped = {};
  Object.keys(CATEGORY_CONFIG).forEach(cat => {
    grouped[cat] = {};
    CATEGORY_CONFIG[cat].forEach(sub => {
      grouped[cat][sub] = products.filter(p => p.category === cat && p.subcategory === sub);
    });
  });

  // Filtering logic
  const visibleCategories = selectedCategory ? [selectedCategory] : Object.keys(CATEGORY_CONFIG);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center tracking-tight drop-shadow-lg">Reaper Resins Store</h1>
      {/* Category Selector */}
      <div className="flex flex-wrap gap-4 justify-center mb-10 sticky top-0 z-20 bg-opacity-80 backdrop-blur rounded-xl py-4">
        {Object.keys(CATEGORY_CONFIG).map((cat) => (
          <button
            key={cat}
            className={`px-7 py-3 rounded-full font-semibold border-2 transition-all duration-150 shadow-sm text-lg md:text-xl mx-1 mb-2 focus:outline-none ${selectedCategory === cat ? "bg-green-700 text-white border-green-700 scale-105" : "bg-white text-green-700 border-green-700 hover:bg-green-700 hover:text-white"}`}
            onClick={() => {
              setSelectedCategory(cat === selectedCategory ? "" : cat);
              setSelectedSubcategory("");
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Subcategory Selector */}
      {selectedCategory && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            className={`px-5 py-2 rounded-full border-2 font-medium transition-all duration-150 shadow-sm text-base md:text-lg mx-1 mb-2 focus:outline-none ${!selectedSubcategory ? "bg-green-700 text-white border-green-700 scale-105" : "bg-white text-green-700 border-green-500 hover:bg-green-700 hover:text-white"}`}
            onClick={() => setSelectedSubcategory("")}
          >
            All {selectedCategory}s
          </button>
          {CATEGORY_CONFIG[selectedCategory].map((subcat) => (
            <button
              key={subcat}
              className={`px-5 py-2 rounded-full border-2 font-medium transition-all duration-150 shadow-sm text-base md:text-lg mx-1 mb-2 focus:outline-none ${selectedSubcategory === subcat ? "bg-green-700 text-white border-green-700 scale-105" : "bg-white text-green-700 border-green-500 hover:bg-green-700 hover:text-white"}`}
              onClick={() => setSelectedSubcategory(subcat)}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <button
            className="bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800"
            onClick={() => setShowAddProduct(true)}
          >
            Add Product
          </button>
        </div>
      )}
      {visibleCategories.map((cat) => (
        <section key={cat} className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 border-b-4 border-green-700 pb-3 pl-1 tracking-tight flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-700 mr-2"></span>{cat}
          </h2>
          {Object.keys(CATEGORY_CONFIG[cat]).map((subIdx) => {
            const subcat = CATEGORY_CONFIG[cat][subIdx];
            const productsToShow = selectedSubcategory
              ? grouped[cat][selectedSubcategory]
              : grouped[cat][subcat];
            return (
              <div key={subcat} className="mb-12">
                <h3 className="text-xl font-bold mb-5 text-green-600 tracking-wide uppercase flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>{subcat}
                </h3>
                {productsToShow.length === 0 ? (
                  <div className="text-gray-400 italic text-center py-8 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                    No products available in this category yet. Check back soon!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {productsToShow.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isAdmin={isAdmin}
                        onSelect={onSelect}
                        onEdit={(id, updated) => setEditProduct({ id, updated, orig: product })}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}
      {/* Add/Edit Product Modals */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AdminProductForm onSave={onAdd} onCancel={() => setShowAddProduct(false)} />
        </div>
      )}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AdminProductForm
            product={editProduct.orig}
            onSave={updated => {
              onEdit(editProduct.orig.id, updated);
              setEditProduct(null);
            }}
            onCancel={() => setEditProduct(null)}
          />
        </div>
      )}
    </div>
  );
}
