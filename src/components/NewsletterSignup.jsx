import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-green-100 rounded-lg p-6 text-center">
      <h4 className="text-xl font-bold mb-2">Join Our Newsletter</h4>
      <p className="mb-4">Get updates on new products, deals, and more.</p>
      {submitted ? (
        <p className="text-green-700 font-semibold">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            className="border px-3 py-2 rounded w-full sm:w-auto"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
