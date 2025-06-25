import React, { useEffect, useState } from "react";
import { fetchReviews, addReview, deleteReview } from "../firebaseReviews";

const ReviewSection = ({ isAdmin, productList = [] }) => {
  const [form, setForm] = useState({ name: "", rating: 5, text: "", productId: "general" });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews.");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(form);
      // Reload reviews
      const data = await fetchReviews();
      setReviews(data);
      setForm({ name: "", rating: 5, text: "", productId: "general" });
    } catch (err) {
      setError("Failed to submit review.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      setError("Failed to delete review.");
    }
  };

  return (
    <div id="reviews">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="general">General Company Review</option>
          {/* Group products by category and subcategory */}
          {(() => {
  const groups = [];
  const grouped = {};
  productList.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = {};
    if (!grouped[p.category][p.subcategory]) grouped[p.category][p.subcategory] = [];
    grouped[p.category][p.subcategory].push(p);
  });
  Object.entries(grouped).forEach(([cat, subs]) => {
    groups.push(
      <optgroup key={cat} label={cat}>
        {Object.entries(subs).flatMap(([sub, prods]) =>
          prods.map(prod => (
            <option key={prod.id} value={prod.id}>{sub}: {prod.name}</option>
          ))
        )}
      </optgroup>
    );
  });
  return groups;
})()}

        </select>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="border px-3 py-2 rounded w-full"
          required
        />
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
          ))}
        </select>
        <textarea
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="Write your review..."
          className="border px-3 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Submit Review
        </button>
      </form>
      {loading && <div>Loading reviews...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {reviews.map((r) => {
          const productName = r.productId && r.productId !== "general"
            ? (productList.find(p => String(p.id) === String(r.productId))?.name || "[Deleted Product]")
            : null;
          return (
            <li key={r.id} className="border rounded p-4 bg-gray-50 relative">
              <div className="flex items-center mb-1">
                <span className="font-semibold mr-2">{r.name}</span>
                <span className="text-yellow-500">{'\u2605'.repeat(r.rating)}{'\u2606'.repeat(5 - r.rating)}</span>
                {productName ? (
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{productName}</span>
                ) : (
                  <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">General</span>
                )}
              </div>
              <p className="text-gray-700 italic">“{r.text}”</p>
              <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
              {isAdmin && (
                <button className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(r.id)}>Delete</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewSection;
