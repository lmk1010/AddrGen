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
 * Generate address and identity information based on selected country and types
 */
function generateInformation(country, state, city, infoTypes) {
    // 如果没有提供 infoTypes，则默认生成所有类型
    if (!infoTypes || infoTypes.length === 0) {
        infoTypes = ['address', 'identity', 'credit_card'];
    }
    
    // Show loading state
    const generateButton = document.getElementById('generate-btn');
    if (generateButton) {
        const originalButtonText = generateButton.innerHTML;
        generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateButton.disabled = true;
    }
    
    // 处理随机州/省和城市
    if (state === 'random') {
        const stateData = getStateData(country);
        const randomState = getRandomElement(stateData);
        state = randomState.code;
    }
    
    if (city === 'random') {
        const cityData = getCityData(country, state);
        city = getRandomElement(cityData);
    }
    
    // In a real application, this would make an API call to a backend service
    // For demo purposes, we'll simulate an API call with setTimeout and generate mock data
    setTimeout(() => {
        // Reset button state
        if (generateButton) {
            generateButton.innerHTML = '<i class="fas fa-magic mr-2"></i> <span data-i18n="generator.button">Generate Information</span>';
            generateButton.disabled = false;
        }
        
        // Generate mock data based on country and info types
        const results = {};
        
        if (infoTypes.includes('address')) {
            results.address = generateMockAddress(country, state, city);
        }
        
        if (infoTypes.includes('identity')) {
            results.identity = generateMockIdentity(country);
        }
        
        if (infoTypes.includes('credit_card')) {
            results.creditCard = generateMockCreditCard(country);
        }
        
        // Display the results
        displayResults(results);
        
        // Show success message
        showAlert('Information generated successfully!', 'success');
        
    }, 1500); // Simulate API delay
}

/**
 * 获取州/省数据
 */
function getStateData(country) {
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
    
    return stateData[country.toLowerCase()] || stateData['us'];
}

/**
 * 获取城市数据
 */
function getCityData(country, state) {
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
    
    // 如果选择了随机州/省，则返回所有城市
    if (state === 'random') {
        const allCities = [];
        if (cityData[country]) {
            Object.values(cityData[country]).forEach(cities => {
                allCities.push(...cities);
            });
        }
        return allCities;
    }
    
    return cityData[country.toLowerCase()]?.[state] || [];
}

/**
 * Generate mock address data based on country
 */
