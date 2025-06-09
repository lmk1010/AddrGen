// 引入i18next库
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/i18next@21.6.10/dist/umd/i18next.min.js';
script.onload = initializeI18n;
document.head.appendChild(script);

// 翻译资源
const resources = {
    en: {
        translation: {
            // 导航
            'nav.home': 'Home',
            'nav.blog': 'Blog',
            'nav.faq': 'FAQ',
            'nav.about': 'About',
            'nav.feedback': 'Feedback',
            
            // 页面标题
            'page.title.home': 'Home - AddressGen',
            'page.title.blog': 'Blog - AddressGen',
            'page.title.faq': 'FAQ - AddressGen',
            'page.title.about': 'About - AddressGen',
            'page.title.feedback': 'Feedback - AddressGen',
            
            // 博客页面
            'blog.header.title': 'AddressGen Blog',
            'blog.header.subtitle': 'Get the latest news, tips, and insights about address generation, data privacy, and identity management.',
            
            // 语言
            'language': 'Language:',
            
            // 页脚
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            'footer.copyright': '© 2023 AddressGen. All rights reserved.',

            // 首页内容
            'heroTitle': 'Generate Random Address Information',
            'heroDesc': 'Create realistic random addresses, identities, and credit card information for testing, development, or data privacy purposes.',
            'getStarted': 'Get Started',
            'learnMore': 'Learn More',
            'whyUse': 'Why Use Our Address Generator?',
            'whyUseDesc': 'Our tool provides realistic, randomly generated information for various purposes while ensuring privacy and security.',
            'privacyProtection': 'Privacy Protection',
            'privacyProtectionDesc': 'Use randomly generated information instead of real personal data for testing and development purposes.',
            'internationalSupport': 'International Support',
            'internationalSupportDesc': 'Generate address information for multiple countries including the US, UK, and Hong Kong.',
            'customizableOptions': 'Customizable Options',
            'customizableOptionsDesc': 'Select exactly what information you need, from basic address details to complete identity profiles.',

            // Address Generator Section
            'generator.title': 'Address Generator',
            'generator.country.title': 'Select Country',
            'generator.state.title': 'Select State',
            'generator.city.title': 'Select City',
            'generator.quantity.title': 'Quantity',
            'generator.quantity.max': 'Maximum: 100',
            'generator.button': 'Generate Information',
            'generator.results.title': 'Generated Information',
            'generator.results.copy': 'Copy All',
            'generator.results.download': 'Download CSV',
            'generator.results.generateMore': 'Generate More',
            
            // Results Sections
            'generator.results.basicInfo': 'Basic Information',
            'generator.results.addressInfo': 'Address Information',
            'generator.results.creditCardInfo': 'Credit Card Information',
            'generator.results.employmentInfo': 'Employment Information',
            
            // Field Labels
            'generator.fields.fullName': 'Full Name',
            'generator.fields.email': 'Email',
            'generator.fields.phone': 'Phone Number',
            'generator.fields.dob': 'Date of Birth',
            'generator.fields.country': 'Country',
            'generator.fields.streetAddress': 'Street Address',
            'generator.fields.city': 'City',
            'generator.fields.stateCode': 'State Code',
            'generator.fields.stateName': 'State Name',
            'generator.fields.zipCode': 'ZIP Code',
            'generator.fields.cardType': 'Card Type',
            'generator.fields.cardNumber': 'Card Number',
            'generator.fields.cvv': 'CVV',
            'generator.fields.expiryDate': 'Expiry Date',
            'generator.fields.occupation': 'Occupation',
            'generator.fields.company': 'Company',
            'country.us': 'United States',
            'country.uk': 'United Kingdom',
            'country.hk': 'Hong Kong',

            // About Page
            'about.title': 'About AddressGen',
            'about.subtitle': 'Learn about our mission, our team, and why we created the most comprehensive address generation tool.',
            'about.our_story': 'Our Story',
            'about.story.p1': 'AddressGen was born out of necessity. As software developers, we frequently needed realistic test data for our projects, but existing solutions were either too limited, too complex, or didn\'t provide the quality of data we needed.',
            'about.story.p2': 'In 2025, our team of developers and data specialists came together to create a solution that would generate high-quality, realistic address information for multiple countries while maintaining the highest standards of privacy and security.',
            'about.story.p3': 'What started as an internal tool quickly grew into a comprehensive platform used by thousands of developers, testers, and businesses worldwide. Today, AddressGen is the go-to solution for generating realistic address and identity information for testing, development, and educational purposes.',
            'about.mission.title': 'Our Mission',
            'about.mission.subtitle': 'We believe in empowering developers and businesses with tools that make their work easier while protecting privacy and promoting best practices in data handling.',
            'about.mission.innovation.title': 'Innovation',
            'about.mission.innovation.desc': 'We continuously improve our algorithms and expand our capabilities to provide the most accurate and useful address generation service possible.',
            'about.mission.privacy.title': 'Privacy',
            'about.mission.privacy.desc': 'We\'re committed to protecting privacy by providing fictional data that helps developers avoid using real personal information in their work.',
            'about.mission.community.title': 'Community',
            'about.mission.community.desc': 'We support the developer community by providing tools that make testing and development more efficient and effective.',
            'about.testimonials.title': 'What Our Users Say',
            'about.testimonials.subtitle': 'Don\'t just take our word for it — hear from some of our satisfied users.',
            'about.testimonials.user1.name': 'Emily R.',
            'about.testimonials.user1.role': 'Software Developer',
            'about.testimonials.user1.comment': '"AddressGen has been a game-changer for our development team. We use it daily to generate test data for our e-commerce platform, and it\'s saved us countless hours of manual work."',
            'about.testimonials.user2.name': 'Marcus T.',
            'about.testimonials.user2.role': 'QA Engineer',
            'about.testimonials.user2.comment': '"The quality of the generated addresses is impressive. Everything from postal codes to street names follows the correct format for each country, which is essential for our international application testing."',
            'about.testimonials.user3.name': 'Sophia L.',
            'about.testimonials.user3.role': 'Product Manager',
            'about.testimonials.user3.comment': '"We use AddressGen for our UI prototyping and user testing. Having realistic data makes our demos much more effective and helps stakeholders visualize the final product better."',
            'about.contact.title': 'Ready to get started?',
            'about.contact.subtitle': 'Try AddressGen today.',
            'about.contact.get_started': 'Get started',
            'about.contact.contact_us': 'Contact us',

            // Feedback Page
            'feedback.title': 'Feedback - AddressGen',
            'feedback.subtitle': 'We value your feedback and suggestions. Help us improve AddressGen by sharing your thoughts.',
            'feedback.form.name': 'Name',
            'feedback.form.email': 'Email',
            'feedback.form.subject': 'Subject',
            'feedback.form.message': 'Message',
            'feedback.form.submit': 'Submit Feedback',
            'feedback.form.placeholder.name': 'Your name',
            'feedback.form.placeholder.email': 'your.email@example.com',
            'feedback.form.placeholder.subject': 'What is this regarding?',
            'feedback.form.placeholder.message': 'Tell us what you think...',

            // FAQ Page
            'faq.title': 'Frequently Asked Questions',
            'faq.subtitle': 'Find answers to common questions about our address generation service.',
            'faq.categories.title': 'FAQ Categories',
            'faq.categories.general': 'General Questions',
            'faq.categories.usage': 'Usage & Features',
            'faq.categories.privacy': 'Privacy & Security',
            'faq.categories.technical': 'Technical Details',
            'faq.categories.billing': 'Billing & Pricing',
            'faq.contact.title': 'Still Have Questions?',
            'faq.contact.subtitle': 'Can\'t find the answer you\'re looking for? Please feel free to contact our customer support team.',
            'faq.contact.button': 'Contact Support',
            
            // General Questions
            'faq.questions.general.what.title': 'What is AddressGen?',
            'faq.questions.general.what.answer': 'AddressGen is a web application that generates random address information for various countries including the United States, United Kingdom, and Hong Kong. It creates realistic but fictional personal data such as addresses, names, phone numbers, email addresses, and credit card information for testing, development, or data privacy purposes.',
            'faq.questions.general.why.title': 'Why would I need to generate random addresses?',
            'faq.questions.general.why.answer': 'Random address generation is useful for various purposes:',
            'faq.questions.general.why.list.0': 'Software testing and development',
            'faq.questions.general.why.list.1': 'Database population for demos',
            'faq.questions.general.why.list.2': 'UI/UX testing with realistic data',
            'faq.questions.general.why.list.3': 'Protecting privacy by avoiding the use of real personal information',
            'faq.questions.general.why.list.4': 'Creating sample data for educational purposes',
            'faq.questions.general.why.list.5': 'Testing e-commerce checkout flows',
            'faq.questions.general.countries.title': 'Which countries are supported?',
            'faq.questions.general.countries.answer': 'Currently, AddressGen supports address generation for:',
            'faq.questions.general.countries.list.0': 'United States (including all 50 states and territories)',
            'faq.questions.general.countries.list.1': 'United Kingdom (England, Scotland, Wales, and Northern Ireland)',
            'faq.questions.general.countries.list.2': 'Hong Kong',
            'faq.questions.general.countries.note': 'We\'re continuously working to add more countries and regions to our service. If you need a specific country that isn\'t currently supported, please let us know through our feedback page.',
            
            // Usage & Features
            'faq.questions.usage.how.title': 'How do I generate address information?',
            'faq.questions.usage.how.answer': 'Generating address information is simple:',
            'faq.questions.usage.how.steps.0': 'Select the country for which you want to generate addresses',
            'faq.questions.usage.how.steps.1': 'Choose the types of information you need (name, address, phone, email, credit card, etc.)',
            'faq.questions.usage.how.steps.2': 'Specify the quantity of records you want to generate (up to 100 at once)',
            'faq.questions.usage.how.steps.3': 'Click the "Generate Information" button',
            'faq.questions.usage.how.steps.4': 'View, copy, or download the generated data',
            'faq.questions.usage.what.title': 'What information types can I generate?',
            'faq.questions.usage.what.answer': 'AddressGen can generate the following types of information:',
            'faq.questions.usage.what.list.0': 'Full names (first, middle, last)',
            'faq.questions.usage.what.list.1': 'Complete addresses (street, city, state/province, postal code)',
            'faq.questions.usage.what.list.2': 'Phone numbers (formatted according to country standards)',
            'faq.questions.usage.what.list.3': 'Email addresses',
            'faq.questions.usage.what.list.4': 'Credit card information (number, expiration date, CVV)',
            'faq.questions.usage.what.list.5': 'Date of birth',
            'faq.questions.usage.what.list.6': 'Social Security Numbers (US) or ID numbers',
            'faq.questions.usage.what.list.7': 'Occupation and company information',
            'faq.questions.usage.what.note': 'You can select exactly which information types you need for your specific use case.',
            'faq.questions.usage.download.title': 'Can I download the generated data?',
            'faq.questions.usage.download.answer': 'Yes, you can download the generated data in CSV (Comma-Separated Values) format, which can be easily imported into spreadsheet applications like Microsoft Excel or Google Sheets, as well as databases and other software systems.',
            'faq.questions.usage.download.note': 'You can also copy the generated data directly to your clipboard for immediate use in other applications.',
            
            // Privacy & Security
            'faq.questions.privacy.real.title': 'Is the generated information real?',
            'faq.questions.privacy.real.answer': 'No, all information generated by AddressGen is completely fictional. While the data follows the correct formats and conventions for each country (such as postal code patterns, phone number formats, etc.), it does not correspond to real individuals, addresses, or credit cards.',
            'faq.questions.privacy.real.note': 'Our algorithms ensure that the generated data looks realistic but does not match actual people or places, protecting privacy and preventing accidental misuse.',
            'faq.questions.privacy.valid.title': 'Are the credit card numbers valid?',
            'faq.questions.privacy.valid.answer': 'The credit card numbers generated by our system pass the Luhn algorithm check (the standard validation algorithm used by credit card companies), which means they have valid formats and check digits. However, they are not connected to actual bank accounts and cannot be used for real transactions.',
            'faq.questions.privacy.valid.note': 'These numbers are specifically designed for testing payment systems, forms, and software without using real credit card information.',
            'faq.questions.privacy.store.title': 'Do you store the generated information?',
            'faq.questions.privacy.store.answer': 'No, we do not store any of the information generated by our service. All data is created on-demand when you request it and is not saved on our servers after it\'s delivered to you.',
            'faq.questions.privacy.store.note': 'This approach ensures maximum privacy and security, as the generated data exists only on your device after generation.',
            
            // Technical Details
            'faq.questions.technical.how.title': 'How are the addresses generated?',
            'faq.questions.technical.how.answer': 'Our address generation system uses a combination of algorithms and databases of common street names, cities, states/provinces, and postal code patterns for each supported country. The system ensures that:',
            'faq.questions.technical.how.list.0': 'Street numbers are within realistic ranges',
            'faq.questions.technical.how.list.1': 'Street names sound natural and follow country-specific patterns',
            'faq.questions.technical.how.list.2': 'Cities are paired with their correct states/provinces',
            'faq.questions.technical.how.list.3': 'Postal codes match the correct format for the region',
            'faq.questions.technical.how.list.4': 'All components together form a plausible (though fictional) address',
            'faq.questions.technical.api.title': 'Is there an API available?',
            'faq.questions.technical.api.answer': 'Yes, we offer a RESTful API that allows developers to integrate our address generation capabilities directly into their applications, testing frameworks, or development environments.',
            'faq.questions.technical.api.note': 'The API supports all the same features as the web interface, including:',
            'faq.questions.technical.api.list.0': 'Selecting specific countries',
            'faq.questions.technical.api.list.1': 'Choosing which information types to generate',
            'faq.questions.technical.api.list.2': 'Generating multiple records in a single request',
            'faq.questions.technical.api.list.3': 'Receiving data in JSON or CSV format',
            'faq.questions.technical.rate.title': 'What are the rate limits?',
            'faq.questions.technical.rate.answer': 'Our service has the following rate limits:',
            'faq.questions.technical.rate.list.0': 'Web Interface: Up to 100 records per generation, with a maximum of 1,000 records per day for free users',
            'faq.questions.technical.rate.list.1': 'API - Free Tier: 100 requests per day, maximum 100 records per request',
            'faq.questions.technical.rate.list.2': 'API - Basic Tier: 1,000 requests per day, maximum 500 records per request',
            'faq.questions.technical.rate.list.3': 'API - Professional Tier: 10,000 requests per day, maximum 1,000 records per request',
            'faq.questions.technical.rate.list.4': 'API - Enterprise Tier: Custom limits based on your needs',
            'faq.questions.technical.rate.note': 'If you need higher limits, please contact us to discuss custom solutions.',
            
            // Billing & Pricing
            'faq.questions.billing.free.title': 'Is AddressGen free to use?',
            'faq.questions.billing.free.answer': 'Yes, the basic web interface of AddressGen is free to use with certain limitations:',
            'faq.questions.billing.free.list.0': 'Up to 100 records per generation',
            'faq.questions.billing.free.list.1': 'Maximum of 1,000 records per day',
            'faq.questions.billing.free.list.2': 'Access to all supported countries',
            'faq.questions.billing.free.list.3': 'All information types available',
            'faq.questions.billing.free.list.4': 'CSV download capability',
            'faq.questions.billing.free.note': 'For higher volume needs or API access, we offer paid subscription plans.',
            'faq.questions.billing.plans.title': 'What subscription plans are available?',
            'faq.questions.billing.plans.answer': 'We offer several subscription plans to meet different needs:',
            'faq.questions.billing.plans.list.0': 'Free: Basic web access with limited daily generations',
            'faq.questions.billing.plans.list.1': 'Basic ($9.99/month): Increased limits and basic API access',
            'faq.questions.billing.plans.list.2': 'Professional ($29.99/month): Higher limits, full API access, and priority support',
            'faq.questions.billing.plans.list.3': 'Enterprise (Custom pricing): Custom limits, dedicated support, and SLA guarantees',
            'faq.questions.billing.plans.note': 'All paid plans are billed monthly with the option for annual billing at a discount. Visit our pricing page for detailed feature comparisons.',
            'faq.questions.billing.refund.title': 'Do you offer refunds?',
            'faq.questions.billing.refund.answer': 'Yes, we offer a 14-day money-back guarantee for all new subscriptions. If you\'re not satisfied with our service within the first 14 days, you can request a full refund with no questions asked.',
            'faq.questions.billing.refund.note': 'For refund requests after the initial 14-day period, please contact our support team to discuss your specific situation.',

            // Copy messages
            'copy.success': 'Copied to clipboard!',
            'copy.error': 'Failed to copy!'
        }
    },
    'zh-CN': {
        translation: {
            // 导航
            'nav.home': '首页',
            'nav.blog': '博客',
            'nav.faq': '常见问题',
            'nav.about': '关于',
            'nav.feedback': '反馈',
            
            // 页面标题
            'page.title.home': '首页 - AddressGen',
            'page.title.blog': '博客 - AddressGen',
            'page.title.faq': '常见问题 - AddressGen',
            'page.title.about': '关于 - AddressGen',
            'page.title.feedback': '反馈 - AddressGen',
            
            // 博客页面
            'blog.header.title': 'AddressGen 博客',
            'blog.header.subtitle': '获取关于地址生成、数据隐私和身份管理的最新新闻、提示和见解。',
            
            // 语言
            'language': '语言：',
            
            // 页脚
            'footer.privacy': '隐私政策',
            'footer.terms': '服务条款',
            'footer.copyright': '© 2023 AddressGen. 保留所有权利。',

            // 首页内容
            'heroTitle': '生成随机地址信息',
            'heroDesc': '为测试、开发或数据隐私目的创建逼真的随机地址、身份和信用卡信息。',
            'getStarted': '开始使用',
            'learnMore': '了解更多',
            'whyUse': '为什么使用我们的地址生成器？',
            'whyUseDesc': '我们的工具提供逼真的随机生成信息，同时确保隐私和安全。',
            'privacyProtection': '隐私保护',
            'privacyProtectionDesc': '使用随机生成的信息代替真实个人数据进行测试和开发。',
            'internationalSupport': '国际支持',
            'internationalSupportDesc': '为多个国家生成地址信息，包括美国、英国和香港。',
            'customizableOptions': '可定制选项',
            'customizableOptionsDesc': '选择您需要的确切信息，从基本地址详情到完整的身份档案。',

            // Address Generator Section
            'generator.title': '地址生成器',
            'generator.country.title': '选择国家',
            'generator.state.title': '选择州/省',
            'generator.city.title': '选择城市',
            'generator.quantity.title': '生成数量',
            'generator.quantity.max': '最大数量：100',
            'generator.button': '生成信息',
            'generator.results.title': '生成的信息',
            'generator.results.copy': '复制全部',
            'generator.results.download': '下载CSV',
            'generator.results.generateMore': '再次生成',
            
            // Results Sections
            'generator.results.basicInfo': '基本信息',
            'generator.results.addressInfo': '地址信息',
            'generator.results.creditCardInfo': '信用卡信息',
            'generator.results.employmentInfo': '工作信息',
            
            // Field Labels
            'generator.fields.fullName': '姓名',
            'generator.fields.email': '邮箱',
            'generator.fields.phone': '电话',
            'generator.fields.dob': '出生日期',
            'generator.fields.country': '国家',
            'generator.fields.streetAddress': '街道地址',
            'generator.fields.city': '城市',
            'generator.fields.stateCode': '州/省代码',
            'generator.fields.stateName': '州/省名称',
            'generator.fields.zipCode': '邮政编码',
            'generator.fields.cardType': '卡类型',
            'generator.fields.cardNumber': '卡号',
            'generator.fields.cvv': '安全码',
            'generator.fields.expiryDate': '有效期',
            'generator.fields.occupation': '职业',
            'generator.fields.company': '公司',
            'country.us': '美国',
            'country.uk': '英国',
            'country.hk': '香港',

            // About Page
            'about.title': '关于 AddressGen',
            'about.subtitle': '了解我们的使命、团队以及为什么我们创建了最全面的地址生成工具。',
            'about.our_story': '我们的故事',
            'about.story.p1': 'AddressGen 源于实际需求。作为软件开发人员，我们经常需要为项目生成真实的测试数据，但现有的解决方案要么功能有限，要么过于复杂，或者无法提供我们所需的数据质量。',
            'about.story.p2': '在 2025 年，我们的开发人员和数据专家团队共同创建了一个解决方案，能够为多个国家生成高质量、真实的地址信息，同时保持最高的隐私和安全标准。',
            'about.story.p3': '这个最初作为内部工具的项目迅速发展成为一个综合性平台，被全球数千名开发人员、测试人员和商业用户使用。如今，AddressGen 已成为生成真实地址和身份信息的首选解决方案，用于测试、开发和教育目的。',
            'about.mission.title': '我们的使命',
            'about.mission.subtitle': '我们致力于为开发人员和企业提供工具，使他们的工作更轻松，同时保护隐私并促进数据处理的最佳实践。',
            'about.mission.innovation.title': '创新',
            'about.mission.innovation.desc': '我们不断改进算法并扩展功能，以提供最准确和有用的地址生成服务。',
            'about.mission.privacy.title': '隐私',
            'about.mission.privacy.desc': '我们致力于通过提供虚构数据来保护隐私，帮助开发人员避免在工作中使用真实的个人信息。',
            'about.mission.community.title': '社区',
            'about.mission.community.desc': '我们通过提供使测试和开发更高效、更有效的工具来支持开发者社区。',
            'about.testimonials.title': '用户评价',
            'about.testimonials.subtitle': '不要只听我们说 — 听听我们满意用户的心声。',
            'about.testimonials.user1.name': 'Emily R.',
            'about.testimonials.user1.role': '软件开发工程师',
            'about.testimonials.user1.comment': '"AddressGen 彻底改变了我们的开发团队。我们每天用它为电商平台生成测试数据，节省了无数手动工作的时间。"',
            'about.testimonials.user2.name': 'Marcus T.',
            'about.testimonials.user2.role': '质量保证工程师',
            'about.testimonials.user2.comment': '"生成的地址质量令人印象深刻。从邮政编码到街道名称，每个国家的格式都完全正确，这对我们的国际应用测试至关重要。"',
            'about.testimonials.user3.name': 'Sophia L.',
            'about.testimonials.user3.role': '产品经理',
            'about.testimonials.user3.comment': '"我们使用 AddressGen 进行 UI 原型设计和用户测试。拥有真实的数据使我们的演示更加有效，帮助利益相关者更好地理解最终产品。"',
            'about.contact.title': '准备开始使用？',
            'about.contact.subtitle': '立即体验 AddressGen。',
            'about.contact.get_started': '开始使用',
            'about.contact.contact_us': '联系我们',

            // Feedback Page
            'feedback.title': '反馈 - AddressGen',
            'feedback.subtitle': '我们重视您的反馈和建议。通过分享您的想法，帮助我们改进 AddressGen。',
            'feedback.form.name': '姓名',
            'feedback.form.email': '电子邮箱',
            'feedback.form.subject': '主题',
            'feedback.form.message': '留言',
            'feedback.form.submit': '提交反馈',
            'feedback.form.placeholder.name': '您的姓名',
            'feedback.form.placeholder.email': '您的邮箱地址',
            'feedback.form.placeholder.subject': '这是关于什么的？',
            'feedback.form.placeholder.message': '请告诉我们您的想法...',

            // FAQ Page
            'faq.title': '常见问题',
            'faq.subtitle': '查找关于我们地址生成服务的常见问题解答。',
            'faq.categories.title': '问题分类',
            'faq.categories.general': '一般问题',
            'faq.categories.usage': '使用与功能',
            'faq.categories.privacy': '隐私与安全',
            'faq.categories.technical': '技术细节',
            'faq.categories.billing': '计费与价格',
            'faq.contact.title': '还有其他问题？',
            'faq.contact.subtitle': '找不到您需要的答案？请随时联系我们的客户支持团队。',
            'faq.contact.button': '联系支持',
            
            // 一般问题
            'faq.questions.general.what.title': '什么是 AddressGen？',
            'faq.questions.general.what.answer': 'AddressGen 是一个网络应用程序，可以为包括美国、英国和香港在内的多个国家生成随机地址信息。它创建真实但虚构的个人数据，如地址、姓名、电话号码、电子邮件地址和信用卡信息，用于测试、开发或数据隐私目的。',
            'faq.questions.general.why.title': '为什么需要生成随机地址？',
            'faq.questions.general.why.answer': '随机地址生成可用于多种用途：',
            'faq.questions.general.why.list.0': '软件测试和开发',
            'faq.questions.general.why.list.1': '演示数据库填充',
            'faq.questions.general.why.list.2': '使用真实数据进行 UI/UX 测试',
            'faq.questions.general.why.list.3': '通过避免使用真实个人信息来保护隐私',
            'faq.questions.general.why.list.4': '为教育目的创建示例数据',
            'faq.questions.general.why.list.5': '测试电子商务结账流程',
            'faq.questions.general.countries.title': '支持哪些国家？',
            'faq.questions.general.countries.answer': '目前，AddressGen 支持以下国家的地址生成：',
            'faq.questions.general.countries.list.0': '美国（包括所有 50 个州和地区）',
            'faq.questions.general.countries.list.1': '英国（英格兰、苏格兰、威尔士和北爱尔兰）',
            'faq.questions.general.countries.list.2': '香港',
            'faq.questions.general.countries.note': '我们正在不断努力添加更多国家和地区到我们的服务中。如果您需要目前不支持的国家，请通过我们的反馈页面告知我们。',
            
            // Usage & Features
            'faq.questions.usage.how.title': '如何生成地址信息？',
            'faq.questions.usage.how.answer': '生成地址信息很简单：',
            'faq.questions.usage.how.steps.0': '选择您想要生成地址的国家',
            'faq.questions.usage.how.steps.1': '选择您需要的信息类型（姓名、地址、电话、电子邮件、信用卡等）',
            'faq.questions.usage.how.steps.2': '指定您想要生成的记录数量（一次最多 100 条）',
            'faq.questions.usage.how.steps.3': '点击"生成信息"按钮',
            'faq.questions.usage.how.steps.4': '查看、复制或下载生成的数据',
            'faq.questions.usage.what.title': '可以生成哪些类型的信息？',
            'faq.questions.usage.what.answer': 'AddressGen 可以生成以下类型的信息：',
            'faq.questions.usage.what.list.0': '全名（名、中间名、姓）',
            'faq.questions.usage.what.list.1': '完整地址（街道、城市、州/省、邮政编码）',
            'faq.questions.usage.what.list.2': '电话号码（根据国家标准格式化）',
            'faq.questions.usage.what.list.3': '电子邮件地址',
            'faq.questions.usage.what.list.4': '信用卡信息（卡号、有效期、CVV）',
            'faq.questions.usage.what.list.5': '出生日期',
            'faq.questions.usage.what.list.6': '社会安全号码（美国）或身份证号码',
            'faq.questions.usage.what.list.7': '职业和公司信息',
            'faq.questions.usage.what.note': '您可以根据具体需求选择所需的信息类型。',
            'faq.questions.usage.download.title': '可以下载生成的数据吗？',
            'faq.questions.usage.download.answer': '是的，您可以下载 CSV（逗号分隔值）格式的生成数据，可以轻松导入到 Microsoft Excel 或 Google Sheets 等电子表格应用程序，以及数据库和其他软件系统中。',
            'faq.questions.usage.download.note': '您还可以将生成的数据直接复制到剪贴板，以便在其他应用程序中立即使用。',
            
            // Privacy & Security
            'faq.questions.privacy.real.title': '生成的信息是真实的吗？',
            'faq.questions.privacy.real.answer': '不，AddressGen 生成的所有信息都是完全虚构的。虽然数据遵循每个国家的正确格式和惯例（如邮政编码模式、电话号码格式等），但它不对应于真实的个人、地址或信用卡。',
            'faq.questions.privacy.real.note': '我们的算法确保生成的数据看起来真实，但不会匹配实际的人或地点，从而保护隐私并防止意外滥用。',
            'faq.questions.privacy.valid.title': '信用卡号码有效吗？',
            'faq.questions.privacy.valid.answer': '我们系统生成的信用卡号码通过 Luhn 算法检查（信用卡公司使用的标准验证算法），这意味着它们具有有效的格式和校验位。但是，它们没有连接到实际的银行账户，不能用于真实交易。',
            'faq.questions.privacy.valid.note': '这些号码专门设计用于测试支付系统、表单和软件，而无需使用真实的信用卡信息。',
            'faq.questions.privacy.store.title': '你们存储生成的信息吗？',
            'faq.questions.privacy.store.answer': '不，我们不存储由我们的服务生成的任何信息。所有数据都是在您请求时按需创建的，在交付给您后不会保存在我们的服务器上。',
            'faq.questions.privacy.store.note': '这种方法确保了最大的隐私和安全性，因为生成的数据在生成后只存在于您的设备上。',
            
            // Technical Details
            'faq.questions.technical.how.title': '地址是如何生成的？',
            'faq.questions.technical.how.answer': '我们的地址生成系统使用算法和每个支持国家的常见街道名称、城市、州/省和邮政编码模式数据库的组合。系统确保：',
            'faq.questions.technical.how.list.0': '街道号码在合理范围内',
            'faq.questions.technical.how.list.1': '街道名称听起来自然并遵循国家特定的模式',
            'faq.questions.technical.how.list.2': '城市与其正确的州/省配对',
            'faq.questions.technical.how.list.3': '邮政编码匹配该地区的正确格式',
            'faq.questions.technical.how.list.4': '所有组件共同构成一个合理的（虽然是虚构的）地址',
            'faq.questions.technical.api.title': '有 API 可用吗？',
            'faq.questions.technical.api.answer': '是的，我们提供 RESTful API，允许开发人员将我们的地址生成功能直接集成到他们的应用程序、测试框架或开发环境中。',
            'faq.questions.technical.api.note': 'API 支持与 Web 界面相同的所有功能，包括：',
            'faq.questions.technical.api.list.0': '选择特定国家',
            'faq.questions.technical.api.list.1': '选择要生成的信息类型',
            'faq.questions.technical.api.list.2': '在单个请求中生成多条记录',
            'faq.questions.technical.api.list.3': '以 JSON 或 CSV 格式接收数据',
            'faq.questions.technical.rate.title': '有什么速率限制？',
            'faq.questions.technical.rate.answer': '我们的服务有以下速率限制：',
            'faq.questions.technical.rate.list.0': 'Web 界面：每次生成最多 100 条记录，免费用户每天最多 1,000 条记录',
            'faq.questions.technical.rate.list.1': 'API - 免费版：每天 100 个请求，每个请求最多 100 条记录',
            'faq.questions.technical.rate.list.2': 'API - 基础版：每天 1,000 个请求，每个请求最多 500 条记录',
            'faq.questions.technical.rate.list.3': 'API - 专业版：每天 10,000 个请求，每个请求最多 1,000 条记录',
            'faq.questions.technical.rate.list.4': 'API - 企业版：根据您的需求自定义限制',
            'faq.questions.technical.rate.note': '如果您需要更高的限制，请联系我们讨论定制解决方案。',
            
            // Billing & Pricing
            'faq.questions.billing.free.title': 'AddressGen 是免费的吗？',
            'faq.questions.billing.free.answer': '是的，AddressGen 的基本 Web 界面可以免费使用，但有一些限制：',
            'faq.questions.billing.free.list.0': '每次生成最多 100 条记录',
            'faq.questions.billing.free.list.1': '每天最多 1,000 条记录',
            'faq.questions.billing.free.list.2': '访问所有支持的国家',
            'faq.questions.billing.free.list.3': '所有信息类型可用',
            'faq.questions.billing.free.list.4': 'CSV 下载功能',
            'faq.questions.billing.free.note': '对于更高容量的需求或 API 访问，我们提供付费订阅计划。',
            'faq.questions.billing.plans.title': '有哪些订阅计划？',
            'faq.questions.billing.plans.answer': '我们提供多种订阅计划以满足不同需求：',
            'faq.questions.billing.plans.list.0': '免费：基本 Web 访问，每日生成次数有限',
            'faq.questions.billing.plans.list.1': '基础版（$9.99/月）：增加限制和基本 API 访问',
            'faq.questions.billing.plans.list.2': '专业版（$29.99/月）：更高的限制、完整的 API 访问和优先支持',
            'faq.questions.billing.plans.list.3': '企业版（自定义价格）：自定义限制、专属支持和 SLA 保证',
            'faq.questions.billing.plans.note': '所有付费计划按月计费，可选择年度计费享受折扣。访问我们的定价页面查看详细的功能比较。',
            'faq.questions.billing.refund.title': '提供退款吗？',
            'faq.questions.billing.refund.answer': '是的，我们为所有新订阅提供 14 天退款保证。如果您在前 14 天内对我们的服务不满意，可以无条件要求全额退款。',
            'faq.questions.billing.refund.note': '对于初始 14 天期限后的退款请求，请联系我们的支持团队讨论您的具体情况。',

            // Copy messages
            'copy.success': '复制成功！',
            'copy.error': '复制失败！'
        }
    }
};

