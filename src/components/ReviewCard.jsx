import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Save, X } from 'lucide-react';

const ReviewCard = ({ review, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    onUpdate(review.id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(review.content);
    setIsEditing(false);
  };

  const handleTextareaChange = (e) => {
    setEditedContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{review.productName}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(review.timestamp).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={handleUpdate} className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 focus:outline-none focus:ring-2 focus:ring-green-500">
                <Save className="w-5 h-5 text-green-600 dark:text-green-400" />
              </button>
              <button onClick={handleCancel} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button onClick={() => onDelete(review.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-500">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editedContent}
          onChange={handleTextareaChange}
          className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 dark:text-gray-200"
          rows={3}
        />
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{review.content}</p>
      )}
    </motion.div>
  );
};

export default ReviewCard;
