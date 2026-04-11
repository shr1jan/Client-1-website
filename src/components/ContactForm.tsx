"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const serviceOptions = [
  "Stamped Concrete Patio",
  "Driveway & Walkway",
  "Pool Deck",
  "Interior Floor",
  "Concrete Resurfacing",
  "Custom Pattern & Color",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-tan/30 rounded-sm text-charcoal placeholder:text-warm-gray-light focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitted && (
        <div className="bg-terracotta/10 border border-terracotta/30 text-terracotta-dark px-5 py-4 rounded-sm text-sm font-medium">
          Thank you! We&apos;ll be in touch within 24 hours.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email Address *"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
        />
        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className={inputClass}
          style={{ color: form.service ? undefined : "var(--color-warm-gray-light)" }}
        >
          <option value="" disabled>Select a Service</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Tell us about your project..."
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        className="w-full md:w-auto px-10 py-4 bg-terracotta text-white font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-terracotta-dark transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  );
}
