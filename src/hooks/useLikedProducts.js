import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Hook for managing liked products for the current user
export default function useLikedProducts() {
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLiked([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ref = doc(db, "users", user.uid);
    getDoc(ref).then((snap) => {
      if (snap.exists() && snap.data().likedProducts) {
        setLiked(snap.data().likedProducts);
      } else {
        setLiked([]);
      }
      setLoading(false);
    });
  }, [user]);

  const likeProduct = useCallback(
    async (productId) => {
      if (!user) return;
      setLiked((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, { likedProducts: arrayUnion(productId) }, { merge: true });
    },
    [user]
  );

  const unlikeProduct = useCallback(
    async (productId) => {
      if (!user) return;
      setLiked((prev) => prev.filter((id) => id !== productId));
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { likedProducts: arrayRemove(productId) });
    },
    [user]
  );

  const isProductLiked = useCallback(
    (productId) => liked.includes(productId),
    [liked]
  );

  return { liked, loading, likeProduct, unlikeProduct, isProductLiked };
}
