import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle, Users, Target, Leaf, Heart, Sparkles, HeartHandshake } from 'lucide-react';
import Footer from '@/components/Footer';
import StaffSection from '@/components/Staff/StaffSection';
import { staffData } from '@/data/staffData';
import StaffCard from '@/components/Staff/StaffCard';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function About() {
  useEffect(() => {
    applySeo({
      title: 'About DERN SEED - Rwanda\'s Leading Certified Seed Company',
      description: 'Learn about DERN SEED Company Ltd, Rwanda\'s premier certified seed provider. Discover our mission, values, and commitment to agricultural excellence since 2020.',
      keywords: ['about DERN SEED', 'certified seed company Rwanda', 'agricultural company', 'seed production', 'farming solutions', 'Musanze Rwanda', 'agricultural excellence'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseed.com/about',
    });
  }, []);
  
  const { t } = useLanguage();
  const { theme } = useTheme();

  const values = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('about_value_quality_title'),
      description: t('about_value_quality_desc'),
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('about_value_integrity_title'),
      description: t('about_value_integrity_desc'),
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t('about_value_innovation_title'),
      description: t('about_value_innovation_desc'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('about_value_partnership_title'),
      description: t('about_value_partnership_desc'),
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t('about_value_sustainability_title'),
      description: t('about_value_sustainability_desc'),
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: t('about_value_community_title'),
      description: t('about_value_community_desc'),
    },
  ];

  const goals = [
    t('about_goal_1'),
    t('about_goal_2'),
    t('about_goal_3'),
    t('about_goal_4'),
    t('about_goal_5'),
  ];

  const whatWeDo = [
    t('about_what_we_do_1'),
    t('about_what_we_do_2'),
    t('about_what_we_do_3'),
    t('about_what_we_do_4'),
    t('about_what_we_do_5'),
    t('about_what_we_do_6'),
  ];

  const beneficiaries = [
    t('about_beneficiary_smallholder'),
    t('about_beneficiary_cooperatives'),
    t('about_beneficiary_agribusiness'),
    t('about_beneficiary_development'),
    t('about_beneficiary_ngos'),
    t('about_beneficiary_government'),
  ];

  const projects = [
    t('about_project_seed_scaling'),
    t('about_project_farmer_field'),
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative min-h-96 flex items-center overflow-hidden py-24 md:py-32">
<div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/gallery/potatoes.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">
              {t('about_hero_heading') || 'About DERN SEED'}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
              {t('about_hero_description') || 'Rwanda\'s leading certified seed company committed to agricultural excellence'}
            </p>
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-amber-500" />
                <span className="text-white font-semibold">
                  {t('about_hero_badge_1') || 'Certified Seeds'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-amber-500" />
                <span className="text-white font-semibold">
                  {t('about_hero_badge_2') || 'Since 2020'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
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
              <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                {t('about_who_we_are') || 'Who We Are'}
              </div>
              <h2 className={`text-4xl font-bold font-poppins mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('about_our_story') || 'Our Story'}
              </h2>

              <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Dern Seed Company Ltd is a Rwandan agribusiness company specializing in the production, multiplication, processing, and marketing of certified agricultural seeds. Since our establishment in June 2020, we have been committed to providing high-quality planting materials that improve agricultural productivity, strengthen food security, and increase farmers' incomes across Rwanda.
              </p>

              <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Our expertise covers the production and supply of certified Irish potato, bean, maize, wheat, and soybean seeds. We work closely with farmers, cooperatives, development partners, and public institutions through contract farming and outgrower schemes that promote sustainable and climate-smart agriculture.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1"
              >
                {t('contact_get_in_touch') || 'Get In Touch'} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">{t('about_ownership')}</div>
            <h2 className={`text-4xl font-bold font-poppins mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_ownership_heading')}
            </h2>
            <p className={`leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Dern Seed Company Ltd is a privately managed agribusiness company owned by the Ruhengeri Catholic Diocese. Guided by the Diocese's commitment to social and economic development, the company promotes sustainable agriculture, supports smallholder farmers, and contributes to community empowerment through the production and distribution of certified quality seeds.
            </p>
            <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              The company operates under professional management led by its Managing Director, <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Father Alexandre NTABANGANYIMANA</span>, and is committed to transparency, innovation, and long-term partnerships that contribute to the transformation of agriculture in Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div id="mission" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border animate-fade-in-up`}>
              <div className={`w-14 h-14 ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'} rounded-lg flex items-center justify-center mb-4`}>
                <Target className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('about_mission')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                To produce, process, and distribute high-quality certified seeds while empowering farmers through contract farming, extension services, technology adoption, and sustainable agricultural practices.
              </p>
            </div>

            <div id="vision" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-lg border animate-fade-in-up stagger-1`}>
              <div className={`w-14 h-14 ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'} rounded-lg flex items-center justify-center mb-4`}>
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('about_vision')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                To become a leading producer and supplier of certified quality seeds and innovative agricultural solutions that transform farmers' productivity and contribute to food security in Rwanda and the East African region.
              </p>
            </div>
          </div>

          {/* Our Goal */}
          <div id="goals" className={`${theme === 'dark' ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-100'} rounded-2xl p-8 lg:p-12 border`}>
            <h3 className={`text-2xl font-bold font-poppins mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_our_goal')}
            </h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Our goal is to become a leading and trusted provider of certified seeds and integrated agricultural solutions in Rwanda and the East African region by:
            </p>
            <ul className="grid md:grid-cols-2 gap-3">
              {goals.map((goal, index) => (
                <li key={index} className={`flex items-start gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckCircle className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">{t('about_our_scope')}</div>
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_what_we_do')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeDo.map((item, index) => (
              <div
                key={index}
                className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 flex items-start gap-3 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">{t('about_what_drives_us')}</div>
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_our_values')}
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              These values guide every decision we make and shape our culture and relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 text-center animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  {value.icon}
                </div>
                <h3 className={`font-bold text-lg font-poppins mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Administration Section */}
      <section id="staff-administration" className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">{t('staff_badge_title')}</div>
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('staff_title')}
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('staff_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {staffData.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Target Beneficiaries */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">{t('about_who_we_serve')}</div>
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_target_beneficiaries')}
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {beneficiaries.map((b, index) => (
              <span
                key={index}
                className={`px-5 py-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'} border rounded-full font-medium text-sm animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Project Portfolio */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">{t('about_looking_ahead')}</div>
            <h2 className={`text-4xl font-bold font-poppins mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_recent_projects')}
            </h2>
            <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              These initiatives aim to increase the availability of quality seed, strengthen farmer-market connections, improve productivity, and enhance resilience to climate change.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-green-700 text-white rounded-lg flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {project}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className={`max-w-3xl mx-auto ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl p-8 lg:p-10 shadow-sm`}>
            <h3 className={`text-2xl font-bold font-poppins mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('about_company_information')}
            </h3>
            <dl className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 shrink-0">{t('about_company_name_label')}</dt>
                <dd>Dern Seed Company Ltd</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 shrink-0">{t('about_head_office_label')}</dt>
                <dd>Byimana Village, Ruhengeri Cell, Muhoza Sector, Musanze District, Rwanda</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 shrink-0">{t('about_postal_address_label')}</dt>
                <dd>P.O. Box 45, Musanze, Rwanda</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 shrink-0">{t('about_telephone_label')}</dt>
                <dd>
                  <a href="tel:+250782724840" className={`transition-colors ${theme === 'dark' ? 'hover:text-green-400' : 'hover:text-green-700'}`}>
                    +250 782 724 840
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 shrink-0">{t('about_email_label')}</dt>
                <dd>
                  <a href="mailto:dernseedcompanyltd2020@gmail.com" className={`transition-colors break-all ${theme === 'dark' ? 'hover:text-green-400' : 'hover:text-green-700'}`}>
                    dernseedcompanyltd2020@gmail.com
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="font-semibold sm:w-48 shrink-0">{t('about_established_label')}</dt>
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
            backgroundImage: 'url(/gallery/soya.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-green-900/95 to-green-800/85" />

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4 animate-fade-in-up">
            {t('about_cta_heading')}
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            {t('about_cta_description')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
          >
            {t('about_cta_contact_us')} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
