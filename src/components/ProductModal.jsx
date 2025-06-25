import React, { useState } from "react";
import AdminProductForm from "./AdminProductForm";
import { motion, AnimatePresence } from "framer-motion";

const ProductModal = ({ product, onClose, isAdmin, onEdit }) => {
  const [editing, setEditing] = useState(false);
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-green-700 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
            {isAdmin && (
              <button className="absolute top-3 left-3 bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500" onClick={() => setEditing(true)}>
                Edit
              </button>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                THC: {product.thc}%
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                CBD: {product.cbd}%
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Effects: {product.effects}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Usage: {product.usage}
              </span>
            </div>
            <div className="mb-4">
              <strong>Reviews:</strong>
              <ul className="mt-2 space-y-1">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((r, i) => (
                    <li key={i} className="text-gray-600 text-sm">“{r}”</li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">No reviews yet.</li>
                )}
              </ul>
            </div>
            <button
              className="bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition w-full"
              onClick={onClose}
            >
              Close
            </button>
            {editing && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <AdminProductForm initial={product} onSave={(p) => { onEdit(product.id, p); setEditing(false); }} onCancel={() => setEditing(false)} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