function generateMockAddress(country, state, city) {
    const addresses = {
        'us': {
            street: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement([
                'Main Street', 'Oak Avenue', 'Maple Drive', 'Washington Boulevard', 'Lincoln Road',
                'Jefferson Street', 'Park Avenue', 'Broadway', 'Sunset Boulevard', 'Wilshire Boulevard'
            ])}`,
            city: city || getRandomElement([
                'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
                'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
            ]),
            state: state || getRandomElement([
                'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'MI', 'GA'
            ]),
            zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
            country: 'United States'
        },
        'uk': {
            street: `${Math.floor(Math.random() * 999) + 1} ${getRandomElement([
                'High Street', 'Station Road', 'London Road', 'Church Street', 'Victoria Road',
                'Green Lane', 'Manor Road', 'Church Lane', 'Park Road', 'Queen Street'
            ])}`,
            city: city || getRandomElement([
                'London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool',
                'Bristol', 'Edinburgh', 'Leeds', 'Sheffield', 'Cardiff'
            ]),
            county: getRandomElement([
                'Greater London', 'West Midlands', 'Greater Manchester', 'Merseyside', 'South Yorkshire',
                'West Yorkshire', 'Tyne and Wear', 'Essex', 'Kent', 'Lancashire'
            ]),
            postcode: `${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 9) + 1}${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}`,
            country: 'United Kingdom'
        },
        'hk': {
            building: `${getRandomElement([
                'Central Plaza', 'Jardine House', 'Pacific Place', 'Times Square', 'IFC',
                'Landmark', 'Exchange Square', 'Admiralty Centre', 'Lippo Centre', 'Ocean Centre'
            ])}`,
            street: getRandomElement([
                'Queen\'s Road Central', 'Des Voeux Road Central', 'Nathan Road', 'Hennessy Road', 'Connaught Road',
                'Canton Road', 'Gloucester Road', 'Argyle Street', 'Mong Kok Road', 'Tsim Sha Tsui East'
            ]),
            district: getRandomElement([
                'Central', 'Wan Chai', 'Causeway Bay', 'Tsim Sha Tsui', 'Mong Kok',
                'Yau Ma Tei', 'North Point', 'Quarry Bay', 'Tai Koo', 'Kennedy Town'
            ]),
            region: getRandomElement(['Hong Kong Island', 'Kowloon', 'New Territories']),
            country: 'Hong Kong SAR'
        }
    };
    
    return addresses[country.toLowerCase()] || addresses['us'];
}

/**
 * 生成更好的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 随机数
 */
function getBetterRandom(min, max) {
    // 使用多个随机源来增加随机性
    const timestamp = new Date().getTime();
    const random1 = Math.random();
    const random2 = Math.random();
    const random3 = Math.random();
    
    // 组合多个随机源
    const combinedRandom = (timestamp * random1 * random2 * random3) % (max - min + 1);
    
    // 确保结果在范围内
    return Math.floor(combinedRandom) + min;
}

/**
 * 从数组中获取随机元素，确保更好的随机性
 * @param {Array} array 源数组
 * @returns {*} 随机元素
 */
function getRandomElement(array) {
    // 使用多个随机源来增加随机性
    const timestamp = new Date().getTime();
    const random1 = Math.random();
    const random2 = Math.random();
    const random3 = Math.random();
    
    // 组合多个随机源
    const combinedRandom = (timestamp * random1 * random2 * random3) % array.length;
    
    // 确保结果在范围内
    return array[Math.floor(combinedRandom)];
}

/**
 * Generate mock identity data based on country
 */
function generateMockIdentity(country) {
    // 扩展的名字数据库
    const names = {
        'us': {
            first: [
                // 男性名字
                'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
                'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth',
                'Joshua', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
                // 女性名字
                'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
                'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle',
                'Dorothy', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia'
            ],
            last: [
                'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
                'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
                'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King',
                'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter'
            ]
        },
        'uk': {
            first: [
                // 男性名字
                'Oliver', 'Jack', 'Harry', 'Jacob', 'Charlie', 'Thomas', 'George', 'Oscar', 'James', 'William',
                'Noah', 'Leo', 'Arthur', 'Muhammad', 'Henry', 'Theo', 'Finley', 'Archie', 'Alfie', 'Logan',
                // 女性名字
                'Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy', 'Ella', 'Lily',
                'Sophia', 'Grace', 'Freya', 'Charlotte', 'Aurora', 'Violet', 'Daisy', 'Alice', 'Florence', 'Sienna'
            ],
            last: [
                'Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
                'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright',
                'Green', 'Harris', 'Cooper', 'King', 'Lee', 'Martin', 'Clarke', 'James', 'Morgan', 'Hughes'
            ]
        },
        'hk': {
            first: [
                // 男性名字
                'Ming', 'Wei', 'Jian', 'Hui', 'Xin', 'Yan', 'Ling', 'Fang', 'Yu', 'Xiang',
                'Jun', 'Tao', 'Kai', 'Long', 'Feng', 'Lei', 'Yang', 'Bin', 'Peng', 'Jie',
                // 女性名字
                'Li', 'Na', 'Mei', 'Ying', 'Jie', 'Xia', 'Hong', 'Zhen', 'Juan', 'Fei',
                'Yan', 'Hui', 'Xia', 'Jing', 'Min', 'Ying', 'Xiu', 'Fang', 'Yan', 'Hui'
            ],
            last: [
                'Wong', 'Chan', 'Lam', 'Leung', 'Li', 'Ho', 'Ng', 'Cheung', 'Tang', 'Yuen',
                'Cheng', 'Lau', 'Kwok', 'Chow', 'Yip', 'Tsang', 'Pang', 'Luk', 'Yau', 'Hui',
                'Lee', 'Yeung', 'Wong', 'Chan', 'Lam', 'Leung', 'Li', 'Ho', 'Ng', 'Cheung'
            ]
        }
    };

    // 获取随机名字，确保每次都是新的随机选择
    const firstName = getRandomElement(names[country.toLowerCase()]?.first || names['us'].first);
    const lastName = getRandomElement(names[country.toLowerCase()]?.last || names['us'].last);

    // 添加调试信息
    console.log('生成身份信息:', {
        country,
        firstName,
        lastName,
        randomIndex1: Math.random(),
        randomIndex2: Math.random(),
        timestamp: new Date().getTime()
    });

    // 生成更真实的出生日期（18-70岁之间）
    const now = new Date();
    const minAge = 18;
    const maxAge = 70;
    const minYear = now.getFullYear() - maxAge;
    const maxYear = now.getFullYear() - minAge;
    const birthYear = getBetterRandom(minYear, maxYear);
    const birthMonth = getBetterRandom(1, 12);
    const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    const birthDay = getBetterRandom(1, daysInMonth);
    const dob = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;

    // 生成更真实的邮箱地址
    const emailDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
        'aol.com', 'protonmail.com', 'mail.com', 'zoho.com', 'yandex.com'
    ];
    const emailPrefixes = [
        firstName.toLowerCase(),
        lastName.toLowerCase(),
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}${getBetterRandom(100, 999)}`,
        `${lastName.toLowerCase()}${getBetterRandom(100, 999)}`
    ];
    const email = `${getRandomElement(emailPrefixes)}@${getRandomElement(emailDomains)}`;

    // 生成更真实的电话号码
    let phoneNumber;
    switch (country.toLowerCase()) {
        case 'us':
            // 美国区号列表
            const areaCodes = ['212', '213', '312', '323', '415', '516', '617', '646', '718', '917'];
            const areaCode = getRandomElement(areaCodes);
            phoneNumber = `(${areaCode}) ${getBetterRandom(100, 999)}-${getBetterRandom(1000, 9999)}`;
            break;
        case 'uk':
            // 英国区号列表
            const ukAreaCodes = ['20', '29', '113', '114', '115', '116', '117', '118', '121', '131'];
            const ukAreaCode = getRandomElement(ukAreaCodes);
            phoneNumber = `+44 ${ukAreaCode} ${getBetterRandom(1000, 9999)} ${getBetterRandom(1000, 9999)}`;
            break;
        case 'hk':
            // 香港手机号格式
            phoneNumber = `+852 ${getBetterRandom(1000, 9999)} ${getBetterRandom(1000, 9999)}`;
            break;
        default:
            phoneNumber = `+1 ${getBetterRandom(100, 999)}-${getBetterRandom(100, 999)}-${getBetterRandom(1000, 9999)}`;
    }

    // 生成ID号码
    let idNumber;
    switch (country.toLowerCase()) {
        case 'us':
            // 美国社会安全号码格式：XXX-XX-XXXX
            idNumber = `${getBetterRandom(100, 999)}-${getBetterRandom(10, 99)}-${getBetterRandom(1000, 9999)}`;
            break;
        case 'uk':
            // 英国国民保险号码格式：AA 12 34 56 A
            const validPrefixes = ['A', 'B', 'C', 'E', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'];
            idNumber = `${getRandomElement(validPrefixes)}${getRandomElement(validPrefixes)} ${getBetterRandom(10, 99)} ${getBetterRandom(10, 99)} ${getBetterRandom(10, 99)} ${getRandomElement(['A', 'B', 'C', 'D'])}`;
            break;
        case 'hk':
            // 香港身份证格式：X123456(A)
            idNumber = `${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}${getBetterRandom(100000, 999999)}(${getBetterRandom(0, 9)})`;
            break;
        default:
            idNumber = `ID-${getBetterRandom(1000000, 9999999)}`;
    }

    return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        dateOfBirth: dob,
        age: now.getFullYear() - birthYear,
        idNumber,
        phoneNumber,
        email
    };
}

