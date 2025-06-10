/**
 * AddressGen - Main JavaScript File
 * This file contains all the functionality for the AddressGen website
 */

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initLanguageSelector();
    initGeneratorForm();
    initCopyButtons();
    initFaqAccordion();
    initSmoothScroll();
    initFeedbackForm();

    // 添加复制所有按钮的点击事件处理
    document.getElementById('copy-btn').addEventListener('click', copyAllToClipboard);
});

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

/**
 * Language Selector Functionality
 */
function initLanguageSelector() {
    // 等待i18next加载完成
    if (typeof i18next === 'undefined') {
        // 如果i18next还没加载完成，等待它加载
        const checkI18next = setInterval(() => {
            if (typeof i18next !== 'undefined') {
                clearInterval(checkI18next);
                setupLanguageSelector();
            }
        }, 100);
        return;
    }
    
    setupLanguageSelector();
}

function setupLanguageSelector() {
    // Set up language change event handlers
    const languageLinks = document.querySelectorAll('[onclick^="changeLanguage"]');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('onclick').match(/['"](.*?)['"]/);
            if (lang && lang[1]) {
                changeLanguage(lang[1]);
            }
        });
    });
    
    // Function to change the language
    window.changeLanguage = function(lang) {
        console.log('Language changed to: ' + lang);
        // Save the language preference
        localStorage.setItem('language', lang);
        
        // Update i18next language
        i18next.changeLanguage(lang).then(() => {
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (key) {
                    element.textContent = i18next.t(key);
                }
            });
            
            // Update all elements with data-i18n-placeholder attribute
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (key) {
                    element.placeholder = i18next.t(key);
                }
            });
            
            // Update current language display
            const currentLangElement = document.getElementById('current-lang');
            if (currentLangElement) {
                currentLangElement.textContent = lang === 'zh-CN' ? '简体中文' : 'English';
            }
            
            // Update page title
            const titleKey = document.title.split(' - ')[0].toLowerCase().replace(' ', '.');
            document.title = i18next.t(`page.title.${titleKey}`);
        });
    };
    
    // Check for saved language preference and apply it
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
}

/**
 * Address Generator Form Functionality
 */
function initGeneratorForm() {
    const generatorForm = document.getElementById('generator-form');
    const resultsSection = document.getElementById('results-section');
    
    // Initialize state and city selection
    initStateCitySelection();
    
    // 添加 Generate More 按钮的点击事件处理
    const generateMoreBtn = document.getElementById('generate-more-btn');
    if (generateMoreBtn) {
        generateMoreBtn.addEventListener('click', function() {
            const country = document.querySelector('.country-option.selected').getAttribute('data-country');
            const state = document.getElementById('state-select').value;
            const city = document.getElementById('city-select').value;
            
            // 获取当前选中的信息类型
            const infoTypes = [];
            document.querySelectorAll('input[name="info_type"]:checked').forEach(checkbox => {
                infoTypes.push(checkbox.value);
            });
            
            // 如果没有选中任何类型，默认生成所有类型
            if (infoTypes.length === 0) {
                infoTypes.push('address', 'identity', 'credit_card');
            }
            
            // 生成新的信息
            generateInformation(country, state, city, infoTypes);
        });
    }
    
    console.log("hahahhahaha");
    if (generatorForm) {
        generatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const country = document.getElementById('country').value;
            const state = document.getElementById('state-select').value;
            const city = document.getElementById('city-select').value;
            const infoTypes = [];
            
            document.querySelectorAll('input[name="info_type"]:checked').forEach(checkbox => {
                infoTypes.push(checkbox.value);
            });
            
            // Validate form
            if (!country) {
                showAlert('Please select a country', 'error');
                return;
            }
            
            if (infoTypes.length === 0) {
                showAlert('Please select at least one information type', 'error');
                return;
            }
            
            // Generate the information
            generateInformation(country, state, city, infoTypes);
        });
    }

    // 初始化复制按钮
    initCopyButtons();
}

/**
 * Initialize state and city selection functionality
 */
