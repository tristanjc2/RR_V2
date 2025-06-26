import React, { useEffect, useState, useMemo } from "react";
import { fetchReviews } from "../firebaseReviews";
import { Loader, AlertCircle, MessageSquare, Search, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Optionally, import your product images if available
// import products from "../data/products";

const glassClass =
  "backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-4 transition hover:scale-[1.025] hover:shadow-2xl";

import { UserCircle } from "lucide-react";

const ReviewsPage = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const allReviews = await fetchReviews();
        setReviews(allReviews);
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  // Filter reviews by product name or text
  const filteredReviews = useMemo(() => {
    if (!search.trim()) return reviews;
    return reviews.filter(
      (r) =>
        (r.productName?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (r.text?.toLowerCase() || "").includes(search.toLowerCase())
    );
  }, [reviews, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100/70 via-white to-green-300/60 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 text-center bg-gradient-to-r from-green-600 via-emerald-400 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
          🌟 Customer Reviews
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
          See what people are saying about our products. Real reviews, real experiences.
        </p>
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by product or review..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:ring-2 focus:ring-green-400 focus:border-green-500 transition shadow-sm"
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-green-500" size={48} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg p-6">
            <AlertCircle size={48} className="mb-4" />
            <h3 className="text-xl font-semibold">An Error Occurred</h3>
            <p className="mt-1">{error}</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <MessageSquare size={48} className="mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold">No Reviews Found</h3>
            <p className="mt-1 text-gray-500">Try another search or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={
                    `${glassClass} ` +
                    (review.role === "admin"
                      ? "border-4 border-yellow-400 shadow-yellow-300 animate-pulse"
                      : review.role === "staff"
                      ? "border-4 border-blue-400 shadow-blue-300"
                      : review.loyaltyTier === "top"
                      ? "border-4 border-purple-500 bg-gradient-to-r from-purple-100 via-white to-purple-300 shadow-purple-400 animate-[pulse_2s_infinite]"
                      : review.loyaltyTier === "mid"
                      ? "border-2 border-cyan-400 bg-cyan-50 dark:bg-cyan-950"
                      : review.loyaltyTier === "low"
                      ? "border border-gray-400 bg-gray-100 dark:bg-gray-900 opacity-80"
                      : "bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800")
                  }
                >
                  <div className="flex flex-col items-center mr-4">
                    {review.showAvatar && review.avatarUrl ? (
                      <img
                        src={review.avatarUrl}
                        alt={review.displayName || "Avatar"}
                        className="w-14 h-14 rounded-full border-2 border-green-400 shadow-md mb-1"
                      />
                    ) : (
                      <UserCircle className="w-14 h-14 text-gray-400 mb-1" />
                    )}
                    {review.role === "admin" && (
                      <span className="text-xs font-bold text-yellow-700 bg-yellow-200 rounded px-2 py-0.5 mt-1">ADMIN</span>
                    )}
                    {review.role === "staff" && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-200 rounded px-2 py-0.5 mt-1">STAFF</span>
                    )}
                    {review.loyaltyTier === "top" && (
                      <span className="text-xs font-bold text-purple-800 bg-purple-100 rounded px-2 py-0.5 mt-1 animate-pulse">VIP</span>
                    )}
                    {review.loyaltyTier === "mid" && (
                      <span className="text-xs font-bold text-cyan-800 bg-cyan-100 rounded px-2 py-0.5 mt-1">MID</span>
                    )}
                    {review.loyaltyTier === "low" && (
                      <span className="text-xs font-bold text-gray-700 bg-gray-200 rounded px-2 py-0.5 mt-1">LOW</span>
                    )}
                  </div>
                  {review.productImage && (
                    <img
                      src={review.productImage}
                      alt={review.productName || "Product"}
                      className="w-24 h-24 object-cover rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white/40"
                    />
                  )}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-700 dark:text-green-400">
                        {review.productName || "General"}
                      </span>
                      {review.rating && (
                        <span className="flex items-center gap-1 ml-2 text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} />
                          ))}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {editingId === review.id ? (
                        <form
                          className="flex-1 flex flex-col gap-2"
                          onSubmit={async e => {
                            e.preventDefault();
                            try {
                              await import("../firebaseReviews").then(({ updateReview }) =>
                                updateReview(review.id, {
                                  text: editForm.text,
                                  rating: editForm.rating,
                                  loyaltyTier: editForm.loyaltyTier,
                                  showAvatar: editForm.showAvatar,
                                  avatarUrl: review.avatarUrl,
                                })
                              );
                              setReviews(reviews =>
                                reviews.map(r =>
                                  r.id === review.id
                                    ? { ...r, ...editForm }
                                    : r
                                )
                              );
                              setEditingId(null);
                            } catch (err) {
                              alert("Failed to update review.");
                            }
                          }}
                        >
                          <textarea
                            className="border rounded p-2 w-full text-gray-900"
                            value={editForm.text}
                            onChange={e => setEditForm(f => ({ ...f, text: e.target.value }))}
                          />
                          <select
                            className="border rounded p-2 w-full text-gray-900"
                            value={editForm.rating}
                            onChange={e => setEditForm(f => ({ ...f, rating: Number(e.target.value) }))}
                          >
                            {[5,4,3,2,1].map(r => (
                              <option key={r} value={r}>{r} Star{r>1?'s':''}</option>
                            ))}
                          </select>
                          {review.loyaltyTier && (
                            <select
                              className="border rounded p-2 w-full text-gray-900"
                              value={editForm.loyaltyTier}
                              onChange={e => setEditForm(f => ({ ...f, loyaltyTier: e.target.value }))}
                            >
                              <option value="top">Top Tier (VIP)</option>
                              <option value="mid">Mid Tier</option>
                              <option value="low">Low Tier</option>
                            </select>
                          )}
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={!!editForm.showAvatar}
                              onChange={e => setEditForm(f => ({ ...f, showAvatar: e.target.checked }))}
                            />
                            Show my avatar
                          </label>
                          <div className="flex gap-2 mt-2">
                            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                            <button type="button" className="bg-gray-300 text-gray-800 px-4 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed mb-1 flex-1">
                            {review.text}
                          </p>
                          {user && user.uid === review.userId && (
                            <button
                              className="ml-2 px-2 py-1 text-xs rounded bg-green-200 text-green-900 font-semibold hover:bg-green-300 transition"
                              onClick={() => {
                                setEditingId(review.id);
                                setEditForm({
                                  text: review.text,
                                  rating: review.rating,
                                  loyaltyTier: review.loyaltyTier,
                                  showAvatar: review.showAvatar,
                                });
                              }}
                            >
                              Edit
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">User:</span> {review.displayName || "Anonymous"}
                      {review.timestamp && (
                        <span className="ml-2">
                          {review.timestamp.seconds
                            ? new Date(review.timestamp.seconds * 1000).toLocaleString()
                            : new Date(review.timestamp).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
