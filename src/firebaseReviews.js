// Firestore CRUD for reviews
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const REVIEWS_COLLECTION = "reviews";

export async function fetchReviews() {
  const q = query(collection(db, REVIEWS_COLLECTION), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function addReview(review) {
  // Add server timestamp if you want, or use local date
  return await addDoc(collection(db, REVIEWS_COLLECTION), {
    ...review,
    date: new Date().toISOString()
  });
}

export async function deleteReview(id) {
  return await deleteDoc(doc(db, REVIEWS_COLLECTION, id));
}
