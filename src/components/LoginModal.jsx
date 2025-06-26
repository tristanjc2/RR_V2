import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: For production, load Firebase config from environment variables, not source code!
import { app } from "../firebase";
import ForgotUsernameModal from "./ForgotUsernameModal";
import CreateAccountModal from "./CreateAccountModal";

const LoginModal = ({ open, onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      const user = auth.currentUser;
      onLogin("user", user);
      // Optionally, log successful login for analytics
    } catch (err) {
      setLoading(false);
      // Show more descriptive error if available
      setError(err.message || "Invalid email or password");
      // Optionally, log error for monitoring
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      await signInWithPopup(auth, provider);
      setLoading(false);
      const user = auth.currentUser;
      onLogin("user", user);
      console.log("Google login successful", user);
    } catch (err) {
      setLoading(false);
      setError("Google login failed");
      console.error("Google login failed", err);
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
          <h3 className="text-2xl font-bold mb-4">Login</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Email or admin username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              autoFocus
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
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full mt-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Login with Google"}
            </button>
            <div className="flex flex-col gap-2 mt-4">
              <button
                type="button"
                className="text-green-700 underline text-sm"
                onClick={() => setShowForgot(true)}
              >
                Forgot Username?
              </button>
              <button
                type="button"
                className="text-green-700 underline text-sm"
                onClick={() => setShowCreate(true)}
              >
                Create Account
              </button>
              <button
                type="button"
                className="text-gray-400 text-sm underline mt-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
          <ForgotUsernameModal open={showForgot} onClose={() => setShowForgot(false)} />
          <CreateAccountModal open={showCreate} onClose={() => setShowCreate(false)} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
