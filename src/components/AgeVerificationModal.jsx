import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AgeVerificationModal = ({ open, setOpen }) => {
  const [confirmed, setConfirmed] = useState(false);

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
          <h3 className="text-2xl font-bold mb-2">Age Verification</h3>
          <p className="mb-4">Are you at least 21 years old?</p>
          <button
            className="bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition w-full mb-2"
            onClick={() => {
              setConfirmed(true);
              setOpen(false);
            }}
          >
            Yes, I am 21 or older
          </button>
          <button
            className="text-gray-400 text-sm underline"
            onClick={() => {
              setConfirmed(false);
              setOpen(true);
              alert("Sorry, you must be of legal age to enter this site.");
            }}
          >
            No, I am not
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgeVerificationModal;
