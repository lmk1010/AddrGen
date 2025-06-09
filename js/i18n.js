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
            'country.hk': 'Hong Kong'
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
            'generator.results.download': '下载 CSV',
            'generator.results.generateMore': '生成更多',
            
            // Results Sections
            'generator.results.basicInfo': '基本信息',
            'generator.results.addressInfo': '地址信息',
            'generator.results.creditCardInfo': '信用卡信息',
            'generator.results.employmentInfo': '工作信息',
            
            // Field Labels
            'generator.fields.fullName': '姓名',
            'generator.fields.email': '电子邮箱',
            'generator.fields.phone': '电话号码',
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
            'country.hk': '香港'
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
    i18next.changeLanguage(lang, (err, t) => {
        if (err) return console.log('something went wrong loading', err);
        localStorage.setItem('language', lang);
        updatePageText();
    });
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