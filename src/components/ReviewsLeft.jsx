import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Loader, AlertCircle, MessageSquare, ArrowLeft } from 'lucide-react';

import { useDebounce } from '../hooks/useDebounce';
import { fetchReviewsByUserId, updateReview, deleteReview } from '../firebaseReviews'; // Import Firebase functions
import ReviewCard from './ReviewCard';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ReviewsLeft = ({ user }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const getReviews = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const userReviews = await fetchReviewsByUserId(user.uid);
        setReviews(userReviews);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [user]);

  const handleUpdateReview = async (id, text) => {
    try {
      await updateReview(id, text);
      // Refresh reviews from Firestore
      if (user) {
        const userReviews = await fetchReviewsByUserId(user.uid);
        setReviews(userReviews);
      }
    } catch (err) {
      setError('Failed to update review.');
    }
  };

  const handleDeleteRequest = (id) => {
    setReviewToDelete(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await deleteReview(reviewToDelete);
      if (user) {
        const userReviews = await fetchReviewsByUserId(user.uid);
        setReviews(userReviews);
      }
      setIsModalOpen(false);
      setReviewToDelete(null);
    } catch (err) {
      setError('Failed to delete review.');
    } finally {
        setDeleteLoading(false);
    }
  };

  const filteredReviews = useMemo(() =>
    reviews.filter(review =>
      review.productName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ), [reviews, debouncedSearchTerm]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-10">
          <Loader className="w-12 h-12 text-green-500 animate-spin mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading your reviews...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-10 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-lg font-medium text-red-700 dark:text-red-300">{error}</p>
        </div>
      );
    }

    if (reviews.length > 0 && filteredReviews.length === 0) {
        return (
            <div className="text-center p-10">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No reviews match your search.</p>
            </div>
        )
    }

    if (filteredReviews.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-10">
          <MessageSquare className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">You haven't left any reviews yet.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">When you do, they'll show up here.</p>
        </div>
      );
    }

    return (
      <motion.div layout className="space-y-6">
        <AnimatePresence>
          {filteredReviews.map(review => (
            <ReviewCard key={review.id} review={review} onUpdate={handleUpdateReview} onDelete={handleDeleteRequest} />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
        >
            <button
                className="mb-6 text-green-600 dark:text-green-400 font-semibold hover:underline flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-1"
                onClick={() => navigate(-1)}
                aria-label="Back to Profile"
            >
                <ArrowLeft className="w-5 h-5" />
                Back
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Your Reviews</h1>
                <div className="relative mt-4 sm:mt-0 w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Filter reviews..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    />
                </div>
            </div>

            {renderContent()}
        </motion.div>

        <DeleteConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            loading={deleteLoading}
        />
    </div>
  );
};

export default ReviewsLeft;
