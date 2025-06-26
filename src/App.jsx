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

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";
import LoginModal from "./components/LoginModal";
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
import AppRoutes from "./AppRoutes";
import NotFound from "./components/NotFound";
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
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin' | 'user' | null
  const [user, setUser] = useState(null); // Firebase user object
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productList, setProductList] = useState(() => {
    const stored = localStorage.getItem("rr_products");
    return stored ? JSON.parse(stored) : products;
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [showStore, setShowStore] = useState(false);

  // Login actions
  const handleLogin = (type, firebaseUser = null) => {
    setUserType(type);
    setIsAdmin(type === "admin");
    setShowLogin(false);
    if (type === "admin") {
      setUser(null);
      console.log("Admin login successful");
    } else if (firebaseUser) {
      setUser(firebaseUser);
      console.log("User login successful", firebaseUser);
    }
  };

  const handleLogout = async () => {
    setUserType(null);
    setIsAdmin(false);
    setUser(null);
    const auth = getAuth(app);
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserType("user");
        setIsAdmin(false);
        console.log("User is signed in", firebaseUser);
      } else {
        setUser(null);
        setUserType(null);
        setIsAdmin(false);
        console.log("No user signed in");
      }
    });
    return () => unsubscribe();
  }, []);

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



  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-2 sm:px-0">
      <AgeVerificationModal open={showAgeModal} setOpen={setShowAgeModal} />
      <LoginModal open={showLogin} onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      <Header
        isAdmin={isAdmin}
        user={user}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        onHomeClick={() => {
          setDetailMode(false);
          setSelectedProduct(null);
          setShowStore(false);
        }}
      />
      <main className="flex-1">
        <AppRoutes
          user={user}
          detailMode={detailMode}
          selectedProduct={selectedProduct}
          productList={productList}
          isAdmin={isAdmin}
          handleEditProduct={handleEditProduct}
          setDetailMode={setDetailMode}
          setSelectedProduct={setSelectedProduct}
          showStore={showStore}
          setShowStore={setShowStore}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          handleAddProduct={handleAddProduct}
          handleDeleteProduct={handleDeleteProduct}
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
