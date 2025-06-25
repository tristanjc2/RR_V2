import React from "react";

const CATEGORY_CONFIG = {
  Flower: ["Indica", "Hybrid", "Sativa"],
  Concentrate: ["Shatter", "Badder", "Terps"],
  Edible: ["Brownie", "Cookie", "Drink"],
};

export default function CategorySelector({
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect,
}) {
  return (
    <div className="mb-8 flex flex-col items-center">
      {/* Main Category Buttons */}
      <div className="flex flex-wrap gap-6 justify-center mb-4">
        {Object.keys(CATEGORY_CONFIG).map((cat) => (
          <button
            key={cat}
            className={`text-xl md:text-2xl px-8 py-4 rounded-lg shadow font-bold transition border-2 border-green-700 ${selectedCategory === cat ? "bg-green-700 text-black" : "bg-white text-green-700 hover:bg-green-700 hover:text-white"}`}
            onClick={() => onCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Subcategory Buttons */}
      {selectedCategory && (
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className={`px-6 py-2 rounded-full border-2 border-green-500 font-semibold transition ${!selectedSubcategory ? "bg-green-700 text-black" : "bg-green-50 text-green-700 hover:bg-green-700 hover:text-white"}`}
            onClick={() => onSubcategorySelect("")}
          >
            All {selectedCategory}s
          </button>
          {CATEGORY_CONFIG[selectedCategory].map((subcat) => (
            <button
              key={subcat}
              className={`px-6 py-2 rounded-full border-2 border-green-500 font-semibold transition ${selectedSubcategory === subcat ? "bg-green-700 text-black" : "bg-green-50 text-green-700 hover:bg-green-700 hover:text-white"}`}
              onClick={() => onSubcategorySelect(subcat)}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
