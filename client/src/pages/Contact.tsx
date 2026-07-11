import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { applySeo } from "@/lib/seo";
import { useLanguage } from "@/contexts/LanguageContext";
import {api } from "@/lib/api"; // Make sure this import path is correct for your project

export default function Contact() {
  const { t } = useLanguage();

  useEffect(() => {
    applySeo({
      title:
        t("contact_seo_title") ||
        "Contact DERN SEED - Get in Touch with Our Agricultural Experts",
      description:
        t("contact_seo_description") ||
        "Contact DERN SEED for certified seeds, agricultural support, and farming inquiries. Located in Musanze, Rwanda. Call +250 782 724 840 or email us today.",
      keywords: [
        "contact DERN SEED",
        "certified seeds Rwanda",
        "agricultural support",
        "Musanze Rwanda",
        "seed supplier contact",
      ],
      ogImage: "/images/logo.png",
      canonical: "https://dernseed.com/contact",
    });
  }, [t]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      next.fullName =
        t("validation_full_name_required") || "Full name is required.";
    }

    if (!formData.email.trim()) {
      next.email = t("validation_email_required") || "Email is required.";
    } else {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      if (!ok)
        next.email =
          t("validation_email_invalid") || "Enter a valid email address.";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 3) {
      next.phone =
        t("validation_phone_required") || "Phone number is required.";
    }

    if (!formData.subject.trim()) {
      next.subject = t("validation_subject_required") || "Subject is required.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      next.message =
        t("validation_message_min") ||
        "Message is required (min 5 characters).";
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    // If there are errors, stop submission
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    setErrors(prev => ({ ...prev, form: "" }));

    try {
      const response = await api.post<{ ok: boolean; id: number }>(
        "/api/contact",
        {
          ...formData,
          language: null,
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        form:
          t("contact_form_error") ||
          "Submission failed. Please try again later.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjectOptions = [
    {
      value: "product-inquiry",
      label: t("subject_product_inquiry") || "Product Inquiry",
    },
    {
      value: "service-inquiry",
      label: t("subject_service_inquiry") || "Service Inquiry",
    },
    { value: "training", label: t("subject_training") || "Training Request" },
    {
      value: "partnership",
      label: t("subject_partnership") || "Partnership Opportunity",
    },
    { value: "other", label: t("subject_other") || "Other" },
  ];

  const faqs = [
    {
      q: t("faq_order_seeds") || "How do I order seeds?",
      a:
        t("faq_order_seeds_answer") ||
        "Contact our sales team via phone, email, or the contact form. We'll help you select the right seeds and arrange delivery.",
    },
    {
      q: t("faq_delivery_time") || "What is your delivery timeframe?",
      a:
        t("faq_delivery_time_answer") ||
        "We typically deliver within 5-7 business days. Delivery times may vary depending on location and order size.",
    },
    {
      q: t("faq_bulk_discounts") || "Do you offer bulk discounts?",
      a:
        t("faq_bulk_discounts_answer") ||
        "Yes, we offer competitive pricing for bulk orders. Contact our sales team for a custom quote.",
    },
    {
      q: t("faq_visit_office") || "Can I visit your office?",
      a:
        t("faq_visit_office_answer") ||
        "Yes, we welcome visits. Please call ahead to schedule an appointment with our team.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-80 flex items-center overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">
              {t("contact_get_in_touch") || "Get In Touch"}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              {t("contact_contact_information") ||
                "We'd love to hear from you. Contact us with any questions about our certified seeds and agricultural services."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-slide-in-left">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">
                {t("contact_contact_information") || "Contact Info"}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-poppins mb-10 leading-tight">
                {t("contact_contact_information") || "Get in Touch"}
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white mb-1">
                      {t("contact_address") || "Address"}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      P.O. BOX 45
                      <br />
                      Musanze
                      <br />
                      Rwanda
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white mb-1">
                      {t("contact_phone") || "Phone"}
                    </div>
                    <a
                      href="tel:+250782724840"
                      className="text-gray-600 dark:text-gray-300 hover:text-green-700 transition-colors"
                    >
                      +250 782 724 840
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white mb-1">
                      {t("contact_email") || "Email"}
                    </div>
                    <a
                      href="mailto:dernseedcompanyltd2020@gmail.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-green-700 transition-colors"
                    >
                      dernseedcompanyltd2020@gmail.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white mb-1">
                      {t("contact_hours") || "Business Hours"}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {t("contact_hours_text") ||
                        "Monday - Friday: 8:00 AM - 5:00 PM"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden h-64 shadow-lg border border-gray-200 dark:border-gray-700">
                <iframe
                  src="https://maps.google.com/maps?q=Musanze+Rwanda&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DERN SEED Location Map"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                {t("contact_send_message") || "Send Message"}
              </div>
              <h2 className="text-4xl font-bold font-poppins mb-8">
                {t("contact_form_title") || "Contact Form"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    {t("contact_full_name") || "Full Name"}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t("contact_name_placeholder") || "Your name"}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    {t("contact_email_address") || "Email Address"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={
                      t("contact_email_placeholder") || "your@email.com"
                    }
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    {t("contact_phone_number") || "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={
                      t("contact_phone_placeholder") || "+250 (0) XXX XXX XXX"
                    }
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    {t("contact_subject") || "Subject"}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">
                      {t("contact_select_subject") || "Select a subject"}
                    </option>
                    {subjectOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    {t("contact_message") || "Message"}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-white ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={
                      t("contact_message_placeholder") || "Your message here..."
                    }
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      {t("contact_sending") || "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t("contact_send_button") || "Send Message"}
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold animate-fade-in-up">
                    ✓{" "}
                    {t("contact_success") ||
                      "Message sent successfully! We'll get back to you soon."}
                  </div>
                )}

                {/* Error Message */}
                {errors.form && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold animate-fade-in-up">
                    {errors.form}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4 dark:text-white">
              {t("faq_title") || "Quick Answers"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("faq_subtitle") || "Find quick answers to common questions."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900 dark:text-white">
                  {item.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
