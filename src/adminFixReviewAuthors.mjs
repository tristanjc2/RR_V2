// Script to fix review authors for specific reviews
import { fetchReviews, updateReview } from "./firebaseReviews.js";

const YOUR_NAME = "Tristan Chandler";
const FLUFF_JAMES = "fluff james";

async function patchAuthors() {
  const allReviews = await fetchReviews();
  let patched = 0;
  for (const review of allReviews) {
    if (review.productName === "Zen OG Kush") {
      await updateReview(review.id, {
        displayName: YOUR_NAME,
        isAnonymous: false
      });
      patched++;
      console.log(`Set Zen OG Kush review ${review.id} author to Tristan Chandler`);
    } else if (review.productName === "Terpene Badder") {
      await updateReview(review.id, {
        displayName: FLUFF_JAMES,
        isAnonymous: false
      });
      patched++;
      console.log(`Set Terpene Badder review ${review.id} author to fluff james`);
    }
  }
  console.log(`Patched ${patched} reviews.`);
}

patchAuthors().then(() => process.exit(0));
