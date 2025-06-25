/*
README — Reaper Resins Cannabis Web App
==================================

Customization Instructions:
- Brand Name: Search and replace "Reaper Resins" with your brand name.
- Theme Colors: Edit tailwind.config.js or override classes in components.
- Products: Edit src/data/products.js with your own product info and images.
- Reviews: Edit src/data/reviews.js or allow users to add reviews live.
- Contact Info: Update the ContactForm component.
- Age Verification: Toggle 18+/21+ in AgeVerificationModal.
- Newsletter: Edit NewsletterSignup or remove if not needed.
- Assets: Replace images in src/assets/ (marked with TODOs).

Deploy as a static site (Vercel, Netlify, etc.). No server required.
*/

import React, { useState } from "react";
import AdminLoginModal from "./components/AdminLoginModal";
import AdminProductForm from "./components/AdminProductForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import CategorySelector from "./components/CategorySelector";
import StorePage from "./components/StorePage";
import ProductModal from "./components/ProductModal";
import ProductDetailPage from "./components/ProductDetailPage";
import ReviewSection from "./components/ReviewSection";
import NewsletterSignup from "./components/NewsletterSignup";
import AgeVerificationModal from "./components/AgeVerificationModal";
import ContactForm from "./components/ContactForm";
import products from "./data/products";
// import reviews from "./data/reviews"; // Now using Firestore

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailMode, setDetailMode] = useState(false);
  const [productReviews, setProductReviews] = useState(() => {
    const stored = localStorage.getItem("rr_product_reviews");
    return stored ? JSON.parse(stored) : {};
  });
  const [showAgeModal, setShowAgeModal] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productList, setProductList] = useState(() => {
    const stored = localStorage.getItem("rr_products");
    return stored ? JSON.parse(stored) : products;
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [showStore, setShowStore] = useState(false);

  // Admin actions
  const handleAddProduct = (product) => {
    const updated = [...productList, { ...product, id: Date.now() }];
    setProductList(updated);
    localStorage.setItem("rr_products", JSON.stringify(updated));
    setShowAddProduct(false);
  };
  const handleEditProduct = (id, updatedFields) => {
    const updated = productList.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setProductList(updated);
    localStorage.setItem("rr_products", JSON.stringify(updated));
  };
  const handleDeleteProduct = (id) => {
    const updated = productList.filter(p => p.id !== id);
    setProductList(updated);
    localStorage.setItem("rr_products", JSON.stringify(updated));
    setSelectedProduct(null);
  };



  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AgeVerificationModal open={showAgeModal} setOpen={setShowAgeModal} />
      <AdminLoginModal open={showAdminLogin} onLogin={() => { setIsAdmin(true); setShowAdminLogin(false); }} onClose={() => setShowAdminLogin(false)} />
      <Header
        isAdmin={isAdmin}
        onAdminLogin={() => setShowAdminLogin(true)}
        onAdminLogout={() => setIsAdmin(false)}
        onHomeClick={() => {
          setDetailMode(false);
          setSelectedProduct(null);
          setShowStore(false);
        }}
      />
      <main className="flex-1">
        {detailMode && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            productList={productList}
            onSave={updatedProduct => {
              handleEditProduct(updatedProduct.id, updatedProduct);
              setSelectedProduct({ ...selectedProduct, ...updatedProduct });
            }}
            isAdmin={isAdmin}
            onBack={() => { setDetailMode(false); setSelectedProduct(null); }}
          />
        ) : (
          <>
            <section className="bg-green-700 text-white py-16 px-4 text-center">
              <button
                className="text-5xl font-bold mb-4 bg-transparent border-none outline-none cursor-pointer hover:underline"
                style={{ color: 'inherit' }}
                onClick={() => setShowStore(false)}
              >
                Reaper Resins
              </button>
              <p className="text-xl mb-6">Elevate your senses. Discover premium cannabis products for a modern lifestyle.</p>
              <button
                className="inline-block bg-white text-green-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-green-100 transition"
                onClick={() => setShowStore(true)}
              >
                Shop Now
              </button>
            </section>
            {showStore ? (
              <>
                <StorePage
                  products={productList}
                  isAdmin={isAdmin}
                  onAdd={handleAddProduct}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onSelect={p => { setSelectedProduct(p); setDetailMode(true); }}
                />
                <div className="flex justify-center mt-8">
                  <button className="px-6 py-2 bg-gray-200 text-green-700 rounded-full font-semibold shadow hover:bg-gray-300 transition" onClick={() => setShowStore(false)}>
                    Back to Home
                  </button>
                </div>
              </>
            ) : (
              <section id="products" className="py-12 px-4 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h2 className="text-3xl font-bold text-center">Our Products</h2>
                  {isAdmin && <button className="bg-green-700 text-white px-4 py-2 rounded ml-4" onClick={() => setShowAddProduct(true)}>Add Product</button>}
                </div>
                <CategorySelector
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                  onCategorySelect={(cat) => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory("");
                  }}
                  onSubcategorySelect={setSelectedSubcategory}
                />
                <ProductList
                  products={productList.filter(p => {
                    if (!selectedCategory) return true;
                    if (!selectedSubcategory) return p.category === selectedCategory;
                    return p.category === selectedCategory && p.subcategory === selectedSubcategory;
                  })}
                  onSelect={p => { setSelectedProduct(p); setDetailMode(true); }}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              </section>
            )}
          </>
        )}

        {showAddProduct && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><AdminProductForm onSave={handleAddProduct} onCancel={() => setShowAddProduct(false)} /></div>}
        {!detailMode && (
          <section className="py-12 px-4 bg-white max-w-4xl mx-auto">
            <ReviewSection isAdmin={isAdmin} productList={productList} />
          </section>
        )}
        <section className="py-12 px-4 max-w-2xl mx-auto">
          <NewsletterSignup />
        </section>
        <section className="py-12 px-4 bg-gray-100 max-w-2xl mx-auto">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
