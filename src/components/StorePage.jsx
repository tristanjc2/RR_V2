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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Reaper Resins Store</h1>
      {/* Category Selector */}
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        {Object.keys(CATEGORY_CONFIG).map((cat) => (
          <button
            key={cat}
            className={`text-xl md:text-2xl px-8 py-4 rounded-lg shadow font-bold transition border-2 border-green-700 ${selectedCategory === cat ? "bg-green-700 text-black" : "bg-white text-green-700 hover:bg-green-700 hover:text-white"}`}
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
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-full border-2 border-green-500 font-semibold transition ${!selectedSubcategory ? "bg-green-700 text-black" : "bg-green-50 text-green-700 hover:bg-green-700 hover:text-white"}`}
            onClick={() => setSelectedSubcategory("")}
          >
            All {selectedCategory}s
          </button>
          {CATEGORY_CONFIG[selectedCategory].map((subcat) => (
            <button
              key={subcat}
              className={`px-6 py-2 rounded-full border-2 border-green-500 font-semibold transition ${selectedSubcategory === subcat ? "bg-green-700 text-black" : "bg-green-50 text-green-700 hover:bg-green-700 hover:text-white"}`}
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
      {visibleCategories.map(cat => (
        <section key={cat} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-green-700 pb-2">{cat}</h2>
          {(selectedCategory ? [selectedSubcategory || "ALL"] : CATEGORY_CONFIG[cat]).map(sub => {
            if (sub === "ALL") {
              // Show all subcategories in this category
              return CATEGORY_CONFIG[cat].map(sub2 => (
                <div key={sub2} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">{sub2}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {grouped[cat][sub2].map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isAdmin={isAdmin}
                        onEdit={(id, updated) => setEditProduct({ id, updated, orig: product })}
                        onDelete={onDelete}
                      />
                    ))}
                  </div>
                </div>
              ));
            }
            return (
              <div key={sub} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-700">{sub}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {grouped[cat][sub].map(product => (
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
