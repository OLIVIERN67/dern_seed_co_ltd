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

    common_read_more: 'Read More',

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
      'Wifatanye n’impinduka z’ubuhinzi mu Rwanda hamwe na DERN SEED.',
    gallery_join_contact_us: 'Tuvugane',
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
  },
};

