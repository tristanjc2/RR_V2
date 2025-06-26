import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import ProfileSettings from "./components/ProfileSettings";
import ReviewsLeft from "./components/ReviewsLeft";
import ProductsLiked from "./components/ProductsLiked";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import ReviewsPage from "./components/ReviewsPage";

import NotFound from "./components/NotFound";

const AppRoutes = ({
  user,
  detailMode,
  selectedProduct,
  productList,
  isAdmin,
  handleEditProduct,
  setDetailMode,
  setSelectedProduct,
  showStore,
  setShowStore,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  handleAddProduct,
  handleDeleteProduct,
  showAddProduct,
  setShowAddProduct
}) => (
  <Routes>
    <Route path="/" element={
      <HomePage
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
    } />
    <Route path="/products" element={
      <ProductsPage
        productList={productList}
        isAdmin={isAdmin}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        setSelectedProduct={setSelectedProduct}
        setDetailMode={setDetailMode}
      />
    } />
    <Route path="/reviews" element={<ReviewsPage />} />
    <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/" replace />} />
    <Route path="/profile/settings" element={user ? <ProfileSettings user={user} /> : <Navigate to="/" replace />} />
    <Route path="/profile/reviews" element={user ? <ReviewsLeft user={user} /> : <Navigate to="/" replace />} />
    <Route path="/profile/liked" element={user ? <ProductsLiked user={user} /> : <Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
