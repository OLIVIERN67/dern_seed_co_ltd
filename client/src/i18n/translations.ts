export type Language = 'en' | 'rw' | 'fr';

/**
 * Central dictionary for all user-facing strings.
 * Keys should be stable and never removed once used in UI.
 */
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_about: 'About',
    nav_products: 'Products',
    nav_services: 'Services',
    nav_gallery: 'Gallery',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    nav_login: 'Login',
    nav_signup: 'Sign Up',

    nav_about_dropdown: 'About',
    nav_products_dropdown: 'Products',

    // Theme + language switcher
    language_label: 'Language',
    menu_toggle_aria: 'Toggle menu',
    theme_toggle_aria: 'Toggle theme',
    theme_dark: 'Dark',
    theme_light: 'Light',

    language_en: 'English',
    language_rw: 'Kinyarwanda',
    language_fr: 'French',

    // Branding / generic
    brand_company: 'DERN SEED CO LTD',
    brand_certified_seeds: 'Certified Seeds',
    brand_logo_alt: 'DERN SEED',

    // Footer
    footer_quick_links: 'Quick Links',
    footer_products: 'Products',
    footer_contact: 'Contact',
    footer_privacy_policy: 'Privacy Policy',
    footer_terms_conditions: 'Terms & Conditions',
    footer_copyright: '&copy; 2026 DERN SEED CO LTD. All Rights Reserved.',
    footer_company_description:
      'Empowering farmers with high-quality certified seeds for sustainable agriculture and better harvests.',

    // Social
    footer_facebook_aria: 'DERN SEED on Facebook',

    // Footer links
    footer_link_home: 'Home',
    footer_link_about: 'About Us',
    footer_link_products: 'Products',
    footer_link_contact: 'Contact',
    footer_product_maize: 'Maize',
    footer_product_irish_potato: 'Irish Potato',
    footer_product_wheat: 'Wheat',
    footer_product_soybean: 'Soybean',

    // Newsletter
    newsletter_stay_updated: 'Stay Updated',
    newsletter_description:
      'Subscribe to our newsletter for farming tips and product updates.',
    newsletter_email_placeholder: 'Enter your email',
    newsletter_subscribe: 'Subscribe',
    newsletter_thanks: 'Thank you for subscribing!',

    // WhatsApp
    whatsapp_chat_aria: 'Chat with DERN SEED on WhatsApp',
    whatsapp_chat_title: 'Chat with us on WhatsApp',
    whatsapp_button_text: 'WhatsApp',
    whatsapp_default_message:
      'Hello DERN SEED! I would like to know more about your certified seeds.',

    // Manus dialog
    manus_dialog_description: 'Please login with Manus to continue',
    manus_login_button: 'Login with Manus',

    // Contact
    contact_get_in_touch: 'Get In Touch',
    contact_contact_information: 'Contact Information',
    contact_contact_form: 'Contact Form',
    contact_send_message: 'Send Message',

    contact_address_label: 'Address',
    contact_phone_label: 'Phone',
    contact_email_label: 'Email',
    contact_business_hours_label: 'Business Hours',

    // Contact form
    form_full_name: 'Full Name',
    form_email_address: 'Email Address',
    form_phone_number: 'Phone Number',
    form_subject: 'Subject',
    form_message: 'Message',
    form_send_message: 'Send Message',

    form_subject_placeholder: 'Select a subject',
    subject_product_inquiry: 'Product Inquiry',
    subject_service_inquiry: 'Service Inquiry',
    subject_training_request: 'Training Request',
    subject_partnership_opportunity: 'Partnership Opportunity',
    subject_other: 'Other',

    contact_success: '✓ Message sent successfully! We\'ll get back to you soon.',
    contact_form_error: 'Submission failed. Please try again later.',

    // Form validation
    validation_full_name_required: 'Full name is required.',
    validation_full_name_min: 'Full name must be at least 2 characters.',
    validation_email_required: 'Email is required.',
    validation_email_invalid: 'Enter a valid email address.',
    validation_phone_required: 'Phone number is required.',
    validation_phone_min: 'Phone number must be at least 3 characters.',
    validation_subject_required: 'Subject is required.',
    validation_message_required: 'Message is required.',
    validation_message_min: 'Message must be at least 5 characters.',

    // FAQ (generic)
    faq_quick_answers: 'Quick Answers',
    faq_find_quick_answers: 'Find quick answers to common questions.',

    // Not found
    not_found_title: 'Page not found',
    not_found_description: "The page you are looking for does not exist.",

    // Common labels
    common_all: 'All',
    common_read_more: 'Read More',
    common_view_all: 'View All',
    common_contact_us: 'Contact Us',
    common_send_message: 'Send Message',
    common_go_home: 'Go Home',

    // Login
    login_welcome_back: 'Welcome Back',
    login_intro:
      'Sign in to access your account and manage your seed orders and information.',
    login_feature_1: 'Easy order management',
    login_feature_2: 'Track your shipments',
    login_feature_3: 'Access exclusive resources',

    login_title: 'Sign In',
    login_enter_credentials: 'Enter your credentials to access your account',
    login_placeholder_email: 'you@example.com',
    login_placeholder_password: '••••••••',
    login_remember_me: 'Remember me',
    login_forgot_password: 'Forgot password? Contact us',
    login_sign_in_button: 'Sign In',
    login_signing_in: 'Signing In...',
    login_signup_prompt: "Don't have an account?",
    login_signup: 'Sign Up',

    // Sign up
    signup_title: 'Create Account',
    signup_intro: 'Join our farming community today',
    signup_full_name: 'Full Name',
    signup_placeholder_full_name: 'Your full name',
    signup_placeholder_email: 'you@example.com',
    signup_placeholder_phone: '+250 (0) XXX XXX XXX',

    signup_password_label: 'Password',
    signup_placeholder_password: '••••••••',
    signup_password_help:
      'Min 8 characters with uppercase, lowercase, number, and special character.',
    signup_confirm_password_label: 'Confirm Password',

    signup_terms_checkbox_prefix: 'I agree to the',
    signup_terms_link: 'Terms and Conditions',
    signup_create_account: 'Create Account',
    signup_creating_account: 'Creating Account...',
    signup_already_have_account: 'Already have an account?',
    signup_login: 'Sign In',

    // Home (sections)
    home_hero_tagline: 'Premium Quality Seeds',
    home_hero_headline: 'Growing Agriculture Through {highlight}',
    home_hero_highlight: 'Quality Certified Seeds',
    home_hero_description:
      'Empowering Farmers with Reliable Seed Solutions for Better Harvests and Sustainable Farming.',

    home_cta_explore_products: 'Explore Products',
    home_cta_contact_us: 'Contact Us',

    home_stats_farmers: 'Farmers Served',
    home_stats_varieties: 'Seed Varieties',
    home_stats_experience: 'Years Experience',
    home_stats_districts: 'Districts Reached',

    home_features_title: 'Our Strengths',
    home_features_why_choose: 'Why Choose DERN SEED',
    home_features_description:
      'We provide certified seeds and comprehensive agricultural support to help you achieve better harvests.',

    home_catalog_title: 'Our Catalog',
    home_featured_products_title: 'Featured Products',
    home_featured_products_description:
      'High-quality certified seeds for various crops and growing conditions.',

    home_services_title: 'What We Offer',
    home_services_heading: 'Our Services',
    home_services_description:
      'Comprehensive agricultural solutions to support your farming journey.',

    home_gallery_work: 'Our Work',
    home_gallery_title: 'Gallery',
    home_gallery_description:
      'See our farming operations, training sessions, and community impact.',
    home_gallery_view_full: 'View Full Gallery',

    home_testimonials_title: 'Success Stories',
    home_testimonials_heading: 'What Farmers Say',
    home_testimonials_description:
      'Hear from farmers who have benefited from our certified seeds and services.',

    home_blog_latest: 'Latest Updates',
    home_blog_heading: 'Blog & Resources',
    home_blog_description:
      'Educational content and farming tips to help you succeed.',
    home_blog_view_all: 'View All Articles',

    home_cta_ready: 'Ready to Improve Your Harvest?',
    home_cta_ready_description:
      "Let's grow together with certified seeds and expert agricultural support. Join thousands of farmers achieving better results.",
    home_cta_get_started: 'Get Started Now',

    home_contact_preview_heading: 'Contact Information',
    home_contact_preview_get_in_touch: 'Get In Touch',
    home_contact_preview_send_message: 'Send Message',

    // About
    about_hero_heading: 'About DERN SEED',
    about_hero_description:
      "Growing quality seeds for sustainable agriculture since June 2020. Trusted by over 50,000 farmers across Rwanda.",
    about_hero_badge_1: 'Certified Seeds',
    about_hero_badge_2: 'Expert Support',

    about_who_we_are: 'Who We Are',
    about_our_story: 'Our Story',
    about_ownership: 'Ownership',
    about_ownership_heading: 'Backed by the Ruhengeri Catholic Diocese',

    about_mission: 'Our Mission',
    about_vision: 'Our Vision',
    about_our_goal: 'Our Goal',
    about_our_scope: 'Our Scope',
    about_what_we_do: 'What We Do',
    about_what_drives_us: 'What Drives Us',
    about_our_values: 'Our Values',
    about_who_we_serve: 'Who We Serve',
    about_target_beneficiaries: 'Target Beneficiaries',

    about_looking_ahead: 'Looking Ahead',
    about_recent_projects: 'Recent Strategic Project Portfolio',
    about_company_information: 'Company Information',

    about_company_name_label: 'Company Name:',
    about_head_office_label: 'Head Office:',
    about_postal_address_label: 'Postal Address:',
    about_telephone_label: 'Telephone:',
    about_email_label: 'Email:',
    about_established_label: 'Established:',

    about_cta_heading:
      'Together, We Are Cultivating a More Food-Secure Future',
    about_cta_description:
      'Partner with DERN SEED for reliable certified seeds and expert agricultural support.',
    about_cta_contact_us: 'Contact Us Today',

    about_staff_admin_desc: 'Our experienced leadership team driving agricultural excellence across Rwanda.',
    staff_badge_title: 'Our Leadership',
    staff_title: 'Staff Administration',
    staff_subtitle: 'Meet the dedicated leadership team driving agricultural excellence and quality seed production at DERN SEED Company Ltd.',

    // Services
    services_hero_heading: 'Our Services',
    services_hero_description:
      'Integrated agricultural solutions that support farmers, cooperatives, agribusinesses, development organizations, and institutional partners throughout the value chain.',
    services_faq_heading: 'Frequently Asked Questions',
    services_faq_description:
      'Find answers to common questions about our services.',
    services_process_heading: 'Our Service Process',
    services_process_description:
      'How we work with farmers and partners to ensure success.',
    services_cta_heading: 'Ready to Get Started?',
    services_cta_description:
      'Contact us today to learn more about our services and opportunities.',
    services_cta_contact_us: 'Contact Us',
    services_opportunities_tag: 'Get Involved',
    services_opportunities_heading: 'Available Opportunities We Are Currently Offering',
    services_opportunities_description:
      'We are actively creating inclusive agricultural and agribusiness opportunities for farmers, students, cooperatives, and development partners.',

    // Products
    products_hero_heading: 'Our Products',
    products_hero_description:
      'Certified seeds produced, processed, and marketed in compliance with national seed quality standards to ensure purity, vigor, and reliability.',
    products_certified_badge: 'Certified',
    products_available_varieties: 'Available Varieties:',
    products_key_benefits: 'Key Benefits:',
    products_inquire_now: 'Inquire Now',
    products_empty_state: 'No products found in this category.',

    products_quality_assurance: 'Quality Assurance',
    products_quality_assurance_description:
      'Every seed produced by Dern Seed Company Ltd undergoes rigorous quality assurance processes.',

    // Blog
    blog_hero_heading: 'Blog & Resources',
    blog_hero_description:
      'Educational content and farming tips to help you succeed.',
    blog_search_placeholder: 'Search articles...',
    blog_filter_by_category: 'Filter by Category',
    blog_all_articles: 'All Articles',
    blog_no_articles: 'No articles found matching your search.',
    blog_featured_article: 'Featured Article',

    blog_newsletter_heading: 'Stay Updated with Our Latest Articles',
    blog_newsletter_description:
      'Subscribe to our newsletter to receive farming tips and agricultural insights directly in your inbox.',
    blog_newsletter_subscribe: 'Subscribe',

    // Blog categories
    blog_cat_all: 'All Articles',
    blog_cat_seed_quality: 'Seed Quality',
    blog_cat_finance: 'Finance',
    blog_cat_projects: 'Projects',
    blog_cat_opportunities: 'Opportunities',

    // Blog detail
    blog_not_found: 'Article Not Found',
    blog_not_found_desc: 'The article you are looking for does not exist.',
    blog_back_to_blog: 'Back to Blog',

    // Article 1
    blog_article_1_title: 'Why Certified Seed Matters for Rwanda\'s Farmers',
    blog_article_1_author: 'Mr. Cassien Twagirimana',
    blog_article_1_excerpt: 'Agriculture remains the backbone of Rwanda\'s economy. Certified seed is one of the most important investments a farmer can make for better yields and higher-quality produce.',
    blog_article_1_content: 'Agriculture remains the backbone of Rwanda\'s economy, employing a large proportion of the population and contributing significantly to national food security and economic development. As the demand for food continues to increase, farmers must adopt improved agricultural technologies that enhance productivity and profitability. Among these technologies, the use of certified seed is one of the most important investments a farmer can make.\n\nWhat is certified seed?\n\nCertified seed is seed that has been produced, inspected, tested, and approved according to national seed certification standards. It is carefully monitored throughout the production process to ensure genetic purity, high germination rates, freedom from diseases, and overall quality.\n\nUnlike grain saved from previous harvests or seed obtained from informal sources, certified seed provides farmers with a reliable foundation for achieving better yields and higher-quality produce.\n\nWhy certified seed is important\n\n1. Higher crop yields\n\nCertified seed is produced from improved varieties that have been selected for superior performance. These varieties often provide higher yields than traditional or recycled seed, enabling farmers to harvest more from the same piece of land.\n\n2. Better germination and crop establishment\n\nOne of the major advantages of certified seed is its high germination capacity. This ensures uniform crop emergence and healthy plant establishment, resulting in stronger and more productive crops.\n\n3. Reduced risk of diseases and pests\n\nSeed-borne diseases can significantly reduce crop yields and quality. Certified seed undergoes rigorous quality control and inspection processes to minimize the risk of disease transmission, helping farmers protect their investments.\n\n4. Improved crop quality\n\nMarkets increasingly demand uniform, high-quality agricultural products. Certified seed helps farmers produce crops with better quality characteristics, increasing their chances of accessing premium markets and obtaining better prices.\n\n5. Climate resilience\n\nMany improved seed varieties available today have been developed to tolerate challenging environmental conditions such as drought, changing rainfall patterns, and emerging pests and diseases. This makes certified seed an essential tool for climate-smart agriculture.\n\nThe situation in Rwanda\n\nRwanda has made significant progress in promoting the use of improved agricultural inputs. However, many farmers still rely on recycled seed from previous harvests, which often results in declining productivity and increased vulnerability to diseases.\n\nIncreasing access to certified seed remains critical for achieving national agricultural transformation goals, improving food security, and enhancing rural livelihoods.\n\nDern Seed Company Ltd\'s contribution\n\nAt Dern Seed Company Ltd, we are committed to supporting Rwanda\'s agricultural development through the production and supply of high-quality certified seeds. We specialize in the multiplication, processing, and marketing of certified seeds for:\n\n• Irish Potato\n• Beans\n• Maize\n• Wheat\n• Soybeans\n\nOur production systems follow strict quality assurance procedures, including field inspections, seed testing, processing, treatment, and proper storage to ensure that farmers receive reliable planting materials.\n\nWe also work closely with farmer cooperatives, contract growers, government institutions, and development partners to strengthen seed systems and increase farmers\' access to quality seed.\n\nInvesting in quality seed is investing in success\n\nMany farmers focus on fertilizers, pesticides, and other inputs while overlooking the importance of seed quality. Yet seed is the foundation of the entire production process. Even under good management, poor-quality seed limits a crop\'s potential.\n\nBy choosing certified seed, farmers invest in:\n\n• Higher productivity\n• Better crop health\n• Increased profitability\n• Improved food security\n• Sustainable agricultural growth\n\nConclusion\n\nThe future of Rwanda\'s agriculture depends on the adoption of quality technologies that increase productivity and resilience. Certified seed is not merely an input; it is the foundation upon which successful farming is built.\n\nAt Dern Seed Company Ltd, we remain dedicated to producing and delivering quality certified seeds that empower farmers, strengthen food systems, and contribute to the sustainable development of Rwanda\'s agricultural sector.\n\nFor more information about certified seed and our available seed varieties, contact Dern Seed Company Ltd at +250 782 724 840 or dernseedcompanyltd2020@gmail.com.\n\nMr. Cassien Twagirimana is the Officer in Charge of Seed Production and Inspection at Dern Seed Company Ltd.',

    // Article 2
    blog_article_2_title: 'How Farmers Can Access Agricultural Financing Through BK',
    blog_article_2_author: 'Dern Seed Company Ltd',
    blog_article_2_excerpt: 'Access to finance remains one of the most important factors for increasing agricultural productivity. Dern Seed Company Ltd has partnered with Bank of Kigali to facilitate access to financial services for farmers.',
    blog_article_2_content: 'Access to finance remains one of the most important factors for increasing agricultural productivity and expanding agribusiness opportunities in Rwanda. Many farmers have the skills, land, and determination to grow their enterprises but often face challenges in obtaining the capital needed for quality inputs, irrigation, mechanization, storage facilities, and farm expansion.\n\nTo address this challenge, Dern Seed Company Ltd has established a partnership with Bank of Kigali (BK) to facilitate access to financial services for farmers, cooperatives, seed multipliers, and agribusiness entrepreneurs working within our agricultural value chains.\n\nWhy agricultural financing matters\n\nAgriculture requires timely investment. Farmers need financial resources to purchase:\n\n• Certified seeds\n• Fertilizers and crop protection products\n• Irrigation equipment\n• Farm machinery and tools\n• Post-harvest storage facilities\n• Labor during planting and harvesting seasons\n\nAccess to finance enables farmers to increase productivity, improve crop quality, and expand their farming operations.\n\nDern Seed Company Ltd and BK Partnership\n\nThrough our collaboration with Bank of Kigali (BK), we help connect eligible farmers and farmer organizations with financing opportunities that support agricultural production and agribusiness development.\n\nThe partnership aims to:\n\n• Increase access to agricultural credit\n• Support certified seed production and multiplication\n• Strengthen contract farming arrangements\n• Promote agribusiness investment\n• Improve farmers\' financial inclusion\n• Enhance agricultural productivity and profitability\n\nWho can benefit?\n\nThe financing opportunities are available to:\n\n• Individual farmers\n• Contract farmers working with Dern Seed Company Ltd\n• Farmer cooperatives\n• Seed multipliers\n• Youth agribusiness groups\n• Women-led agricultural enterprises\n• Agricultural entrepreneurs and input suppliers\n\nTypes of financing available\n\nDepending on eligibility and BK requirements, farmers may access:\n\nSeasonal production loans\n\nThese loans support the purchase of agricultural inputs during the production season, including:\n\n• Certified seeds\n• Fertilizers\n• Crop protection products\n• Labor costs\n\nAgribusiness investment loans\n\nDesigned for long-term agricultural investments such as:\n\n• Irrigation systems\n• Farm equipment and machinery\n• Storage facilities\n• Seed processing infrastructure\n• Agribusiness expansion projects\n\nCooperative financing\n\nFarmer cooperatives can access financing to:\n\n• Purchase production inputs\n• Aggregate produce\n• Improve storage facilities\n• Expand commercial farming activities\n\nHow Dern Seed Company Ltd supports farmers\n\nOur role goes beyond seed production. We help farmers prepare for successful engagement with financial institutions by providing:\n\nTechnical support\n\n• Farm planning and production guidance\n• Crop management training\n• Seed production supervision\n• Quality assurance services\n\nMarket linkages\n\n• Contract farming opportunities\n• Seed purchase agreements\n• Access to structured markets\n\nFinancial linkages\n\n• Introduction to BK financing opportunities\n• Support in identifying eligible farmer groups\n• Facilitation of communication between farmers and financial institutions\n\nAdvantages of working through organized value chains\n\nFinancial institutions are often more willing to support farmers who are part of organized production systems. Farmers working with Dern Seed Company Ltd benefit from:\n\n• Technical oversight\n• Established market arrangements\n• Production records\n• Professional support throughout the season\n\nThese factors help reduce risk and improve the prospects for successful financing applications.\n\nBuilding a stronger agricultural future\n\nAt Dern Seed Company Ltd, we believe that access to quality seed and access to finance must go hand in hand. By partnering with BK and other stakeholders, we are helping farmers invest in modern agriculture, improve productivity, and create sustainable livelihoods.\n\nTogether, we are building stronger farms, stronger businesses, and a more resilient agricultural sector for Rwanda.\n\nContact Us\n\nDern Seed Company Ltd\n📍 Byimana Village, Ruhengeri Cell, Muhoza Sector, Musanze District, Rwanda\n📞 +250 782 724 840\n📧 dernseedcompanyltd2020@gmail.com\n\nInterested farmers, cooperatives, and agribusiness entrepreneurs are encouraged to contact us to learn more about available financing opportunities and partnership programs.',

    // Article 3
    blog_article_3_title: 'AGRA AIDI Project: Strengthening Seed Systems in Rwanda',
    blog_article_3_author: 'Dern Seed Company Ltd',
    blog_article_3_excerpt: 'Dern Seed Company Ltd successfully completed the AGRA AIDI Project, strengthening Rwanda\'s Irish potato seed system.',
    blog_article_3_content: 'AGRA AIDI Project: Strengthening Irish Potato Seed Systems in Rwanda. Project close-out success story by Dern Seed Company Ltd. Dern Seed Company Ltd is proud to announce the successful completion of the AGRA AIDI Project, which was implemented to strengthen Rwanda\'s Irish potato seed system. The project was supported through a grant from AGRA. Project Background: Irish potato is one of Rwanda\'s strategic crops. The project focused on multiplication of newly released varieties, demonstration and promotion, farmer training, strengthening seed distribution, and supporting climate-smart practices. Key outputs: Increased production of certified seed, expanded production fields, trained farmers and seed multipliers, established demonstration plots, improved access to certified seed, and strengthened partnerships. Impact: The grant contributed to growth and institutional development of Dern Seed Company Ltd. Beneficiaries gained increased access to quality seed, improved yields and income, enhanced knowledge and skills, increased food security, employment creation, and strengthened resilience. The company remains committed to building on its achievements.',

    // Article 4
    blog_article_4_title: 'IITA FOBASI Partnership Supporting Food Security in Rwanda',
    blog_article_4_author: 'Dern Seed Company Ltd',
    blog_article_4_excerpt: 'Dern Seed Company Ltd participates in the FOBASI Initiative with IITA, beginning in Season 2027A.',
    blog_article_4_content: 'IITA FOBASI Partnership Supporting Food Security in Rwanda. Launching in Season 2027A. Dern Seed Company Ltd is pleased to announce its participation in the Food Basket Sites (FOBASI) Initiative with IITA. The initiative promotes sustainable agricultural production by supporting farmers with improved technologies, quality planting materials, and capacity building. Dern Seed Company Ltd will produce and supply certified seeds, demonstrate improved varieties, provide farmer training, establish demonstration plots, and strengthen local seed systems. Expected activities include selection of beneficiary farmers, establishment of demonstration sites, distribution of quality seed, farmer training sessions, and technical monitoring. Benefits include access to certified seeds, improved knowledge, increased productivity, better food availability, and enhanced market opportunities. Together we are investing in productive farms and food-secure communities for Rwanda.',

    // Article 5
    blog_article_5_title: 'Available Opportunities at Dern Seed Company Ltd',
    blog_article_5_author: 'Dern Seed Company Ltd',
    blog_article_5_excerpt: 'Dern Seed Company Ltd creates opportunities for farmers, students, cooperatives, and agribusiness entrepreneurs.',
    blog_article_5_content: 'Available Opportunities at Dern Seed Company Ltd. Contract Farming: We are expanding our program for certified seed multiplication with crops including Irish Potato, Bean, Maize, Wheat, and Soybean. Benefits include certified foundation seed, technical support, guaranteed market, and improved income. Internship Opportunities: Practical learning in seed production, processing, quality assurance, marketing, and agribusiness management. Access to Finance Through BK: Seasonal production loans, input financing, agribusiness investment loans, and cooperative development financing. Development Projects: AGRA AIDI (Completed), IITA FOBASI (Starting 2027A), COMESA ACTESA. Youth and Women Opportunities: Agricultural entrepreneurship, seed production, skills development, and market linkage support. Research Partnerships: Collaboration with universities, research institutions, NGOs, and government agencies. Why Join: Access to certified seeds, technical support, market linkages, finance opportunities, and training programs. Contact: Dern Seed Company Ltd, Byimana Village, Musanze, Rwanda. +250 782 724 840.',

    // Gallery
    gallery_hero_heading: 'Our Gallery',
    gallery_hero_description:
      'Explore our farming operations, training sessions, and community impact across Rwanda.',
    gallery_browse_collections: 'Browse Our Collections',
    gallery_empty_state: 'No images found in this category.',
    gallery_visual_story: 'Our Visual Story',
    gallery_visual_story_description:
      'These images showcase our commitment to quality, farmer support, and sustainable agriculture.',
    gallery_featured_highlights: 'Featured Highlights',
    gallery_featured_highlights_description:
      'Key moments that define our mission and impact.',

    gallery_join_community_heading: 'Join Our Growing Community',
    gallery_join_community_description:
      'Be part of the agricultural revolution in Rwanda with DERN SEED.',
    gallery_join_contact_us: 'Contact Us',

    gallery_highlights_heading: 'Featured Highlights',
    gallery_highlights_description: 'Key moments that define our mission and impact.',
    gallery_highlight_potato_title: 'Irish Potato Production',
    gallery_highlight_potato_desc: 'High-quality Irish potato seed cultivation and distribution.',
    gallery_highlight_bean_title: 'Bean Cultivation',
    gallery_highlight_bean_desc: 'Premium bean seed production for farmers across Rwanda.',
    gallery_highlight_maize_title: 'Maize Seed Production',
    gallery_highlight_maize_desc: 'Certified maize seeds with high germination rates.',
    gallery_highlight_wheat_title: 'Wheat Production',
    gallery_highlight_wheat_desc: 'Quality wheat seed production and supply.',
    gallery_highlight_soybean_title: 'Soybean Cultivation',
    gallery_highlight_soybean_desc: 'Soybean seed farming and distribution.',
    gallery_highlight_production_title: 'Seed Production',
    gallery_highlight_production_desc: 'Our state-of-the-art seed production facilities.',
    gallery_highlight_fields_title: 'Farm Fields',
    gallery_highlight_fields_desc: 'Our demonstration farms and research fields.',
    gallery_highlight_legume_title: 'Legume Seeds',
    gallery_highlight_legume_desc: 'Quality legume seed varieties for diverse farming needs.',
    gallery_highlight_cereal_title: 'Cereal Seeds',
    gallery_highlight_cereal_desc: 'Certified cereal seed varieties including maize and wheat.',
    gallery_highlight_diversity_title: 'Crop Diversity',
    gallery_highlight_diversity_desc: 'A wide range of seed varieties to support diverse farming.',
    gallery_highlight_visuals_title: 'Our Visual Story',
    gallery_highlight_visuals_desc: 'Images showcasing our commitment to quality and farmer support.',
    gallery_highlight_community_title: 'Community Impact',
    gallery_highlight_community_desc: 'Making a difference in farming communities across Rwanda.',
    gallery_highlight_training_title: 'Farmer Training',
    gallery_highlight_training_desc: 'Regular training programs to equip farmers with modern techniques.',
    gallery_highlight_harvest_title: 'Successful Harvests',
    gallery_highlight_harvest_desc: 'Helping farmers achieve bountiful harvests season after season.',

    products_certified_quality: 'Certified Quality Seeds',
    products_search_label: 'Search Seeds',
    products_filter_label: 'Filter by Category',
    products_select_category: 'Select Category',

    // Navigation (new)
    nav_order_seeds: 'Order Seeds',
    nav_logout_success: 'Logged out successfully',
    nav_dashboard: 'Dashboard',
    nav_logout: 'Logout',

    // Nav dropdown (new)
    nav_product_irish_potato: 'Irish Potato Seed',
    nav_product_bean: 'Bean Seed',
    nav_product_maize: 'Maize Seed',
    nav_product_wheat: 'Wheat Seed',
    nav_product_soybean: 'Soybean Seed',
    nav_about_mission: 'Our Mission',
    nav_about_vision: 'Our Vision',
    nav_about_values: 'Core Values',
    nav_about_goals: 'Strategic Goals',
    nav_about_what_we_do: 'What We Do',
    nav_about_team: 'Our Team',

    // Home features (new)
    home_feature_certified_title: 'Certified Seeds',
    home_feature_certified_desc: 'All seeds meet national certification standards',
    home_feature_germination_title: 'High Germination Rate',
    home_feature_germination_desc: 'Optimized for maximum germination success',
    home_feature_disease_title: 'Disease Resistant',
    home_feature_disease_desc: 'Varieties bred for resilience against common diseases',
    home_feature_trusted_title: 'Trusted Partner',
    home_feature_trusted_desc: 'Years of proven service in the field',
    home_feature_expert_title: 'Expert Team',
    home_feature_expert_desc: 'Expert agronomists and seed specialists',
    home_feature_support_title: 'Customer Support',
    home_feature_support_desc: 'Dedicated post-sale and technical assistance',

    // Home services (new)
    home_service_production_title: 'Certified Seed Production',
    home_service_production_desc: 'We produce seeds following strict international certification standards',
    home_service_distribution_title: 'Seed Distribution',
    home_service_distribution_desc: 'Reliable distribution network reaching farmers across the region',
    home_service_consultancy_title: 'Agricultural Consultancy',
    home_service_consultancy_desc: 'Expert advice on crop selection and farming practices',
    home_service_training_title: 'Farmer Training',
    home_service_training_desc: 'Comprehensive training programs for improved farming techniques',
    home_service_tech_title: 'Technical Support',
    home_service_tech_desc: 'Ongoing support throughout the growing season',
    home_service_crop_title: 'Crop Production Advice',
    home_service_crop_desc: 'Guidance on optimal planting and harvesting practices',

    // Home gallery labels (new)
    home_gallery_irish_potato: 'Irish Potato',
    home_gallery_bean: 'Bean',
    home_gallery_maize: 'Maize',
    home_gallery_wheat: 'Wheat',
    home_gallery_soybean: 'Soybean',
    home_gallery_certified_maize: 'Certified Maize Seed',

    // Home blog (new)
    home_blog_post1_title: 'Best Time to Plant Maize',
    home_blog_post1_category: 'Seasonal Guide',
    home_blog_post1_excerpt: 'Learn the optimal planting times for maize in different regions to maximize your harvest.',
    home_blog_post2_title: 'Choosing Certified Seeds',
    home_blog_post2_category: 'Buying Guide',
    home_blog_post2_excerpt: 'A comprehensive guide to selecting the right certified seeds for your farming needs.',
    home_blog_post3_title: 'Pest Management Tips',
    home_blog_post3_category: 'Crop Protection',
    home_blog_post3_excerpt: 'Effective strategies for managing common pests and protecting your crops naturally.',

    // Home welcome section (new)
    home_welcome_badge: 'Welcome from our Managing Director',
    home_welcome_message_label: 'Welcome Message',
    home_welcome_salutation: 'Dear Valued Visitors, Partners, Farmers, and Stakeholders,',
    home_welcome_para1: 'Welcome to Dern Seed Company Ltd. We are honored to serve Rwanda\'s agricultural community through high-quality certified seeds and reliable support.',
    home_welcome_para2: 'Our mission is simple: ensure farmers have access to trustworthy, high-performing, and climate-resilient seed varieties.',
    home_welcome_read_more: 'Read More',
    home_welcome_para3: 'As the Managing Director, I am honored to lead an organization committed to strengthening Rwanda\'s agricultural sector through the production and supply of high-quality certified seeds and innovative agricultural services.',
    home_welcome_para4: 'Since our establishment in 2020 under the Diocese of Ruhengeri, we remain dedicated to improving food security, increasing agricultural productivity, and enhancing the livelihoods of farming communities across Rwanda.',
    home_welcome_para5: 'We believe that quality seed is the foundation of successful agriculture. This enables farmers to achieve higher yields, better incomes, and sustainable farming systems.',
    home_welcome_para6: 'Beyond seed production, Dern Seed Company Ltd provides comprehensive agricultural services, including technical training, extension support, contract farming, seed quality assurance, agribusiness advisory services, and market linkage initiatives.',
    home_welcome_para7: 'On behalf of our Board of Directors, management team, and dedicated staff, I sincerely thank you for your interest. We look forward to building lasting partnerships and growing together toward a more productive, prosperous, and food-secure future.',
    home_welcome_thank_you: 'Thank you for visiting our website, and welcome to the Dern Seed Company Ltd family.',
    home_welcome_director_name: 'Father Alexandre NTABANGANYIMANA',
    home_welcome_director_title: 'Managing Director of Dern Seed Company Ltd',

    // Home about section (new)
    home_about_years: 'Years of Excellence',
    home_about_badge: 'About Us',
    home_about_description1: 'DERN SEED CO LTD is a professional agricultural company specializing in the production and distribution of high-quality certified seeds. We are committed to supporting farmers with reliable seed varieties that improve productivity, food security, and sustainable agriculture.',
    home_about_description2: 'Our mission is to empower farmers across Rwanda with access to premium certified seeds and expert agricultural support. We believe in sustainable farming practices that benefit both farmers and the environment.',
    home_about_certified: 'Certified by national and international standards',
    home_about_expert: 'Expert team of agronomists and seed specialists',
    home_about_support: 'Dedicated customer support and technical assistance',

    // Home no testimonials (new)
    home_no_testimonials: 'No testimonials available yet.',

    // Home CTA (new - note: home_cta_get_started already exists)

    // Home contact preview (new)
    home_contact_business_hours: 'Monday - Friday: 8:00 AM - 5:00 PM',

    // About page (new)
    about_value_quality_title: 'Quality',
    about_value_quality_desc: 'Uncompromising standards in every seed we produce.',
    about_value_integrity_title: 'Integrity',
    about_value_integrity_desc: 'Honest and transparent in all our dealings.',
    about_value_innovation_title: 'Innovation',
    about_value_innovation_desc: 'Embracing new technologies and methods for better outcomes.',
    about_value_partnership_title: 'Partnership',
    about_value_partnership_desc: 'Building lasting relationships with farmers and stakeholders.',
    about_value_sustainability_title: 'Sustainability',
    about_value_sustainability_desc: 'Practices that protect our environment for future generations.',
    about_value_community_title: 'Community Impact',
    about_value_community_desc: 'Making a real difference in farming communities.',

    about_goal_1: 'Produce and supply certified seeds that meet national and international standards.',
    about_goal_2: 'Improve food security and agricultural productivity across Rwanda.',
    about_goal_3: 'Empower farmers with knowledge, skills, and reliable seed varieties.',
    about_goal_4: 'Promote sustainable agricultural practices and environmental stewardship.',
    about_goal_5: 'Build strategic partnerships for mutual growth and development.',

    about_scope_description: 'Our work spans across Rwanda, with a focus on the Northern Province and nationwide reach through our distribution network.',

    about_what_we_do_1: 'Seed Production',
    about_what_we_do_2: 'Farmer Training & Extension',
    about_what_we_do_3: 'Agricultural Consultancy',
    about_what_we_do_4: 'Market Linkage',
    about_what_we_do_5: 'Contract Farming',
    about_what_we_do_6: 'Seed Quality Assurance',

    about_beneficiary_smallholder: 'Smallholder Farmers',
    about_beneficiary_cooperatives: 'Cooperatives & Farmer Groups',
    about_beneficiary_agribusiness: 'Agribusinesses',
    about_beneficiary_development: 'Development Organizations',
    about_beneficiary_ngos: 'NGOs & Donors',
    about_beneficiary_government: 'Government Institutions',

    about_project_seed_scaling: 'Seed Scaling Program',
    about_project_farmer_field: 'Farmer Field Schools',

    about_staff_ceo: 'Chief Executive Officer',
    about_staff_ceo_desc: 'Oversees all company operations and strategic direction.',
    about_staff_agronomist: 'Head Agronomist',
    about_staff_agronomist_desc: 'Leads seed production and quality assurance programs.',
    about_staff_operations: 'Operations Manager',
    about_staff_operations_desc: 'Manages daily operations and distribution logistics.',
    about_staff_training: 'Training Coordinator',
    about_staff_training_desc: 'Coordinates farmer training and extension services.',
    about_staff_quality: 'Quality Control Officer',
    about_staff_quality_desc: 'Ensures all seeds meet certification standards.',
    about_staff_marketing: 'Marketing Manager',
    about_staff_marketing_desc: 'Drives brand awareness and market development.',

    // Services page (new)
    services_seed_production_title: 'Certified Seed Production & Multiplication',
    services_seed_production_desc: 'DERN SEED specializes in the production, multiplication, processing, and marketing of certified seeds for Irish Potato, Bean, Maize, Wheat, and Soybean. Through contract farming and outgrower schemes, we produce, inspect, test, and certify seeds that ensure genetic purity, high germination rates, and freedom from diseases.',
    services_seed_distribution_title: 'Seed Distribution & Supply Chain',
    services_seed_distribution_desc: 'Reliable distribution network reaching farmers across all regions of Rwanda. We ensure timely delivery of seeds to cooperatives, agricultural centers, and individual farmers.',
    services_agri_consultancy_title: 'Agricultural Consultancy',
    services_agri_consultancy_desc: 'Expert agronomic advice on crop selection, soil management, pest control, and farming best practices. Our team of agronomists provides personalized guidance to maximize your yields.',
    services_farmer_training_title: 'Farmer Training & Capacity Building',
    services_farmer_training_desc: 'Comprehensive training programs covering modern farming techniques, seed selection, soil conservation, and post-harvest handling. We empower farmers with knowledge and skills for sustainable agriculture.',
    services_tech_support_title: 'Technical Support & Extension',
    services_tech_support_desc: 'Ongoing technical support throughout the growing season. Our field officers provide on-site guidance, disease identification, and solution recommendations to ensure crop success.',
    services_quality_assurance_title: 'Seed Quality Assurance & Certification',
    services_quality_assurance_desc: 'Rigorous quality control processes including laboratory testing, field inspections, and certification compliance. Every seed lot is tested for germination rate, purity, and moisture content.',
    services_market_linkage_title: 'Market Linkage & Value Chain',
    services_market_linkage_desc: 'Connecting farmers with markets, buyers, and value addition opportunities. We facilitate access to both local and regional markets to ensure farmers receive fair prices for their produce.',
    services_contract_farming_title: 'Contract Farming',
    services_contract_farming_desc: 'Structured contract farming programs that provide farmers with guaranteed inputs, technical support, and guaranteed markets for their produce. Reduces risk and ensures stable income.',
    services_climate_resilient_title: 'Climate-Resilient & High-Yield Varieties',
    services_climate_resilient_desc: 'We develop, promote, and supply seed varieties adapted to changing environmental conditions — built to withstand drought, pests, and disease while increasing productivity and profitability.',
    services_seed_processing_title: 'Seed Processing & Packaging',
    services_seed_processing_desc: 'We conduct cleaning, grading, sorting, treatment, quality control, and packaging to improve seed purity, germination rates, and storage life — collaborating with trusted partners for large-scale needs.',
    services_demo_plots_title: 'Demonstration Plots & Field Trials',
    services_demo_plots_desc: 'We establish demonstration plots and conduct field trials to showcase improved and climate-resilient varieties under real farming conditions, refining recommendations for different agro-ecological zones.',
    services_agro_input_title: 'Agro-Input Distribution',
    services_agro_input_desc: 'We supply and distribute quality seeds, fertilizers, and crop protection products sourced from trusted suppliers, through local networks and partnerships.',
    services_rd_partnerships_title: 'Research & Development Partnerships',
    services_rd_partnerships_desc: 'We collaborate with research institutions, universities, and private sector actors to test improved varieties, adapt crops to local conditions, and develop climate-smart technologies.',
    services_finance_title: 'Access to Finance Facilitation',
    services_finance_desc: 'We link farmers and cooperatives with banks, microfinance institutions, SACCOs, impact investors, DFIs, and grant programs — assisting with business profiles and documentation for financing.',
    services_dev_partnerships_title: 'Public-Private Development Partnerships',
    services_dev_partnerships_desc: 'We collaborate with government institutions, NGOs, development agencies, and research organizations on seed systems, climate-smart agriculture, and rural economic development.',
    services_youth_women_title: 'Youth & Women Empowerment in Agribusiness',
    services_youth_women_desc: 'We create opportunities for youth and women in seed production, training, contract farming, and value chain activities — with mentorship and access to inputs and markets.',
    services_project_impl_title: 'Agricultural Project Implementation',
    services_project_impl_desc: 'We support planning, coordination, execution, monitoring, and evaluation of agricultural projects for NGOs, government programs, and private initiatives.',
    services_investment_title: 'Investment & Impact Partnership Opportunities',
    services_investment_desc: 'We welcome collaboration with impact investors, DFIs, agribusiness companies, and NGOs to scale seed production and generate measurable social and financial returns.',

    // Services opportunities (new)
    services_opportunity_training: 'Training Programs',
    services_opportunity_training_desc: 'Join our comprehensive farmer training sessions covering modern techniques, seed selection, and sustainable practices.',
    services_opportunity_cooperative: 'Cooperative Partnerships',
    services_opportunity_cooperative_desc: 'We partner with farmer cooperatives to provide bulk seed supply, training, and market access.',
    services_opportunity_contract: 'Contract Farming Opportunities',
    services_opportunity_contract_desc: 'Enter into contract farming agreements for guaranteed inputs and markets.',
    services_opportunity_consultancy: 'Agricultural Consultancy Services',
    services_opportunity_consultancy_desc: 'Access expert agronomic advice tailored to your specific farming needs.',

    // Services process (new)
    services_process_1_title: 'Consultation',
    services_process_1_desc: 'We assess your farming needs and provide tailored recommendations.',
    services_process_2_title: 'Planning',
    services_process_2_desc: 'We develop a customized plan with the right seeds and support.',
    services_process_3_title: 'Implementation',
    services_process_3_desc: 'We provide seeds, training, and ongoing technical support.',
    services_process_4_title: 'Harvest & Delivery',
    services_process_4_desc: 'We help you market and distribute your produce effectively.',

    // Products page (new)
    products_all: 'All Seeds',
    products_root_crops: 'Root Crops',
    products_legumes: 'Legumes',
    products_cereals: 'Cereals',
    products_search_placeholder: 'Search seeds, benefits, crop types...',
    products_reset_filters: 'Reset Filters',

    // ProductCard (new)
    product_certified: 'Certified',
    product_key_highlights: 'Key Highlights:',
    product_maturity: 'Maturity:',
    product_planting_season: 'Planting Season',
    product_harvest_period: 'Harvest Period',
    product_order_now: 'Order This Seed Now',
    product_benefits: 'Key Agronomic Benefits',
    product_quality_standards: 'Quality Standards & Seed Specifications',
    product_close_details: 'Close Details',
    product_inquire_order: 'Inquire / Order',
    product_modal_close: 'Close modal',
    product_modal_prev: 'Previous photo',
    product_modal_next: 'Next photo',
    product_view_details: 'View Details',
    product_order_seed: 'Order Seed',
    product_view_info: 'View detailed information about',

    // Gallery (new)
    gallery_crop_potato: 'Potato',
    gallery_crop_bean: 'Bean',
    gallery_crop_maize: 'Maize',
    gallery_crop_wheat: 'Wheat',
    gallery_crop_soybean: 'Soybean',
    gallery_crop_potato_desc: 'Irish potato seed production',
    gallery_crop_bean_desc: 'Bean seed cultivation',
    gallery_crop_maize_desc: 'Maize seed farming',
    gallery_crop_wheat_desc: 'Wheat production',
    gallery_crop_soybean_desc: 'Soybean cultivation',
    gallery_highlight_quality_title: 'Quality Certification',
    gallery_highlight_quality_desc: 'Our seeds undergo rigorous quality testing to meet national and international standards.',

    // Blog (new)
    blog_june_2026: 'June 2026',
    blog_may_2026: 'May 2026',
    blog_published: 'Published',
    blog_by: 'By',
    blog_agri_team: 'Agricultural Team',
    blog_read_full: 'Read Full Article',

    // OrderForm (new)
    order_login_required: 'Please log in or sign up to place an order.',
    order_product_required: 'Please select or specify a product',
    order_quantity_min: 'Quantity must be greater than 0',
    order_success: 'Order submitted successfully!',
    order_failed: 'Failed to submit order',
    order_back_products: 'Back to Products',
    order_subtitle: 'Certified Quality Seeds',
    order_title: 'Place Seed Order',
    order_description: 'Complete your order details below to reserve certified seeds directly from DERN SEED.',
    order_feature_1: 'Guaranteed Germination',
    order_feature_2: 'High Crop Yield',
    order_success_title: 'Order Received!',
    order_success_message: 'Thank you for ordering with DERN SEED. Your order has been received and is being processed.',
    order_view_dashboard: 'View My Customer Dashboard',
    order_browse_more: 'Browse More Products',
    order_details_title: 'Order Details',
    order_details_description: 'Verify seed selection, quantity, and delivery parameters.',
    order_selected_product: 'Selected Seed / Product',
    order_quantity: 'Quantity',
    order_unit: 'Unit',
    order_unit_price: 'Unit Price (RWF)',
    order_not_logged_in: 'You are currently not logged in.',
    order_login_here: 'Log in here',
    order_submitting: 'Submitting Order...',
    order_submit_button: 'Submit Order',
    order_summary: 'Order Summary',
    order_summary_product: 'Product:',
    order_summary_not_selected: 'Not Selected',
    order_summary_quantity: 'Quantity:',
    order_summary_unit_price: 'Unit Price:',
    order_summary_total: 'Total Amount:',
    order_logistics_title: 'Fast Regional Logistics',
    order_logistics_desc: 'Orders are processed directly at Ruhengeri seed facilities and dispatched via certified transport.',

    // SignUp toast (new)
    signup_passwords_mismatch: 'Passwords do not match',
    signup_terms_required: 'You must agree to the terms',
    signup_success: 'Account created successfully! Welcome to DERN SEED.',
    signup_failed: 'Registration failed',
  },

  rw: {
    // Navigation
    nav_home: 'Ahabanza',
    nav_about: 'Ibyacu',
    nav_products: 'Ibicuruzwa',
    nav_services: 'Serivisi',
    nav_gallery: 'Amashusho',
    nav_blog: 'Amakuru',
    nav_contact: 'Ibaruwa',
    nav_login: 'Injira',
    nav_signup: 'Iyandikishe',

    nav_about_dropdown: 'Ibyacu',
    nav_products_dropdown: 'Ibicuruzwa',

    // Theme + language switcher
    language_label: 'Ururimi',
    menu_toggle_aria: 'Fungura/ Bihuze menu',
    theme_toggle_aria: 'Hindura insanganyamatsiko',
    theme_dark: 'Umwijima',
    theme_light: 'Umucyo',

    language_en: 'Icyongereza',
    language_rw: 'Ikinyarwanda',
    language_fr: 'Igifaransa',

    // Branding
    brand_company: 'DERN SEED CO LTD',
    brand_certified_seeds: 'Imbuto zemejwe',
    brand_logo_alt: 'DERN SEED',

    // Footer
    footer_quick_links: 'Inzira byihuse',
    footer_products: 'Ibicuruzwa',
    footer_contact: 'Itumanaho',
    footer_privacy_policy: 'Politiki y’ibanga',
    footer_terms_conditions: 'Amategeko n’Ibikorwa',
    footer_copyright: '&copy; 2026 DERN SEED CO LTD. Uburenganzira bwose burabitswe.',
    footer_company_description:
      'Dufasha abahinzi imbuto zemejwe zifite ireme, zibafasha gukora ubuhinzi burambye no kubona umusaruro mwiza.',
    footer_facebook_aria: 'DERN SEED kuri Facebook',

    footer_link_home: 'Ahabanza',
    footer_link_about: 'Ibyerekeye twe',
    footer_link_products: 'Ibicuruzwa',
    footer_link_contact: 'Itumanaho',
    footer_product_maize: 'K ibigori',
    footer_product_irish_potato: 'Uduseke tw’ibijumba-mirayi',
    footer_product_wheat: 'Ingano',
    footer_product_soybean: 'Ubutore (soya)',

    // Newsletter
    newsletter_stay_updated: 'Ihabazwe amakuru',
    newsletter_description:
      'Iyandikishe kuri newsletter yacu kugira ngo wakire inama z’ubuhinzi n’amakuru y’ibicuruzwa.',
    newsletter_email_placeholder: 'Shyiramo email yawe',
    newsletter_subscribe: 'Iyandikishe',
    newsletter_thanks: 'Murakoze kwiyandikisha!',

    // WhatsApp
    whatsapp_chat_aria: 'Suhuza DERN SEED kuri WhatsApp',
    whatsapp_chat_title: 'Suhuza kuri WhatsApp',
    whatsapp_button_text: 'WhatsApp',
    whatsapp_default_message:
      'Muraho DERN SEED! Nifuza kumenya byinshi ku mbuto zanyu zemejwe.',

    // Manus dialog
    manus_dialog_description: 'Injira ukoresheje Manus kugirango ukomeze',
    manus_login_button: 'Injira ukoresheje Manus',

    // Contact
    contact_get_in_touch: 'Ibaruwa',
    contact_contact_information: 'Ibisobanuro by’itumanaho',
    contact_contact_form: 'Ifishi y’ubutumwa',
    contact_send_message: 'Ohereza ubutumwa',

    contact_address_label: 'Aderesi',
    contact_phone_label: 'Telefone',
    contact_email_label: 'Email',
    contact_business_hours_label: 'Igihe dukorera',

    // Contact form
    form_full_name: 'Amazina yuzuye',
    form_email_address: 'Email',
    form_phone_number: 'Telephone',
    form_subject: 'Insanganyamatsiko',
    form_message: 'Ubutumwa',
    form_send_message: 'Ohereza ubutumwa',

    form_subject_placeholder: 'Hitamo insanganyamatsiko',
    subject_product_inquiry: 'Ibibazo ku bicuruzwa',
    subject_service_inquiry: 'Ibibazo kuri serivisi',
    subject_training_request: 'Gusaba amahugurwa',
    subject_partnership_opportunity: 'Ubufatanye',
    subject_other: 'Ibindi',

    contact_success: '✓ Ubutumwa bwoherejwe neza! Tuzagusubiza vuba.',
    contact_form_error: 'Ntibyashoboka kohereza. Gerageza ubundi.',

    // Validation
    validation_full_name_required: 'Amazina yuzuye arakenewe.',
    validation_full_name_min: 'Amazina yuzuye agomba kuba nibura inyuguti 2.',
    validation_email_required: 'Email irakenewe.',
    validation_email_invalid: 'Shyiramo email yemerewe.',
    validation_phone_required: 'Numero ya telephone irakenewe.',
    validation_phone_min: 'Numero ya telefone igomba kuba nibura inyuguti 3.',
    validation_subject_required: 'Insanganyamatsiko irakenewe.',
    validation_message_required: 'Ubutumwa burakenewe.',
    validation_message_min: 'Ubutumwa bugomba kuba nibura inyuguti 5.',

    // FAQ
    faq_quick_answers: 'Ibibazo byihuse',
    faq_find_quick_answers: 'Shaka ibisubizo byihuse ku bibazo bisanzwe.',

    // Not found
    not_found_title: 'Page ntiboneka',
    not_found_description: 'Urimo gushaka page itabaho.',

    // Common
    common_all: 'Byose',
    common_read_more: 'Soma byinshi',
    common_view_all: 'Reba byose',
    common_contact_us: 'Twandikire',
    common_send_message: 'Ohereza ubutumwa',
    common_go_home: 'Subira kuri ahabanza',

    // Login
    login_welcome_back: 'Murakaza neza',
    login_intro:
      'Injira uhuze konti yawe maze ujye ucunga ibicuruzwa by’imbuto n’ibindi bikoresho.',
    login_feature_1: 'Gucunga ibyo wateguye byoroshye',
    login_feature_2: 'Gukurikirana koherezwa',
    login_feature_3: ' kubona amakuru yihariye',

    login_title: 'Injira',
    login_enter_credentials: 'Shyiramo amakuru yo kwinjira',
    login_placeholder_email: 'you@example.com',
    login_placeholder_password: '••••••••',
    login_remember_me: 'Komeza wibuke',
    login_forgot_password: 'Wibagiwe ijambo ry’ibanga? Tubaze',
    login_sign_in_button: 'Injira',
    login_signing_in: 'Turinjiza...',
    login_signup_prompt: 'Ntufite konti?',
    login_signup: 'Iyandikishe',

    // Sign up
    signup_title: 'Kurema konti',
    signup_intro: 'Injira mu muryango w’abahinzi uyu munsi',
    signup_full_name: 'Amazina yuzuye',
    signup_placeholder_full_name: 'Andika amazina yawe yuzuye',
    signup_placeholder_email: 'you@example.com',
    signup_placeholder_phone: '+250 (0) XXX XXX XXX',

    signup_password_label: 'Ijambo ry’ibanga',
    signup_placeholder_password: '••••••••',
    signup_password_help:
      'Nibura inyuguti 8, harimo iziciriritse n’izicuranganzira, nimero n’ikiranga.',
    signup_confirm_password_label: 'Emeza ijambo ry’ibanga',

    signup_terms_checkbox_prefix: 'Nemeza ko wemeye',
    signup_terms_link: 'Amategeko n’Ibikorwa',
    signup_create_account: 'Kurema konti',
    signup_creating_account: 'Turimo gukora konti...',
    signup_already_have_account: 'Ufite konti?',
    signup_login: 'Injira',

    // Home (minimal section keys)
    home_hero_tagline: 'Imbuto z’icyiciro cyiza',
    home_hero_headline: 'Tuzamure Ubuhinzi binyuze muri {highlight}',
    home_hero_highlight: 'Imbuto zemejwe z’Ubwiza',
    home_hero_description:
      'Dufasha abahinzi kubona ibisubizo byizewe by’imbuto kugira ngo babone umusaruro mwiza n’ubuhinzi burambye.',

    home_cta_explore_products: 'Reba Ibicuruzwa',
    home_cta_contact_us: 'Tuvugane',

    home_stats_farmers: 'Abahinzi bafashijwe',
    home_stats_varieties: 'Ubwoko bw’imbuto',
    home_stats_experience: 'Imyaka y’inararibonye',
    home_stats_districts: 'Uturere twagezwemo',

    home_features_title: 'Imbaraga zacu',
    home_features_why_choose: 'Impamvu Duhitamo DERN SEED',
    home_features_description:
      'Dutanga imbuto zemejwe n’inama z’ubuhinzi zihuriweho kugira ngo ubonye umusaruro mwiza.',

    home_catalog_title: 'Urutonde rwacu',
    home_featured_products_title: 'Ibicuruzwa byatoranyijwe',
    home_featured_products_description:
      'Imbuto zemejwe zifite ireme zihabwa ubwoko butandukanye n’ibihe bitandukanye.',

    home_services_title: 'Ibyo dutanga',
    home_services_heading: 'Serivisi zacu',
    home_services_description:
      'Ibisubizo byuzuye by’ubuhinzi bifasha inzira yawe y’ubuhinzi.',

    home_gallery_work: 'Ibikorwa byacu',
    home_gallery_title: 'Amashusho',
    home_gallery_description:
      'Reba ibikorwa byacu by’ubuhinzi, amahugurwa, n’ingaruka zacu ku baturage.',
    home_gallery_view_full: 'Reba Uzuye',

    home_testimonials_title: 'Inkuru z’indashyikirwa',
    home_testimonials_heading: 'Ibyo abahinzi bavuga',
    home_testimonials_description:
      'Wumve ku bihazi bahuye n’ingaruka nziza z’imbuto zacu zemejwe na serivisi.',

    home_blog_latest: 'Amakuru mashya',
    home_blog_heading: 'Blog & Amakuru',
    home_blog_description:
      'Ubumenyi n’inama z’ubuhinzi byagufasha gutsinda.',
    home_blog_view_all: 'Reba byose',

    home_cta_ready: 'Witeguye kunoza umusaruro?',
    home_cta_ready_description:
      'Reka dukorere hamwe n’imbuto zemejwe n’ubufasha bw’impuguke. Injira mu bihumbi by’abahinzi babona umusaruro mwiza.',
    home_cta_get_started: 'Tangira none',

    home_contact_preview_heading: 'Ibisobanuro by’itumanaho',
    home_contact_preview_get_in_touch: 'Ibaruwa',
    home_contact_preview_send_message: 'Ohereza ubutumwa',

    // About (minimal)
    about_hero_heading: 'Ibyerekeye DERN SEED',
    about_hero_description:
      'Gukura imbuto z’icyiciro cyiza mu buhinzi burambye kuva muri Kamena 2020. Dufasha abahinzi barenga 50,000 mu Rwanda.',
    about_hero_badge_1: 'Imbuto zemejwe',
    about_hero_badge_2: 'Ubufasha bw’impuguke',

    about_who_we_are: 'Turiyihe',
    about_our_story: 'Inkuru yacu',
    about_ownership: 'Ubushobozi',
    about_ownership_heading: 'Bishyigikiwe n’Ubushikiranganwa Gatolika bwa Ruhengeri',

    about_mission: 'Intego yacu',
    about_vision: 'Icyerekezo cyacu',
    about_our_goal: 'Intego yacu',
    about_our_scope: 'Urwego rwacu',
    about_what_we_do: 'Ibyo dukora',
    about_what_drives_us: 'Ibyadushishikariza',
    about_our_values: 'Indangagaciro zacu',
    about_who_we_serve: 'Abafatanyabikorwa bacu',
    about_target_beneficiaries: 'Abagenewe gufashwa',

    about_looking_ahead: 'Turitegura ejo hazaza',
    about_recent_projects: 'Imishinga iherutse',
    about_company_information: 'Ibisobanuro by’iyo sosiyete',

    about_company_name_label: 'Izina rya sosiyete:',
    about_head_office_label: 'Aho ibiro bikuru biri:',
    about_postal_address_label: 'Aderesi ya serivisi:',
    about_telephone_label: 'Telefone:',
    about_email_label: 'Email:',
    about_established_label: 'Itangiriro:',

    about_cta_heading: 'Hamwe turubaka ejo heza hizewe n’ibiribwa bihagije',
    about_cta_description:
      'Fata umufatanyabikorwa na DERN SEED ku mbuto zemejwe zizewe n’ubufasha bw’impuguke.',
    about_cta_contact_us: 'Tuvugane uyu munsi',

    about_staff_admin_desc: 'Ikipe yacu y\'ubuyobozi iri gukangahira ubwiza bw\'ubuhinzi mu Rwanda.',
    staff_badge_title: 'Abayobozi bacu',
    staff_title: 'Ubuyobozi bw\'Abakozi',
    staff_subtitle: 'Menya ikipe y\'ubuyobozi yemejwe iri gukangahira ubwiza bw\'ubuhinzi no kwitegura imbuto z\'ubwiza mu isosiyete ya DERN SEED.',

    // Services (minimal)
    services_hero_heading: 'Serivisi zacu',
    services_hero_description:
      'Ibisubizo byuzuye by’ubuhinzi bifasha abahinzi, amakoperative, sosiyete z’ubucuruzi bw’ubuhinzi, imiryango itegamiye kuri leta, n’abafatanyabikorwa mu rwego rwose.',
    services_faq_heading: 'Ibibazo bikunze kubazwa',
    services_faq_description:
      'Shaka ibisubizo ku bibazo bisanzwe bijyanye na serivisi zacu.',
    services_process_heading: 'Uburyo bwa serivisi zacu',
    services_process_description:
      'Uburyo dukorana n’abahinzi n’abafatanyabikorwa kugirango tubone ibisubizo byiza.',
    services_cta_heading: 'Witeguye gutangira?',
    services_cta_description:
      'Twandikire uyu munsi kugira ngo umenye byinshi kuri serivisi zacu n’amahirwe ahari.',
    services_cta_contact_us: 'Tuvugane',
    services_opportunities_tag: 'Utangire',
    services_opportunities_heading: 'Amahirwe Ahari Turi Kwifashisha Ubu',
    services_opportunities_description:
      'Dukomeje dutanga amahirwe y\'ubuhinzi n\'ubucuruzi bw\'ubuhinzi mu buryo bwuzuye kuri abahinzi, abanyeshuri, amakoperative, n\'abafatanyabikorwa b\'iterambere.',

    // Products (minimal)
    products_hero_heading: 'Ibicuruzwa byacu',
    products_hero_description:
      'Imbuto zemejwe zakozwe, zateguwe kandi zoherezwa hakurikijwe amahame y’ireme ry’imbuto yo mu gihugu kugira ngo hizere ubusugire n’imbaraga.',
    products_certified_badge: 'Zemejwe',
    products_available_varieties: 'Ubwoko burahari:',
    products_key_benefits: 'Ibyiza by’ingenzi:',
    products_inquire_now: 'Baza nonaha',
    products_empty_state: 'Nta bicuruzwa bibonetse muri iki cyiciro.',

    products_quality_assurance: 'Ubugenzuzi bw’ireme',
    products_quality_assurance_description:
      'Buri mbuto ikorwa na Dern Seed Company Ltd ihabwa igenzura rikomeye ry’ubwiza.',

    // Blog (minimal)
    blog_hero_heading: 'Blog & Amakuru',
    blog_hero_description:
      'Ubumenyi n’inama z’ubuhinzi byagufasha gutsinda.',
    blog_search_placeholder: 'Shakisha ingingo...',
    blog_filter_by_category: 'Shungura ku cyiciro',
    blog_all_articles: 'Zose',
    blog_no_articles: 'Nta ngingo zabonetse zahuye n’ubushakashatsi bwawe.',
    blog_featured_article: 'Ingingo yihariye',

    blog_newsletter_heading: 'Ihabazwe amakuru mashya yacu',
    blog_newsletter_description:
      'Iyandikishe kuri newsletter kugira ngo wakire inama z’ubuhinzi n’ubumenyi mu ibaruwa yawe.',
    blog_newsletter_subscribe: 'Iyandikishe',

    // Blog categories
    blog_cat_all: 'Inkuru Zose',
    blog_cat_seed_quality: 'Ubuzima bw\'Imbuto',
    blog_cat_finance: 'Amahera',
    blog_cat_projects: 'Ibikorwa',
    blog_cat_opportunities: 'Amaserivisi',

    // Blog detail
    blog_not_found: 'Inkuro Ntiyarabonetse',
    blog_not_found_desc: 'Inkuro ushaka ntirihari.',
    blog_back_to_blog: 'Subira ku Blog',

    // Articles (rw)
    blog_article_1_title: 'Kubera iki Imbuto Yemejwe ni Ingenzi kub\'Abahinzi ba Rwanda',
    blog_article_1_author: 'Bwana Cassien Twagirimana',
    blog_article_1_excerpt: 'Ubuhinzi buracyari ingufu z\'ubukungu bwa Rwanda. Imbuto yemejwe ni kimwe mu bintu bihenze cyane abahinzi bashobora kugura.',
    blog_article_1_content: 'Ubuhinzi buracyari ingufu z\'ubukungu bwa Rwanda, bufite abantu benshi mu buzima kandi bufite uruhare rukomeye mu gutera inkunga y\'ibihugu no kwubaka ubukungu. Nk\'uko ibyo abantu bashaka byiyongera, abahinzi bagomba gukoresha ingamba z\'ubuhinzi zavuga ikigero kandi zongere umusaruro. Imbuto yemejwe ni kimwe mu bintu bihenze cyane abahinzi bashobora kugura.\n\nNi ikihe iciyumweru c\'imbuto yemejwe? Imbuto yemejwe ni imbuto yarabonetse, yarasuzumwe, kandi yemerewe bikurijije amategeko y\'igihugu. Irasabwa mu buryo bwose kugira ngo isobanure ubusozanisi bw\'ibinyabuzima, ikagire ubushobozi bwo guhinga, kandi itagifite indwara.\n\nKubera iki imbuto yemejwe ni ingenzi:\n1. Umusaruro mwinshi - Imbuto yemejwe itangwa mu bwoko bushya bw\'imbuto bwatsinze ibyiza.\n2. Guhinga neza - Ubushobozi bwo guhinga neza butuma imbuto yose itera mu gihe kimwe.\n3. Gushyira mu buremere indwara - Imbuto yemejwe irasuzumwa mu buryo rikomeye kugira ngo yirinde indwara.\n4. Imbuto y\'ubwiza - Amasoko yiyongera asaba ibicuruzwa vy\'ubwiza.\n5. Imbazo mu bihe vy\'ikirere - Ubwo bwoko bushya bw\'imbuto bwagizwe kugira ngo bushobore gutera mu bihe vy\'ikirere bikomeye.\n\nIgihe mu Rwanda: Rwanda yarakoresheje ingamba zikomeye mu gutera inkunga y\'ibikoresho vy\'ubuhinzi. Nubwo, abahinzi benshi bacyari bikoresha imbuto yahoranye.\n\nUruhare rwa Dern Seed Company Ltd: Mu Dern Seed Company Ltd, turabonye ko dukeneye gufasha mu iterambere ry\'ubuhinzi rya Rwanda mu gutanga imbuto yemejwe y\'ubwiza. Turi abakorana mu gutangura, gutunganya, no gutengesha imbuto yemejwe.\n\nGukura imbuto y\'ubwiza ni gukura igihugu: Abahinzi benshi baratereka ibindi bikoresho bigatuma barahubira ubwiza bw\'imbuto. Ushyira imbuto yemejwe mu bikorwa, abahinzi bagira umusaruro mwinshi, ibihingwa bifite ubuzima, no kwibanda mu bihugu.\n\nIgisubizo: Ikinyabuzima c\'ubuhinzi cya Rwanda kirategereye kwemera ingamba z\'ubwiza. Imbuto yemejwe sibyo gusa; ni ingenzi yo gukura ubuhinzi bw\'igihugu.',

    blog_article_2_title: 'Uburyo Abahinzi Bashobora Kubona Inkunga z\'Ubuhinzi mu Buryo bwa BK',
    blog_article_2_author: 'Dern Seed Company Ltd',
    blog_article_2_excerpt: 'Kubona inkunga ni kimwe mu bintu bihenze cyane kugira ngo umusaruro w\'ubuhinzi ukore neza.',
    blog_article_2_content: 'Kubona inkunga ni kimwe mu bintu bihenze cyane kugira ngo umusaruro w\'ubuhinzi ukore neza. Dern Seed Company Ltd yarabanye na Banki ya Kigali kugira ngo abahinzi bashobore kubona amaserivisi y\'amahera. Ubuhinzi bushaka gutera inkunga mu gihe. Abahinzi bakeneye amahera kugira ngo bagure imbuto yemejwe, amabomwe, amakamyo y\'ubuhinzi, n\'ibikoresho vy\'ubuhinzi. Kubona inkunga biratuma abahinzi bagira umusaruro mwinshi no gutera ibikorwa vy\'ubuhinzi. Ubufatanye buri kugira gutera inkunga y\'ubuhinzi, guhimba umusaruro w\'imbuto yemejwe, gutera amasezerano y\'ubuhinzi, no gutera inkunga. Abahinzi bose bashobora kubona amaserivisi: abahinzi b\'umwimerere, ibigo vy\'abahinzi, abatangura imbuto, n\'abakorana mu bushobozi.',

    blog_article_3_title: 'Porogaramu ya AGRA AIDI: Guteza Imbere Imiburo mu Rwanda',
    blog_article_3_author: 'Dern Seed Company Ltd',
    blog_article_3_excerpt: 'Dern Seed Company Ltd yararangije neza porogaramu ya AGRA AIDI, itezambere uruzitiro rw\'imbuto y\'irish mu Rwanda.',
    blog_article_3_content: 'Porogaramu ya AGRA AIDI: Guteza Imbere Imiburo y\'Irish mu Rwanda. Inyandiko y\'igiciro cy\'igikorwa cya Dern Seed Company Ltd. Dern Seed Company Ltd irashimisha ko yararangije neza porogaramu ya AGRA AIDI, yagombaga gutera inkunga y\'uruzitiro rw\'imbuto y\'irish mu Rwanda. Porogaramu yatumijwe na AGRA. Ibigo vy\'ubuhinzi: Irish ni kimwe mu binyamapfare vy\'ingenzi mu Rwanda. Porogaramu yari iritezwa gutangura imbuto yatsinze, gutera inkunga, amahugurwa y\'abahinzi, gutera inkunga y\'imbuto, no gutera amahugurwa y\'ubuhinzi bw\'ikirere. Ibyatanzwe: Yongereye umusaruro w\'imbuto yemejwe, yagize ubushobozi bwo gutera imbuto, amahugurwa y\'abahinzi, ibigereranyo vy\'imbuto, no gutera ubufatanye. Ingaruka: Amafaranga ya AGRA yaratuma isosiyete yakura mu buryo bw\'ubukungu. Abahinzi babonye imbuto yemejwe, umusaruro mwinshi, ubumenyi, kwibanda mu bihugu, akazi, no gukomeza.',

    blog_article_4_title: 'Ubufatanye bwa IITA FOBASI Bushigaye Ubwibo mu Rwanda',
    blog_article_4_author: 'Dern Seed Company Ltd',
    blog_article_4_excerpt: 'Dern Seed Company Ltd iri mu porogaramu ya FOBASI hamwe na IITA, itangiye mu Rwanda mu 2027A.',
    blog_article_4_content: 'Ubufatanye bwa IITA FOBASI Bushigaye Ubwibo mu Rwanda. Itangiye mu Rwanda mu 2027A. Dern Seed Company Ltd irashimisha ko yarinjiye mu porogaramu ya FOBASI hamwe na IITA. Porogaramu yagombaga gutera inkunga y\'ubuhinzi bworoshye mu buryo bwo gutera abahinzi n\'ingamba z\'imbere, imbuto y\'ubwiza, amahugurwa, n\'uburyo bw\'ubuhinzi. Dern Seed Company Ltd izagira uruhare rukomeye: gutanga imbuto yemejwe, gutera inkunga y\'imbuto yatsinze, amahugurwa, ibigereranyo, no gutera ingamba y\'imbuto. Ibikorwa vyitezwe: gutera abahinzi, gutera ibigereranyo, gutanga imbuto, amahugurwa, no kugenzura. Amasezerano: ubushobozi bw\'imbuto, ubumenyi, umusaruro mwinshi, ibihugu bihaza, no amaserivisi y\'amahera.',

    blog_article_5_title: 'Amaserivisi yose afise ubushobozi mu Dern Seed Company Ltd',
    blog_article_5_author: 'Dern Seed Company Ltd',
    blog_article_5_excerpt: 'Dern Seed Company Ltd itera inkunga y\'abahinzi, abanyeshuri, ibigo vy\'abahinzi, n\'abakorana mu bushobozi.',
    blog_article_5_content: 'Amaserivisi yose afise ubushobozi mu Dern Seed Company Ltd. Turabonye ko dukeneye gutera inkunga y\'abahinzi, abanyeshuri, ibigo vy\'abahinzi, n\'abakorana mu bushobozi. Amaserivisi y\'ubuhinzi bw\'ingabo: Dern Seed Company Ltd irongera gutera amaserivisi y\'ubuhinzi bw\'ingabo. Ibihingwa: Imbuto y\'irish, ibinyamapfare, igori, ingano, n\'ubutore. Amasezerano: Ubushobozi bw\'imbuto y\'ubwiza, ubufasha bw\'ingamba, ikizamini c\'ubwiza, amasoko yemejwe. Amaserivisi y\'amashuri: Amahugurwa mu buryo bw\'ubuhinzi, gutunganya imbuto, gutengesha, no gutera inkunga. Ubushobozi bw\'amahera: Amahera y\'ubuhinzi mu gihe, amahera y\'ibikoresho, n\'amahera y\'ubuhinzi bw\'igikorwa. Ibikorwa vy\'iterambere: AGRA AIDI (Yararangije), IITA FOBASI (Itangira mu 2027A), COMESA ACTESA. Amaserivisi y\'abakuru n\'abagore: Amahugurwa, imbuto, ingamba, n\'ubushobozi. Ubufatanye: Amashuri, ibigo vy\'ubushakashatsi, IGO, n\'abatanga amahera.',

    // Gallery (minimal)
    gallery_hero_heading: 'Amashusho yacu',
    gallery_hero_description:
      'Reba ibikorwa byacu by’ubuhinzi, amahugurwa, n’ingaruka zacu mu Rwanda.',
    gallery_browse_collections: 'Reba Ibyegeranye',
    gallery_empty_state: 'Nta mashusho yabonetse muri iki cyiciro.',
    gallery_visual_story: 'Inkuru y’ubuhinzi mu mashusho',
    gallery_visual_story_description:
      'Aya mashusho agaragaza ibyo twiyemeje: ireme, ubufasha ku bahinzi, n’ubuhinzi burambye.',
    gallery_featured_highlights: 'Iby’ingenzi byagaragajwe',
    gallery_featured_highlights_description:
      'Ibikorwa by’ingenzi bisobanura ubutumwa n’ingaruka zacu.',

    gallery_join_community_heading: 'Iza mu muryango wacu unyanyagiye',
    gallery_join_community_description:
      'Wifatanye n\'impinduka z\'ubuhinzi mu Rwanda hamwe na DERN SEED.',
    gallery_join_contact_us: 'Tuvugane',

    gallery_highlights_heading: 'Iby\'ingenzi byagaragajwe',
    gallery_highlights_description: 'Ibikorwa by\'ingenzi bisobanura ubutumwa n\'ingaruka zacu.',
    gallery_highlight_potato_title: 'Kuzana Uduseke',
    gallery_highlight_potato_desc: 'Kurima imbuto y\'uduseke zifite ubwiza no kugabana.',
    gallery_highlight_bean_title: 'Kurima Ibishimbo',
    gallery_highlight_bean_desc: 'Kuzana imbuto y\'ibishimbo by\'ubwiza kuri abahinzi bo mu Rwanda.',
    gallery_highlight_maize_title: 'Kuzana Imbuto y\'Ibigori',
    gallery_highlight_maize_desc: 'Imbuto zemejwe z\'ibigori zifite ubutabera buke.',
    gallery_highlight_wheat_title: 'Kuzana Ingano',
    gallery_highlight_wheat_desc: 'Kuzana imbuto y\'ingano y\'ubwiza.',
    gallery_highlight_soybean_title: 'Kurima Ubutore',
    gallery_highlight_soybean_desc: 'Kurima imbuto y\'ubutore no kugabana.',
    gallery_highlight_production_title: 'Kuzana Imbuto',
    gallery_highlight_production_desc: 'Ibikorwa vyacu vy\'ukwemeza ubwiza bw\'imbuto.',
    gallery_highlight_fields_title: 'Imurima',
    gallery_highlight_fields_desc: 'Imurima yacu y\'ibigereranyo n\'uburambe.',
    gallery_highlight_legume_title: 'Imbuto y\'Ibishimbo',
    gallery_highlight_legume_desc: 'Ubwoko bw\'imbuto y\'ibishimbo bw\'ubwiza.',
    gallery_highlight_cereal_title: 'Imbuto y\'Ibigori',
    gallery_highlight_cereal_desc: 'Ubwoko bw\'imbuto y\'ibigori zemejwe.',
    gallery_highlight_diversity_title: 'Ubwoko bw\'Imbuto',
    gallery_highlight_diversity_desc: 'Ubwoko bushya bw\'imbuto bugenewe ubuhinzi butandukanye.',
    gallery_highlight_visuals_title: 'Inkuru y\'ubuhinzi mu mashusho',
    gallery_highlight_visuals_desc: 'Aya mashusho agaragaza ibyo twiyemeje: ireme, ubufasha ku bahinzi.',
    gallery_highlight_community_title: 'Ingaruka ku Baturage',
    gallery_highlight_community_desc: 'Gufungura itandukaniro mu baturage b\'ubuhinzi bo mu Rwanda yose.',
    gallery_highlight_training_title: 'Amahugurwa y\'Abahinzi',
    gallery_highlight_training_desc: 'Porogaramu z\'amahugurwa zisanzwe zitanga abahinzi n\'uburyo bushya.',
    gallery_highlight_harvest_title: 'Umusaruro Mwiza',
    gallery_highlight_harvest_desc: 'Gufasha abahinzi kubona umusaruro mwiza mu gihe icyo ari cyo cyose.',

    products_certified_quality: 'Imbuto Zemejwe z\'Ubwiza',
    products_search_label: 'Shakisha Imbuto',
    products_filter_label: 'Hitamokubura ku Cyiciro',
    products_select_category: 'Hitamo Icyiciro',

    // Navigation (new)
    nav_order_seeds: 'Tegura Imbuto',
    nav_logout_success: 'Watsohotse neza',
    nav_dashboard: 'Ikibaho',
    nav_logout: 'Sohoka',

    // Nav dropdown (new)
    nav_product_irish_potato: 'Imbuto y\'Uduseke',
    nav_product_bean: 'Imbuto y\'Ibishimbo',
    nav_product_maize: 'Imbuto y\'Ibigori',
    nav_product_wheat: 'Imbuto y\'Ingano',
    nav_product_soybean: 'Imbuto y\'Ubutore',
    nav_about_mission: 'Intego yacu',
    nav_about_vision: 'Icyerekezo cyacu',
    nav_about_values: 'Indangagaciro',
    nav_about_goals: 'Intego z\'uburyo',
    nav_about_what_we_do: 'Ibyo dukora',
    nav_about_team: 'Ikipe yacu',

    // Home features (new)
    home_feature_certified_title: 'Imbuto Zemejwe',
    home_feature_certified_desc: 'Imbuto zose zubahiriza amahame y\'ireme ry\'igihugu',
    home_feature_germination_title: 'Igipimo kinini cy\'ubutabera',
    home_feature_germination_desc: 'Bitunganyijwe kugira ngo babone amahirwe menshi y\'ubutabera',
    home_feature_disease_title: 'Birwanya indwara',
    home_feature_disease_desc: 'Ubwoko bwubatswe bikangahira indwara zisanzwe',
    home_feature_trusted_title: 'Umufatanyabikorwa wizewe',
    home_feature_trusted_desc: 'Imyaka y\'uburambe mu buhinzi',
    home_feature_expert_title: 'Ikipe y\'impuguke',
    home_feature_expert_desc: 'Abahinga n\'abashinzwe imbuto b\'impuguke',
    home_feature_support_title: 'Ubufasha bw\'abakiriya',
    home_feature_support_desc: 'Ubufasha busabwa nyuma y\'igurisha n\'ubuhinga',

    // Home services (new)
    home_service_production_title: 'Kuzana Imbuto Zemejwe',
    home_service_production_desc: 'Dukorana imbuto dukurikije amahame y\'ireme y\'ubwoko bw\'isonga',
    home_service_distribution_title: 'Kugabana Imbuto',
    home_service_distribution_desc: 'Uruhurirane rw\'ibikorwa ruja kuri abahinzi bo mu turere twose',
    home_service_consultancy_title: 'Inama z\'Ubuhinzi',
    home_service_consultancy_desc: 'Inama z\'impuguke ku isura y\'ibinyamapfare n\'ubuhinzi',
    home_service_training_title: 'Amahugurwa y\'Abahinzi',
    home_service_training_desc: 'Porogaramu z\'amahugurwa zuzuye kugira ngo bunjwe ubuhinzi',
    home_service_tech_title: 'Ubufasha bw\'Ubuhinga',
    home_service_tech_desc: 'Ubufasha bukomeje mu gihe cyose cy\'uburimyi',
    home_service_crop_title: 'Inama z\'Umusaruro w\'Imbuto',
    home_service_crop_desc: 'Ubuyobozi mu buryo bwo gutera no kugurisha amakuru',

    // Home gallery labels (new)
    home_gallery_irish_potato: 'Uduseke',
    home_gallery_bean: 'Ibishimbo',
    home_gallery_maize: 'Ibigori',
    home_gallery_wheat: 'Ingano',
    home_gallery_soybean: 'Ubutore',
    home_gallery_certified_maize: 'Imbuto y\'Ibigori Zemejwe',

    // Home blog (new)
    home_blog_post1_title: 'Igihe Kiza cyo Gutera Ibigori',
    home_blog_post1_category: 'Amabwiriza y\'Igihe',
    home_blog_post1_excerpt: 'Menya igihe kiza cyo gutera ibigori mu turere tutandukanye kugira ngo ingereranishe umusaruro wawe.',
    home_blog_post2_title: 'Guhitamo Imbuto Zemejwe',
    home_blog_post2_category: 'Amabwiriza y\'Igurisha',
    home_blog_post2_excerpt: 'Amabwiriza yuzuye yo guhitamo imbuto zemejwe zifite ubwiza bwawe bwo buhinzi.',
    home_blog_post3_title: 'Inama z\'Kwirinda Izaha',
    home_blog_post3_category: 'Kurinda Imbuto',
    home_blog_post3_excerpt: 'Uburyo bwo kwirinda izaha bisanzwe no kurinda imbuto zawe mu buryo bw\'umw自然.',

    // Home welcome section (new)
    home_welcome_badge: 'Ikizamini c\'Umuyobozi wacu',
    home_welcome_message_label: 'Ubutumwa bw\'Ikizamini',
    home_welcome_salutation: 'Abashitsi bacu b\'agaciro, Abafatanyabikorwa, Abahinzi, n\'Abafite ingabo,',
    home_welcome_para1: 'Murakaza neza mu isosiyete ya Dern Seed Company Ltd. Twishimiye gufatanya n\'ubuhinzi bw\'Rwanda twatanga imbuto zemejwe zifite ubwiza n\'ubufasha bwizewe.',
    home_welcome_para2: 'Intego yacu yoroshye: kugira ngo abahinzi babone ubwoko bw\'imbuto bwizewe, bushobora neza kandi bukwisha.',
    home_welcome_read_more: 'Soma Byinshi',
    home_welcome_para3: 'Nk\'Umuyobozi, nishimiye kuva mu muco udufite wo kwizera no gukangahira ubuhinzi bw\'Rwanda mu gukora no gutanga imbuto zemejwe zifite ubwiza n\'serivisi z\'ubuhinzi z\'igisubizo.',
    home_welcome_para4: 'Tuvuye mu rwego rw\'ubutumva twatangiriye mu 2020 hasi y\'ubusikiriza bwa Ruhengeri, twibanda ku gukangahira ibibyobwa, no kunozora uburambe bw\'abahinzi bo mu Rwanda yose.',
    home_welcome_para5: 'Twizera ko imbuto z\'ubwiza ni ibisanzwe by\'ubuhinzi bushobora. Ibi bigira icyatumye abahinzi bakire umusaruro mwiza, amasezerano meza, n\'ubuhinzi burambye.',
    home_welcome_para6: 'Hanze y\'ugukora imbuto, Dern Seed Company Ltd itanga serivisi z\'ubuhinzi z\'uzuye, harimo amahugurwa y\'ubuhinga, ubufasha bw\'ibikorwa, ubuhinzi bw\'amasezerano, kwemeza ubwiza bw\'imbuto, ubuyobozi bw\'ubucuruzi bw\'ubuhinzi, n\'ibikorwa by\'ubucuruzi.',
    home_welcome_para7: 'Mu izina rya Ikipe y\'Abayobozi, abashinzwe ubuyobozi, n\'abakozi bacu bese, twishimira ubwiyunge bwawe. Duzera imbere mu gufata abafatanyabikorwa bo mu gihe kire kandi dukure hamwe ku bumenyi bw\'ibibyobwa, ubukungu, n\'ubuzima bw\'ibibyobwa bugeze.',
    home_welcome_thank_you: 'Murakoze muza ku rubuga rwanjye, kandi mwakira neza mu muryango wa Dern Seed Company Ltd.',
    home_welcome_director_name: 'Father Alexandre NTABANGANYIMANA',
    home_welcome_director_title: 'Umuyobozi wa Dern Seed Company Ltd',

    // Home about section (new)
    home_about_years: 'Imyaka y\'Inyungu',
    home_about_badge: 'Ibyerekeye Twe',
    home_about_description1: 'DERN SEED CO LTD ni isosiyete y\'ubuhinzi y\'agaciro itegerezwa ku gukora no kugabana imbuto zemejwe zifite ubwiza. Twiyemeje gufasha abahinzi n\'ubwoko bw\'imbuto bwizewe bukangahira ubukungu, ibibyobwa, n\'ubuhinzi burambye.',
    home_about_description2: 'Intego yacu ni ukugira ngo abahinzi bo mu Rwanda babone imbuto z\'ubwiza zemejwe n\'ubufasha bw\'ubuhinzi bw\'impuguke. Twizera mu buryo bw\'ubuhinzi burambye bufasha abahinzi n\'ibidukikije.',
    home_about_certified: 'Zemejwe n\'amahame y\'igihugu n\'amahamwe',
    home_about_expert: 'Ikipe y\'impuguke y\'abahinga n\'abashinzwe imbuto',
    home_about_support: 'Ubufasha bw\'abakiriya n\'ubufasha bw\'ubuhinga',

    // Home no testimonials (new)
    home_no_testimonials: 'Nta bitangiro bihari ubu.',

    // Home contact preview (new)
    home_contact_business_hours: 'Ku mbere - Ku gatanu: 8:00 AM - 5:00 PM',

    // About page (new)
    about_value_quality_title: 'Ubwiza',
    about_value_quality_desc: 'Amahame y\'agaciro mu mbuto icyarimwe dukora.',
    about_value_integrity_title: 'Ubwiyunge',
    about_value_integrity_desc: 'Ukwiyunga n\'ubusobanura mu bikorwa byose.',
    about_value_innovation_title: 'Igitekerezo',
    about_value_innovation_desc: 'Kwakira ubushobozi bushya n\'uburyo bushya kugira ngo tubone ibisubizo byiza.',
    about_value_partnership_title: 'Ubufatanye',
    about_value_partnership_desc: 'Kubaka ubusabane bukeze n\'abahinzi n\'abandi.',
    about_value_sustainability_title: 'Kwizirahamwe',
    about_value_sustainability_desc: 'Imimerere irinda ibidukikije kugira ngo abo dushyigikira babonere ibibyobwa.',
    about_value_community_title: 'Ingaruka ku Baturage',
    about_value_community_desc: 'Gufungura itandukaniro mu baturage b\'ubuhinzi.',

    about_goal_1: 'Kuzana no gutanga imbuto zemejwe zubahiriza amahame y\'igihugu n\'amahamwe.',
    about_goal_2: 'Kunozora ibibyobwa n\'ibikorwa by\'ubuhinzi mu Rwanda yose.',
    about_goal_3: 'Kugira ngo abahinze babone ubumenyi, amaha, n\'ubwoko bw\'imbuto bwizewe.',
    about_goal_4: 'Kwizera mu buryo bw\'ubuhinzi burambye n\'ubusabane bw\'ibidukikije.',
    about_goal_5: 'Kubaka abafatanyabikorwa ba strategi kugira ngo dukure hamwe.',

    about_scope_description: 'Ibikorwa byacu biri mu Rwanda yose, bidategekerejwe ku Nkengera y\'Amajyaruguru kandi biri mu gihugu cose duherereye uruhurirane rw\'ibikorwa byacu.',

    about_what_we_do_1: 'Kuzana Imbuto',
    about_what_we_do_2: 'Amahugurwa n\'Ubuyobozi bw\'Abahinzi',
    about_what_we_do_3: 'Inama z\'Ubuhinzi',
    about_what_we_do_4: 'Kwihuza n\'Isoko',
    about_what_we_do_5: 'Ubuhinzi bw\'Amasezerano',
    about_what_we_do_6: 'Kwemeza Ubwiza bw\'Imbuto',

    about_beneficiary_smallholder: 'Abahinzi Bato',
    about_beneficiary_cooperatives: 'Amakoperative n\'Amatsinda y\'Abahinzi',
    about_beneficiary_agribusiness: 'Ibikorwa by\'Ubuhinzi',
    about_beneficiary_development: 'Ibikorwa by\'Iterambere',
    about_beneficiary_ngos: 'Ibikorwa by\'Ubuvandimwe n\'Abatanga',
    about_beneficiary_government: 'Ibikorwa by\'Leta',

    about_project_seed_scaling: 'Porogaramu y\'Iguzanyo ry\'Imbuto',
    about_project_farmer_field: 'Amashuri y\'Abahinzi',

    about_staff_ceo: 'Umuyobozi Mukuru',
    about_staff_ceo_desc: 'Yobora ibikorwa vyose vy\'isosiyete n\'uwayoboze.',
    about_staff_agronomist: 'Umuyobozi w\'Ubuhinzi',
    about_staff_agronomist_desc: 'Yobora porogaramu z\'ukwemeza ubwiza bw\'imbuto n\'izobere.',
    about_staff_operations: 'Umuyobozi w\'Ibikorwa',
    about_staff_operations_desc: 'Yobora ibikorwa vy\'umunsi n\'ubuyobozi bw\'ibikorwa.',
    about_staff_training: 'Umuyobozi w\'Amahugurwa',
    about_staff_training_desc: 'Yobora amahugurwa y\'abahinzi n\'ibikorwa vy\'ubuyobozi.',
    about_staff_quality: 'Umuyobozi w\'Igenzura ry\'Ubwiza',
    about_staff_quality_desc: 'Yemeza ko imbuto zose zubahiriza amahame y\'ireme.',
    about_staff_marketing: 'Umuyobozi w\'Ubukorikori',
    about_staff_marketing_desc: 'Yobora ubukorikori bw\'ibara n\'iterambere ry\'isoko.',

    // Services page (new)
    services_seed_production_title: 'Kuzana Imbuto Zemejwe n\'Imikorere',
    services_seed_production_desc: 'Dern Seed Company Ltd y\'ubwoko bw\'ubuhinzi bw\'imizigo, gukorora, gukemura, no kugurisha imbuto zemejwe z\'Irish Potato, Bean, Maize, Wheat, na Soybean. Dukorana nabahinzi, amakoperative, n\'ibikorwa vy\'ubuhinzi kugira ngo tuzane imbuto zifite ubusugire, amahera meza, kandi zidafite indwara.',
    services_seed_distribution_title: 'Kugabana Imbuto n\'Uruzitiro',
    services_seed_distribution_desc: 'Uruhurirane rw\'ibikorwa ruja kuri abahinzi bo mu turere twose tw\'Rwanda. Duhaha imbuto ku gihe ku makoperative, ibikorwa vy\'ubuhinzi, n\'abahinzi bo bonyine.',
    services_agri_consultancy_title: 'Inama z\'Ubuhinzi',
    services_agri_consultancy_desc: 'Inama z\'impuguke ku isura y\'ibinyamapfare, ubuyobozi bw\'ubuhinzi, kurinda izaha, n\'uburyo bw\'ubuhinzi bw\'agaciro. Ikipe yacu y\'abahinzi itanga ubuyobozi bwihariye kugira ngo ingereranishe umusaruro wawe.',
    services_farmer_training_title: 'Amahugurwa y\'Abahinzi n\'Kubaga Amaha',
    services_farmer_training_desc: 'Porogaramu z\'amahugurwa zuzuye zigize uburyo bushya bw\'ubuhinzi, guhitamo imbuto, kurinda ubuhinzi, no gucunga ibyo warimye. Dufasha abahinzi n\'ubumenyi n\'amaha kugira ngo babone ubuhinzi burambye.',
    services_tech_support_title: 'Ubufasha bw\'Ubuhinga n\'Ubuyobozi',
    services_tech_support_desc: 'Ubufasha bw\'ubuhinga bukomeje mu gihe cyose cy\'uburimyi. Abakozi bacu babaho bayobora, bayoboza indwara, kandi batanga ibisubizo by\'ibisobanuro kugira ngo imbuto ibe neza.',
    services_quality_assurance_title: 'Kwemeza Ubwiza bw\'Imbuto n\'Iwacu',
    services_quality_assurance_desc: 'Igenzura ry\'ubwiza rikomeye rigize kwigerageza mu ishuri, kwitema mu murima, no guhuranira amahame y\'ireme. Buri rukerere rw\'imbuto rwageragezwa kugira ngo ryamenye ibipimo by\'ubutabera, ubusugire, n\'ubwongo bw\'amazi.',
    services_market_linkage_title: 'Kwihuza n\'Isoko n\'Uruzitiro rw\'Agaciro',
    services_market_linkage_desc: 'Kwihuza abahinzi n\'amasoko, abaguzi, n\'amahirwe y\'ongera agaciro. Dufasha abahinzi kubona amasoko y\'ahantu n\'amahamwe kugira ngo bahabwe amasezerano y\'agaciro ku binyamapfare byabo.',
    services_contract_farming_title: 'Ubuhinzi bw\'Amasezerano',
    services_contract_farming_desc: 'Porogaramu z\'ubuhinzi bw\'amasezerano zitanga abahinzi n\'ibikoresho by\'imbuto, ubufasha bw\'ubuhinga, n\'amasoko yemejwe ku binyamapfare byabo. Zigabanya ingaruka kandi zishobora amasezerano y\'amahera.',
    services_climate_resilient_title: 'Ubwoko bw\'Imbuto buzira icyubahiro n\'bwinshi',
    services_climate_resilient_desc: 'Dukora, dutangaza, kandi dutanga imbuto zifite ubwoko bushya zihuza n\'bihinduka biri mu muhumure — ziteguye gukemura ukutagura, ibinyamashyiga, n\'indwara mu gihe zongera umusaruro n\'ingengo y\'imari.',
    services_seed_processing_title: 'Gutunganya no Gupakira Imbuto',
    services_seed_processing_desc: 'Dukorera guhosha, gucukura, guhitamwo, kwitonda, kugenzura ubwiza, no gupakira imbuto kugira ngo tubyongere ubusugire, igipimo c\'ubuhinzi, n\'igihe cy\'uburambe — dukorana n\'abafatanyabikorwa bemewe ku mikorere mingi.',
    services_demo_plots_title: 'Imyirima y\'Ingero n\'Igeragezo ry\'Ubuso',
    services_demo_plots_desc: 'Duhagarara imyirima y\'ingero kandi dukoresha igeragezo ry\'ubusonko kugira ngo tugire uburambe bw\'imbuto zongereye n\'zifite icyubahiro mu buzima bwa nyobo y\'ubuhinzi, tugakosora ibyifuzo ku birere bitandukanye.',
    services_agro_input_title: 'Kugabana Ibikoresho by\'Ubuhinzi',
    services_agro_input_desc: 'Dutanga imbuto z\'ubwiza, ifumbire, n\'ibikoresho by\'kurwana indwara byatanzwe n\'abatanga bemewe, binyuze mu buryo bw\'ahantu n\'abafatanyabikorwa.',
    services_rd_partnerships_title: 'Ubufatanye n\'Ibitange n\'Igeragezo',
    services_rd_partnerships_desc: 'Dukorana n\'ibitaro by\'icuruzi, vy\'univerite, n\'abakorera mu isosiyete y\'abanyabcura kugira ngo twigerageze imbuto zongereye, tubihuze n\'ubwoko bw\'ahantu, kandi tubone ubuhinga bushya buzira icyubahiro.',
    services_finance_title: 'Ubufasha bw\'Intambwe mu Mishinga y\'Amahera',
    services_finance_desc: 'Duha abahinzi n\'amakoperative uruhurirane n\'amabanki, ibitaro by\'amahera, SACCOs, abashitsi b\'amahera, DFIs, n\'amashyirahamwe y\'amahera — dutera inkunga y\'ubucuruzi n\'inandiko byo gutera inkunga.',
    services_dev_partnerships_title: 'Ubufatanye bwo Kwiterambere bwa Leta n\'Abanyabucura',
    services_dev_partnerships_desc: 'Dukorana n\'ibitaro bya leta, NGO, abatanga bayobozi b\'iterambere, n\'ibitaro by\'icuruzi ku bwoko bw\'imbuto, ubuhinzi buzira icyubahiro, n\'iterambere ry\'ubukungu bw\'ahantu.',
    services_youth_women_title: 'Kubungabunga Abana n\'Abakobwa mu Bucuruzi bw\'Ubuhinzi',
    services_youth_women_desc: 'Dufungura amahirwe kuri abana n\'abakobwa mu gutunganya imbuto, amahugurwa, ubuhinzi bw\'amasezerano, n\'ibikorwa vy\'uru rwego rw\'agaciro — hamwe n\'ubuyobozi n\'uburambe bw\'ibikoresho n\'amasoko.',
    services_project_impl_title: 'Gukemura Umushinga w\'Ubuhinzi',
    services_project_impl_desc: 'Dufasha mu gutegeka, gutegura, gukemura, gukurikirana, no gutegura imishinga y\'ubuhinzi kuri NGO, porogaramu za leta, n\'ibikorwa vy\'abanyabucura.',
    services_investment_title: 'Amahirwe y\'Abashitsi n\'Ubufatanye bw\'Ingaro',
    services_investment_desc: 'Twakiriye ubufatanye n\'abashitsi b\'amahera, DFIs, ibitaro vy\'ubucuruzi bw\'ubuhinzi, n\'NGO kugira ngo dutangaze gutunganya imbuto kandi tubone ingarano z\'ubukungu n\'ubusabane zomeka.',

    // Services opportunities (new)
    services_opportunity_training: 'Porogaramu z\'Amahugurwa',
    services_opportunity_training_desc: 'Injira mu mahugurwa yacu yuzuye y\'abahinzi akubiyemo uburyo bushya, guhitamo imbuto, n\'uburyo bw\'ubuhinzi burambye.',
    services_opportunity_cooperative: 'Ubufatanye n\'Amakoperative',
    services_opportunity_cooperative_desc: 'Dufatanya n\'amakoperative y\'abahinzi kugira ngo dutange imbuto z\'ubwiza, amahugurwa, n\'uburambe bw\'amasoko.',
    services_opportunity_contract: 'Amahirwe y\'Ubuhinzi bw\'Amasezerano',
    services_opportunity_contract_desc: 'Injira mu amasezerano y\'ubuhinzi kugira ngo ubone ibikoresho by\'imbuto n\'amasoko yemejwe.',
    services_opportunity_consultancy: 'Serivisi z\'Inama z\'Ubuhinzi',
    services_opportunity_consultancy_desc: 'Shakisha inama z\'impuguke zihuriye n\'ubuhinzi bwawe bwihariye.',

    // Services process (new)
    services_process_1_title: 'Inama',
    services_process_1_desc: 'Dukurikira ubuhinzi bwawe kandi dutanga ibisubizo by\'umwihariko.',
    services_process_2_title: 'Gutegeka',
    services_process_2_desc: 'Dukora porogaramu yihariye hamwe n\'imbuto zifitanye n\'ubufasha.',
    services_process_3_title: 'Kubungabunga',
    services_process_3_desc: 'Dutanga imbuto, amahugurwa, n\'ubufasha bw\'ubuhinga bukomeje.',
    services_process_4_title: 'Umusaruro no Koherezwa',
    services_process_4_desc: 'Dufasha kwizera no kugabana umusaruro wawe mu buryo bw\'agaciro.',

    // Products page (new)
    products_all: 'Imbuto Zose',
    products_root_crops: 'Ibinyamapfare',
    products_legumes: 'Ibishimbo',
    products_cereals: 'Ibigori n\'Ingano',
    products_search_placeholder: 'Shakisha imbuto, ibiza, ubwoko bw\'ibinyamapfare...',
    products_reset_filters: 'Sondera Amahitamokubura',

    // ProductCard (new)
    product_certified: 'Zemejwe',
    product_key_highlights: 'Ibintu by\'ingenzi:',
    product_maturity: 'Igihe cy\'ibyiringiro:',
    product_planting_season: 'Igihe c\'ubuhinzi',
    product_harvest_period: 'Igihe c\'isarurwa',
    product_order_now: 'Tegura Iyi Mbuto Ubu',
    product_benefits: 'Ibiza vy\'Ubuhinzi',
    product_quality_standards: 'Amategeko y\'Ubwiza n\'Ibiciro vy\'Imbuto',
    product_close_details: 'Funga Ibisobanuro',
    product_inquire_order: 'Buza / Tegura',
    product_modal_close: 'Funga',
    product_modal_prev: 'Imbere',
    product_modal_next: 'Imbere',
    product_view_details: 'Reba Ibisobanuro',
    product_order_seed: 'Tegura Imbuto',
    product_view_info: 'Reba amakuru y\'ayego ku',

    // Gallery (new)
    gallery_crop_potato: 'Ibijumba',
    gallery_crop_bean: 'Ibishimbo',
    gallery_crop_maize: 'Ibigori',
    gallery_crop_wheat: 'Ingano',
    gallery_crop_soybean: 'Ubutore',
    gallery_crop_potato_desc: 'Kuzana imbuto y\'uduseke',
    gallery_crop_bean_desc: 'Kurima imbuto y\'ibishimbo',
    gallery_crop_maize_desc: 'Kurima imbuto y\'ibigori',
    gallery_crop_wheat_desc: 'Kuzana ingano',
    gallery_crop_soybean_desc: 'Kurima ubutore',
    gallery_highlight_quality_title: 'Iwacu ry\'Ubwiza',
    gallery_highlight_quality_desc: 'Imbuto yacu ijya mu genzura rikomeye ry\'ubwiza kugira ngo ihuranire amahame y\'igihugu n\'amahamwe.',

    // Blog (new)
    blog_june_2026: 'Kamena 2026',
    blog_may_2026: 'Gicurasi 2026',
    blog_published: 'Yasohowe',
    blog_by: 'Na',
    blog_agri_team: 'Ikipe y\'Ubuhinzi',
    blog_read_full: 'Soma Inkingo Yose',

    // OrderForm (new)
    order_login_required: 'Injira cyangwa iyandikishe kugira ngo utegure imbuto.',
    order_product_required: 'Hitamo cyangwa ubwemeze icyarimwe icuruzwa',
    order_quantity_min: 'Igitera mpore igomba kuba biruta 0',
    order_success: 'Itegeko ryoherejwe neza!',
    order_failed: 'Ntibyashoboka kohereza itegeko',
    order_back_products: 'Subira ku Ibicuruzwa',
    order_subtitle: 'Imbuto Zemejwe z\'Ubwiza',
    order_title: 'Tegura Itegeko ry\'Imbuto',
    order_description: 'Uzuza amakuru y\'itegeko ryawe hasi kugira ngo utegure imbuto zemejwe zituruka kuri DERN SEED.',
    order_feature_1: 'Ubutabera Bwemejwe',
    order_feature_2: 'Umusaruro Mwinshi',
    order_success_title: 'Itegeko Ryakiriwe!',
    order_success_message: 'Murakoze gutegura na DERN SEED. Itegeko ryawe ryakiriwe kandi ririmo irangiriro.',
    order_view_dashboard: 'Reba Ikibaho cyanje cy\'Umukiriya',
    order_browse_more: 'Reba Ibicuruzwa Byinshi',
    order_details_title: 'Amakuru y\'Itegeko',
    order_details_description: 'Kugenzura uburyo bw\'imbuto, igitera, n\'ibyatumwa.',
    order_selected_product: 'Imbuto / Icuruzwa Yatoranyijwe',
    order_quantity: 'Igitera',
    order_unit: 'Igice',
    order_unit_price: 'Igiciro c\'Igice (RWF)',
    order_not_logged_in: 'Ntabwo uri mu bujyano ubu.',
    order_login_here: 'Injira hano',
    order_submitting: 'Turimo Kohereza Itegeko...',
    order_submit_button: 'Ohereza Itegeko',
    order_summary: 'Incamake y\'Itegeko',
    order_summary_product: 'Icuruzwa:',
    order_summary_not_selected: 'Ntari Yatoranyijwe',
    order_summary_quantity: 'Igitera:',
    order_summary_unit_price: 'Igiciro:',
    order_summary_total: 'Igiciro cyose:',
    order_logistics_title: 'Ubuyobozi bw\'Amahera bwihuse',
    order_logistics_desc: 'Itegeko ryakorwa mu buryo bw\'ibikorwa vy\'imbuto vyo mu Ruhengeri kandi ryoherezwa mu buryo bw\'amahera bwemejwe.',

    // SignUp toast (new)
    signup_passwords_mismatch: 'Amagambo y\'ibanga ntabwo ahorana',
    signup_terms_required: 'Ugomba kubwira ko wemeye amategeko',
    signup_success: 'Konti yarakonje neza! Murakaza neza mu DERN SEED.',
    signup_failed: 'Iyandikishe ntabwo ryanze',
  },

  fr: {
    // Navigation
    nav_home: 'Accueil',
    nav_about: 'À propos',
    nav_products: 'Produits',
    nav_services: 'Services',
    nav_gallery: 'Galerie',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    nav_login: 'Connexion',
    nav_signup: "S'inscrire",

    nav_about_dropdown: 'À propos',
    nav_products_dropdown: 'Produits',

    // Theme + language switcher
    language_label: 'Langue',
    menu_toggle_aria: 'Ouvrir/fermer le menu',
    theme_toggle_aria: 'Basculer le thème',
    theme_dark: 'Sombre',
    theme_light: 'Clair',

    language_en: 'Anglais',
    language_rw: 'Kinyarwanda',
    language_fr: 'Français',

    // Branding
    brand_company: 'DERN SEED CO LTD',
    brand_certified_seeds: 'Semences certifiées',
    brand_logo_alt: 'DERN SEED',

    // Footer
    footer_quick_links: 'Liens rapides',
    footer_products: 'Produits',
    footer_contact: 'Contact',
    footer_privacy_policy: 'Politique de confidentialité',
    footer_terms_conditions: 'Conditions générales',
    footer_copyright: '&copy; 2026 DERN SEED CO LTD. Tous droits réservés.',
    footer_company_description:
      'Nous aidons les agriculteurs grâce à des semences certifiées de qualité pour une agriculture durable et de meilleures récoltes.',
    footer_facebook_aria: 'DERN SEED sur Facebook',

    footer_link_home: 'Accueil',
    footer_link_about: 'À propos',
    footer_link_products: 'Produits',
    footer_link_contact: 'Contact',
    footer_product_maize: 'Maïs',
    footer_product_irish_potato: 'Pomme de terre (Irish)',
    footer_product_wheat: 'Blé',
    footer_product_soybean: 'Soja',

    // Newsletter
    newsletter_stay_updated: 'Restez informé',
    newsletter_description:
      "Abonnez-vous à notre newsletter pour recevoir des conseils agricoles et des mises à jour sur nos produits.",
    newsletter_email_placeholder: 'Entrez votre email',
    newsletter_subscribe: "S'abonner",
    newsletter_thanks: 'Merci pour votre abonnement !',

    // WhatsApp
    whatsapp_chat_aria: 'Discutez avec DERN SEED sur WhatsApp',
    whatsapp_chat_title: 'Contactez-nous sur WhatsApp',
    whatsapp_button_text: 'WhatsApp',
    whatsapp_default_message:
      'Bonjour DERN SEED ! Je souhaite en savoir plus sur vos semences certifiées.',

    // Manus dialog
    manus_dialog_description: 'Veuillez vous connecter avec Manus pour continuer',
    manus_login_button: 'Connexion via Manus',

    // Contact
    contact_get_in_touch: 'Prenez contact',
    contact_contact_information: 'Informations de contact',
    contact_contact_form: 'Formulaire de contact',
    contact_send_message: 'Envoyer un message',

    contact_address_label: 'Adresse',
    contact_phone_label: 'Téléphone',
    contact_email_label: 'Email',
    contact_business_hours_label: 'Horaires',

    // Contact form
    form_full_name: 'Nom complet',
    form_email_address: 'Adresse email',
    form_phone_number: 'Numéro de téléphone',
    form_subject: 'Sujet',
    form_message: 'Message',
    form_send_message: 'Envoyer un message',

    form_subject_placeholder: 'Choisissez un sujet',
    subject_product_inquiry: 'Demande sur les produits',
    subject_service_inquiry: 'Demande sur les services',
    subject_training_request: 'Demande de formation',
    subject_partnership_opportunity: 'Opportunité de partenariat',
    subject_other: 'Autre',

    contact_success:
      "✓ Message envoyé avec succès ! Nous vous répondrons bientôt.",
    contact_form_error:
      "Échec de l'envoi. Veuillez réessayer plus tard.",

    // Validation
    validation_full_name_required: 'Le nom complet est requis.',
    validation_full_name_min: 'Le nom complet doit comporter au moins 2 caractères.',
    validation_email_required: 'L’email est requis.',
    validation_email_invalid: 'Veuillez saisir une adresse email valide.',
    validation_phone_required: 'Le numéro de téléphone est requis.',
    validation_phone_min: 'Le numéro de téléphone doit comporter au moins 3 caractères.',
    validation_subject_required: 'Le sujet est requis.',
    validation_message_required: 'Le message est requis.',
    validation_message_min: 'Le message doit comporter au moins 5 caractères.',

    // FAQ
    faq_quick_answers: 'Réponses rapides',
    faq_find_quick_answers: 'Trouvez des réponses rapides aux questions courantes.',

    // Not found
    not_found_title: 'Page introuvable',
    not_found_description: "La page que vous recherchez n'existe pas.",

    // Common
    common_all: 'Tous',
    common_read_more: 'Lire la suite',
    common_view_all: 'Voir tout',
    common_contact_us: 'Contactez-nous',
    common_send_message: 'Envoyer un message',
    common_go_home: 'Retour à l’accueil',

    // Login
    login_welcome_back: 'Bon retour',
    login_intro:
      "Connectez-vous pour accéder à votre compte et gérer vos commandes de semences ainsi que vos informations.",
    login_feature_1: 'Gestion facile des commandes',
    login_feature_2: 'Suivre vos expéditions',
    login_feature_3: 'Accès à des ressources exclusives',

    login_title: 'Connexion',
    login_enter_credentials: 'Saisissez vos informations pour accéder à votre compte',
    login_placeholder_email: 'you@example.com',
    login_placeholder_password: '••••••••',
    login_remember_me: 'Se souvenir de moi',
    login_forgot_password: 'Mot de passe oublié ? Contactez-nous',
    login_sign_in_button: 'Connexion',
    login_signing_in: 'Connexion…',
    login_signup_prompt: "Vous n’avez pas de compte ?",
    login_signup: "S'inscrire",

    // Sign up
    signup_title: 'Créer un compte',
    signup_intro: 'Rejoignez notre communauté d’agriculteurs dès aujourd’hui',
    signup_full_name: 'Nom complet',
    signup_placeholder_full_name: 'Votre nom complet',
    signup_placeholder_email: 'you@example.com',
    signup_placeholder_phone: '+250 (0) XXX XXX XXX',

    signup_password_label: 'Mot de passe',
    signup_placeholder_password: '••••••••',
    signup_password_help:
      'Minimum 8 caractères : majuscules, minuscules, chiffres et caractère spécial.',
    signup_confirm_password_label: 'Confirmer le mot de passe',

    signup_terms_checkbox_prefix: 'J’accepte',
    signup_terms_link: 'les Conditions générales',
    signup_create_account: 'Créer un compte',
    signup_creating_account: 'Création du compte…',
    signup_already_have_account: 'Vous avez déjà un compte ?',
    signup_login: 'Connexion',

    // Home
    home_hero_tagline: 'Semences de qualité premium',
    home_hero_headline: 'Développons l’agriculture grâce à {highlight}',
    home_hero_highlight: 'Semences certifiées de qualité',
    home_hero_description:
      'Nous aidons les agriculteurs avec des solutions fiables pour de meilleures récoltes et une agriculture durable.',

    home_cta_explore_products: 'Découvrir les produits',
    home_cta_contact_us: 'Nous contacter',

    home_stats_farmers: 'Agriculteurs aidés',
    home_stats_varieties: 'Variétés de semences',
    home_stats_experience: 'Années d’expérience',
    home_stats_districts: 'Régions touchées',

    home_features_title: 'Nos points forts',
    home_features_why_choose: 'Pourquoi choisir DERN SEED',
    home_features_description:
      'Nous proposons des semences certifiées et un accompagnement agricole complet pour vous aider à obtenir de meilleures récoltes.',

    home_catalog_title: 'Notre catalogue',
    home_featured_products_title: 'Produits mis en avant',
    home_featured_products_description:
      'Des semences certifiées de haute qualité pour différents types de cultures et conditions de culture.',

    home_services_title: 'Ce que nous offrons',
    home_services_heading: 'Nos services',
    home_services_description:
      'Des solutions agricoles complètes pour accompagner votre parcours.',

    home_gallery_work: 'Nos réalisations',
    home_gallery_title: 'Galerie',
    home_gallery_description:
      'Découvrez nos opérations agricoles, nos sessions de formation et l’impact sur la communauté.',
    home_gallery_view_full: 'Voir toute la galerie',

    home_testimonials_title: 'Histoires de réussite',
    home_testimonials_heading: 'Ce que disent les agriculteurs',
    home_testimonials_description:
      'Entendez parler d’agriculteurs qui ont bénéficié de nos semences certifiées et de nos services.',

    home_blog_latest: 'Actualités',
    home_blog_heading: 'Blog & Ressources',
    home_blog_description:
      'Des contenus éducatifs et des conseils pour vous aider à réussir.',
    home_blog_view_all: 'Voir tous les articles',

    home_cta_ready: 'Prêt à améliorer vos récoltes ?',
    home_cta_ready_description:
      'Cultivons ensemble avec des semences certifiées et un accompagnement agricole d’experts. Rejoignez des milliers d’agriculteurs pour de meilleurs résultats.',
    home_cta_get_started: 'Commencer maintenant',

    home_contact_preview_heading: 'Informations de contact',
    home_contact_preview_get_in_touch: 'Prenez contact',
    home_contact_preview_send_message: 'Envoyer un message',

    // About
    about_hero_heading: 'À propos de DERN SEED',
    about_hero_description:
      'Culture de semences de qualité pour une agriculture durable depuis juin 2020. Une référence pour plus de 50 000 agriculteurs au Rwanda.',
    about_hero_badge_1: 'Semences certifiées',
    about_hero_badge_2: 'Accompagnement d’experts',

    about_who_we_are: 'Qui nous sommes',
    about_our_story: 'Notre histoire',
    about_ownership: 'Propriété',
    about_ownership_heading: 'Soutenu par le diocèse catholique de Ruhengeri',

    about_mission: 'Notre mission',
    about_vision: 'Notre vision',
    about_our_goal: 'Notre objectif',
    about_our_scope: 'Notre champ d’action',
    about_what_we_do: 'Ce que nous faisons',
    about_what_drives_us: 'Ce qui nous guide',
    about_our_values: 'Nos valeurs',
    about_who_we_serve: 'À qui nous servons',
    about_target_beneficiaries: 'Bénéficiaires ciblés',

    about_looking_ahead: 'Regard vers l’avenir',
    about_recent_projects: 'Portefeuille récent de projets stratégiques',
    about_company_information: 'Informations sur l’entreprise',

    about_company_name_label: 'Nom de l’entreprise :',
    about_head_office_label: 'Siège :',
    about_postal_address_label: 'Adresse postale :',
    about_telephone_label: 'Téléphone :',
    about_email_label: 'Email :',
    about_established_label: 'Créée :',

    about_cta_heading:
      'Ensemble, nous cultivons un avenir plus sûr en matière d’alimentation',
    about_cta_description:
      'Partenaires de DERN SEED pour des semences certifiées fiables et un accompagnement agricole d’experts.',
    about_cta_contact_us: 'Contactez-nous dès aujourd’hui',

    about_staff_admin_desc: 'Notre équipe de direction expérimentée guide l\u2019excellence agricole à travers le Rwanda.',
    staff_badge_title: 'Notre Direction',
    staff_title: 'Administration du Personnel',
    staff_subtitle: 'Découvrez l\'équipe de direction dévouée qui guide l\'excellence agricole et la production de semences certifiées chez DERN SEED.',

    // Services
    services_hero_heading: 'Nos services',
    services_hero_description:
      'Solutions agricoles intégrées pour soutenir les agriculteurs, coopératives, entreprises agroalimentaires, organisations de développement et partenaires institutionnels tout au long de la chaîne de valeur.',
    services_faq_heading: 'Questions fréquentes',
    services_faq_description:
      'Trouvez des réponses aux questions courantes sur nos services.',
    services_process_heading: 'Notre processus de service',
    services_process_description:
      'Comment nous travaillons avec les agriculteurs et partenaires pour assurer la réussite.',
    services_cta_heading: 'Prêt à commencer ?',
    services_cta_description:
      'Contactez-nous dès aujourd’hui pour en savoir plus sur nos services et opportunités.',
    services_cta_contact_us: 'Contactez-nous',
    services_opportunities_tag: 'Participez',
    services_opportunities_heading: 'Opportunités Actuellement Disponibles',
    services_opportunities_description:
      'Nous créons activement des opportunités agricoles et agroalimentaires inclusives pour les agriculteurs, étudiants, coopératives et partenaires de développement.',

    // Products
    products_hero_heading: 'Nos produits',
    products_hero_description:
      'Semences certifiées produites, transformées et commercialisées conformément aux normes nationales de qualité pour garantir pureté, vigueur et fiabilité.',
    products_certified_badge: 'Certifié',
    products_available_varieties: 'Variétés disponibles :',
    products_key_benefits: 'Avantages clés :',
    products_inquire_now: 'Demander une information',
    products_empty_state: 'Aucun produit trouvé dans cette catégorie.',

    products_quality_assurance: 'Assurance qualité',
    products_quality_assurance_description:
      'Chaque semence produite par Dern Seed Company Ltd fait l’objet de contrôles qualité rigoureux.',

    // Blog
    blog_hero_heading: 'Blog & Ressources',
    blog_hero_description:
      "Des contenus éducatifs et des conseils agricoles pour vous aider à réussir.",
    blog_search_placeholder: 'Rechercher des articles...',
    blog_filter_by_category: 'Filtrer par catégorie',
    blog_all_articles: 'Tous les articles',
    blog_no_articles: 'Aucun article ne correspond à votre recherche.',
    blog_featured_article: 'Article à la une',

    blog_newsletter_heading: 'Restez informé grâce à nos derniers articles',
    blog_newsletter_description:
      'Abonnez-vous à notre newsletter pour recevoir des conseils agricoles et des informations directement dans votre boîte de réception.',
    blog_newsletter_subscribe: "S'abonner",

    // Blog categories
    blog_cat_all: 'Tous les Articles',
    blog_cat_seed_quality: 'Qualité des Semences',
    blog_cat_finance: 'Finance',
    blog_cat_projects: 'Projets',
    blog_cat_opportunities: 'Opportunités',

    // Blog detail
    blog_not_found: 'Article Non Trouvé',
    blog_not_found_desc: 'L\'article que vous recherchez n\'existe pas.',
    blog_back_to_blog: 'Retour au Blog',

    // Articles (fr)
    blog_article_1_title: 'Pourquoi les Semences Certifiées Comptent pour les Agriculteurs du Rwanda',
    blog_article_1_author: 'M. Cassien Twagirimana',
    blog_article_1_excerpt: 'L\'agriculture reste l\'épine dorsale de l\'économie du Rwanda. La semence certifiée est l\'un des investissements les plus importants qu\'un agriculteur puisse faire.',
    blog_article_1_content: 'L\'agriculture reste l\'épine dorsale de l\'économie du Rwanda, employant une grande partie de la population et contribuant de manière significative à la sécurité alimentaire nationale. Qu\'est-ce qu\'une semence certifiée ? La semence certifiée est une semence qui a été produite, inspectée, testée et approuvée selon les normes nationales de certification. Pourquoi elle est importante : 1. Rendements plus élevés grâce aux variétés améliorées. 2. Meilleure germination et établissement des cultures. 3. Risque réduit de maladies et de ravageurs. 4. Qualité améliorée des cultures. 5. Résilience climatique. La situation au Rwanda : malgré les progrès, beaucoup d\'agriculteurs dépendent encore de semences recyclées. La contribution de Dern Seed Company Ltd : multiplication, traitement et commercialisation de semences certifiées pour pomme de terre, haricots, maïs, blé et soja. Investir dans la semence de qualité, c\'est investir dans le succès. Conclusion : L\'avenir de l\'agriculture du Rwanda dépend de l\'adoption de technologies de qualité.',

    blog_article_2_title: 'Comment les Agriculteurs Peuvent Accéder au Financement Agricole via BK',
    blog_article_2_author: 'Dern Seed Company Ltd',
    blog_article_2_excerpt: 'L\'accès au financement reste l\'un des facteurs les plus importants pour augmenter la productivité agricole.',
    blog_article_2_content: 'L\'accès au financement reste crucial pour augmenter la productivité agricole au Rwanda. Dern Seed Company Ltd a établit un partenariat avec la Bank of Kigali (BK) pour faciliter l\'accès aux services financiers. L\'agriculture nécessite des investissements ponctuels pour acheter des semences certifiées, des engrais, des équipements d\'irrigation, des machines agricoles, des installations de stockage et de la main-d\'œuvre. Le partenariat vise à améliorer l\'accès au crédit, soutenir la production de semences certifiées, renforcer la culture sous contrat, promouvoir les investissements agroalimentaires et améliorer l\'inclusion financière. Les opportunités sont disponibles pour les agriculteurs individuels, les coopératives, les multiplicateurs de semences, les groupes de jeunes et les entreprises dirigées par des femmes. Types de financement : prêts de production saisonniers, prêts d\'investissement agroalimentaire, financement coopératif. Dern Seed Company Ltd soutient les agriculteurs avec un support technique, des liens commerciaux et des liens financiers.',

    blog_article_3_title: 'Projet AGRA AIDI : Renforcer les Systèmes Semenciers au Rwanda',
    blog_article_3_author: 'Dern Seed Company Ltd',
    blog_article_3_excerpt: 'Dern Seed Company Ltd a achevé avec succès le Projet AGRA AIDI, renforçant le système semencier de pomme de terre du Rwanda.',
    blog_article_3_content: 'Projet AGRA AIDI : Renforcer les Systèmes Semenciers de Pomme de Terre au Rwanda. Dern Seed Company Ltd est fière d\'annoncer la réussite du Projet AGRA AIDI, mis en œuvre pour renforcer le système semencier de pomme de terre du Rwanda par la multiplication et la promotion de nouvelles variétés améliorées. Le projet a été soutenu par une subvention d\'AGRA. Contexte : la pomme de terre est une culture stratégique au Rwanda mais l\'accès limité à des semences de qualité freinait la productivité. Le projet s\'est concentré sur la multiplication de nouvelles variétés, la démonstration, la formation des agriculteurs, le renforcement des systèmes de distribution et le soutien aux pratiques climato-intelligentes. Résultats : augmentation de la production de semences certifiées, expansion des champs de production, formation des agriculteurs et multiplicateurs, établissement de parcelles de démonstration, amélioration de l\'accès aux semences certifiées, renforcement des partenariats. Impact : croissance de l\'entreprise, renforcement des capacités techniques, expansion du réseau d\'agriculteurs, amélioration de la position sur le marché. Bénéficiaires : accès accru aux semences de qualité, rendements et revenus améliorés, connaissances renforcées, sécurité alimentaire accrue, création d\'emplois, résilience renforcée.',

    blog_article_4_title: 'Partenariat IITA FOBASI Soutenant la Sécurité Alimentaire au Rwanda',
    blog_article_4_author: 'Dern Seed Company Ltd',
    blog_article_4_excerpt: 'Dern Seed Company Ltd participe à l\'Initiative FOBASI avec IITA, débutant en Saison 2027A.',
    blog_article_4_content: 'Partenariat IITA FOBASI Soutenant la Sécurité Alimentaire au Rwanda. Lancement en Saison 2027A. Dern Seed Company Ltd participe à l\'Initiative Food Basket Sites (FOBASI) avec l\'Institut International de Recherche sur l\'Agriculture Tropicale (IITA). L\'initiative promeut une production agricole durable en soutenant les agriculteurs avec des technologies améliorées, des matériaux de plantation de qualité et le renforcement de capacités. Dern Seed Company Ltd produira et fournira des semences certifiées, démontrera des variétés améliorées, formera les agriculteurs, établira des parcelles de démonstration et renforcera les systèmes semenciers locaux. Activités prévues : sélection des bénéficiaires, sites de démonstration, distribution de semences, formation et suivi technique. Avantages : accès aux semences certifiées, connaissances améliorées, productivité accrue, meilleure disponibilité alimentaire et opportunités de marché. Ensemble, nous investissons dans des exploitations productives et des communautés alimentairement sécurisées.',

    blog_article_5_title: 'Opportunités Disponibles chez Dern Seed Company Ltd',
    blog_article_5_author: 'Dern Seed Company Ltd',
    blog_article_5_excerpt: 'Dern Seed Company Ltd crée des opportunités pour les agriculteurs, les étudiants, les coopératives et les entrepreneurs agroalimentaires.',
    blog_article_5_content: 'Opportunités Disponibles chez Dern Seed Company Ltd. Culture sous contrat : expansion du programme pour la multiplication de semences certifiées avec pomme de terre, haricot, maïs, blé et soja. Avantages : semences certifiées, support technique, marché garanti et revenus améliorés. Stages : apprentissage pratique en production, traitement, assurance qualité, marketing et gestion agroalimentaire. Accès au financement via BK : prêts de production saisonniers, financement des intrants, prêts d\'investissement et financement coopératif. Projets de développement : AGRA AIDI (Terminé), IITA FOBASI (Démarrant 2027A), COMESA ACTESA. Opportunités pour les jeunes et les femmes : entrepreneuriat, production, développement de compétences et liens commerciaux. Partenariats de recherche : universités, institutions de recherche, ONG et agences gouvernementales. Pourquoi nous rejoindre : accès aux semences certifiées, support technique, liens de marché, financement et formation. Contact : Dern Seed Company Ltd, Byimana, Musanze, Rwanda.',

    // Gallery
    gallery_hero_heading: 'Notre galerie',
    gallery_hero_description:
      "Découvrez nos activités agricoles, nos sessions de formation et l’impact sur la communauté à travers le Rwanda.",
    gallery_browse_collections: 'Parcourir nos collections',
    gallery_empty_state: 'Aucune image trouvée dans cette catégorie.',
    gallery_visual_story: 'Notre histoire en images',
    gallery_visual_story_description:
      'Ces images montrent notre engagement envers la qualité, le soutien aux agriculteurs et une agriculture durable.',
    gallery_featured_highlights: 'Points forts',
    gallery_featured_highlights_description:
      'Des moments clés qui définissent notre mission et notre impact.',

    gallery_join_community_heading: 'Rejoignez notre communauté',
    gallery_join_community_description:
      'Faites partie de la révolution agricole au Rwanda avec DERN SEED.',
    gallery_join_contact_us: 'Contactez-nous',

    gallery_highlights_heading: 'Points forts en vedette',
    gallery_highlights_description: 'Des moments clés qui définissent notre mission et notre impact.',
    gallery_highlight_potato_title: 'Production de pomme de terre',
    gallery_highlight_potato_desc: 'Culture et distribution de semences de pomme de terre de haute qualité.',
    gallery_highlight_bean_title: 'Culture de haricot',
    gallery_highlight_bean_desc: 'Production de semences de haricot premium pour les agriculteurs du Rwanda.',
    gallery_highlight_maize_title: 'Production de semences de maïs',
    gallery_highlight_maize_desc: 'Semences certifiées de maïs avec des taux de germination élevés.',
    gallery_highlight_wheat_title: 'Production de blé',
    gallery_highlight_wheat_desc: 'Production et fourniture de semences de blé de qualité.',
    gallery_highlight_soybean_title: 'Culture de soja',
    gallery_highlight_soybean_desc: 'Culture et distribution de semences de soja.',
    gallery_highlight_production_title: 'Production de semences',
    gallery_highlight_production_desc: 'Nos installations de production de semences de pointe.',
    gallery_highlight_fields_title: 'Champs agricoles',
    gallery_highlight_fields_desc: 'Nos fermes de démonstration et champs de recherche.',
    gallery_highlight_legume_title: 'Semences de légumineuses',
    gallery_highlight_legume_desc: 'Variétés de semences de légumineuses de qualité pour des besoins diversifiés.',
    gallery_highlight_cereal_title: 'Semences de céréales',
    gallery_highlight_cereal_desc: 'Variétés certifiées de céréales incluant maïs et blé.',
    gallery_highlight_diversity_title: 'Diversité des cultures',
    gallery_highlight_diversity_desc: 'Un large éventail de variétés pour soutenir une agriculture diversifiée.',
    gallery_highlight_visuals_title: 'Notre histoire en images',
    gallery_highlight_visuals_desc: 'Ces images montrent notre engagement envers la qualité et le soutien aux agriculteurs.',
    gallery_highlight_community_title: 'Impact communautaire',
    gallery_highlight_community_desc: 'Faire une différence dans les communautés agricoles du Rwanda.',
    gallery_highlight_training_title: 'Formation des agriculteurs',
    gallery_highlight_training_desc: 'Programmes de formation réguliers pour equiper les agriculteurs.',
    gallery_highlight_harvest_title: 'Récoltes réussies',
    gallery_highlight_harvest_desc: 'Aider les agriculteurs à obtenir des récoltes abondantes.',

    products_certified_quality: 'Semences certifiées de qualité',
    products_search_label: 'Rechercher des semences',
    products_filter_label: 'Filtrer par catégorie',
    products_select_category: 'Sélectionner une catégorie',

    // Navigation (new)
    nav_order_seeds: 'Commander des Semences',
    nav_logout_success: 'Déconnexion réussie',
    nav_dashboard: 'Tableau de bord',
    nav_logout: 'Déconnexion',

    // Nav dropdown (new)
    nav_product_irish_potato: 'Semence de Pomme de terre',
    nav_product_bean: 'Semence de Haricot',
    nav_product_maize: 'Semence de Maïs',
    nav_product_wheat: 'Semence de Blé',
    nav_product_soybean: 'Semence de Soja',
    nav_about_mission: 'Notre mission',
    nav_about_vision: 'Notre vision',
    nav_about_values: 'Valeurs fondamentales',
    nav_about_goals: 'Objectifs stratégiques',
    nav_about_what_we_do: 'Ce que nous faisons',
    nav_about_team: 'Notre équipe',

    // Home features (new)
    home_feature_certified_title: 'Semences Certifiées',
    home_feature_certified_desc: 'Toutes les semences respectent les normes nationales de certification',
    home_feature_germination_title: 'Taux de germination élevé',
    home_feature_germination_desc: 'Optimisé pour un taux de germination maximal',
    home_feature_disease_title: 'Résistant aux maladies',
    home_feature_disease_desc: 'Variétés sélectionnées pour leur résistance aux maladies courantes',
    home_feature_trusted_title: 'Partenaire de confiance',
    home_feature_trusted_desc: 'Des années de service éprouvé sur le terrain',
    home_feature_expert_title: 'Équipe d\'experts',
    home_feature_expert_desc: 'Agronomes experts et spécialistes des semences',
    home_feature_support_title: 'Support client',
    home_feature_support_desc: 'Assistance post-vente et technique dédiée',

    // Home services (new)
    home_service_production_title: 'Production de semences certifiées',
    home_service_production_desc: 'Nous produisons des semences selon les normes internationales strictes',
    home_service_distribution_title: 'Distribution de semences',
    home_service_distribution_desc: 'Réseau de distribution fiable atteignant les agriculteurs de la région',
    home_service_consultancy_title: 'Conseil agricole',
    home_service_consultancy_desc: 'Conseils d\'experts sur le choix des cultures et les pratiques agricoles',
    home_service_training_title: 'Formation des agriculteurs',
    home_service_training_desc: 'Programmes de formation complets pour améliorer les techniques agricoles',
    home_service_tech_title: 'Support technique',
    home_service_tech_desc: 'Un soutien continu tout au long de la saison de culture',
    home_service_crop_title: 'Conseils de production',
    home_service_crop_desc: 'Orientation sur les pratiques optimales de plantation et de récolte',

    // Home gallery labels (new)
    home_gallery_irish_potato: 'Pomme de terre',
    home_gallery_bean: 'Haricot',
    home_gallery_maize: 'Maïs',
    home_gallery_wheat: 'Blé',
    home_gallery_soybean: 'Soja',
    home_gallery_certified_maize: 'Semence de Maïs certifiée',

    // Home blog (new)
    home_blog_post1_title: 'Meilleur moment pour planter le maïs',
    home_blog_post1_category: 'Guide saisonnier',
    home_blog_post1_excerpt: 'Découvrez les meilleurs moments pour planter le maïs dans différentes régions.',
    home_blog_post2_title: 'Choisir des semences certifiées',
    home_blog_post2_category: 'Guide d\'achat',
    home_blog_post2_excerpt: 'Un guide complet pour sélectionner les bonnes semences certifiées.',
    home_blog_post3_title: 'Conseils de gestion des ravageurs',
    home_blog_post3_category: 'Protection des cultures',
    home_blog_post3_excerpt: 'Stratégies efficaces pour gérer les ravageurs courants et protéger vos cultures naturellement.',

    // Home welcome section (new)
    home_welcome_badge: 'Bienvenue de notre Directeur',
    home_welcome_message_label: 'Message de bienvenue',
    home_welcome_salutation: 'Chers visiteurs, partenaires, agriculteurs et parties prenantes,',
    home_welcome_para1: 'Bienvenue chez Dern Seed Company Ltd. Nous sommes honorés de servir la communauté agricole du Rwanda.',
    home_welcome_para2: 'Notre mission est simple : garantir aux agriculteurs l\'accès à des variétés de semences fiables, performantes et résilientes.',
    home_welcome_read_more: 'Lire la suite',
    home_welcome_para3: 'En tant que Directeur, je suis honoré de diriger une organisation engagée à renforcer le secteur agricole du Rwanda.',
    home_welcome_para4: 'Depuis notre création en 2020 sous le Diocèse de Ruhengeri, nous restons dédiés à l\'amélioration de la sécurité alimentaire et des moyens de subsistance des communautés agricoles.',
    home_welcome_para5: 'Nous croyons que la semence de qualité est la base d\'une agriculture réussie.',
    home_welcome_para6: 'Au-delà de la production de semences, Dern Seed Company Ltd fournit des services agricoles complets.',
    home_welcome_para7: 'Au nom de notre Conseil d\'Administration et de notre équipe dédiée, je vous remercie sincèrement.',
    home_welcome_thank_you: 'Merci de visiter notre site, et bienvenue dans la famille Dern Seed Company Ltd.',
    home_welcome_director_name: 'Père Alexandre NTABANGANYIMANA',
    home_welcome_director_title: 'Directeur de Dern Seed Company Ltd',

    // Home about section (new)
    home_about_years: 'Années d\'excellence',
    home_about_badge: 'À propos de nous',
    home_about_description1: 'DERN SEED CO LTD est une entreprise agricole spécialisée dans la production et la distribution de semences certifiées de haute qualité.',
    home_about_description2: 'Notre mission est de fournir aux agriculteurs rwandais des semences certifiées premium et un accompagnement agricole expert.',
    home_about_certified: 'Certifiées selon les normes nationales et internationales',
    home_about_expert: 'Équipe d\'experts agronomes et spécialistes des semences',
    home_about_support: 'Support client et assistance technique dédiés',

    // Home no testimonials (new)
    home_no_testimonials: 'Aucun témoignage disponible pour le moment.',

    // Home contact preview (new)
    home_contact_business_hours: 'Lundi - Vendredi : 8h00 - 17h00',

    // About page (new)
    about_value_quality_title: 'Qualité',
    about_value_quality_desc: 'Des standards sans compromis dans chaque semence que nous produisons.',
    about_value_integrity_title: 'Intégrité',
    about_value_integrity_desc: 'Honnêtes et transparents dans toutes nos actions.',
    about_value_innovation_title: 'Innovation',
    about_value_innovation_desc: 'Adopter de nouvelles technologies et méthodes pour de meilleurs résultats.',
    about_value_partnership_title: 'Partenariat',
    about_value_partnership_desc: 'Construire des relations durables avec les agriculteurs.',
    about_value_sustainability_title: 'Durabilité',
    about_value_sustainability_desc: 'Des pratiques qui protègent notre environnement pour les générations futures.',
    about_value_community_title: 'Impact communautaire',
    about_value_community_desc: 'Faire une vraie différence dans les communautés agricoles.',

    about_goal_1: 'Produire et fournir des semences certifiées conformes aux normes nationales et internationales.',
    about_goal_2: 'Améliorer la sécurité alimentaire et la productivité agricole à travers le Rwanda.',
    about_goal_3: 'Donner aux agriculteurs les connaissances, compétences et variétés fiables.',
    about_goal_4: 'Promouvoir des pratiques agricoles durables.',
    about_goal_5: 'Construire des partenariats stratégiques pour une croissance mutuelle.',

    about_scope_description: 'Notre travail s\'étend à travers le Rwanda, avec un accent sur la Province du Nord.',

    about_what_we_do_1: 'Production de semences',
    about_what_we_do_2: 'Formation et vulgarisation',
    about_what_we_do_3: 'Conseil agricole',
    about_what_we_do_4: 'Mise en lien avec le marché',
    about_what_we_do_5: 'Agriculture contractuelle',
    about_what_we_do_6: 'Assurance qualité des semences',

    about_beneficiary_smallholder: 'Petits exploitants',
    about_beneficiary_cooperatives: 'Coopératives et groupes d\'agriculteurs',
    about_beneficiary_agribusiness: 'Entreprises agroalimentaires',
    about_beneficiary_development: 'Organisations de développement',
    about_beneficiary_ngos: 'ONG et bailleurs de fonds',
    about_beneficiary_government: 'Institutions gouvernementales',

    about_project_seed_scaling: 'Programme de multiplication de semences',
    about_project_farmer_field: 'Écoles de pleine champ',

    about_staff_ceo: 'Directeur Général',
    about_staff_ceo_desc: 'Supervise toutes les opérations et la direction stratégique.',
    about_staff_agronomist: 'Chef agronome',
    about_staff_agronomist_desc: 'Dirige les programmes de production et d\'assurance qualité.',
    about_staff_operations: 'Directeur des opérations',
    about_staff_operations_desc: 'Gère les opérations quotidiennes et la logistique.',
    about_staff_training: 'Coordinateur de formation',
    about_staff_training_desc: 'Coordonne la formation des agriculteurs et les services de vulgarisation.',
    about_staff_quality: 'Agent de contrôle qualité',
    about_staff_quality_desc: 'Veille à ce que toutes les semences respectent les normes de certification.',
    about_staff_marketing: 'Directeur marketing',
    about_staff_marketing_desc: 'Dirige la notoriété de la marque et le développement du marché.',

    // Services page (new)
    services_seed_production_title: 'Production et Multiplication de Semences Certifiées',
    services_seed_production_desc: 'Dern Seed Company Ltd est spécialisée dans la production, la multiplication, la transformation et la commercialisation de semences certifiées pour Pomme de terre irlandaise, Haricot, Maïs, Blé et Soja. Par des contrats agricoles et des schemes d\'outgrower, nous produisons, inspectons, testons et certifions des semences garantissant la pureté génétique, des taux de germination élevés et l\'absence de maladies.',
    services_seed_distribution_title: 'Distribution de semences et chaîne d\'approvisionnement',
    services_seed_distribution_desc: 'Réseau de distribution fiable couvrant toutes les régions du Rwanda.',
    services_agri_consultancy_title: 'Conseil agricole',
    services_agri_consultancy_desc: 'Conseils agronomiques d\'experts sur la sélection des cultures et les meilleures pratiques.',
    services_farmer_training_title: 'Formation des agriculteurs et renforcement des capacités',
    services_farmer_training_desc: 'Programmes de formation couvrant les techniques agricoles modernes et la conservation des sols.',
    services_tech_support_title: 'Support technique et extension',
    services_tech_support_desc: 'Un soutien technique continu tout au long de la saison de culture.',
    services_quality_assurance_title: 'Assurance qualité et certification des semences',
    services_quality_assurance_desc: 'Processus de contrôle qualité rigoureux avec essais en laboratoire.',
    services_market_linkage_title: 'Lien avec le marché et chaîne de valeur',
    services_market_linkage_desc: 'Connecter les agriculteurs aux marchés et aux opportunités de valorisation.',
    services_contract_farming_title: 'Agriculture contractuelle',
    services_contract_farming_desc: 'Programmes d\'agriculture contractuelle offrant des intrants garantis et des marchés assurés.',
    services_climate_resilient_title: 'Variétés résilientes au climat et à haut rendement',
    services_climate_resilient_desc: 'Nous développons, promouvons et fournissons des variétés de semences adaptées aux conditions environnementales changeantes — conçues pour résister à la sécheresse, aux ravageurs et aux maladies tout en augmentant la productivité et la rentabilité.',
    services_seed_processing_title: 'Traitement et conditionnement des semences',
    services_seed_processing_desc: 'Nous effectuons le nettoyage, le criblage, le tri, le traitement, le contrôle qualité et le conditionnement pour améliorer la pureté des semences, les taux de germination et la durée de conservation — en collaboration avec des partenaires de confiance.',
    services_demo_plots_title: 'Parcelles de démonstration et essais en champ',
    services_demo_plots_desc: 'Nous créons des parcelles de démonstration et menons des essais en champ pour présenter des variétés améliorées et résilientes au climat dans des conditions réelles de culture, en affinant les recommandations pour différentes zones agroécologiques.',
    services_agro_input_title: 'Distribution d\'intrants agricoles',
    services_agro_input_desc: 'Nous fournissons et distribuons des semences de qualité, des engrais et des produits de protection des cultures provenant de fournisseurs de confiance, via des réseaux locaux et des partenariats.',
    services_rd_partnerships_title: 'Partenariats de recherche et développement',
    services_rd_partnerships_desc: 'Nous collaborons avec des institutions de recherche, des universités et des acteurs du secteur privé pour tester des variétés améliorées, adapter les cultures aux conditions locales et développer des technologies climato-intelligentes.',
    services_finance_title: 'Facilitation de l\'accès au financement',
    services_finance_desc: 'Nous connectons les agriculteurs et les coopératives avec des banques, des institutions de microfinance, des SACCOs, des investisseurs à impact, des DFI et des programmes de subventions — en aidant aux profils commerciaux et à la documentation pour le financement.',
    services_dev_partnerships_title: 'Partenariats public-privé pour le développement',
    services_dev_partnerships_desc: 'Nous collaborons avec des institutions publiques, des ONG, des agences de développement et des organisations de recherche sur les systèmes semenciers, l\'agriculture résiliente au climat et le développement économique rural.',
    services_youth_women_title: 'Autonomisation des jeunes et des femmes dans l\'agroalimentaire',
    services_youth_women_desc: 'Nous créons des opportunités pour les jeunes et les femmes dans la production de semences, la formation, l\'agriculture contractuelle et les activités de la chaîne de valeur — avec mentorat et accès aux intrants et aux marchés.',
    services_project_impl_title: 'Mise en œuvre de projets agricoles',
    services_project_impl_desc: 'Nous soutenons la planification, la coordination, l\'exécution, le suivi et l\'évaluation de projets agricoles pour les ONG, les programmes gouvernementaux et les initiatives privées.',
    services_investment_title: 'Opportunités de partenariat d\'investissement et d\'impact',
    services_investment_desc: 'Nous accueillons la collaboration avec des investisseurs à impact, des DFI, des entreprises agroalimentaires et des ONG pour développer la production de semences et générer des rendements sociaux et financiers mesurables.',

    // Services opportunities (new)
    services_opportunity_training: 'Programmes de formation',
    services_opportunity_training_desc: 'Participez à nos sessions de formation complètes pour agriculteurs.',
    services_opportunity_cooperative: 'Partenariats coopératifs',
    services_opportunity_cooperative_desc: 'Nous nous associons aux coopératives d\'agriculteurs pour fournir des semences en gros.',
    services_opportunity_contract: 'Opportunités d\'agriculture contractuelle',
    services_opportunity_contract_desc: 'Entrez dans des accords d\'agriculture contractuelle pour des intrants garantis.',
    services_opportunity_consultancy: 'Services de conseil agricole',
    services_opportunity_consultancy_desc: 'Accédez à des conseils agronomiques d\'experts adaptés à vos besoins.',

    // Services process (new)
    services_process_1_title: 'Consultation',
    services_process_1_desc: 'Nous évaluons vos besoins et fournissons des recommandations adaptées.',
    services_process_2_title: 'Planification',
    services_process_2_desc: 'Nous développons un plan personnalisé avec les bonnes semences.',
    services_process_3_title: 'Mise en œuvre',
    services_process_3_desc: 'Nous fournissons les semences, la formation et le soutien technique.',
    services_process_4_title: 'Récolte et livraison',
    services_process_4_desc: 'Nous vous aidons à commercialiser et distribuer efficacement votre production.',

    // Products page (new)
    products_all: 'Toutes les semences',
    products_root_crops: 'Tubercules',
    products_legumes: 'Légumineuses',
    products_cereals: 'Céréales',
    products_search_placeholder: 'Rechercher des semences, avantages, types de cultures...',
    products_reset_filters: 'Réinitialiser les filtres',

    // ProductCard (new)
    product_certified: 'Certifié',
    product_key_highlights: 'Points clés :',
    product_maturity: 'Maturité :',
    product_planting_season: 'Saison de Plantation',
    product_harvest_period: 'Période de Récolte',
    product_order_now: 'Commander Cette Semence',
    product_benefits: 'Avantages Agronomiques Clés',
    product_quality_standards: 'Normes de Qualité et Spécifications',
    product_close_details: 'Fermer les Détails',
    product_inquire_order: 'Demander / Commander',
    product_modal_close: 'Fermer la fenêtre',
    product_modal_prev: 'Photo précédente',
    product_modal_next: 'Photo suivante',
    product_view_details: 'Voir les détails',
    product_order_seed: 'Commander la semence',
    product_view_info: 'Voir les informations détaillées sur',

    // Gallery (new)
    gallery_crop_potato: 'Pomme de terre',
    gallery_crop_bean: 'Haricot',
    gallery_crop_maize: 'Maïs',
    gallery_crop_wheat: 'Blé',
    gallery_crop_soybean: 'Soja',
    gallery_crop_potato_desc: 'Production de semence de pomme de terre',
    gallery_crop_bean_desc: 'Culture de semence de haricot',
    gallery_crop_maize_desc: 'Culture de semence de maïs',
    gallery_crop_wheat_desc: 'Production de blé',
    gallery_crop_soybean_desc: 'Culture de soja',
    gallery_highlight_quality_title: 'Certification qualité',
    gallery_highlight_quality_desc: 'Nos semences subissent des tests de qualité rigoureux.',

    // Blog (new)
    blog_june_2026: 'Juin 2026',
    blog_may_2026: 'Mai 2026',
    blog_published: 'Publié',
    blog_by: 'Par',
    blog_agri_team: 'Équipe agricole',
    blog_read_full: 'Lire l\'article complet',

    // OrderForm (new)
    order_login_required: 'Veuillez vous connecter ou vous inscrire pour passer une commande.',
    order_product_required: 'Veuillez sélectionner ou spécifier un produit',
    order_quantity_min: 'La quantité doit être supérieure à 0',
    order_success: 'Commande soumise avec succès!',
    order_failed: 'Échec de la soumission de la commande',
    order_back_products: 'Retour aux produits',
    order_subtitle: 'Semences certifiées de qualité',
    order_title: 'Passer une commande de semences',
    order_description: 'Complétez les détails de votre commande ci-dessous.',
    order_feature_1: 'Germination garantie',
    order_feature_2: 'Rendement élevé',
    order_success_title: 'Commande reçue!',
    order_success_message: 'Merci pour votre commande. Votre commande a été reçue et est en cours de traitement.',
    order_view_dashboard: 'Voir mon tableau de bord client',
    order_browse_more: 'Découvrir plus de produits',
    order_details_title: 'Détails de la commande',
    order_details_description: 'Vérifiez la sélection, la quantité et les paramètres de livraison.',
    order_selected_product: 'Semence / Produit sélectionné',
    order_quantity: 'Quantité',
    order_unit: 'Unité',
    order_unit_price: 'Prix unitaire (RWF)',
    order_not_logged_in: 'Vous n\'êtes pas connecté pour le moment.',
    order_login_here: 'Connectez-vous ici',
    order_submitting: 'Envoi de la commande...',
    order_submit_button: 'Soumettre la commande',
    order_summary: 'Résumé de la commande',
    order_summary_product: 'Produit :',
    order_summary_not_selected: 'Non sélectionné',
    order_summary_quantity: 'Quantité :',
    order_summary_unit_price: 'Prix unitaire :',
    order_summary_total: 'Montant total :',
    order_logistics_title: 'Logistique régionale rapide',
    order_logistics_desc: 'Les commandes sont traitées directement à Ruhengeri et expédiées via un transport certifié.',

    // SignUp toast (new)
    signup_passwords_mismatch: 'Les mots de passe ne correspondent pas',
    signup_terms_required: 'Vous devez accepter les conditions',
    signup_success: 'Compte créé avec succès! Bienvenue chez DERN SEED.',
    signup_failed: 'Échec de l\'inscription',
  },
};

