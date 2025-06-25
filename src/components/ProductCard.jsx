import React, { useState } from "react";
import AdminProductForm from "./AdminProductForm";

const ProductCard = ({ product, onSelect, isAdmin, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 sm:p-4 flex flex-col relative w-full max-w-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 sm:h-48 object-cover rounded mb-4"
        style={{ minHeight: '120px', maxHeight: '220px' }}
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
