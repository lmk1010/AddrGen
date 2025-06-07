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
    // Store translations for different languages
    const translations = {
        'en': {
            // English translations (default)
        },
        'zh-CN': {
            // Simplified Chinese translations
        },
        'zh-TW': {
            // Traditional Chinese translations
        }
    };
    
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
        localStorage.setItem('preferred_language', lang);
        
        // In a real implementation, this would update all text elements with translations
        // For now, we'll just log the change
        
        // Example of how to implement language switching:
        // document.querySelectorAll('[data-i18n]').forEach(element => {
        //     const key = element.getAttribute('data-i18n');
        //     if (translations[lang] && translations[lang][key]) {
        //         element.textContent = translations[lang][key];
        //     }
        // });
    };
    
    // Check for saved language preference and apply it
    const savedLanguage = localStorage.getItem('preferred_language');
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
    
    if (generatorForm) {
        generatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const country = document.getElementById('country').value;
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
            generateInformation(country, infoTypes);
        });
    }
}

/**
 * Generate address and identity information based on selected country and types
 */
function generateInformation(country, infoTypes) {
    // Show loading state
    const generateButton = document.querySelector('#generator-form button[type="submit"]');
    const originalButtonText = generateButton.innerHTML;
    generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateButton.disabled = true;
    
    // In a real application, this would make an API call to a backend service
    // For demo purposes, we'll simulate an API call with setTimeout and generate mock data
    setTimeout(() => {
        // Reset button state
        generateButton.innerHTML = originalButtonText;
        generateButton.disabled = false;
        
        // Generate mock data based on country and info types
        const results = {};
        
        if (infoTypes.includes('address')) {
            results.address = generateMockAddress(country);
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
 * Generate mock address data based on country
 */
function generateMockAddress(country) {
    const addresses = {
        'us': {
            street: `${Math.floor(Math.random() * 9999) + 1} ${getRandomElement([
                'Main Street', 'Oak Avenue', 'Maple Drive', 'Washington Boulevard', 'Lincoln Road',
                'Jefferson Street', 'Park Avenue', 'Broadway', 'Sunset Boulevard', 'Wilshire Boulevard'
            ])}`,
            city: getRandomElement([
                'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
                'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
            ]),
            state: getRandomElement([
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
            city: getRandomElement([
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
 * Generate mock identity data based on country
 */
function generateMockIdentity(country) {
    // Common first and last names for different countries
    const names = {
        'us': {
            first: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
                   'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
            last: ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
                  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson']
        },
        'uk': {
            first: ['Oliver', 'Jack', 'Harry', 'Jacob', 'Charlie', 'Thomas', 'George', 'Oscar', 'James', 'William',
                   'Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy', 'Ella', 'Lily'],
            last: ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas', 'Roberts',
                  'Johnson', 'Lewis', 'Walker', 'Robinson', 'Wood', 'Thompson', 'White', 'Watson', 'Jackson', 'Wright']
        },
        'hk': {
            first: ['Ming', 'Wei', 'Jian', 'Hui', 'Xin', 'Yan', 'Ling', 'Fang', 'Yu', 'Xiang',
                   'Li', 'Na', 'Mei', 'Ying', 'Jie', 'Xia', 'Hong', 'Zhen', 'Juan', 'Fei'],
            last: ['Wong', 'Chan', 'Lam', 'Leung', 'Li', 'Ho', 'Ng', 'Cheung', 'Tang', 'Yuen',
                  'Cheng', 'Lau', 'Kwok', 'Chow', 'Yip', 'Tsang', 'Pang', 'Luk', 'Yau', 'Hui']
        }
    };
    
    // Get random first and last name based on country
    const firstName = getRandomElement(names[country.toLowerCase()]?.first || names['us'].first);
    const lastName = getRandomElement(names[country.toLowerCase()]?.last || names['us'].last);
    
    // Generate random date of birth (between 18 and 70 years ago)
    const now = new Date();
    const minAge = 18;
    const maxAge = 70;
    const minYear = now.getFullYear() - maxAge;
    const maxYear = now.getFullYear() - minAge;
    const birthYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1; // Using 28 to avoid invalid dates
    const dob = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
    
    // Generate ID number based on country
    let idNumber;
    switch (country.toLowerCase()) {
        case 'us':
            // US Social Security Number format: XXX-XX-XXXX
            idNumber = `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`;
            break;
        case 'uk':
            // UK National Insurance Number format: AA 12 34 56 A
            idNumber = `${getRandomElement(['A', 'B', 'C', 'E', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'])}${getRandomElement(['A', 'B', 'C', 'E', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'])} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${getRandomElement(['A', 'B', 'C', 'D'])}`;
            break;
        case 'hk':
            // Hong Kong ID Card format: X123456(A)
            idNumber = `${getRandomElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'])}${Math.floor(Math.random() * 900000) + 100000}(${Math.floor(Math.random() * 9)})`;
            break;
        default:
            idNumber = `ID-${Math.floor(Math.random() * 9000000) + 1000000}`;
    }
    
    // Generate phone number based on country
    let phoneNumber;
    switch (country.toLowerCase()) {
        case 'us':
            // US phone number format: (XXX) XXX-XXXX
            phoneNumber = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
            break;
        case 'uk':
            // UK phone number format: +44 XXXX XXXXXX
            phoneNumber = `+44 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 900000) + 100000}`;
            break;
        case 'hk':
            // Hong Kong phone number format: +852 XXXX XXXX
            phoneNumber = `+852 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`;
            break;
        default:
            phoneNumber = `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    }
    
    return {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        dateOfBirth: dob,
        age: now.getFullYear() - birthYear,
        idNumber,
        phoneNumber,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`
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
    const resultsSection = document.getElementById('results-section');
    const resultsContent = document.getElementById('results-content');
    
    if (!resultsSection || !resultsContent) return;
    
    // Clear previous results
    resultsContent.innerHTML = '';
    
    // Show the results section
    resultsSection.classList.remove('hidden');
    
    // Add address information if available
    if (results.address) {
        const addressDiv = document.createElement('div');
        addressDiv.className = 'mb-6';
        addressDiv.innerHTML = `
            <h3 class="text-lg font-medium text-gray-900 mb-3">Address Information</h3>
            <div class="bg-gray-50 rounded-lg p-4 relative">
                <button class="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 copy-button" data-copy="address">
                    <i class="fas fa-copy"></i>
                </button>
                <div id="address-content">
                    ${formatAddressForDisplay(results.address)}
                </div>
            </div>
        `;
        resultsContent.appendChild(addressDiv);
    }
    
    // Add identity information if available
    if (results.identity) {
        const identityDiv = document.createElement('div');
        identityDiv.className = 'mb-6';
        identityDiv.innerHTML = `
            <h3 class="text-lg font-medium text-gray-900 mb-3">Identity Information</h3>
            <div class="bg-gray-50 rounded-lg p-4 relative">
                <button class="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 copy-button" data-copy="identity">
                    <i class="fas fa-copy"></i>
                </button>
                <div id="identity-content">
                    ${formatIdentityForDisplay(results.identity)}
                </div>
            </div>
        `;
        resultsContent.appendChild(identityDiv);
    }
    
    // Add credit card information if available
    if (results.creditCard) {
        const creditCardDiv = document.createElement('div');
        creditCardDiv.className = 'mb-6';
        creditCardDiv.innerHTML = `
            <h3 class="text-lg font-medium text-gray-900 mb-3">Credit Card Information</h3>
            <div class="bg-gray-50 rounded-lg p-4 relative">
                <button class="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 copy-button" data-copy="credit-card">
                    <i class="fas fa-copy"></i>
                </button>
                <div id="credit-card-content">
                    ${formatCreditCardForDisplay(results.creditCard)}
                </div>
            </div>
        `;
        resultsContent.appendChild(creditCardDiv);
    }
    
    // Initialize copy buttons for the new results
    initCopyButtons();
    
    // Scroll to results section
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Format address information for display
 */
function formatAddressForDisplay(address) {
    let html = '<dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">';
    
    // US Address
    if (address.country === 'United States') {
        html += `
            <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Street</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.street}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">City</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.city}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">State</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.state}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">ZIP Code</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.zipCode}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Country</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.country}</dd>
            </div>
        `;
    }
    // UK Address
    else if (address.country === 'United Kingdom') {
        html += `
            <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Street</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.street}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">City</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.city}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">County</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.county}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Postcode</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.postcode}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Country</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.country}</dd>
            </div>
        `;
    }
    // Hong Kong Address
    else if (address.country === 'Hong Kong SAR') {
        html += `
            <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Building</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.building}</dd>
            </div>
            <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Street</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.street}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">District</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.district}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Region</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.region}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Country</dt>
                <dd class="mt-1 text-sm text-gray-900">${address.country}</dd>
            </div>
        `;
    }
    // Generic Address
    else {
        for (const [key, value] of Object.entries(address)) {
            html += `
                <div>
                    <dt class="text-sm font-medium text-gray-500">${key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd class="mt-1 text-sm text-gray-900">${value}</dd>
                </div>
            `;
        }
    }
    
    html += '</dl>';
    return html;
}

/**
 * Format identity information for display
 */
function formatIdentityForDisplay(identity) {
    return `
        <dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div>
                <dt class="text-sm font-medium text-gray-500">Full Name</dt>
                <dd class="mt-1 text-sm text-gray-900">${identity.fullName}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd class="mt-1 text-sm text-gray-900">${identity.dateOfBirth} (Age: ${identity.age})</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">ID Number</dt>
                <dd class="mt-1 text-sm text-gray-900">${identity.idNumber}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd class="mt-1 text-sm text-gray-900">${identity.phoneNumber}</dd>
            </div>
            <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900">${identity.email}</dd>
            </div>
        </dl>
    `;
}

/**
 * Format credit card information for display
 */
function formatCreditCardForDisplay(creditCard) {
    return `
        <dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div>
                <dt class="text-sm font-medium text-gray-500">Card Type</dt>
                <dd class="mt-1 text-sm text-gray-900">${creditCard.cardType}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Card Number</dt>
                <dd class="mt-1 text-sm text-gray-900">${creditCard.cardNumber}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Cardholder Name</dt>
                <dd class="mt-1 text-sm text-gray-900">${creditCard.cardholderName}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">Expiry Date</dt>
                <dd class="mt-1 text-sm text-gray-900">${creditCard.expiryDate}</dd>
            </div>
            <div>
                <dt class="text-sm font-medium text-gray-500">CVV</dt>
                <dd class="mt-1 text-sm text-gray-900">${creditCard.cvv}</dd>
            </div>
        </dl>
    `;
}

/**
 * Initialize copy buttons functionality
 */
function initCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-copy');
            let content = '';
            
            if (type === 'address') {
                content = document.getElementById('address-content').innerText;
            } else if (type === 'identity') {
                content = document.getElementById('identity-content').innerText;
            } else if (type === 'credit-card') {
                content = document.getElementById('credit-card-content').innerText;
            }
            
            // Copy to clipboard
            navigator.clipboard.writeText(content).then(() => {
                // Show success message
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('text-green-500');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('text-green-500');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showAlert('Failed to copy to clipboard', 'error');
            });
        });
    });
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
 * Get a random element from an array
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}