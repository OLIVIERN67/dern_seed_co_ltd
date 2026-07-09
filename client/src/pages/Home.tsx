import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle, Zap, Shield, Users, Award, Headphones, Leaf, Droplet, Bug, TrendingUp, MessageSquare, Calendar, User, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { cropImages } from '@/lib/cropImages';
import { fetchTestimonials, type Testimonial } from '@/lib/api';
import { applySeo } from '@/lib/seo';
import HomeBackgroundSlideshow from './HomeBackgroundSlideshow';


export default function Home() {
  useEffect(() => {
    applySeo({
      title: 'DERN SEED CO LTD — Certified Seed Solutions | Rwanda\'s Premier Agricultural Seed Company',
      description: 'DERN SEED Company Ltd provides certified seeds for maize, beans, potatoes, wheat, and soybeans in Rwanda. Quality-assured seeds produced under national standards for optimal crop yield and agricultural success.',
      keywords: ['certified seeds Rwanda', 'agricultural seeds', 'maize seeds', 'bean seeds', 'potato seeds', 'wheat seeds', 'soybean seeds', 'DERN SEED', 'Rwanda agriculture', 'seed company', 'farming solutions', 'crop seeds', 'quality seeds', 'Musanze Rwanda'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseed.com/',
    });
  }, []);
  const [stats, setStats] = useState({
    farmers: 0,
    varieties: 0,
    experience: 0,
    districts: 0,
  });

  useEffect(() => {
    // Animate counters
    const interval = setInterval(() => {
      setStats(prev => ({
        farmers: prev.farmers < 18000 ? prev.farmers + 1000 : 18000,
        varieties: prev.varieties < 25 ? prev.varieties + 1 : 25,
        experience: prev.experience < 5 ? prev.experience + 1 : 5,
        districts: prev.districts < 14 ? prev.districts + 1 : 14,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Certified Seeds',
      description: 'All seeds meet national certification standards',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'High Germination Rate',
      description: 'Optimized for maximum germination success',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Disease Resistant',
      description: 'Varieties bred for resilience against common diseases',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Trusted Partner',
      description: 'Years of proven service in the field',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Expert Team',
      description: 'Expert agronomists and seed specialists',
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: 'Customer Support',
      description: 'Dedicated post-sale and technical assistance',
    },
  ];

  const products = [
    {
      name: 'Maize',
      image: cropImages.maize.primary,
      category: 'Cereals',
      description: 'High-yield certified maize seed suitable for different ecological regions',
      benefits: ['High yield', 'Disease resistant', 'Drought tolerant'],
    },
    {
      name: 'Irish Potato',
      image: cropImages.potato.primary,
      category: 'Root Crops',
      description: 'Certified potato seeds with excellent productivity',
      benefits: ['High productivity', 'Quality tubers', 'Long storage'],
    },
    {
      name: 'Wheat',
      image: cropImages.wheat.secondary,
      category: 'Cereals',
      description: 'Improved wheat seed varieties for commercial farming',
      benefits: ['High yield', 'Good quality', 'Early maturity'],
    },
    {
      name: 'Soybean',
      image: cropImages.soybean.primary,
      category: 'Legumes',
      description: 'Protein-rich soybean seed with excellent germination',
      benefits: ['High protein', 'Nitrogen fixing', 'Market demand'],
    },
    {
      name: 'Bean',
      image: cropImages.bean.primary,
      category: 'Legumes',
      description: 'Quality bean seeds for reliable harvests',
      benefits: ['High quality', 'Good germination', 'Certified'],
    },
  ];

  const services = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Certified Seed Production',
      description: 'We produce seeds following strict international certification standards',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Seed Distribution',
      description: 'Reliable distribution network reaching farmers across the region',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Agricultural Consultancy',
      description: 'Expert advice on crop selection and farming practices',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Farmer Training',
      description: 'Comprehensive training programs for improved farming techniques',
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Technical Support',
      description: 'Ongoing support throughout the growing season',
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: 'Crop Production Advice',
      description: 'Guidance on optimal planting and harvesting practices',
    },
  ];

  const gallery = [
    { id: 1, label: 'Irish Potato', image: cropImages.potato.primary },
    { id: 2, label: 'Bean', image: cropImages.bean.primary },
    { id: 3, label: 'Maize', image: cropImages.maize.primary },
    { id: 4, label: 'Wheat', image: cropImages.wheat.primary },
    { id: 5, label: 'Soybean', image: cropImages.soybean.primary },
    { id: 6, label: 'Certified Maize Seed', image: cropImages.maize.secondary },
  ];

  // Testimonials are loaded dynamically from the backend (/api/testimonials).
  // The static list below is only a fallback when the API is unreachable,
  // so the section never renders empty.
  const fallbackTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'John Mugabe',
      role: 'Farmer, Musanze',
      rating: 5,
      message: 'DERN SEED has transformed my farming. The quality of seeds and support is exceptional.',
      initials: 'JM',
    },
    {
      id: 2,
      name: 'Mary Uwimana',
      role: 'Agricultural Cooperative Lead',
      rating: 5,
      message: 'We trust DERN SEED for all our seed needs. Their certified varieties have increased our yields significantly.',
      initials: 'MU',
    },
    {
      id: 3,
      name: 'Peter Habimana',
      role: 'Commercial Farmer',
      rating: 5,
      message: 'The germination rates are consistently high. Excellent customer service and technical support.',
      initials: 'PH',
    },
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    let cancelled = false;
    fetchTestimonials()
      .then((data) => {
        if (!cancelled && data.testimonials.length > 0) {
          setTestimonials(data.testimonials.slice(0, 6));
        }
      })
      .catch(() => {
        // Keep the fallback testimonials when the API is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const blogPosts = [
    {
      title: 'Best Time to Plant Maize',
      category: 'Seasonal Guide',
      date: 'June 2026',
      excerpt: 'Learn the optimal planting times for maize in different regions to maximize your harvest.',
    },
    {
      title: 'Choosing Certified Seeds',
      category: 'Buying Guide',
      date: 'June 2026',
      excerpt: 'A comprehensive guide to selecting the right certified seeds for your farming needs.',
    },
    {
      title: 'Pest Management Tips',
      category: 'Crop Protection',
      date: 'May 2026',
      excerpt: 'Effective strategies for managing common pests and protecting your crops naturally.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background slideshow */}
        <HomeBackgroundSlideshow />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/20" />

        <div className="container relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Welcome Message from Father Alexandre */}
            <div >
              <div className="flex items-start gap-4">
                <div>
                  
                </div>
                <div>
                  {/* <p className="text-white text-sm font-semibold mb-2">Welcome from Father Alexandre NTABANGANYIMANA</p>
                  <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                    Managing Director, DERN SEED Company Ltd. We are committed to providing quality certified seeds to empower farmers and transform agriculture in Rwanda.
                  </p> */}
                </div>
              </div>
            </div>

            <div >
              
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-white mb-4 leading-tight">
              Growing Agriculture Through <span className="text-amber-500">Quality Certified Seeds</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-200 mb-6 leading-relaxed max-w-xl">
              Empowering Farmers with Reliable Seed Solutions for Better Harvests and Sustainable Farming.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-gray-900 font-bold text-sm sm:text-base rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto"
              >
                Explore Products <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold text-sm sm:text-base rounded-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                Contact Us
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20">
              <div className="animate-fade-in-up stagger-1">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-amber-500">{stats.farmers.toLocaleString()}+</div>
                <div className="text-xs text-gray-300 mt-1">Farmers Served</div>
              </div>
              <div className="animate-fade-in-up stagger-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-amber-500">{stats.varieties}</div>
                <div className="text-xs text-gray-300 mt-1">Seed Varieties</div>
              </div>
              <div className="animate-fade-in-up stagger-3">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-amber-500">{stats.experience}+</div>
                <div className="text-xs text-gray-300 mt-1">Years Experience</div>
              </div>
              <div className="animate-fade-in-up stagger-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-amber-500">{stats.districts}</div>
                <div className="text-xs text-gray-300 mt-1">Districts Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Managing Director Welcome Section (jump target) */}
      <section id="managing-director" className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="animate-slide-in-left">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-80 md:h-[28rem]">
                <img
                  src="/gallery/managing director.jpeg"
                  alt="Managing Director of DERN SEED Company Ltd"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/75 via-green-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full">
                    {/* <span className="text-amber-500 font-bold">🌱</span> */}
                    {/* <span className="text-xs sm:text-sm font-bold">Welcome from our Managing Director</span> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">Welcome Message</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-6 text-gray-900 leading-tight">
                Welcome Message from the Managing Director
              </h2>

              {/* Clean, balanced layout: right text block + optional Read More */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
                      <span className="font-semibold">Dear Valued Visitors, Partners, Farmers, and Stakeholders,</span>
                    </p>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                      Welcome to <span className="font-semibold">Dern Seed Company Ltd.</span> We are honored to serve Rwanda’s agricultural community through high-quality certified seeds and reliable support.
                    </p>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4">
                      Our mission is simple: ensure farmers have access to trustworthy, high-performing, and climate-resilient seed varieties.
                    </p>

                    <details className="mt-4">
                      <summary className="cursor-pointer select-none inline-flex items-center gap-2 text-green-700 font-semibold">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </summary>
                      <div className="mt-3 text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
                        <p>
                          As the Managing Director, I am honored to lead an organization committed to strengthening Rwanda's agricultural sector through the production and supply of high-quality certified seeds and innovative agricultural services.
                        </p>
                        <p>
                          Since our establishment in 2020 under the Diocese of Ruhengeri, we remain dedicated to improving food security, increasing agricultural productivity, and enhancing the livelihoods of farming communities across Rwanda.
                        </p>
                        <p>
                          We believe that <span className="font-semibold">quality seed is the foundation of successful agriculture.</span> This enables farmers to achieve higher yields, better incomes, and sustainable farming systems.
                        </p>
                        <p>
                          Beyond seed production, Dern Seed Company Ltd provides comprehensive agricultural services, including technical training, extension support, contract farming, seed quality assurance, agribusiness advisory services, and market linkage initiatives.
                        </p>
                        <p>
                          On behalf of our Board of Directors, management team, and dedicated staff, I sincerely thank you for your interest. We look forward to building lasting partnerships and growing together toward a more productive, prosperous, and food-secure future.
                        </p>
                        <p>
                          <span className="font-semibold">Thank you for visiting our website, and welcome to the Dern Seed Company Ltd family.</span>
                        </p>
                      </div>
                    </details>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-2 space-y-3">
                    <p className="text-gray-900 font-bold text-xl sm:text-2xl leading-snug">Father Alexandre NTABANGANYIMANA</p>
                    <div className="flex items-center gap-3">
                      <div className="h-px bg-gray-200 w-16" />
                      <p className="text-green-700 font-semibold tracking-wide">Managing Director of Dern Seed Company Ltd</p>
                      <div className="h-px bg-gray-200 w-16" />
                    </div>
                    <p className="text-gray-700 font-semibold text-base"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">

        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 shadow-lg hover:-translate-y-1 transition-all duration-300">
                <img
                  src="/gallery/derne image.jpeg"
                  alt="DERN SEED certified seed production"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 bg-gray-900/90 text-white p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold font-poppins text-amber-500">5+</div>
                  <div className="text-xs text-gray-300">Years of Excellence</div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 sm:mb-3">About Us</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-6 sm:mb-8 text-gray-900 leading-tight">DERN SEED CO LTD</h2>

              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
                DERN SEED CO LTD is a professional agricultural company specializing in the production and distribution of high-quality certified seeds. We are committed to supporting farmers with reliable seed varieties that improve productivity, food security, and sustainable agriculture.
              </p>

              <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                Our mission is to empower farmers across Rwanda with access to premium certified seeds and expert agricultural support. We believe in sustainable farming practices that benefit both farmers and the environment.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Certified by national and international standards</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Expert team of agronomists and seed specialists</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Dedicated customer support and technical assistance</span>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1"
              >
                Read More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Our Strengths</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Why Choose DERN SEED</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide certified seeds and comprehensive agricultural support to help you achieve better harvests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:-translate-y-3 group animate-fade-in-up hover:bg-gradient-to-br hover:from-green-50 hover:to-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center text-green-700 mb-4 group-hover:from-green-600 group-hover:to-green-700 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Our Catalog</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              High-quality certified seeds for various crops and growing conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-400 hover:shadow-2xl hover:-translate-y-4 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 rounded-t-xl overflow-hidden mb-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 text-green-700 text-xs font-bold rounded-full mb-3 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                    {product.category}
                  </div>
                <h3 className="font-bold text-xl font-poppins mb-3 text-gray-900 leading-tight">{product.name}</h3>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">{product.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Key Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium border border-green-200">
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-4 py-2 bg-green-700 text-white font-semibold text-sm rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">What We Offer</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive agricultural solutions to support your farming journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-teal-400 hover:shadow-xl hover:-translate-y-3 text-center group animate-fade-in-up hover:bg-gradient-to-br hover:from-teal-50 hover:to-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg flex items-center justify-center text-teal-700 mx-auto mb-4 group-hover:from-teal-600 group-hover:to-teal-700 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Our Work</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-4 leading-tight">Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              See our farming operations, training sessions, and community impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <div
                key={item.id}
                className="relative h-48 rounded-lg overflow-hidden cursor-pointer group animate-fade-in-up hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold group-hover:translate-y-0 translate-y-2 transition-transform duration-300">{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              View Full Gallery <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=60)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/85" />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Farmers Served', value: '50,000+' },
              { label: 'Seed Varieties', value: '25+' },
              { label: 'Years Experience', value: '15+' },
              { label: 'Districts Reached', value: '30+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold font-poppins text-amber-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Success Stories</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">What Farmers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from farmers who have benefited from our certified seeds and services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-3 animate-fade-in-up hover:bg-gradient-to-br hover:from-amber-50 hover:to-white group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 group-hover:fill-amber-600 group-hover:text-amber-600" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 italic group-hover:text-gray-700 transition-colors">"{testimonial.message}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Latest Updates</div>
            <h2 className="text-4xl font-bold font-poppins mb-4">Blog & Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Educational content and farming tips to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-green-500 hover:shadow-xl hover:-translate-y-3 group animate-fade-in-up hover:bg-gradient-to-br hover:from-green-50 hover:to-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-40 bg-gradient-to-br from-green-100 to-green-50 rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-125 transition-transform duration-300 group-hover:rotate-3">
                  📰
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-3 py-1 rounded-full font-bold group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                </div>
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900 group-hover:text-green-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <a href="#" className="text-green-700 font-semibold text-sm hover:text-green-800 transition-all duration-300 inline-flex items-center gap-1 group-hover:gap-2">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1"
            >
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=75)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/90 to-green-800/85" />

        <div className="container relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-white mb-6 animate-fade-in-up leading-tight">
            Ready to Improve Your Harvest?
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto animate-fade-in-up leading-relaxed">
            Let's grow together with certified seeds and expert agricultural support. Join thousands of farmers achieving better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-lg"
            >
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            <div className="animate-slide-in-left">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">Get In Touch</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins mb-10 leading-tight">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Address</div>
                    <div className="text-gray-600">P.O. BOX 45, Musanze, Rwanda</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Phone</div>
                    <div className="text-gray-600">+250 782 724 840</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Email</div>
                    <div className="text-gray-600">dernseedcompanyltd2020@gmail.com</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Business Hours</div>
                    <div className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 mt-8"
              >
                Send Message <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden h-96 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1234567890!2d29.6!3d-1.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d8d8d8d8d8d8d9%3A0x1234567890abcdef!2sMuhoza%20Sector%2C%20Musanze%20District%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


