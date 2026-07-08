import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';

export default function Contact() {
  useEffect(() => {
    applySeo({
      title: 'Contact DERN SEED - Get in Touch with Our Agricultural Experts',
      description: 'Contact DERN SEED for certified seeds, agricultural support, and farming inquiries. Located in Musanze, Rwanda. Call +250 782 724 840 or email us today.',
      keywords: ['contact DERN SEED', 'certified seeds Rwanda', 'agricultural support', 'Musanze Rwanda', 'seed supplier contact'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseed.com/contact',
    });
  }, []);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      next.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      next.email = 'Email is required.';
    } else {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
      if (!ok) next.email = 'Enter a valid email address.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 3) {
      next.phone = 'Phone number is required.';
    }

    if (!formData.subject.trim()) {
      next.subject = 'Subject is required.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      next.message = 'Message is required (min 5 characters).';
    }

    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitted(true);
      const { api } = await import('@/lib/api');

      await api.post<{ ok: boolean; id: number }>("/api/contact", {
        ...formData,
        language: null,
      });

      setErrors({});
      setSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSubmitted(false);
      setErrors((prev) => ({
        ...prev,
        form: 'Submission failed. Please try again later.',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-80 flex items-center overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">Get In Touch</h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              We'd love to hear from you. Contact us with any questions about our certified seeds and agricultural services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-slide-in-left">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">Contact Info</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-10 leading-tight">Contact Information</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">Address</div>
                    <div className="text-gray-600">
                      P.O. BOX 45<br />
                      Musanze<br />
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
                    <div className="font-bold text-gray-900 mb-1">Phone</div>
                    <a href="tel:+250782724840" className="text-gray-600 hover:text-green-700 transition-colors">
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
                    <div className="font-bold text-gray-900 mb-1">Email</div>
                    <a href="mailto:dernseedcompanyltd2020@gmail.com" className="text-gray-600 hover:text-green-700 transition-colors">
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
                    <div className="font-bold text-gray-900 mb-1">Business Hours</div>
                    <div className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden h-64 shadow-lg border border-gray-200">
                <iframe
                  src="https://maps.app.goo.gl/3ERniWZbfJKnc9hN7"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Send Message</div>
              <h2 className="text-4xl font-bold font-poppins mb-8">Contact Form</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                    placeholder="Your name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                    placeholder="+250 (0) XXX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="service-inquiry">Service Inquiry</option>
                    <option value="training">Training Request</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent resize-none"
                    placeholder="Your message here..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold animate-fade-in-up">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

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
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4">Quick Answers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'How do I order seeds?',
                a: 'Contact our sales team via phone, email, or the contact form. We\'ll help you select the right seeds and arrange delivery.',
              },
              {
                q: 'What is your delivery timeframe?',
                a: 'We typically deliver within 5-7 business days. Delivery times may vary depending on location and order size.',
              },
              {
                q: 'Do you offer bulk discounts?',
                a: 'Yes, we offer competitive pricing for bulk orders. Contact our sales team for a custom quote.',
              },
              {
                q: 'Can I visit your office?',
                a: 'Yes, we welcome visits. Please call ahead to schedule an appointment with our team.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