// 初始化i18next
function initializeI18n() {
    i18next.init({
        resources,
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    }).then(() => {
        // 初始化语言选择器
        initializeLanguageSelector();
        // 更新页面文本
        updatePageText();
    });
}

// 更新页面文本
function updatePageText() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            element.textContent = i18next.t(key);
        }
    });
    
    // 更新当前语言显示
    const currentLangElement = document.getElementById('current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = i18next.language === 'zh-CN' ? '简体中文' : 'English';
    }
    
    // 更新页面标题
    const titleKey = document.title.split(' - ')[0].toLowerCase().replace(' ', '.');
    document.title = i18next.t(`page.title.${titleKey}`);
}

// 切换语言
function changeLanguage(lang) {
    // 先保存语言设置
    localStorage.setItem('language', lang);
    // 直接刷新页面
    window.location.reload();
}

// 初始化语言选择器
function initializeLanguageSelector() {
    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (langButton && langDropdown) {
        // 点击按钮显示/隐藏下拉菜单
        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('hidden');
        });
        
        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!langButton.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('hidden');
            }
        });

        // 点击下拉菜单选项时关闭下拉菜单
        langDropdown.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                langDropdown.classList.add('hidden');
            }
        });
    }
}

// 复制到剪贴板并显示提示
function copyToClipboard(element) {
    const text = element.querySelector('p:last-child').textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast(i18next.t('copy.success'));
    }).catch(err => {
        showToast(i18next.t('copy.error'));
        console.error('复制失败:', err);
    });
}

// 显示 Toast 提示
function showToast(message) {
    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
} 