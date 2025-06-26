import React from "react";
import ProductDetailPage from "./ProductDetailPage";
import StorePage from "./StorePage";
import CategorySelector from "./CategorySelector";
import ProductList from "./ProductList";
import AdminProductForm from "./AdminProductForm";
import ReviewSection from "./ReviewSection";
import NewsletterSignup from "./NewsletterSignup";
import ContactForm from "./ContactForm";

const HomePage = ({
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
  setShowAddProduct,
}) => (
  <>
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
        <section className="bg-green-700 text-white py-16 px-4 text-center smokey-hero-bg">
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
            Browse Store
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
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
            />
            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 bg-gray-200 text-green-700 rounded-full font-semibold shadow hover:bg-gray-300 transition mb-8" onClick={() => setShowStore(false)}>
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
      </>
    )}
  </>
);

export default HomePage;