/**
 * Generate mock credit card data based on country
 */
function generateMockCreditCard(country) {
    // Credit card types and their starting digits
    const cardTypes = [
        { name: 'Visa', prefix: '4', length: 16 },
        { name: 'MasterCard', prefix: '5', length: 16 },
        { name: 'American Express', prefix: '3', length: 15 },
        { name: 'Discover', prefix: '6', length: 16 }
    ];
    
    // Select a random card type
    const cardType = getRandomElement(cardTypes);
    
    // Generate card number
    let cardNumber = cardType.prefix;
    for (let i = cardType.prefix.length; i < cardType.length; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }
    
    // Format card number for display
    let formattedCardNumber = '';
    for (let i = 0; i < cardNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedCardNumber += ' ';
        }
        formattedCardNumber += cardNumber[i];
    }
    
    // Generate expiry date (between 1 and 5 years from now)
    const now = new Date();
    const expiryYear = now.getFullYear() + Math.floor(Math.random() * 5) + 1;
    const expiryMonth = Math.floor(Math.random() * 12) + 1;
    const expiryDate = `${expiryMonth.toString().padStart(2, '0')}/${expiryYear.toString().slice(-2)}`;
    
    // Generate CVV
    const cvv = cardType.name === 'American Express' ? 
        Math.floor(Math.random() * 9000) + 1000 : // 4 digits for Amex
        Math.floor(Math.random() * 900) + 100;    // 3 digits for others
    
    // Generate cardholder name based on identity
    const identity = generateMockIdentity(country);
    const cardholderName = identity.fullName.toUpperCase();
    
    return {
        cardType: cardType.name,
        cardNumber: formattedCardNumber,
        cardholderName,
        expiryDate,
        cvv: cvv.toString()
    };
}

