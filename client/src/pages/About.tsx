import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle, Users, Target, Leaf, Heart, Sparkles, HeartHandshake } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';

export default function About() {
  useEffect(() => {
    applySeo({
      title: 'About DERN SEED - Rwanda\'s Leading Certified Seed Company',
      description: 'Learn about DERN SEED Company Ltd, Rwanda\'s premier certified seed provider. Discover our mission, values, and commitment to agricultural excellence since 2019.',
      keywords: ['about DERN SEED', 'certified seed company Rwanda', 'agricultural company', 'seed production', 'farming solutions', 'Musanze Rwanda', 'agricultural excellence'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseed.com/about',
    });
  }, []);
  const values = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Quality',
      description: 'Maintaining the highest standards in seed production and processing.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Conducting business with honesty, transparency, and accountability.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Adopting modern technologies and climate-smart solutions.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Partnership',
      description: 'Building strong relationships with farmers, cooperatives, and development partners.',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainability',
      description: 'Promoting environmentally responsible and economically viable agricultural practices.',
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: 'Community Impact',
      description: 'Improving livelihoods and supporting inclusive rural development.',
    },
  ];

  const goals = [
    'Increasing farmers\' access to high-quality certified seeds.',
    'Promoting climate-smart and sustainable agricultural practices.',
    'Supporting contract farming and inclusive value chain development.',
    'Enhancing food security and rural livelihoods.',
    'Creating lasting partnerships that drive agricultural innovation and economic growth.',
  ];

  const whatWeDo = [
    'Certified seed production and multiplication',
    'Seed processing, cleaning, grading, and treatment',
    'Contract farming and outgrower management',
    'Farmer training and extension services',
    'Seed aggregation, storage, and market linkage',
    'Climate-smart agricultural solutions',
  ];

  const beneficiaries = [
    'Smallholder farmers',
    'Commercial farmers',
    'Farmer cooperatives',
    'Agro-dealers',
    'NGOs',
    'Development projects',
    'Government agricultural programs',
    'Seed distributors',
    'Institutional buyers',
  ];

  const projects = [
    'Scaling up Climate-Smart Irish Potato Seed Systems through Sandponic Minituber Production, Contract Farming, and Market Aggregation in Northern Rwanda',
    'Contract Farming Model for Certified Bean Seed Multiplication, Grain Production, and Bean Aggregation, Storage, and Market Linkage Hub',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">About DERN SEED</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
              Growing quality seeds for sustainable agriculture since June 2020. Trusted by over 50,000 farmers across Rwanda.
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-amber-500" />
                <span className="text-white font-semibold">Certified Seeds</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-amber-500" />
                <span className="text-white font-semibold">Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="relative rounded-2xl overflow-hidden h-96 shadow-lg">
                <img
                  src="/gallery/Our Gallery background.jpeg"
                  alt="Our Gallery Background"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/gallery/managing director.jpeg';
                  }}
                />
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Who We Are</div>
              <h2 className="text-4xl font-bold font-poppins mb-6 text-gray-900">Our Story</h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Dern Seed Company Ltd is a Rwandan agribusiness company specializing in the production, multiplication, processing, and marketing of certified agricultural seeds. Since our establishment in June 2020, we have been committed to providing high-quality planting materials that improve agricultural productivity, strengthen food security, and increase farmers' incomes across Rwanda.
              </p>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Our expertise covers the production and supply of certified Irish potato, bean, maize, wheat, and soybean seeds. We work closely with farmers, cooperatives, development partners, and public institutions through contract farming and outgrower schemes that promote sustainable and climate-smart agriculture.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1"
              >
                Get In Touch <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Ownership</div>
            <h2 className="text-4xl font-bold font-poppins mb-6 text-gray-900">Backed by the Ruhengeri Catholic Diocese</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dern Seed Company Ltd is a privately managed agribusiness company owned by the Ruhengeri Catholic Diocese. Guided by the Diocese's commitment to social and economic development, the company promotes sustainable agriculture, supports smallholder farmers, and contributes to community empowerment through the production and distribution of certified quality seeds.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The company operates under professional management led by its Managing Director, <span className="font-semibold text-gray-900">Father Alexandre NTABANGANYIMANA</span>, and is committed to transparency, innovation, and long-term partnerships that contribute to the transformation of agriculture in Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in-up">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-700 mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To produce, process, and distribute high-quality certified seeds while empowering farmers through contract farming, extension services, technology adoption, and sustainable agricultural practices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in-up stagger-1">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-700 mb-4">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become a leading producer and supplier of certified quality seeds and innovative agricultural solutions that transform farmers' productivity and contribute to food security in Rwanda and the East African region.
              </p>
            </div>
          </div>

          {/* Our Goal */}
          <div className="bg-green-50 rounded-2xl p-8 lg:p-12 border border-green-100">
            <h3 className="text-2xl font-bold font-poppins mb-2 text-gray-900">Our Goal</h3>
            <p className="text-gray-600 mb-6">
              Our goal is to become a leading and trusted provider of certified seeds and integrated agricultural solutions in Rwanda and the East African region by:
            </p>
            <ul className="grid md:grid-cols-2 gap-3">
              {goals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Our Scope</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">What We Do</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeDo.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-3 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">What Drives Us</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide every decision we make and shape our culture and relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-green-700 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Beneficiaries */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Who We Serve</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Target Beneficiaries</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {beneficiaries.map((b, index) => (
              <span
                key={index}
                className="px-5 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-medium text-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Project Portfolio */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Looking Ahead</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Recent Strategic Project Portfolio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These initiatives aim to increase the availability of quality seed, strengthen farmer-market connections, improve productivity, and enhance resilience to climate change.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-green-700 text-white rounded-lg flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm">
            <h3 className="text-2xl font-bold font-poppins mb-6 text-gray-900">Company Information</h3>
            <dl className="space-y-3 text-gray-700">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 flex-shrink-0">Company Name:</dt>
                <dd>Dern Seed Company Ltd</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 flex-shrink-0">Head Office:</dt>
                <dd>Byimana Village, Ruhengeri Cell, Muhoza Sector, Musanze District, Rwanda</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 flex-shrink-0">Postal Address:</dt>
                <dd>P.O. Box 45, Musanze, Rwanda</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 flex-shrink-0">Telephone:</dt>
                <dd>
                  <a href="tel:+250782724840" className="hover:text-green-700 transition-colors">+250 782 724 840</a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 flex-shrink-0">Email:</dt>
                <dd>
                  <a href="mailto:dernseedcompanyltd2020@gmail.com" className="hover:text-green-700 transition-colors break-all">dernseedcompanyltd2020@gmail.com</a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 flex-shrink-0">Established:</dt>
                <dd>June 2020</dd>
              </div>
            </dl>
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
            Together, We Are Cultivating a More Food-Secure Future
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Partner with DERN SEED for reliable certified seeds and expert agricultural support.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
          >
            Contact Us Today <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
