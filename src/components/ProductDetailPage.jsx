import React, { useState } from "react";
import ReviewSection from "./ReviewSection";

export default function ProductDetailPage({ product, reviews, onAddReview, onSave, isAdmin, onBack, productList = [] }) {
  const [editDesc, setEditDesc] = useState(product.description || "");
  const [editing, setEditing] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewError, setReviewError] = useState("");

  const handleSave = () => {
    if (editDesc.trim()) {
      onSave({ ...product, description: editDesc });
      setEditing(false);
    }
  };

  const handleAddReview = () => {
    if (reviewText.trim().length < 5) {
      setReviewError("Review must be at least 5 characters.");
      return;
    }
    onAddReview(product.id, reviewText.trim());
    setReviewText("");
    setReviewError("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 mb-8">
      <button className="mb-10 text-green-700 hover:underline" onClick={onBack}>&larr; Back to Store</button>
      <div className="flex flex-col md:flex-row gap-12">
        <img src={product.image} alt={product.name} className="w-full md:w-80 h-80 object-cover rounded" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <div className="mb-6 text-lg text-green-700 font-semibold">${product.price}</div>
          <div className="mb-8">
            {editing ? (
              <>
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                  rows={4}
                />
                <div className="flex gap-2">
                  <button className="bg-green-700 text-white px-4 py-1 rounded" onClick={handleSave}>Save</button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded" onClick={() => setEditing(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-2 text-gray-700">{product.description}</p>
                {isAdmin && <button className="text-xs text-green-700 underline" onClick={() => setEditing(true)}>Edit Description</button>}
              </>
            )}
          </div>
          <div className="mb-8">
            <div className="font-semibold mb-1">THC:</div> <span className="mb-2 inline-block">{product.thc || "-"}</span>
            <div className="font-semibold mb-1">CBD:</div> <span className="mb-2 inline-block">{product.cbd || "-"}</span>
            <div className="font-semibold mb-1">Effects:</div> <span className="mb-2 inline-block">{product.effects || "-"}</span>
            <div className="font-semibold mb-1">Usage:</div> <span className="mb-2 inline-block">{product.usage || "-"}</span>
          </div>
        </div>
      </div>
      {/* Reviews */}
      <div className="border-t border-gray-200 mt-24 pt-12">
        <ReviewSection
          reviews={reviews}
          onAdd={onAddReview}
          productList={productList}
          isAdmin={false}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
