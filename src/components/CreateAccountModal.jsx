import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const CreateAccountModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message || 'There was an error creating your account. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      await signInWithPopup(auth, provider);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
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
          <h3 className="text-2xl font-bold mb-4">Create Account</h3>
          {success ? (
            <div className="text-green-700">Account created! You may now log in.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                required
              />
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
              >
                Create Account
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full mt-2"
                onClick={handleGoogleSignup}
              >
                Sign up with Google
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

export default CreateAccountModal;
