import { db } from './firebase.js';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const reviewsCollection = collection(db, 'reviews');

// Add a new review
export const addReview = async (reviewData) => {
  try {
    await addDoc(reviewsCollection, {
      ...reviewData,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding review: ", error);
    throw new Error('Failed to submit review.');
  }
};

// Fetch all reviews (for general display)
export const fetchReviews = async () => {
  try {
    const snapshot = await getDocs(reviewsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    throw new Error('Failed to load reviews.');
  }
};

// Fetch reviews for a specific user
export const fetchReviewsByUserId = async (userId) => {
    if (!userId) return [];
    try {
        const q = query(reviewsCollection, where('userId', '==', userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching user reviews: ", error);
        throw new Error('Failed to load your reviews.');
    }
};

// Update a review
export const updateReview = async (reviewId, updateFields) => {
    try {
        const reviewDoc = doc(db, 'reviews', reviewId);
        await updateDoc(reviewDoc, {
            ...updateFields,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating review: ", error);
        throw new Error('Failed to update review.');
    }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const reviewDoc = doc(db, 'reviews', reviewId);
    await deleteDoc(reviewDoc);
  } catch (error) {
    console.error("Error deleting review: ", error);
    throw new Error('Failed to delete review.');
  }
};
