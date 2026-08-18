import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Services() {
  useEffect(() => {
    applySeo({
      title: 'DERN SEED Services - Certified Seed Production, Multiplication & Agricultural Solutions',
      description: 'Discover DERN SEED services: certified seed production and multiplication for Irish Potato, Bean, Maize, Wheat, and Soybean. Agricultural training, technical support, seed processing, and distribution solutions for Rwandan farmers.',
      keywords: ['certified seed production', 'seed multiplication Rwanda', 'Irish potato seed', 'bean seed', 'maize seed', 'wheat seed', 'soybean seed', 'agricultural training Rwanda', 'farming technical support', 'seed processing', 'DERN SEED services'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseed.com/services',
    });
  }, []);
  
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const services = [
    {
      image: '/gallery/maize crop 1.jpeg',
      imageAlt: 'DERN SEED certified seed production and multiplication',
      title: t('services_seed_production_title'),
      description: t('services_seed_production_desc'),
    },
    {
      image: '/gallery/maize 1.jpeg',
      imageAlt: 'Certified maize seed prepared for supply',
      title: t('services_seed_distribution_title'),
      description: t('services_seed_distribution_desc'),
    },
    {
      image: '/gallery/maize crop 1.jpeg',
      imageAlt: 'Healthy maize crop growing in the field',
      title: t('services_climate_resilient_title'),
      description: t('services_climate_resilient_desc'),
    },
    {
      image: '/gallery/visit.jpeg',
      imageAlt: 'DERN SEED field visit with agricultural partners',
      title: t('services_contract_farming_title'),
      description: t('services_contract_farming_desc'),
    },
    {
      image: '/gallery/maize 2.jpeg',
      imageAlt: 'Clean certified seed ready for processing and packaging',
      title: t('services_seed_processing_title'),
      description: t('services_seed_processing_desc'),
    },
    {
      image: '/gallery/dern seed co ltd.jpg',
      imageAlt: 'DERN SEED training and field learning activity',
      title: t('services_farmer_training_title'),
      description: t('services_farmer_training_desc'),
    },
    {
      image: '/gallery/visit.jpeg',
      imageAlt: 'Agricultural field support in a crop production area',
      title: t('services_tech_support_title'),
      description: t('services_tech_support_desc'),
    },
    {
      image: '/gallery/potatoes field 2.jpeg',
      imageAlt: 'Potato demonstration plot in a DERN SEED field',
      title: t('services_demo_plots_title'),
      description: t('services_demo_plots_desc'),
    },
    {
      image: '/gallery/Wheat 1.jpeg',
      imageAlt: 'Wheat crop used for agronomic advisory services',
      title: t('services_agri_consultancy_title'),
      description: t('services_agri_consultancy_desc'),
    },
    {
      image: '/gallery/beans 1.jpeg',
      imageAlt: 'Bean seed and agro-input distribution material',
      title: t('services_agro_input_title'),
      description: t('services_agro_input_desc'),
    },
    {
      image: '/gallery/soya.jpeg',
      imageAlt: 'Soybean field used in research and development partnerships',
      title: t('services_rd_partnerships_title'),
      description: t('services_rd_partnerships_desc'),
    },
    {
      image: '/gallery/beans 2.jpeg',
      imageAlt: 'Bean crop field supporting market linkage work',
      title: t('services_market_linkage_title'),
      description: t('services_market_linkage_desc'),
    },
    {
      image: '/gallery/dern seed co ltd.jpg',
      imageAlt: 'DERN SEED company presence for finance facilitation',
      title: t('services_finance_title'),
      description: t('services_finance_desc'),
    },
    {
      image: '/gallery/Home background 3.jpeg',
      imageAlt: 'Agricultural collaboration field scene',
      title: t('services_dev_partnerships_title'),
      description: t('services_dev_partnerships_desc'),
    },
    {
      image: '/gallery/Home background 2.jpeg',
      imageAlt: 'Community agriculture activity for youth and women empowerment',
      title: t('services_youth_women_title'),
      description: t('services_youth_women_desc'),
    },
    {
      image: '/gallery/potatoes 1.jpeg',
      imageAlt: 'Maize production field for agricultural project implementation',
      title: t('services_project_impl_title'),
      description: t('services_project_impl_desc'),
    },
    {
      image: '/gallery/Wheat 2.jpeg',
      imageAlt: 'Wheat field representing agricultural investment opportunities',
      title: t('services_investment_title'),
      description: t('services_investment_desc'),
    },
  ];

  const opportunities = [
    {
      emoji: '🎓',
      title: t('services_opportunity_training'),
      description: t('services_opportunity_training_desc'),
    },
    {
      emoji: '💰',
      title: t('services_opportunity_cooperative'),
      description: t('services_opportunity_cooperative_desc'),
    },
    {
      emoji: '🌍',
      title: t('services_opportunity_contract'),
      description: t('services_opportunity_contract_desc'),
    },
    {
      emoji: '🌱',
      title: t('services_opportunity_consultancy'),
      description: t('services_opportunity_consultancy_desc'),
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

  const processSteps = [
    { step: '1', title: t('services_process_1_title'), description: t('services_process_1_desc') },
    { step: '2', title: t('services_process_2_title'), description: t('services_process_2_desc') },
    { step: '3', title: t('services_process_3_title'), description: t('services_process_3_desc') },
    { step: '4', title: t('services_process_4_title'), description: t('services_process_4_desc') },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative min-h-80 flex items-center overflow-hidden">
<div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/gallery/soya.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/60" />

        <div className="container relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6">{t('services_hero_heading')}</h1>
            <p className="text-xl text-gray-200">{t('services_hero_description')}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl overflow-hidden transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up`}
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`font-bold text-lg font-poppins mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Opportunities */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className={`text-xs font-bold ${
              theme === 'dark' ? 'text-green-400' : 'text-green-600'
            } uppercase tracking-wider mb-2`}>
              {t('services_opportunities_tag')}
            </div>
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('services_opportunities_heading')}
            </h2>
            <p className={`max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('services_opportunities_description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {opportunities.map((item, index) => (
              <div
                key={index}
                className={`${
                  theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl p-8 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <h3 className={`font-bold text-lg font-poppins mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('services_faq_heading')}
            </h2>
            <p className={`max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('services_faq_description')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl overflow-hidden transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <h3 className={`font-bold text-lg text-left ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-green-400' : 'text-green-700'
                    } transition-transform duration-300 flex-shrink-0 ml-4 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className={`px-6 py-4 border-t ${
                    theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('services_process_heading')}
            </h2>
            <p className={`max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('services_process_description')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${
                  theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                } border rounded-xl p-6 text-center h-full`}>
                  <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className={`font-bold text-lg font-poppins mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`hidden md:block absolute top-1/2 -right-3 w-6 h-1 ${
                    theme === 'dark' ? 'bg-green-800' : 'bg-green-300'
                  } transform -translate-y-1/2`} />
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
            backgroundImage: 'url(/gallery/potatoes.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/85" />

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4 animate-fade-in-up">
            {t('services_cta_heading')}
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            {t('services_cta_description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
          >
            {t('services_cta_contact_us')} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
