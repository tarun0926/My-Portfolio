import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaSpinner } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Get form field values using FormData for type safety
    const formData = new FormData(formRef.current);
    const name = (formData.get("user_name") as string || "").trim();
    const email = (formData.get("user_email") as string || "").trim();
    const subject = (formData.get("subject") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    // 1. Validate required fields
    if (!name || !email || !subject || !message) {
      console.warn("[Contact Form] Validation failed: Some fields are empty.");
      setStatus({
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`[Contact Form] Validation failed: Invalid email format (${email}).`);
      setStatus({
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    // =========================================================================
    // FORMSPREE CONFIGURATION
    // -------------------------------------------------------------------------
    // To set up live submissions to kotiyatarun639@gmail.com:
    // 1. Go to https://formspree.io/ and sign up for a free account.
    // 2. Create a new form, name it (e.g. "Portfolio Contact"), and set the target
    //    email to: kotiyatarun639@gmail.com
    // 3. Formspree will provide a custom API endpoint URL.
    // 4. Replace the URL in the constant below with your Formspree endpoint URL.
    //    Example: "https://formspree.io/f/mvovlqke"
    // =========================================================================
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeoqyqy";

    try {
      console.log("[Contact Form] Submitting form data...", { name, email, subject, message });

      // Check if Formspree endpoint is configured correctly
      if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID_HERE")) {
        const configError = "The Formspree endpoint is not configured. Please replace 'YOUR_FORM_ID_HERE' with your real Formspree form ID inside src/components/Contact.tsx.";
        console.error(`[Contact Form] Configuration Error: ${configError}`);
        throw new Error(configError);
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      });

      if (response.ok) {
        const responseData = await response.json().catch(() => ({}));
        console.log("[Contact Form] Formspree API success:", responseData);
        setLoading(false);
        setStatus({
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        });
        formRef.current?.reset();
      } else {
        let errorMessage = "Failed to send message.";
        try {
          const errorData = await response.json();
          console.error("[Contact Form] Formspree API Error response:", errorData);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
            errorMessage = errorData.errors.map((err: any) => `${err.field ? `'${err.field}' field: ` : ""}${err.message}`).join(", ");
          }
        } catch (e) {
          errorMessage = `HTTP Error ${response.status}: ${response.statusText || "Unknown status"}`;
          console.error("[Contact Form] Failed to parse error JSON:", e);
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("[Contact Form] Form submission error:", error);
      setLoading(false);
      setStatus({
        success: false,
        message: `Submission failed: ${error.message || "Unknown error occurred"}. Please try again later.`,
      });
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 bg-transparent overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent font-space"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-cyan-400 mx-auto mt-4 rounded-full shadow-[0_0_8px_#00E5FF]"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Social Links & Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-space">Let's Connect</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Whether you have a project idea, want to talk about Data Structures and Algorithms, or need a developer to join your Java or web team, I'd love to chat. Drop a message!
              </p>
            </div>

            {/* Icon Info Blocks */}
            <div className="space-y-4">
              <a
                href="mailto:kotiyatarun639@gmail.com"
                className="flex items-center gap-4 p-4 border border-cyan-500/10 bg-slate-900/30 hover:border-cyan-500/35 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-cyan-950/40 border border-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="block text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest leading-none mb-1 font-space">
                    Email Address
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-slate-200 font-space">
                    kotiyatarun639@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-cyan-500/10 bg-slate-900/30 hover:border-cyan-500/35 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-cyan-950/40 border border-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  <FaLinkedin />
                </div>
                <div>
                  <span className="block text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest leading-none mb-1 font-space">
                    LinkedIn Profile
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-slate-200 font-space">
                    linkedin.com/in/tarunkotiya
                  </span>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-cyan-500/10 bg-slate-900/30 hover:border-cyan-500/35 rounded-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-cyan-950/40 border border-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300">
                  <FaGithub />
                </div>
                <div>
                  <span className="block text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest leading-none mb-1 font-space">
                    GitHub Profile
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-slate-200 font-space">
                    github.com/tarunkotiya
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 md:p-8 border border-cyan-500/15 bg-slate-900/30 backdrop-blur-sm rounded-2xl shadow-xl"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-space">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="user_name" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-space">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-slate-950/90 border border-cyan-500/20 focus:border-cyan-500/60 rounded-xl text-xs md:text-sm text-slate-200 outline-none transition-all duration-300 font-sans"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="user_email" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-space">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-slate-950/90 border border-cyan-500/20 focus:border-cyan-500/60 rounded-xl text-xs md:text-sm text-slate-200 outline-none transition-all duration-300 font-sans"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2 font-space">
                <label htmlFor="subject" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-space">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="Enter message subject"
                  className="w-full px-4 py-3 bg-slate-950/90 border border-cyan-500/20 focus:border-cyan-500/60 rounded-xl text-xs md:text-sm text-slate-200 outline-none transition-all duration-300 font-sans"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 font-space">
                <label htmlFor="message" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-space">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-slate-950/90 border border-cyan-500/20 focus:border-cyan-500/60 rounded-xl text-xs md:text-sm text-slate-200 outline-none transition-all duration-300 resize-none font-sans"
                />
              </div>

              {/* Status Alert Notification */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border text-xs font-semibold rounded-xl ${
                    status.success
                      ? "border-green-500/30 bg-green-950/25 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : "border-red-500/30 bg-red-950/25 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800 text-[#0B1120] font-bold rounded-xl text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer font-space"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
