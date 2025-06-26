// Dynamic import-based Firestore review patcher for maximum compatibility
(async () => {
  const { fetchReviews, updateReview } = await import('./firebaseReviews.js');
  const productsModule = await import('./data/products.js');
  const products = productsModule.default || productsModule.products || productsModule;

  const allReviews = await fetchReviews();
  let patched = 0;
  for (const review of allReviews) {
    if (
      review.productId &&
      (typeof review.productName !== "string" || review.productName === "General") &&
      review.productId !== "general"
    ) {
      const prod = products.find(p => String(p.id) === String(review.productId));
      if (prod) {
        await updateReview(review.id, {
          productName: prod.name,
          productImage: prod.image || null,
        });
        patched++;
        console.log(`Patched review ${review.id}: productName -> ${prod.name}`);
      }
    }
  }
  console.log(`Patched ${patched} reviews.`);
})();