/**
 * Display the generated results in the results section
 */
function displayResults(results) {
    const resultsSection = document.getElementById('results');
    
    if (!resultsSection) return;
    
    // 显示结果部分
    resultsSection.classList.remove('hidden');
    
    // 获取结果内容区域
    const resultsContent = resultsSection.querySelector('.bg-gray-50');
    if (!resultsContent) return;
    
    // 清除之前的结果
    resultsContent.innerHTML = '';
    
    // 创建两列布局容器
    const twoColumnContainer = document.createElement('div');
    twoColumnContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-8';
    
    // 左侧列 - 地址信息
    const leftColumn = document.createElement('div');
    if (results.address) {
        leftColumn.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-map-marker-alt text-indigo-600 mr-2"></i>
                    <span data-i18n="generator.results.addressInfo">Address Information</span>
                </h3>
                <div class="space-y-4">
                    ${formatAddressForDisplay(results.address)}
                </div>
            </div>
        `;
    }
    
    // 右侧列 - 基本信息
    const rightColumn = document.createElement('div');
    if (results.identity) {
        rightColumn.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-user-circle text-indigo-600 mr-2"></i>
                    <span data-i18n="generator.results.basicInfo">Basic Information</span>
                </h3>
                <div class="space-y-4">
                    ${formatIdentityForDisplay(results.identity)}
                </div>
            </div>
        `;
    }
    
    // 将两列添加到容器中
    twoColumnContainer.appendChild(leftColumn);
    twoColumnContainer.appendChild(rightColumn);
    
    // 将容器添加到结果内容区域
    resultsContent.appendChild(twoColumnContainer);
    
    // 如果有信用卡信息，添加到底部
    if (results.creditCard) {
        const creditCardDiv = document.createElement('div');
        creditCardDiv.className = 'mt-8';
        creditCardDiv.innerHTML = `
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-credit-card text-indigo-600 mr-2"></i>
                    <span data-i18n="generator.results.creditCardInfo">Credit Card Information</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${formatCreditCardForDisplay(results.creditCard)}
                </div>
            </div>
        `;
        resultsContent.appendChild(creditCardDiv);
    }

    // 更新新添加元素的国际化文本
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            element.textContent = i18next.t(key);
        }
    });
}

/**
 * Format identity information for display
 */
function formatIdentityForDisplay(identity) {
    return `
        <dl class="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Full Name</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${identity.fullName}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${identity.dateOfBirth} (Age: ${identity.age})</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">ID Number</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${identity.idNumber}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${identity.phoneNumber}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md sm:col-span-2" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${identity.email}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
        </dl>
    `;
}

