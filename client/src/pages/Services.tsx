import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronDown, Leaf, TrendingUp, Users, Award, Headphones, Droplet, Sprout, ShieldCheck, GraduationCap, MapPin as MapPinIcon, FlaskConical, Handshake, Landmark, HeartHandshake, Truck, ClipboardList, BarChart3 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Services() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const services = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: 'Certified Seed Production & Multiplication',
      description: 'We produce and multiply high-quality certified seeds — Irish potato, bean, maize, wheat, and soybean — that meet national quality standards, ensuring farmers have access to reliable planting materials for improved yields.',
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Production & Supply of Certified Seeds',
      description: 'We process and supply certified seeds to farmers, cooperatives, agribusinesses, and development organizations, including multiplication, quality control, packaging, storage, and distribution to local and regional markets.',
    },
    {
      icon: <Sprout className="w-10 h-10" />,
      title: 'Climate-Resilient & High-Yield Varieties',
      description: 'We develop, promote, and supply seed varieties adapted to changing environmental conditions — built to withstand drought, pests, and disease while increasing productivity and profitability.',
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: 'Contract Seed Multiplication',
      description: 'We partner with farmers, cooperatives, and agricultural organizations, providing pre-basic and basic seed, technical guidance, and market access under agreed standards and conditions.',
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: 'Seed Processing & Packaging',
      description: 'We conduct cleaning, grading, sorting, treatment, quality control, and packaging to improve seed purity, germination rates, and storage life — collaborating with trusted partners for large-scale needs.',
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: 'Farmer Training & Capacity Building',
      description: 'We train farmers, cooperatives, and producer groups on quality seed production, good agricultural practices, climate-smart farming, post-harvest handling, and agribusiness management.',
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: 'Agricultural Extension Services',
      description: 'We offer technical guidance on seed selection, planting, crop management, pest and disease control, soil fertility management, and post-harvest practices.',
    },
    {
      icon: <MapPinIcon className="w-10 h-10" />,
      title: 'Demonstration Plots & Field Trials',
      description: 'We establish demonstration plots and conduct field trials to showcase improved and climate-resilient varieties under real farming conditions, refining recommendations for different agro-ecological zones.',
    },
    {
      icon: <Droplet className="w-10 h-10" />,
      title: 'Agronomic Advisory Services',
      description: 'We guide farmers on soil preparation, planting techniques, fertilizer use, pest and disease management, irrigation practices, and crop nutrition.',
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: 'Agro-Input Distribution',
      description: 'We supply and distribute quality seeds, fertilizers, and crop protection products sourced from trusted suppliers, through local networks and partnerships.',
    },
    {
      icon: <FlaskConical className="w-10 h-10" />,
      title: 'Research & Development Partnerships',
      description: 'We collaborate with research institutions, universities, and private sector actors to test improved varieties, adapt crops to local conditions, and develop climate-smart technologies.',
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Market Linkage & Buyer Connections',
      description: 'We connect farmers, cooperatives, and agribusiness partners to reliable buyers and markets, organizing supply chains and reducing post-harvest losses.',
    },
    {
      icon: <Landmark className="w-10 h-10" />,
      title: 'Access to Finance Facilitation',
      description: 'We link farmers and cooperatives with banks, microfinance institutions, SACCOs, impact investors, DFIs, and grant programs — assisting with business profiles and documentation for financing.',
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: 'Public-Private Development Partnerships',
      description: 'We collaborate with government institutions, NGOs, development agencies, and research organizations on seed systems, climate-smart agriculture, and rural economic development.',
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      title: 'Youth & Women Empowerment in Agribusiness',
      description: 'We create opportunities for youth and women in seed production, training, contract farming, and value chain activities — with mentorship and access to inputs and markets.',
    },
    {
      icon: <ClipboardList className="w-10 h-10" />,
      title: 'Agricultural Project Implementation',
      description: 'We support planning, coordination, execution, monitoring, and evaluation of agricultural projects for NGOs, government programs, and private initiatives.',
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: 'Investment & Impact Partnership Opportunities',
      description: 'We welcome collaboration with impact investors, DFIs, agribusiness companies, and NGOs to scale seed production and generate measurable social and financial returns.',
    },
  ];

  const opportunities = [
    {
      emoji: '🎓',
      title: 'Professional Internship & Industrial Attachments',
      description: 'Structured internship and practical training programs for university students and graduates in agriculture and related fields — covering seed production, agribusiness marketing, quality assurance, contract farming coordination, and M&E. Interns gain hands-on field experience, mentorship, and certification upon completion.',
    },
    {
      emoji: '💰',
      title: 'Access to Finance & Agribusiness Linkages (BK Partnership)',
      description: 'We support farmers and agribusiness groups to access financing through partnerships with Bank of Kigali (BK) and other microfinance institutions — including seasonal input loans, investment financing, cooperative financing schemes, and financial literacy support.',
    },
    {
      emoji: '🌍',
      title: 'Development Partner Projects & Collaborations',
      description: 'We work with AGRA (AIDI Project) on seed systems and climate-smart agriculture, IITA on the FOBASI food basket initiative, and COMESA–ACTESA on climate-smart potato seed systems using sandponic technology.',
    },
    {
      emoji: '🌱',
      title: 'Contract Farming & Production Opportunities',
      description: 'Opportunities for farmers and cooperatives in certified Irish potato, bean, maize, soybean, and wheat seed production — with certified seed supply, technical supervision, guaranteed market access, and fair pricing agreements.',
    },
    {
      emoji: '🧑‍🌾',
      title: 'Youth & Women Empowerment',
      description: 'Training programs, agribusiness incubation support, access to production opportunities, market linkage facilitation, and skills development in modern farming systems.',
    },
    {
      emoji: '🤝',
      title: 'Strategic Institutional Collaboration',
      description: 'We welcome partnerships with government institutions, NGOs and development agencies, research organizations, private agribusiness companies, and universities and training institutions.',
    },
  ];

  const faqs = [
    {
      question: 'How do I place an order for seeds?',
      answer: 'You can place an order by contacting our sales team directly through phone, email, or our contact form. Our team will help you select the right seeds for your needs and arrange delivery.',
    },
    {
      question: 'What is your seed germination guarantee?',
      answer: 'All our seeds are certified with minimum germination rates depending on the crop variety. We provide guarantees on seed quality and viability.',
    },
    {
      question: 'Do you provide training for farmers?',
      answer: 'Yes, we offer comprehensive training programs covering seed handling, planting techniques, crop management, and pest control. Contact us to arrange training for your group.',
    },
    {
      question: 'How can I get technical support during the growing season?',
      answer: 'Our technical and agronomic advisory team is available through phone and email during the growing season, providing advice on crop management, pest control, and other farming challenges.',
    },
    {
      question: 'Do you offer internship opportunities?',
      answer: 'Yes, we run structured internship and industrial attachment programs for university students and graduates in agriculture and related fields, including mentorship and certification upon completion.',
    },
    {
      question: 'Can you deliver seeds to my location?',
      answer: 'Yes, we have a reliable distribution network across Rwanda. We can arrange delivery to your location or you can collect from our office in Musanze District.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-80 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/60" />

        <div className="container relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6">Our Services</h1>
            <p className="text-xl text-gray-200">
              Integrated agricultural solutions that support farmers, cooperatives, agribusinesses, development organizations, and institutional partners throughout the value chain.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-green-700 mb-4">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Get Involved</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Available Opportunities We Are Currently Offering</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are actively creating inclusive agricultural and agribusiness opportunities for farmers, students, cooperatives, and development partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {opportunities.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold text-lg text-gray-900 text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-green-700 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4">Our Service Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How we work with farmers and partners to ensure success.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Consultation', description: 'We understand your farming needs and conditions' },
              { step: '2', title: 'Selection', description: 'We recommend the best seed varieties for you' },
              { step: '3', title: 'Support', description: 'We provide training and technical guidance' },
              { step: '4', title: 'Success', description: 'We monitor progress and ensure good results' },
            ].map((item, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center h-full">
                  <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-green-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=75)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/85" />

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4 animate-fade-in-up">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Contact us today to learn more about our services and opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
          >
            Contact Us <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
