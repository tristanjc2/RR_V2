import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
// import toast from "react-hot-toast"; // Uncomment if using toast notifications

const contactPlatforms = [
  { value: "snapchat", label: "Snapchat" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "facebook", label: "Facebook" },
  { value: "kik", label: "Kik" },
];

const contactOptions = [
  { value: "phone", label: "Phone Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "social", label: "Social Platform" },
];

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  contactMethod: z.string(),
  socialPlatform: z.string().optional(),
  socialHandle: z.string().optional(),
  contactValue: z.string().optional(),
});

const ProfilePage = ({ user }) => {
  const authUser = user || getAuth(app).currentUser;
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(false);
  const [savedData, setSavedData] = useState(null);
  const [theme, setTheme] = useState("light");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: authUser?.displayName?.split(" ")[0] || "",
      lastName: authUser?.displayName?.split(" ")[1] || "",
      contactMethod: "email",
      socialPlatform: "",
      socialHandle: "",
      contactValue: authUser?.email || "",
    },
  });

  const contactMethod = watch("contactMethod");
  const socialPlatform = watch("socialPlatform");

  const onSubmit = (data) => {
    setSavedData(data);
    setEditing(false);
    setPreview(false);
    // toast.success("Profile updated!");
  };

  if (!authUser) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
        <div className="text-2xl font-bold text-gray-700">You must be logged in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-end bg-gradient-to-br from-green-50 to-green-200 overflow-hidden">
      {/* Animated Blobs/Backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <svg width="100%" height="100%" className="absolute top-0 left-0 blur-2xl opacity-40 animate-pulse" style={{ zIndex: 0 }}>
          <defs>
            <radialGradient id="blobGrad" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <ellipse cx="60%" cy="40%" rx="340" ry="160" fill="url(#blobGrad)" />
          <ellipse cx="30%" cy="70%" rx="240" ry="120" fill="url(#blobGrad)" />
        </svg>
      </motion.div>

      {/* Centered Profile Card */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="max-w-4xl mx-auto p-4 sm:p-8 bg-white/90 rounded-2xl shadow-2xl mt-4 sm:mt-12 mb-6 sm:mb-10 flex flex-col md:flex-row gap-6 md:gap-20"
        >
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <motion.div
              className="w-36 h-36 rounded-full bg-gradient-to-tr from-green-400 via-green-200 to-green-100 shadow-2xl border-4 border-green-300 flex items-center justify-center relative"
              style={{ boxShadow: "0 0 60px 10px #6ee7b7, 0 4px 32px #34d399" }}
              animate={{ boxShadow: [
                "0 0 60px 10px #6ee7b7, 0 4px 32px #34d399",
                "0 0 80px 20px #6ee7b7, 0 4px 32px #34d399",
                "0 0 60px 10px #6ee7b7, 0 4px 32px #34d399"
              ] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <img
                src={authUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.displayName || authUser.email || "U")}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                style={{ filter: "drop-shadow(0 0 16px #6ee7b7)" }}
              />
            </motion.div>
          </div>

          {/* Editable Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={`w-full px-5 py-3 rounded-xl bg-white/60 border border-green-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${errors.firstName ? "border-red-400" : ""}`}
                      placeholder="First Name"
                      autoComplete="off"
                    />
                  )}
                />
              </div>
              <div className="relative flex-1">
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={`w-full px-5 py-3 rounded-xl bg-white/60 border border-green-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${errors.lastName ? "border-red-400" : ""}`}
                      placeholder="Last Name"
                      autoComplete="off"
                    />
                  )}
                />
              </div>
            </div>

            {/* Contact Preferences */}
            <div className="flex flex-col gap-2">
              <label className="text-green-800 font-semibold mb-1">Preferred Contact Method</label>
              <Controller
                name="contactMethod"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full px-5 py-3 rounded-xl bg-white/60 border border-green-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
                  >
                    {contactOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}
              />
              {contactMethod === "social" && (
                <div className="flex gap-3 mt-2">
                  <Controller
                    name="socialPlatform"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/60 border border-green-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        <option value="">Choose Platform</option>
                        {contactPlatforms.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}
                  />
                  <Controller
                    name="socialHandle"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/60 border border-green-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Your handle or link"
                      />
                    )}
                  />
                </div>
              )}
              {contactMethod !== "social" && (
                <Controller
                  name="contactValue"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full px-5 py-3 rounded-xl bg-white/60 border border-green-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder={`Enter your ${contactMethod}`}
                    />
                  )}
                />
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="mt-2 w-full py-3 rounded-xl bg-green-700 text-white font-bold shadow-lg hover:bg-green-800 transition-all text-lg"
            >
              Save Changes
            </motion.button>
          </form>

          {/* Navigation to subpages */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.04 }}
              className="px-6 py-2 rounded-lg bg-green-100 text-green-800 font-semibold shadow hover:bg-green-200 transition"
              onClick={() => window.location.href = "/profile/settings"}
            >
              Profile Settings
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.04 }}
              className="px-6 py-2 rounded-lg bg-green-100 text-green-800 font-semibold shadow hover:bg-green-200 transition"
              onClick={() => window.location.href = "/profile/reviews"}
            >
              Reviews Left
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.04 }}
              className="px-6 py-2 rounded-lg bg-green-100 text-green-800 font-semibold shadow hover:bg-green-200 transition"
              onClick={() => window.location.href = "/profile/liked"}
            >
              Products Liked
            </motion.button>
          </div>
        </motion.div>
      </div>
      {/* Only Footer below */}
      <footer className="w-full mt-auto">
        {/* Import and use your Footer component here if needed */}
      </footer>
    </div>
  );
};

export default ProfilePage;
