"use client";

import { useState } from "react";

type FeedbackFormData = {
  name: string;
  email: string;
  message: string;
};

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (data: FeedbackFormData) => {
    if (!data.name.trim()) return "Name is required";
    if (!/\S+@\S+\.\S+/.test(data.email)) return "Invalid email";
    if (!data.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm(formData);
    if (error) {
      alert(error);
      return;
    }
    console.log("Feedback submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Feedback"
        className="w-full mb-4 p-3 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
