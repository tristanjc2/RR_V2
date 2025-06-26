import React, { useEffect, useState } from "react";
import { fetchReviews, addReview, deleteReview } from "../firebaseReviews";

const ReviewSection = ({ isAdmin, productList = [], reviews: reviewsProp, productId, user }) => {
  const [form, setForm] = useState({
    name: user?.displayName || "",
    rating: 5,
    text: "",
    productId: "general",
    isAnonymous: false,
    showAvatar: true,
    loyaltyTier: user?.loyaltyTier || null,
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(true);
  const REVIEWS_PER_PAGE = 3;

  // Load reviews once
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
    // If reviews are passed as a prop, don't fetch
    if (!reviewsProp) load();
    else setLoading(false);
  }, [reviewsProp]);

  // Auto-rotate carousel every 5 seconds (pause on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPage(prev => (prev + 1) * REVIEWS_PER_PAGE < reviews.length ? prev + 1 : 0);
        setFade(true);
      }, 250); // match fade duration
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length, isHovered, page]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Find product name and image for selected productId
    let productName = "General";
    let productImage = null;
    if (form.productId !== "general") {
      const prod = productList.find(p => String(p.id) === String(form.productId));
      if (prod) {
        productName = prod.name;
        productImage = prod.image || null;
      }
    }
    const reviewData = {
      ...form,
      productName,
      productImage,
      displayName: form.isAnonymous ? "Anonymous" : (user?.displayName || form.name),
      avatarUrl: form.showAvatar && user?.photoURL ? user.photoURL : null,
      userId: user?.uid || null,
      role: user?.role || "user",
      loyaltyTier: user?.loyaltyTier || null,
    };
    try {
      await addReview(reviewData);
      // Reload reviews
      const data = await fetchReviews();
      setReviews(data);
      setForm({
        name: user?.displayName || "",
        rating: 5,
        text: "",
        productId: "general",
        isAnonymous: false,
        showAvatar: true,
        loyaltyTier: user?.loyaltyTier || null,
      });
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

  // Use prop reviews if provided, otherwise use fetched
  let filteredReviews = reviewsProp || reviews;
  if (productId) {
    filteredReviews = filteredReviews.filter(r => String(r.productId) === String(productId));
  }
  const paginatedReviews = filteredReviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);
  const hasNext = (page + 1) * REVIEWS_PER_PAGE < reviews.length;
  const hasPrev = page > 0;

  return (
    <div id="reviews">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
      {/* Only show message if no reviews for this product */}
      {productId && !filteredReviews.length && !loading && (
        <div className="text-gray-500 mb-4">No reviews for this product yet.</div>
      )}
      <button
        className="bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition mb-6 min-h-[44px]"
        onClick={() => setShowModal(true)}
      >
        Want to leave a review?
      </button>

      {/* Review Form Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-4 sm:p-8 rounded shadow-lg max-w-md w-full relative mx-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-3xl font-bold text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              style={{ lineHeight: '1', width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', zIndex: 10 }}
              aria-label="Close Modal"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h4 className="text-xl font-bold mb-4">Leave a Review</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Responsive form for mobile */}
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
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={form.isAnonymous}
                  onChange={handleChange}
                  className="accent-green-700"
                />
                Submit as Anonymous
              </label>
              {user && (
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    name="showAvatar"
                    checked={form.showAvatar}
                    onChange={handleChange}
                    className="accent-green-700"
                  />
                  Show my avatar
                </label>
              )}
              {user?.loyaltyTier && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Loyalty Tier:</span>
                  <select
                    name="loyaltyTier"
                    value={form.loyaltyTier || ""}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                  >
                    <option value="top">Top Tier (VIP)</option>
                    <option value="mid">Mid Tier</option>
                    <option value="low">Low Tier</option>
                  </select>
                </div>
              )}
              {user?.role === "admin" || user?.role === "staff" ? (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-800 font-semibold">{user.role === "admin" ? "Admin" : "Staff"} Review</span>
                </div>
              ) : null}
              <button
                type="submit"
                className="bg-green-700 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-800 transition w-full min-h-[44px]"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <div>Loading reviews...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul
        className={`space-y-4 transition-opacity duration-250 ${fade ? 'opacity-100' : 'opacity-0'} px-1 sm:px-0`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {paginatedReviews.map((r) => {
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
      <div className="flex gap-2 mt-4 flex-wrap justify-center">
        {hasPrev && (
          <button className="px-5 py-3 text-lg bg-gray-200 rounded-lg min-w-[44px] min-h-[44px]" onClick={() => setPage(page - 1)}>Prev</button>
        )}
        {hasNext && (
          <button className="px-5 py-3 text-lg bg-gray-200 rounded-lg min-w-[44px] min-h-[44px]" onClick={() => setPage(page + 1)}>Next</button>
        )}
      </div>
      {reviews.length > REVIEWS_PER_PAGE && !hasNext && (
        <button className="mt-4 underline text-green-700 text-lg min-h-[44px]" onClick={() => setPage(0)}>See more reviews</button>
      )}

    </div>
  );
};

export default ReviewSection;
