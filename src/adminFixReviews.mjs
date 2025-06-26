// One-time script to patch Firestore reviews with correct productName and productImage (ESM version)
import { fetchReviews, updateReview } from "./firebaseReviews.js";
import products from "./data/products.js";

async function patchReviews() {
  const allReviews = await fetchReviews();
  let patched = 0;
  for (const review of allReviews) {
    // Only patch if productId exists and productName is missing or 'General'
    if (
      review.productId &&
      (typeof review.productName !== "string" || review.productName === "General") &&
      review.productId !== "general"
    ) {
      const prod = products.find(
        (p) => String(p.id) === String(review.productId)
      );
      if (prod) {
        await updateReview(review.id, {
          productName: prod.name,
          productImage: prod.image || null,
        });
        patched++;
        console.log(
          `Patched review ${review.id}: productName -> ${prod.name}`
        );
      }
    }
  }
  console.log(`Patched ${patched} reviews.`);
}

patchReviews().then(() => process.exit(0));
