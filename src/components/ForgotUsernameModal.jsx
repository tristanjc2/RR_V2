import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ForgotUsernameModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would call Firebase or your backend to retrieve the username
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-8 max-w-sm w-full text-center relative"
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
        >
          <h3 className="text-2xl font-bold mb-4">Forgot Username</h3>
          {submitted ? (
            <div className="text-green-700">If your email exists, instructions have been sent.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
              >
                Send Username
              </button>
              <button
                type="button"
                className="text-gray-400 text-sm underline mt-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotUsernameModal;
