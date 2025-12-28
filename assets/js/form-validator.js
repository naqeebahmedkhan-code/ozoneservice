// Form Validation for Ozone Service Solutions

class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.validateForm(e, form));
            
            // Add real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        });
    }
    
    validateForm(e, form) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.submitForm(form);
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name || field.id;
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if ((name.includes('phone') || name.includes('mobile')) && value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value.replace(/\D/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit phone number';
            }
        }
        
        // Min length validation
        if (field.hasAttribute('minlength') && value) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (value.length < minLength) {
                isValid = false;
                errorMessage = `Minimum ${minLength} characters required`;
            }
        }
        
        // Max length validation
        if (field.hasAttribute('maxlength') && value) {
            const maxLength = parseInt(field.getAttribute('maxlength'));
            if (value.length > maxLength) {
                isValid = false;
                errorMessage = `Maximum ${maxLength} characters allowed`;
            }
        }
        
        // Show/hide error
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }
    
    showError(field, message) {
        // Remove any existing error
        this.clearError(field);
        
        // Add error class
        field.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        // Insert after field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        
        // Focus on field if it's the first error
        if (!document.querySelector('.error')) {
            field.focus();
        }
    }
    
    clearError(field) {
        field.classList.remove('error');
        
        // Remove error message
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    submitForm(form) {
        const formId = form.id;
        const formData = this.getFormData(form);
        
        switch(formId) {
            case 'quickInquiryForm':
            case 'leadForm':
                this.submitToWhatsApp(formData);
                break;
                
            case 'contactForm':
                this.submitToEmail(formData);
                break;
                
            default:
                this.submitToWhatsApp(formData);
        }
    }
    
    getFormData(form) {
        const formData = {};
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.name || input.id) {
                const key = input.name || input.id;
                formData[key] = input.value.trim();
            }
        });
        
        return formData;
    }
    
    submitToWhatsApp(formData) {
        // Format WhatsApp message
        let message = `*New Service Inquiry - Ozone Service Solutions*%0A%0A`;
        
        // Add form data
        if (formData.name) message += `*Name:* ${encodeURIComponent(formData.name)}%0A`;
        if (formData.phone) message += `*Phone:* ${encodeURIComponent(formData.phone)}%0A`;
        if (formData.email) message += `*Email:* ${encodeURIComponent(formData.email)}%0A`;
        if (formData.service) message += `*Service Needed:* ${encodeURIComponent(formData.service)}%0A`;
        if (formData.urgency) message += `*Urgency:* ${encodeURIComponent(formData.urgency)}%0A`;
        if (formData.message) message += `*Details:* ${encodeURIComponent(formData.message)}%0A`;
        
        message += `%0A_Submitted via Ozone Service Solutions Website_`;
        
        // Open WhatsApp
        const phoneNumber = '919886693316';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        this.showSuccess(formData.name);
    }
    
    submitToEmail(formData) {
        // This would typically be handled by a server-side script
        // For now, we'll show a success message
        
        console.log('Form data for email:', formData);
        this.showSuccess(formData.name);
        
        // In a real implementation, you would use fetch() to send to your server
        /*
        fetch('/submit-form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.showSuccess(formData.name);
            } else {
                this.showError('Submission failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.showError('Network error. Please try again.');
        });
        */
    }
    
    showSuccess(name) {
        // Create success overlay
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 1rem;
            text-align: center;
            max-width: 500px;
            width: 90%;
            animation: scaleIn 0.3s ease;
        `;
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = 'fas fa-check-circle';
        icon.style.cssText = `
            font-size: 4rem;
            color: #10b981;
            margin-bottom: 1rem;
        `;
        
        // Add heading
        const heading = document.createElement('h3');
        heading.textContent = 'Thank You!';
        heading.style.cssText = `
            color: #111827;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        `;
        
        // Add message
        const message = document.createElement('p');
        message.textContent = name 
            ? `Thank you ${name}, your inquiry has been submitted successfully! We will contact you within 30 minutes.`
            : 'Your inquiry has been submitted successfully! We will contact you within 30 minutes.';
        message.style.cssText = `
            color: #6b7280;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        `;
        
        // Add WhatsApp button
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = 'https://wa.me/919886693316';
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'btn btn-whatsapp';
        whatsappBtn.style.margin = '0.5rem';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chat on WhatsApp';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-outline';
        closeBtn.textContent = 'Close';
        closeBtn.style.margin = '0.5rem';
        closeBtn.onclick = () => overlay.remove();
        
        // Assemble elements
        successMessage.appendChild(icon);
        successMessage.appendChild(heading);
        successMessage.appendChild(message);
        successMessage.appendChild(whatsappBtn);
        successMessage.appendChild(closeBtn);
        overlay.appendChild(successMessage);
        document.body.appendChild(overlay);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { 
                    opacity: 0;
                    transform: scale(0.9);
                }
                to { 
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 10000);
    }
    
    showError(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-exclamation-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}