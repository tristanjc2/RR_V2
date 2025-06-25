import React, { useState } from "react";

const AdminProductForm = ({ onSave, onCancel, initial }) => {
  const [form, setForm] = useState(
    initial || {
      name: "",
      description: "",
      image: "",
      price: 0,
      thc: 0,
      cbd: 0,
      effects: "",
      usage: "",
      reviews: []
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price), thc: parseFloat(form.thc), cbd: parseFloat(form.cbd) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <div>
        <input name="name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Name" required />
        <p className="text-xs text-gray-500 mt-1">Product name (e.g., "Zen OG Kush")</p>
      </div>
      <div>
        <textarea name="description" value={form.description} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Description" required />
        <p className="text-xs text-gray-500 mt-1">Short summary of the product shown on the card and details.</p>
      </div>
      <div>
        <input name="image" value={form.image} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Image URL" required />
        <p className="text-xs text-gray-500 mt-1">Direct link to a product image (e.g., from Unsplash or your assets folder).</p>
      </div>
      <div>
        <input name="price" type="number" value={form.price} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Price" required />
        <p className="text-xs text-gray-500 mt-1">Retail price in USD (e.g., 39.99)</p>
      </div>
      <div>
        <input name="thc" type="number" value={form.thc} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="THC %" required />
        <p className="text-xs text-gray-500 mt-1">THC content percentage (e.g., 22)</p>
      </div>
      <div>
        <input name="cbd" type="number" value={form.cbd} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="CBD %" required />
        <p className="text-xs text-gray-500 mt-1">CBD content percentage (e.g., 1)</p>
      </div>
      <div>
        <input name="effects" value={form.effects} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Effects" />
        <p className="text-xs text-gray-500 mt-1">Describe the main effects (e.g., "Relaxing, Calming")</p>
      </div>
      <div>
        <input name="usage" value={form.usage} onChange={handleChange} className="border px-3 py-2 rounded w-full" placeholder="Usage" />
        <p className="text-xs text-gray-500 mt-1">Suggested usage or best time to use (e.g., "Evening, Stress Relief")</p>
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="text-gray-500 px-4 py-2 rounded hover:bg-gray-100">Cancel</button>
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Save</button>
      </div>
    </form>
  );
};

export default AdminProductForm;
