import React from "react";
import { motion } from "framer-motion";
import useLikedProducts from "../hooks/useLikedProducts";

export default function LikeHeartButton({ productId, className = "" }) {
  const { isProductLiked, likeProduct, unlikeProduct } = useLikedProducts();
  const liked = isProductLiked(productId);
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      aria-label={liked ? "Unlike" : "Like"}
      className={`p-2 rounded-full bg-white/80 shadow-md hover:bg-pink-50 focus:outline-none ${className}`}
      onClick={e => {
        e.stopPropagation();
        liked ? unlikeProduct(productId) : likeProduct(productId);
      }}
    >
      <motion.svg
        key={liked ? "filled" : "outline"}
        initial={{ scale: 0.7, opacity: 0.5 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? "#e11d48" : "none"}
        stroke="#e11d48"
        strokeWidth={liked ? 0 : 2}
        className="w-7 h-7 drop-shadow"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={liked ? "#e11d48" : "none"}
        />
      </motion.svg>
    </motion.button>
  );
}
