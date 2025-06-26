import React, { useState } from "react";

const validateName = (name) => /^[a-zA-Z\s'-]+$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMessage = (msg) => msg.trim().length >= 10;

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateName(form.name)) newErrors.name = "Enter a valid name (letters and spaces only).";
    if (!validateEmail(form.email)) newErrors.email = "Enter a valid email address.";
    if (!validateMessage(form.message)) newErrors.message = "Message must be at least 10 characters.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('https://formspree.io/f/mrbkolpy', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        });
        if (response.ok) {
          setSubmitted(true);
          setErrors({});
        } else {
          let data = {};
          try {
            data = await response.json();
          } catch (e) {}
          setErrors({ form: data.error || 'There was an error submitting the form. Please try again later.' });
        }
      } catch (err) {
        setErrors({ form: 'Network error: Unable to submit the form. Please check your connection and try again.' });
      }
    }
  };

  // TODO: Consider using environment variables for secrets (e.g., Formspree API key)

  return (
    <div id="contact" className="flex flex-col items-center justify-center text-center">
      <h4 className="text-2xl font-bold mb-2">Contact Us</h4>
      {submitted ? (
        <p className="text-green-700 font-semibold mb-6">Thank you for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`border px-3 py-2 rounded w-full ${errors.name ? 'border-red-500' : ''}`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className={`border px-3 py-2 rounded w-full ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message (at least 10 characters)"
              className={`border px-3 py-2 rounded w-full ${errors.message ? 'border-red-500' : ''}`}
              required
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition w-full"
          >
            Send Message
          </button>
        </form>
      )}
      {/* Social/Contact Icons (animated, matching footer) */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Telegram */}
        <a href="https://t.me/+TzgGpmtVBHY0MGY5" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="group hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <g>
              <path className="transition-all duration-300 group-hover:stroke-[#29A8E9] group-hover:scale-110" strokeLinecap="round" strokeLinejoin="round" d="M21.752 6.584a1.5 1.5 0 0 1-.986 1.877l-15 5a1.5 1.5 0 0 1-1.013-2.83l15-5a1.5 1.5 0 0 1 1.999 1.953z" />
              <path className="transition-all duration-300 group-hover:stroke-[#29A8E9] group-hover:translate-x-1" strokeLinecap="round" strokeLinejoin="round" d="M21.752 6.584l-8.752 8.752m0 0l-3.376-3.376m3.376 3.376l-1.5 4.5" />
            </g>
          </svg>
        </a>
        {/* Instagram */}
        <a href="https://www.instagram.com/reaperresins/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-pink-500 group-hover:scale-110"/>
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-yellow-400 group-hover:scale-110"/>
            <circle cx="17" cy="7" r="1" fill="currentColor" className="transition-all duration-300 group-hover:fill-purple-500 group-hover:scale-125"/>
          </svg>
        </a>
        {/* SMS */}
        <a href="sms:+12077379594" aria-label="Text Message" className="hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-700" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <rect x="5" y="7" width="14" height="10" rx="2" fill="#25D366"/>
            <rect x="7" y="9" width="10" height="2" rx="1" fill="#fff"/>
            <rect x="7" y="13" width="6" height="2" rx="1" fill="#fff"/>
          </svg>
        </a>
        {/* Phone */}
        <a href="tel:+12077379594" aria-label="Phone" className="group hover:scale-110 transition p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-blue-500 group-hover:scale-110"/>
            <path d="M20.354 10.646a.5.5 0 0 1-.708-.708l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 .708-.708L14 13.293l1.646-1.647a.5.5 0 0 1 .708 0z" stroke="currentColor" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-blue-500 group-hover:scale-110"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
