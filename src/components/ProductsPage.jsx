import React from "react";
import CategorySelector from "./CategorySelector";
import ProductList from "./ProductList";

const ProductsPage = ({
  productList,
  isAdmin,
  handleEditProduct,
  handleDeleteProduct,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  setSelectedProduct,
  setDetailMode,
}) => (
  <section id="products" className="py-12 px-4 max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
      <h2 className="text-3xl font-bold text-center">Our Products</h2>
      {isAdmin && <button className="bg-green-700 text-white px-4 py-2 rounded ml-4" onClick={() => {}}>Add Product</button>}
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
);

export default ProductsPage;