function initStateCitySelection() {
    const stateSelect = document.getElementById('state-select');
    const citySelect = document.getElementById('city-select');
    
    if (!stateSelect || !citySelect) {
        console.warn('State or city select elements not found');
        return;
    }
    
    // State data for different countries
    const stateData = {
        'us': [
            { code: 'AL', name: 'Alabama' },
            { code: 'AK', name: 'Alaska' },
            { code: 'AZ', name: 'Arizona' },
            { code: 'AR', name: 'Arkansas' },
            { code: 'CA', name: 'California' },
            { code: 'CO', name: 'Colorado' },
            { code: 'CT', name: 'Connecticut' },
            { code: 'DE', name: 'Delaware' },
            { code: 'FL', name: 'Florida' },
            { code: 'GA', name: 'Georgia' },
            { code: 'HI', name: 'Hawaii' },
            { code: 'ID', name: 'Idaho' },
            { code: 'IL', name: 'Illinois' },
            { code: 'IN', name: 'Indiana' },
            { code: 'IA', name: 'Iowa' },
            { code: 'KS', name: 'Kansas' },
            { code: 'KY', name: 'Kentucky' },
            { code: 'LA', name: 'Louisiana' },
            { code: 'ME', name: 'Maine' },
            { code: 'MD', name: 'Maryland' },
            { code: 'MA', name: 'Massachusetts' },
            { code: 'MI', name: 'Michigan' },
            { code: 'MN', name: 'Minnesota' },
            { code: 'MS', name: 'Mississippi' },
            { code: 'MO', name: 'Missouri' },
            { code: 'MT', name: 'Montana' },
            { code: 'NE', name: 'Nebraska' },
            { code: 'NV', name: 'Nevada' },
            { code: 'NH', name: 'New Hampshire' },
            { code: 'NJ', name: 'New Jersey' },
            { code: 'NM', name: 'New Mexico' },
            { code: 'NY', name: 'New York' },
            { code: 'NC', name: 'North Carolina' },
            { code: 'ND', name: 'North Dakota' },
            { code: 'OH', name: 'Ohio' },
            { code: 'OK', name: 'Oklahoma' },
            { code: 'OR', name: 'Oregon' },
            { code: 'PA', name: 'Pennsylvania' },
            { code: 'RI', name: 'Rhode Island' },
            { code: 'SC', name: 'South Carolina' },
            { code: 'SD', name: 'South Dakota' },
            { code: 'TN', name: 'Tennessee' },
            { code: 'TX', name: 'Texas' },
            { code: 'UT', name: 'Utah' },
            { code: 'VT', name: 'Vermont' },
            { code: 'VA', name: 'Virginia' },
            { code: 'WA', name: 'Washington' },
            { code: 'WV', name: 'West Virginia' },
            { code: 'WI', name: 'Wisconsin' },
            { code: 'WY', name: 'Wyoming' }
        ],
        'uk': [
            { code: 'ENG', name: 'England' },
            { code: 'SCT', name: 'Scotland' },
            { code: 'WLS', name: 'Wales' },
            { code: 'NIR', name: 'Northern Ireland' }
        ],
        'hk': [
            { code: 'HK', name: 'Hong Kong Island' },
            { code: 'KL', name: 'Kowloon' },
            { code: 'NT', name: 'New Territories' }
        ]
    };

    // City data for different states
    const cityData = {
        'us': {
            'AL': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
            'AK': ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla', 'Sitka'],
            'AZ': ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale', 'Glendale'],
            'AR': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
            'CA': ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Anaheim', 'Bakersfield'],
            'CO': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
            'CT': ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury'],
            'DE': ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
            'FL': ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Fort Lauderdale', 'Tallahassee', 'Cape Coral', 'Port St. Lucie'],
            'GA': ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah'],
            'HI': ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu'],
            'ID': ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello'],
            'IL': ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield', 'Peoria', 'Elgin', 'Waukegan', 'Champaign'],
            'IN': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
            'IA': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
            'KS': ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'],
            'KY': ['Lexington', 'Louisville', 'Bowling Green', 'Owensboro', 'Covington'],
            'LA': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
            'ME': ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
            'MD': ['Baltimore', 'Rockville', 'Germantown', 'Frederick', 'Gaithersburg'],
            'MA': ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
            'MI': ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing'],
            'MN': ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington'],
            'MS': ['Jackson', 'Gulfport', 'Hattiesburg', 'Biloxi', 'Meridian'],
            'MO': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
            'MT': ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
            'NE': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
            'NV': ['Las Vegas', 'Reno', 'Henderson', 'North Las Vegas', 'Sparks'],
            'NH': ['Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester'],
            'NJ': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
            'NM': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
            'NY': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica'],
            'NC': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
            'ND': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
            'OH': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Lorain', 'Hamilton'],
            'OK': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
            'OR': ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro'],
            'PA': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
            'RI': ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
            'SC': ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
            'SD': ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
            'TN': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
            'TX': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo'],
            'UT': ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
            'VT': ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'],
            'VA': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
            'WA': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
            'WV': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'],
            'WI': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
            'WY': ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs']
        },
        'uk': {
            'ENG': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
            'SCT': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
            'WLS': ['Cardiff', 'Swansea', 'Newport', 'Bangor', 'St Davids'],
            'NIR': ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Bangor']
        },
        'hk': {
            'HK': ['Central', 'Wan Chai', 'Causeway Bay', 'North Point', 'Quarry Bay'],
            'KL': ['Tsim Sha Tsui', 'Mong Kok', 'Yau Ma Tei', 'Jordan', 'Hung Hom'],
            'NT': ['Sha Tin', 'Tsuen Wan', 'Tuen Mun', 'Yuen Long', 'Tai Po']
        }
    };

    // 初始化默认选择美国
    const defaultCountry = 'us';
    updateStates(defaultCountry);

    // Update states when country changes
    document.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            updateStates(country);
            // Clear city selection
            citySelect.innerHTML = '<option value="random">🎲 Random City</option>';
        });
    });

    // Update cities when state changes
    stateSelect.addEventListener('change', function() {
        const country = document.querySelector('.country-option.selected').getAttribute('data-country');
        const state = this.value;
        updateCities(country, state);
    });

    function updateStates(country) {
        stateSelect.innerHTML = '<option value="random">🎲 Random State</option>';
        const states = stateData[country];
        if (states) {
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state.code;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        }
    }

    function updateCities(country, state) {
        citySelect.innerHTML = '<option value="random">🎲 Random City</option>';
        if (state === 'random') {
            // 如果选择了随机州/省，则显示所有城市
            const allCities = [];
            if (cityData[country]) {
                Object.values(cityData[country]).forEach(cities => {
                    allCities.push(...cities);
                });
            }
            allCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else if (cityData[country] && cityData[country][state]) {
            cityData[country][state].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    }
}

/**
 * 生成信息
 * @param {string} country 国家
 * @param {string} state 州/省
 * @param {string} city 城市
 * @param {Array} infoTypes 信息类型
 */
function generateInformation(country, state, city, infoTypes) {
    // 显示加载状态
    const generateBtn = document.getElementById('generate-btn');
    const originalBtnText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>生成中...';
    generateBtn.disabled = true;

    // 使用 Promise.all 并行生成数据
    const promises = [];
    const results = {
        identity: null,
        address: null,
        creditCard: null
    };

    if (infoTypes.includes('identity')) {
        promises.push(
            new Promise(resolve => {
                results.identity = generateMockIdentity(country);
                resolve();
            })
        );
    }

    if (infoTypes.includes('address')) {
        promises.push(
            new Promise(resolve => {
                results.address = generateMockAddress(country, state, city);
                resolve();
            })
        );
    }

    if (infoTypes.includes('credit_card')) {
        promises.push(
            new Promise(resolve => {
                results.creditCard = generateMockCreditCard(country);
                resolve();
            })
        );
    }

    // 等待所有数据生成完成
    Promise.all(promises).then(() => {
        // 保存生成的数据到window对象
        window.generatedData = results;

        // 显示结果
        displayResults(results);
        
        // 恢复按钮状态
        generateBtn.innerHTML = originalBtnText;
        generateBtn.disabled = false;
    });
}

/**
 * 显示生成的结果
 * @param {Object} results 生成的结果
 */
function displayResults(results) {
    const resultsSection = document.getElementById('results');
    if (!resultsSection) return;

    // 显示结果区域
    resultsSection.classList.remove('hidden');

    // 使用 DocumentFragment 优化 DOM 操作
    const fragment = document.createDocumentFragment();
    const resultsContent = document.createElement('div');
    resultsContent.className = 'bg-gray-50 p-4 rounded-lg';

    // 创建两列布局容器
    const twoColumnContainer = document.createElement('div');
    twoColumnContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

    // 左侧列 - 地址信息
    if (results.address) {
        const addressCard = document.createElement('div');
        addressCard.className = 'bg-white rounded-lg shadow p-4';
        addressCard.innerHTML = `
            <h3 class="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <i class="fas fa-map-marker-alt text-indigo-600 mr-2"></i>
                <span data-i18n="generator.results.addressInfo">地址信息</span>
            </h3>
            <div class="space-y-2">
                ${formatAddressForDisplay(results.address)}
            </div>
        `;
        twoColumnContainer.appendChild(addressCard);
    }

    // 右侧列 - 基本信息
    if (results.identity) {
        const identityCard = document.createElement('div');
        identityCard.className = 'bg-white rounded-lg shadow p-4';
        identityCard.innerHTML = `
            <h3 class="text-lg font-medium text-gray-900 mb-3 flex items-center">
                <i class="fas fa-user-circle text-indigo-600 mr-2"></i>
                <span data-i18n="generator.results.basicInfo">基本信息</span>
            </h3>
            <div class="space-y-2">
                ${formatIdentityForDisplay(results.identity)}
            </div>
        `;
        twoColumnContainer.appendChild(identityCard);
    }

    resultsContent.appendChild(twoColumnContainer);

    // 信用卡信息（如果有）
    if (results.creditCard) {
        const creditCardSection = document.createElement('div');
        creditCardSection.className = 'mt-4';
        creditCardSection.innerHTML = `
            <div class="bg-white rounded-lg shadow p-4">
                <h3 class="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <i class="fas fa-credit-card text-indigo-600 mr-2"></i>
                    <span data-i18n="generator.results.creditCardInfo">信用卡信息</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                    ${formatCreditCardForDisplay(results.creditCard)}
                </div>
            </div>
        `;
        resultsContent.appendChild(creditCardSection);
    }

    fragment.appendChild(resultsContent);

    // 一次性更新 DOM
    const existingContent = resultsSection.querySelector('.bg-gray-50');
    if (existingContent) {
        existingContent.replaceWith(fragment);
    } else {
        resultsSection.querySelector('.px-4').appendChild(fragment);
    }

    // 初始化复制按钮
    initCopyButtons();

    // 滚动到结果区域
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * 格式化身份信息用于显示
 * @param {Object} identity 身份信息
 * @returns {string} HTML字符串
 */
function formatIdentityForDisplay(identity) {
    return `
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">姓名</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${identity.fullName}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">邮箱</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${identity.email}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">电话</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${identity.phoneNumber}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">出生日期</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${identity.dateOfBirth}</p>
        </div>
    `;
}

/**
 * 格式化地址信息用于显示
 * @param {Object} address 地址信息
 * @returns {string} HTML字符串
 */
function formatAddressForDisplay(address) {
    let html = '';
    
    if (address.street) {
        html += `
            <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <p class="text-sm font-medium text-gray-500">街道地址</p>
                <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${address.street}</p>
            </div>
        `;
    }
    
    if (address.city) {
        html += `
            <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <p class="text-sm font-medium text-gray-500">城市</p>
                <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${address.city}</p>
            </div>
        `;
    }
    
    if (address.state) {
        html += `
            <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <p class="text-sm font-medium text-gray-500">州/省</p>
                <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${address.state}</p>
            </div>
        `;
    }
    
    if (address.zipCode) {
        html += `
            <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <p class="text-sm font-medium text-gray-500">邮编</p>
                <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${address.zipCode}</p>
            </div>
        `;
    }
    
    if (address.country) {
        html += `
            <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <p class="text-sm font-medium text-gray-500">国家</p>
                <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${address.country}</p>
            </div>
        `;
    }
    
    return html;
}

/**
 * 格式化信用卡信息用于显示
 * @param {Object} creditCard 信用卡信息
 * @returns {string} HTML字符串
 */
function formatCreditCardForDisplay(creditCard) {
    return `
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">卡类型</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${creditCard.cardType}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">卡号</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${creditCard.cardNumber}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">持卡人</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${creditCard.cardholderName}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">过期日期</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${creditCard.expiryDate}</p>
        </div>
        <div class="cursor-pointer group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
            <p class="text-sm font-medium text-gray-500">CVV</p>
            <p class="mt-1 text-lg text-gray-900 group-hover:text-indigo-600 copy-value">${creditCard.cvv}</p>
        </div>
    `;
}

/**
 * Initialize copy buttons functionality
 */
function initCopyButtons() {
    // 为每个可复制的字段添加点击事件
    document.querySelectorAll('.cursor-pointer').forEach(element => {
        element.addEventListener('click', function() {
            copyToClipboard(this);
        });
    });

    // 为 Copy All 按钮添加点击事件
    const copyAllBtn = document.getElementById('copy-btn');
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', function() {
            copyAllToClipboard();
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-header');
            const content = item.querySelector('.faq-content');
            
            header.addEventListener('click', function() {
                // Toggle the current item
                content.classList.toggle('hidden');
                const icon = header.querySelector('i');
                
                if (content.classList.contains('hidden')) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // If there's a mobile menu open, close it
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

/**
 * Initialize feedback form validation and submission
 */
function initFeedbackForm() {
    const feedbackForm = document.querySelector('form');
    
    if (feedbackForm && feedbackForm.getAttribute('id') !== 'generator-form') {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            if (name && !name.value.trim()) {
                showFieldError(name, 'Please enter your name');
                isValid = false;
            } else if (name) {
                clearFieldError(name);
            }
            
            if (email && !isValidEmail(email.value.trim())) {
                showFieldError(email, 'Please enter a valid email address');
                isValid = false;
            } else if (email) {
                clearFieldError(email);
            }
            
            if (message && !message.value.trim()) {
                showFieldError(message, 'Please enter your message');
                isValid = false;
            } else if (message) {
                clearFieldError(message);
            }
            
            if (isValid) {
                // In a real application, this would submit the form to a server
                // For demo purposes, just show a success message and reset the form
                showAlert('Thank you for your feedback! We will get back to you soon.', 'success');
                this.reset();
            }
        });
    }
}

/**
 * Show field error message
 */
function showFieldError(field, message) {
    // Remove any existing error message
    clearFieldError(field);
    
    // Add error class to the field
    field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error message
 */
function clearFieldError(field) {
    // Remove error class from the field
    field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    
    // Remove any existing error message
    const errorDiv = field.parentNode.querySelector('.text-red-500');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 ${getAlertClass(type)}`;
    alertDiv.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${getAlertIcon(type)}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button type="button" class="alert-close">
                    <span class="sr-only">Close</span>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(alertDiv);
    
    // Add close button functionality
    alertDiv.querySelector('.alert-close').addEventListener('click', function() {
        alertDiv.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(alertDiv)) {
            alertDiv.remove();
        }
    }, 5000);
}

/**
 * Get alert class based on type
 */
function getAlertClass(type) {
    switch (type) {
        case 'success':
            return 'bg-green-50 text-green-800 border-l-4 border-green-500';
        case 'error':
            return 'bg-red-50 text-red-800 border-l-4 border-red-500';
        case 'warning':
            return 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500';
        default: // info
            return 'bg-blue-50 text-blue-800 border-l-4 border-blue-500';
    }
}

/**
 * Get alert icon based on type
 */
function getAlertIcon(type) {
    switch (type) {
        case 'success':
            return '<i class="fas fa-check-circle text-green-500"></i>';
        case 'error':
            return '<i class="fas fa-exclamation-circle text-red-500"></i>';
        case 'warning':
            return '<i class="fas fa-exclamation-triangle text-yellow-500"></i>';
        default: // info
            return '<i class="fas fa-info-circle text-blue-500"></i>';
    }
}

/**
 * 复制文本到剪贴板
 * @param {HTMLElement} element 包含要复制文本的元素
 */
function copyToClipboard(element) {
    // 获取要复制的文本（.copy-value 标签中的内容）
    const textToCopy = element.querySelector('.copy-value')?.textContent;
    if (!textToCopy) {
        console.error('没有找到要复制的文本');
        return;
    }
    
    // 使用 Clipboard API 复制文本
    navigator.clipboard.writeText(textToCopy).then(() => {
        // 显示复制成功的提示
        const tooltip = element.querySelector('.copy-tooltip');
        if (tooltip) {
            tooltip.textContent = '已复制！';
            tooltip.classList.remove('hidden');
            
            // 2秒后隐藏提示
            setTimeout(() => {
                tooltip.textContent = '点击复制';
                tooltip.classList.add('hidden');
            }, 2000);
        }
        
        // 显示 toast 提示
        showToast('复制成功！', 'success');
    }).catch(err => {
        console.error('复制失败:', err);
        showToast('复制失败，请重试', 'error');
    });
}

// 为所有可复制的元素添加鼠标悬停效果
document.addEventListener('DOMContentLoaded', function() {
    const copyableElements = document.querySelectorAll('[onclick="copyToClipboard(this)"]');
    
    copyableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.copy-tooltip');
            tooltip.classList.remove('hidden');
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.copy-tooltip');
            if (tooltip.textContent === '点击复制') {
                tooltip.classList.add('hidden');
            }
        });
    });
});

/**
 * 显示 Toast 提示
 * @param {string} message 提示信息
 * @param {string} type 提示类型 (success/error)
 */
function showToast(message, type = 'success') {
    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 transform transition-all duration-300 ease-in-out ${
        type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'
    }`;
    
    toast.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${type === 'success' ? 
                    '<i class="fas fa-check-circle text-green-500"></i>' : 
                    '<i class="fas fa-exclamation-circle text-red-500"></i>'
                }
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
        </div>
    `;
    
    // 添加到文档中
    document.body.appendChild(toast);
    
    // 添加动画效果
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 100);
    
    // 3秒后自动移除
    setTimeout(() => {
        toast.style.transform = 'translateY(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * 复制所有生成的信息到剪贴板
 */
function copyAllToClipboard() {
    const resultsContent = document.querySelector('.bg-gray-50');
    if (!resultsContent) {
        showToast('没有可复制的信息', 'error');
        return;
    }

    let formattedText = '';

    // 收集所有信息
    resultsContent.querySelectorAll('.cursor-pointer').forEach(item => {
        const labelElement = item.querySelector('.text-sm');
        const valueElement = item.querySelector('.copy-value');
        if (labelElement && valueElement && valueElement.textContent.trim()) {
            formattedText += `${labelElement.textContent}: ${valueElement.textContent}\n`;
        }
    });

    // 检查是否有内容可以复制
    if (!formattedText.trim()) {
        showToast('没有可复制的信息', 'error');
        return;
    }

    // 复制到剪贴板
    navigator.clipboard.writeText(formattedText).then(() => {
        showToast('所有信息已成功复制到剪贴板！', 'success');
    }).catch(err => {
        showToast('复制失败，请重试', 'error');
        console.error('复制失败:', err);
    });
}

/**
 * 生成更好的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 随机数
 */
function getBetterRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 从数组中获取随机元素
 * @param {Array} array 源数组
 * @returns {*} 随机元素
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * 生成模拟身份信息
 * @param {string} country 国家
 * @returns {Object} 身份信息
 */
function generateMockIdentity(country) {
    const names = {
        'us': {
            first: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
                   'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
                   'Emily', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Charlotte', 'Amelia', 'Harper'],
            last: ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
                  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson']
        },
        'uk': {
            first: ['Oliver', 'Jack', 'Harry', 'Jacob', 'Charlie', 'Thomas', 'George', 'Oscar', 'James', 'William',
                   'Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy', 'Ella', 'Lily',
                   'Sophia', 'Grace', 'Freya', 'Chloe', 'Daisy', 'Phoebe', 'Alice', 'Florence', 'Charlotte', 'Sienna'],
            last: ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
                  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright']
        },
        'hk': {
            first: ['Ming', 'Wei', 'Jian', 'Hui', 'Xin', 'Yan', 'Ling', 'Fang', 'Yu', 'Xiang',
                   'Li', 'Na', 'Mei', 'Ying', 'Jie', 'Xia', 'Hong', 'Zhen', 'Juan', 'Fei',
                   'Jing', 'Yan', 'Xiao', 'Min', 'Hua', 'Yun', 'Qing', 'Xiu', 'Ying', 'Yan'],
            last: ['Wong', 'Chan', 'Lam', 'Leung', 'Li', 'Ho', 'Ng', 'Cheung', 'Tang', 'Yuen',
                  'Lau', 'Yeung', 'Chow', 'Tsang', 'Wong', 'Chan', 'Lam', 'Leung', 'Li', 'Ho']
        }
    };

    const countryData = names[country.toLowerCase()] || names['us'];
    const firstName = getRandomElement(countryData.first);
    const lastName = getRandomElement(countryData.last);

    // 生成出生日期（18-70岁之间）
    const now = new Date();
    const birthYear = getBetterRandom(now.getFullYear() - 70, now.getFullYear() - 18);
    const birthMonth = getBetterRandom(1, 12);
    const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    const birthDay = getBetterRandom(1, daysInMonth);
    const dob = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;

    // 生成邮箱
    const emailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'protonmail.com', 'mail.com', 'aol.com', 'zoho.com', 'yandex.com'];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${getBetterRandom(1, 999)}@${getRandomElement(emailDomains)}`;

    // 生成电话号码
    let phoneNumber;
    switch (country.toLowerCase()) {
        case 'us':
            phoneNumber = `(${getBetterRandom(100, 999)}) ${getBetterRandom(100, 999)}-${getBetterRandom(1000, 9999)}`;
            break;
        case 'uk':
            phoneNumber = `+44 ${getBetterRandom(1000, 9999)} ${getBetterRandom(100000, 999999)}`;
            break;
        case 'hk':
            phoneNumber = `+852 ${getBetterRandom(1000, 9999)} ${getBetterRandom(1000, 9999)}`;
            break;
        default:
            phoneNumber = `+1 ${getBetterRandom(100, 999)}-${getBetterRandom(100, 999)}-${getBetterRandom(1000, 9999)}`;
    }

    return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        dateOfBirth: dob,
        age: now.getFullYear() - birthYear,
        phoneNumber,
        email
    };
}

/**
 * 生成模拟地址信息
 * @param {string} country 国家
 * @param {string} state 州/省
 * @param {string} city 城市
 * @returns {Object} 地址信息
 */
function generateMockAddress(country, state, city) {
    const streetNames = {
        'us': ['Main St', 'Oak Ave', 'Maple Dr', 'Washington Blvd', 'Lincoln Rd', 'Park Ave', 'Broadway', 'Market St', 'Lake Dr', 'River Rd',
               'Hill St', 'Valley Rd', 'Forest Ave', 'Spring St', 'Summer Dr', 'Winter Rd', 'Autumn Ave', 'Sunset Blvd', 'Sunrise Dr', 'Ocean Ave'],
        'uk': ['High St', 'Station Rd', 'London Rd', 'Church St', 'Victoria Rd', 'Park Lane', 'Oxford St', 'Regent St', 'Bond St', 'Baker St',
               'Abbey Rd', 'Kings Rd', 'Queens Rd', 'Castle St', 'Bridge St', 'Market St', 'Mill Lane', 'Church Rd', 'School Lane', 'Garden St'],
        'hk': ['Queen\'s Road Central', 'Des Voeux Road Central', 'Nathan Road', 'Hennessy Road', 'Connaught Road', 'Lockhart Road', 'Gloucester Road', 'Causeway Road', 'King\'s Road', 'Hennessy Road',
               'Jaffe Road', 'Lockhart Road', 'Fenwick Street', 'Percival Street', 'Hennessy Road', 'Gloucester Road', 'Canal Road', 'Hennessy Road', 'Lockhart Road', 'Fenwick Street']
    };

    const streetTypes = {
        'us': ['St', 'Ave', 'Dr', 'Blvd', 'Rd', 'Ln', 'Ct', 'Pl', 'Way', 'Ter'],
        'uk': ['St', 'Rd', 'Ln', 'Ave', 'Dr', 'Way', 'Pl', 'Ct', 'Ter', 'Cl'],
        'hk': ['Road', 'Street', 'Avenue', 'Lane', 'Court', 'Place', 'Terrace', 'Drive', 'Way', 'Close']
    };

    const countryData = {
        'us': {
            street: `${getBetterRandom(1, 9999)} ${getRandomElement(streetNames.us)}`,
            city: city === 'random' ? getRandomElement(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']) : city,
            state: state === 'random' ? getRandomElement(['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC']) : state,
            zipCode: `${getBetterRandom(10000, 99999)}`,
            country: 'United States'
        },
        'uk': {
            street: `${getBetterRandom(1, 999)} ${getRandomElement(streetNames.uk)}`,
            city: city === 'random' ? getRandomElement(['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Edinburgh', 'Bristol', 'Cardiff', 'Belfast', 'Leicester']) : city,
            county: getRandomElement(['Greater London', 'West Midlands', 'Greater Manchester', 'Merseyside', 'South Yorkshire', 'West Yorkshire', 'Tyne and Wear', 'Nottinghamshire', 'Bristol', 'Edinburgh']),
            postcode: `${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])}${getBetterRandom(10, 99)} ${getBetterRandom(1, 9)}${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])}${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])}`,
            country: 'United Kingdom'
        },
        'hk': {
            building: getRandomElement(['Central Plaza', 'Jardine House', 'Pacific Place', 'Times Square', 'IFC', 'The Center', 'Exchange Square', 'Landmark', 'Harbour City', 'Elements']),
            street: getRandomElement(streetNames.hk),
            district: getRandomElement(['Central', 'Wan Chai', 'Causeway Bay', 'Tsim Sha Tsui', 'Mong Kok', 'North Point', 'Quarry Bay', 'Tai Koo', 'Yau Ma Tei', 'Jordan']),
            region: getRandomElement(['Hong Kong Island', 'Kowloon', 'New Territories']),
            country: 'Hong Kong SAR'
        }
    };

    return countryData[country.toLowerCase()] || countryData['us'];
}

/**
 * 生成模拟信用卡信息
 * @param {string} country 国家
 * @returns {Object} 信用卡信息
 */
function generateMockCreditCard(country) {
    const cardTypes = [
        { name: 'Visa', prefix: '4', length: 16 },
        { name: 'MasterCard', prefix: '5', length: 16 },
        { name: 'American Express', prefix: '3', length: 15 },
        { name: 'Discover', prefix: '6', length: 16 },
        { name: 'JCB', prefix: '35', length: 16 },
        { name: 'Diners Club', prefix: '36', length: 14 }
    ];
    
    const cardType = getRandomElement(cardTypes);
    let cardNumber = cardType.prefix;
    
    // 生成卡号
    while (cardNumber.length < cardType.length) {
        cardNumber += Math.floor(Math.random() * 10);
    }
    
    // 格式化卡号
    let formattedCardNumber = '';
    for (let i = 0; i < cardNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedCardNumber += ' ';
        }
        formattedCardNumber += cardNumber[i];
    }
    
    // 生成过期日期（1-5年后）
    const now = new Date();
    const expiryYear = now.getFullYear() + getBetterRandom(1, 5);
    const expiryMonth = getBetterRandom(1, 12);
    const expiryDate = `${expiryMonth.toString().padStart(2, '0')}/${expiryYear.toString().slice(-2)}`;
    
    // 生成CVV
    const cvv = cardType.name === 'American Express' ? 
        getBetterRandom(1000, 9999).toString() : 
        getBetterRandom(100, 999).toString();
    
    // 生成持卡人姓名
    const identity = generateMockIdentity(country);
    
    return {
        cardType: cardType.name,
        cardNumber: formattedCardNumber,
        cardholderName: identity.fullName.toUpperCase(),
        expiryDate,
        cvv
    };
}