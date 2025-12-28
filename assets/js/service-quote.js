// Service Quote Calculator for Ozone Service Solutions

class ServiceQuote {
    constructor() {
        this.services = {
            'document-assistance': {
                basePrice: 500,
                options: {
                    'passport': { price: 1000, time: '3-5 days' },
                    'aadhaar': { price: 300, time: '2-3 days' },
                    'pan-card': { price: 200, time: '1-2 days' },
                    'driving-license': { price: 800, time: '5-7 days' }
                }
            },
            'company-registration': {
                basePrice: 5000,
                options: {
                    'msme': { price: 3000, time: '7-10 days' },
                    'llp': { price: 8000, time: '10-15 days' },
                    'private-limited': { price: 12000, time: '15-20 days' },
                    'one-person': { price: 6000, time: '8-12 days' }
                }
            },
            'gst-tax-filing': {
                basePrice: 2000,
                options: {
                    'gst-registration': { price: 1500, time: '3-5 days' },
                    'gst-filing': { price: 1000, time: 'Monthly' },
                    'income-tax': { price: 2500, time: 'Yearly' },
                    'tax-planning': { price: 5000, time: 'Consultation' }
                }
            },
            'passport-visa': {
                basePrice: 1500,
                options: {
                    'fresh-passport': { price: 2000, time: '10-15 days' },
                    'renewal': { price: 1500, time: '7-10 days' },
                    'usa-visa': { price: 5000, time: '15-20 days' },
                    'schengen-visa': { price: 4000, time: '10-15 days' }
                }
            },
            'financial-assistance': {
                basePrice: 1000,
                options: {
                    'bank-account': { price: 500, time: '2-3 days' },
                    'loan-processing': { price: 3000, time: '7-14 days' },
                    'insurance': { price: 1500, time: '3-5 days' },
                    'investment': { price: 4000, time: 'Consultation' }
                }
            },
            'travel-assistance': {
                basePrice: 500,
                options: {
                    'flight-booking': { price: 300, time: 'Immediate' },
                    'hotel-booking': { price: 200, time: 'Immediate' },
                    'tour-package': { price: 2000, time: 'Planning' },
                    'visa-assistance': { price: 3000, time: '10-15 days' }
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupQuoteCalculator();
        this.setupServiceSelector();
        this.setupWhatsAppIntegration();
        this.setupFormValidation();
    }
    
    setupQuoteCalculator() {
        const calculator = document.getElementById('quoteCalculator');
        if (!calculator) return;
        
        // Service selection
        const serviceSelect = calculator.querySelector('#serviceType');
        const optionsContainer = calculator.querySelector('#serviceOptions');
        const quoteResult = calculator.querySelector('#quoteResult');
        
        if (serviceSelect && optionsContainer) {
            serviceSelect.addEventListener('change', (e) => {
                this.updateServiceOptions(e.target.value, optionsContainer);
            });
            
            // Initial update
            this.updateServiceOptions(serviceSelect.value, optionsContainer);
        }
        
        // Calculate button
        const calculateBtn = calculator.querySelector('#calculateQuote');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateQuote(calculator, quoteResult);
            });
        }
        
        // Reset button
        const resetBtn = calculator.querySelector('#resetQuote');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetCalculator(calculator, quoteResult);
            });
        }
    }
    
    updateServiceOptions(serviceType, container) {
        if (!container) return;
        
        const service = this.services[serviceType];
        if (!service) {
            container.innerHTML = '<p>Please select a service</p>';
            return;
        }
        
        let html = '<div class="service-options-grid">';
        
        for (const [optionKey, option] of Object.entries(service.options)) {
            const optionName = this.formatOptionName(optionKey);
            
            html += `
                <div class="option-card">
                    <label class="option-select">
                        <input type="checkbox" name="serviceOptions" value="${optionKey}" data-price="${option.price}">
                        <div class="option-content">
                            <h4>${optionName}</h4>
                            <p class="option-price">₹${option.price}</p>
                            <p class="option-time">${option.time}</p>
                        </div>
                    </label>
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add event listeners to checkboxes
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateTotalPrice(container);
            });
        });
    }
    
    formatOptionName(key) {
        return key.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    updateTotalPrice(container) {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]:checked');
        let total = 0;
        
        checkboxes.forEach(checkbox => {
            total += parseInt(checkbox.dataset.price) || 0;
        });
        
        // Update display
        const totalElement = container.querySelector('.total-price') || 
                            document.querySelector('#totalPrice');
        
        if (totalElement) {
            totalElement.textContent = `₹${total}`;
        }
    }
    
    calculateQuote(calculator, resultContainer) {
        if (!calculator || !resultContainer) return;
        
        // Get selected service
        const serviceSelect = calculator.querySelector('#serviceType');
        const serviceType = serviceSelect.value;
        const service = this.services[serviceType];
        
        if (!service) {
            resultContainer.innerHTML = '<p class="error">Please select a service</p>';
            return;
        }
        
        // Get selected options
        const checkboxes = calculator.querySelectorAll('input[name="serviceOptions"]:checked');
        if (checkboxes.length === 0) {
            resultContainer.innerHTML = '<p class="error">Please select at least one option</p>';
            return;
        }
        
        // Calculate total
        let total = service.basePrice;
        let selectedOptions = [];
        
        checkboxes.forEach(checkbox => {
            const optionKey = checkbox.value;
            const option = service.options[optionKey];
            if (option) {
                total += option.price;
                selectedOptions.push({
                    name: this.formatOptionName(optionKey),
                    price: option.price,
                    time: option.time
                });
            }
        });
        
        // Display result
        this.displayQuoteResult(resultContainer, serviceType, total, selectedOptions);
    }
    
    displayQuoteResult(container, serviceType, total, options) {
        const serviceName = this.formatOptionName(serviceType);
        
        let html = `
            <div class="quote-result-card">
                <div class="quote-header">
                    <h3>Your Service Quote</h3>
                    <p class="service-name">${serviceName}</p>
                </div>
                
                <div class="quote-details">
                    <h4>Selected Services:</h4>
                    <ul class="selected-options">
        `;
        
        options.forEach(option => {
            html += `
                <li>
                    <span>${option.name}</span>
                    <span>₹${option.price}</span>
                </li>
            `;
        });
        
        html += `
                    </ul>
                    
                    <div class="quote-summary">
                        <div class="summary-row">
                            <span>Base Price</span>
                            <span>₹${this.services[serviceType].basePrice}</span>
                        </div>
                        <div class="summary-row">
                            <span>Additional Services</span>
                            <span>₹${total - this.services[serviceType].basePrice}</span>
                        </div>
                        <div class="summary-row total">
                            <span><strong>Total Price</strong></span>
                            <span><strong>₹${total}</strong></span>
                        </div>
                    </div>
                    
                    <div class="quote-actions">
                        <button class="btn btn-primary" id="requestQuote">
                            <i class="fab fa-whatsapp"></i> Request This Quote
                        </button>
                        <button class="btn btn-outline" id="downloadQuote">
                            <i class="fas fa-download"></i> Download Quote
                        </button>
                    </div>
                    
                    <p class="quote-note">
                        <i class="fas fa-info-circle"></i> This is an estimated quote. Final price may vary based on specific requirements.
                    </p>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add event listeners to buttons
        const requestBtn = container.querySelector('#requestQuote');
        const downloadBtn = container.querySelector('#downloadQuote');
        
        if (requestBtn) {
            requestBtn.addEventListener('click', () => {
                this.requestQuote(serviceType, total, options);
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadQuote(serviceType, total, options);
            });
        }
    }
    
    resetCalculator(calculator, resultContainer) {
        if (calculator) {
            // Reset form
            calculator.reset();
            
            // Reset options container
            const optionsContainer = calculator.querySelector('#serviceOptions');
            if (optionsContainer) {
                this.updateServiceOptions(
                    calculator.querySelector('#serviceType').value,
                    optionsContainer
                );
            }
        }
        
        if (resultContainer) {
            resultContainer.innerHTML = '';
        }
    }
    
    setupServiceSelector() {
        const serviceSelectors = document.querySelectorAll('.service-selector');
        
        serviceSelectors.forEach(selector => {
            selector.addEventListener('click', (e) => {
                const serviceCard = e.target.closest('.service-card');
                if (serviceCard) {
                    const serviceType = serviceCard.dataset.service;
                    this.prefillQuoteForm(serviceType);
                    
                    // Scroll to quote calculator
                    const calculator = document.getElementById('quoteCalculator');
                    if (calculator) {
                        calculator.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    prefillQuoteForm(serviceType) {
        const calculator = document.getElementById('quoteCalculator');
        if (!calculator) return;
        
        const serviceSelect = calculator.querySelector('#serviceType');
        if (serviceSelect) {
            serviceSelect.value = serviceType;
            
            // Trigger change event
            const event = new Event('change');
            serviceSelect.dispatchEvent(event);
        }
    }
    
    setupWhatsAppIntegration() {
        const whatsappButtons = document.querySelectorAll('.whatsapp-quote');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', () => {
                const service = button.dataset.service || 'General Inquiry';
                const price = button.dataset.price || '';
                
                let message = `Hello Ozone Service Solutions!%0A%0AI'm interested in: ${service}`;
                
                if (price) {
                    message += `%0AQuote: ₹${price}`;
                }
                
                message += `%0A%0APlease provide more details about this service.`;
                
                window.open(`https://wa.me/919886693316?text=${message}`, '_blank');
            });
        });
    }
    
    requestQuote(serviceType, total, options) {
        const serviceName = this.formatOptionName(serviceType);
        
        let message = `*Quote Request - Ozone Service Solutions*%0A%0A`;
        message += `*Service:* ${serviceName}%0A`;
        message += `*Total Quote:* ₹${total}%0A%0A`;
        message += `*Selected Options:*%0A`;
        
        options.forEach(option => {
            message += `• ${option.name} - ₹${option.price} (${option.time})%0A`;
        });
        
        message += `%0A*Customer Details:*%0A`;
        message += `Name: ________________%0A`;
        message += `Phone: ________________%0A`;
        message += `Email: ________________%0A%0A`;
        message += `_Please fill in your details and send this message to proceed._`;
        
        window.open(`https://wa.me/919886693316?text=${message}`, '_blank');
    }
    
    downloadQuote(serviceType, total, options) {
        const serviceName = this.formatOptionName(serviceType);
        const date = new Date().toLocaleDateString('en-IN');
        
        // Create PDF content
        const content = `
            <html>
            <head>
                <title>Quote - ${serviceName}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .logo { font-size: 24px; font-weight: bold; color: #1a56db; }
                    .subtitle { color: #666; margin-top: 5px; }
                    .details { margin: 20px 0; }
                    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    .table th { background: #f5f5f5; }
                    .total { font-weight: bold; font-size: 18px; }
                    .footer { margin-top: 40px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">Ozone Service Solutions</div>
                    <div class="subtitle">Since 2006 | Jayanagar, Bengaluru</div>
                </div>
                
                <h2>Service Quote</h2>
                <div class="details">
                    <p><strong>Service:</strong> ${serviceName}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Quote ID:</strong> OSS-${Date.now().toString().slice(-6)}</p>
                </div>
                
                <table class="table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Duration</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Base Service</td>
                            <td>Varies</td>
                            <td>₹${this.services[serviceType].basePrice}</td>
                        </tr>
        `;
        
        options.forEach(option => {
            content += `
                <tr>
                    <td>${option.name}</td>
                    <td>${option.time}</td>
                    <td>₹${option.price}</td>
                </tr>
            `;
        });
        
        content += `
                        <tr class="total">
                            <td colspan="2"><strong>Total</strong></td>
                            <td><strong>₹${total}</strong></td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="footer">
                    <p><strong>Note:</strong> This is a preliminary quote. Final pricing may vary based on specific requirements.</p>
                    <p><strong>Contact:</strong> +91 98866 93316 | ozoneservicesolutions@gmail.com</p>
                    <p><strong>Address:</strong> No 806, 8th Main Road, Jayanagar 3rd Block, Bengaluru 560011</p>
                </div>
            </body>
            </html>
        `;
        
        // Create and download PDF
        this.generatePDF(content, `Ozone-Quote-${serviceName}-${date}.pdf`);
    }
    
    generatePDF(content, filename) {
        // In a real implementation, you would use a PDF generation library
        // For now, we'll create a downloadable HTML file
        
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
    }
    
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearError(input);
            }
            
            // Email validation
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    this.showError(input, 'Please enter a valid email');
                    isValid = false;
                }
            }
            
            // Phone validation
            if (input.type === 'tel' || input.name.includes('phone')) {
                const phoneRegex = /^[0-9]{10}$/;
                const phoneNumber = input.value.replace(/\D/g, '');
                if (phoneNumber.length !== 10) {
                    this.showError(input, 'Please enter a valid 10-digit phone number');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    showError(input, message) {
        this.clearError(input);
        
        input.classList.add('error');
        
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
        
        input.parentNode.appendChild(error);
    }
    
    clearError(input) {
        input.classList.remove('error');
        
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const serviceQuote = new ServiceQuote();
    
    // Export for use in console
    window.ServiceQuote = serviceQuote;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServiceQuote;
}