/**
 * Format address information for display
 */
function formatAddressForDisplay(address) {
    let html = '<dl class="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">';
    
    // 美国地址
    if (address.country === 'United States') {
        html += `
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md sm:col-span-2" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Street Address</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.street}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">City</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.city}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">State</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.state}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">ZIP Code</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.zipCode}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Country</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.country}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
        `;
    }
    // 英国地址
    else if (address.country === 'United Kingdom') {
        html += `
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md sm:col-span-2" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Street Address</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.street}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">City</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.city}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">County</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.county}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Postcode</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.postcode}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Country</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.country}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
        `;
    }
    // 香港地址
    else if (address.country === 'Hong Kong SAR') {
        html += `
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md sm:col-span-2" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Building</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.building}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md sm:col-span-2" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Street</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.street}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">District</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.district}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Region</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.region}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Country/Region</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${address.country}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
        `;
    }
    
    html += '</dl>';
    return html;
}

/**
 * Format credit card information for display
 */
function formatCreditCardForDisplay(creditCard) {
    return `
        <dl class="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Card Type</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${creditCard.cardType}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Card Number</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${creditCard.cardNumber}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Cardholder Name</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${creditCard.cardholderName}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">Expiry Date</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${creditCard.expiryDate}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
            <div class="cursor-pointer group hover:bg-white p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md" onclick="copyToClipboard(this)">
                <dt class="text-sm font-medium text-gray-500">CVV</dt>
                <dd class="mt-1 text-sm text-gray-900 group-hover:text-indigo-600">${creditCard.cvv}</dd>
                <div class="copy-tooltip hidden absolute bg-gray-900 text-white px-2 py-1 rounded text-sm">点击复制</div>
            </div>
        </dl>
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
    // 获取要复制的文本（dd 标签中的内容）
    const textToCopy = element.querySelector('dd').textContent;
    
    // 使用 Clipboard API 复制文本
    navigator.clipboard.writeText(textToCopy).then(() => {
        // 显示复制成功的提示
        const tooltip = element.querySelector('.copy-tooltip');
        tooltip.textContent = '已复制！';
        tooltip.classList.remove('hidden');
        
        // 2秒后隐藏提示
        setTimeout(() => {
            tooltip.textContent = '点击复制';
            tooltip.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
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

    // 收集基本信息
    const basicInfoSection = resultsContent.querySelector('.space-y-4:first-child');
    if (basicInfoSection) {
        formattedText += '=== 基本信息 ===\n';
        basicInfoSection.querySelectorAll('.cursor-pointer').forEach(item => {
            const labelElement = item.querySelector('.text-sm');
            const valueElement = item.querySelector('.text-lg');
            if (labelElement && valueElement && valueElement.textContent.trim()) {
                formattedText += `${labelElement.textContent}: ${valueElement.textContent}\n`;
            }
        });
        formattedText += '\n';
    }

    // 收集地址信息
    const addressSection = resultsContent.querySelector('.space-y-4:nth-child(2)');
    if (addressSection) {
        formattedText += '=== 地址信息 ===\n';
        addressSection.querySelectorAll('.cursor-pointer').forEach(item => {
            const labelElement = item.querySelector('.text-sm');
            const valueElement = item.querySelector('.text-lg');
            if (labelElement && valueElement && valueElement.textContent.trim()) {
                formattedText += `${labelElement.textContent}: ${valueElement.textContent}\n`;
            }
        });
        formattedText += '\n';
    }

    // 收集信用卡信息
    const creditCardSection = resultsContent.querySelector('.space-y-4:nth-child(3)');
    if (creditCardSection) {
        formattedText += '=== 信用卡信息 ===\n';
        creditCardSection.querySelectorAll('.cursor-pointer').forEach(item => {
            const labelElement = item.querySelector('.text-sm');
            const valueElement = item.querySelector('.text-lg');
            if (labelElement && valueElement && valueElement.textContent.trim()) {
                formattedText += `${labelElement.textContent}: ${valueElement.textContent}\n`;
            }
        });
    }

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