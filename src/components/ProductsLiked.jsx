import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useLikedProducts from "../hooks/useLikedProducts";
import products from "../data/products";
import ProductCard from "./ProductCard";

const CATEGORY_CONFIG = {
  Flower: ["Indica", "Hybrid", "Sativa"],
  Concentrate: ["Shatter", "Badder", "Terps"],
  Edible: ["Brownie", "Cookie", "Drink"],
};

const ProductsLiked = () => {
  const navigate = useNavigate();
  const { liked, loading } = useLikedProducts();
  // Get liked product objects
  const likedProducts = products.filter((p) => liked.includes(p.id));

  // Group by category/subcategory
  const grouped = {};
  Object.keys(CATEGORY_CONFIG).forEach((cat) => {
    grouped[cat] = {};
    CATEGORY_CONFIG[cat].forEach((sub) => {
      grouped[cat][sub] = likedProducts.filter(
        (p) => p.category === cat && p.subcategory === sub
      );
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto mt-8 sm:mt-16 bg-white/90 rounded-2xl shadow-2xl px-2 sm:px-8 py-6 sm:py-10"
    >
      <button
        className="mb-4 sm:mb-6 text-green-700 text-sm sm:text-base font-semibold hover:underline flex items-center gap-1"
        onClick={() => navigate(-1)}
        aria-label="Back to Profile"
      >
        <span className="text-lg">&larr;</span> Back
      </button>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-800">Products Liked</h2>
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading...</div>
      ) : likedProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No liked products yet. Tap the heart on any product to add it here!</div>
      ) : (
        <div className="space-y-10">
          {Object.keys(CATEGORY_CONFIG).map((cat) => (
            <div key={cat}>
              <h3 className="text-2xl font-bold text-green-700 mb-3 mt-6">{cat}</h3>
              <div className="space-y-8">
                {CATEGORY_CONFIG[cat].map((sub) => (
                  grouped[cat][sub].length > 0 && (
                    <div key={sub}>
                      <h4 className="text-lg font-semibold text-green-800 mb-2 ml-2">{sub}</h4>
                      <AnimatePresence>
                        <motion.div
                          layout
                          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {grouped[cat][sub].map((product) => (
                            <motion.div key={product.id} layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.35 }}>
                              <ProductCard product={product} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductsLiked;
