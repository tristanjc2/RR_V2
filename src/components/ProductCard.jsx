import React, { useState } from "react";
import AdminProductForm from "./AdminProductForm";
import { motion } from "framer-motion";
import useLikedProducts from "../hooks/useLikedProducts";
import LikeHeartButton from "./LikeHeartButton";

const ProductCard = ({ product, onSelect, isAdmin, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const { isProductLiked, likeProduct, unlikeProduct } = useLikedProducts();
  const liked = isProductLiked(product.id);
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 sm:p-4 flex flex-col relative w-full max-w-full">
      {/* Like Heart Button */}
      <LikeHeartButton productId={product.id} className="absolute top-2 right-2 z-20" />
      <img
        src={
          product.image && product.image !== "" && product.image !== "placeholder.jpg"
            ? product.image
            : "/placeholder.jpg"
        }
        alt={product.name + (product.image ? '' : ' (placeholder image)')}
        className="w-full h-40 sm:h-48 object-cover rounded mb-4 bg-gray-100"
        style={{ minHeight: '120px', maxHeight: '220px' }}
        onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-green-700 text-lg">${product.price}</span>
        <div className="space-x-2">
          <button
            className="bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition min-w-[44px] min-h-[44px]"
            onClick={() => onSelect(product)}
          >
            Learn More
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500" onClick={() => setEditing(true)}>Edit</button>
          <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      )}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AdminProductForm initial={product} onSave={(p) => { onEdit(product.id, p); setEditing(false); }} onCancel={() => setEditing(false)} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
