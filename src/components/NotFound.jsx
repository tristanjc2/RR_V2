import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-10">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-gray-600">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">Return Home</Link>
      </div>
    </main>
  );
}
