// ZeroTrace Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
// Initialize all components
initializeNavigation();
initializeTabs();
initializeForms();
initializePricingToggle();
initializeAnimations();
initializeScrollEffects();
initializeFilterSystems();

console.log('ZeroTrace website initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile menu toggle
if (hamburger && navMenu) {
hamburger.addEventListener('click', function() {

hamburger.classList.toggle('active');
navMenu.classList.toggle('active');
document.body.classList.toggle('menu-open');
});
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
link.addEventListener('click', function() {
if (hamburger && navMenu) {
hamburger.classList.remove('active');
navMenu.classList.remove('active');
document.body.classList.remove('menu-open');
}
});
});

// Header scroll effect
if (header) {
let lastScroll = 0;
window.addEventListener('scroll', function() {
const currentScroll = window.pageYOffset;

if (currentScroll > 100) {
header.style.background = 'rgba(10, 24, 40, 0.98)';
header.style.backdropFilter = 'blur(15px)';
} else {
header.style.background = 'rgba(10, 24, 40, 0.95)';
header.style.backdropFilter = 'blur(10px)';
}

// Auto-hide header on scroll down, show on scroll up
if (currentScroll > lastScroll && currentScroll > 100) {
header.style.transform = 'translateY(-100%)';
} else {
header.style.transform = 'translateY(0)';
}

lastScroll = currentScroll;
});
}
}

// Tab system functionality
function initializeTabs() {
// Services page tabs
const serviceTabs = document.querySelectorAll('.service-tab');
const serviceItems = document.querySelectorAll('.service-detailed');

if (serviceTabs.length > 0) {
serviceTabs.forEach(tab => {
tab.addEventListener('click', function() {
const category = this.dataset.category;

// Update active tab
serviceTabs.forEach(t => t.classList.remove('active'));
this.classList.add('active');

// Show/hide services based on category
serviceItems.forEach(item => {

if (category === 'all' || item.classList.contains(category)) {
item.style.display = 'block';
item.classList.add('fade-in');
} else {
item.style.display = 'none';
item.classList.remove('fade-in');
}
});
});
});
}

// Learn page tabs
const categoryTabs = document.querySelectorAll('.category-tab');
const resourceItems = document.querySelectorAll('.resource-card, .resource-item');

if (categoryTabs.length > 0) {
categoryTabs.forEach(tab => {
tab.addEventListener('click', function() {
const category = this.dataset.category;

// Update active tab
categoryTabs.forEach(t => t.classList.remove('active'));
this.classList.add('active');

// Show/hide resources based on category
resourceItems.forEach(item => {
if (category === 'all' || item.classList.contains(category)) {
item.style.display = item.classList.contains('resource-card') ? 'block' : 'flex';
item.classList.add('fade-in');

} else {
item.style.display = 'none';
item.classList.remove('fade-in');
}
});
});
});
}

// News & Events tabs
const contentTabs = document.querySelectorAll('.content-tab');
const contentSections = document.querySelectorAll('.news-content, .events-content,git .press-content');

if (contentTabs.length > 0) {
contentTabs.forEach(tab => {
tab.addEventListener('click', function() {
const content = this.dataset.content;

// Update active tab
contentTabs.forEach(t => t.classList.remove('active'));
this.classList.add('active');

// Show/hide content sections
contentSections.forEach(section => {
section.classList.remove('active');
if (section.id === content) {
section.classList.add('active');
}
});

});
});
}
}

// Form handling
function initializeForms() {
// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', function(e) {
e.preventDefault();

// Basic form validation
const requiredFields = contactForm.querySelectorAll('[required]');
let isValid = true;

requiredFields.forEach(field => {
if (!field.value.trim()) {
isValid = false;
showFieldError(field, 'This field is required');
} else {
clearFieldError(field);
}
});

// Email validation
const emailField = contactForm.querySelector('#email');
if (emailField && emailField.value) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(emailField.value)) {
isValid = false;
showFieldError(emailField, 'Please enter a valid email address');
}
}

// Phone validation (if provided)
const phoneField = contactForm.querySelector('#phone');
if (phoneField && phoneField.value) {
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
if (!phoneRegex.test(phoneField.value.replace(/[\s\-\(\)]/g, ''))) {
showFieldError(phoneField, 'Please enter a valid phone number');
}
}

if (isValid) {
// Show success message
showSuccessMessage('Thank you for your message! We\'ll get back to you within 24hours.');
contactForm.reset();
}
});
}

// Newsletter forms
const newsletterForms = document.querySelectorAll('.subscription-form');
newsletterForms.forEach(form => {
form.addEventListener('submit', function(e) {
e.preventDefault();

const emailInput = form.querySelector('input[type="email"]');
if (emailInput && emailInput.value) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (emailRegex.test(emailInput.value)) {
showSuccessMessage('Successfully subscribed to our newsletter!');
emailInput.value = '';
} else {
showFieldError(emailInput, 'Please enter a valid email address');
}
}
});
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
const question = item.querySelector('.faq-question');
if (question) {
question.addEventListener('click', function() {
const isActive = item.classList.contains('active');

// Close all FAQ items
faqItems.forEach(faq => faq.classList.remove('active'));

// Open clicked item if it wasn't active
if (!isActive) {
item.classList.add('active');
}
});
}

});
}

// Form validation helpers
function showFieldError(field, message) {
clearFieldError(field);

field.style.borderColor = '#da3633';

const errorDiv = document.createElement('div');
errorDiv.className = 'field-error';
errorDiv.textContent = message;
errorDiv.style.color = '#da3633';
errorDiv.style.fontSize = '0.875rem';
errorDiv.style.marginTop = '0.25rem';

field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
field.style.borderColor = '';
const existingError = field.parentNode.querySelector('.field-error');
if (existingError) {
existingError.remove();
}
}

function showSuccessMessage(message) {
// Create success message element
const successDiv = document.createElement('div');

successDiv.className = 'success-message';
successDiv.textContent = message;
successDiv.style.cssText = `
position: fixed;
top: 20px;
right: 20px;
background: linear-gradient(135deg, #238636, #2ea043);
color: white;
padding: 1rem 1.5rem;
border-radius: 8px;
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
z-index: 10000;
opacity: 0;
transform: translateX(100%);
transition: all 0.3s ease;
max-width: 400px;
font-weight: 500;
`;

document.body.appendChild(successDiv);

// Animate in
setTimeout(() => {
successDiv.style.opacity = '1';
successDiv.style.transform = 'translateX(0)';
}, 100);

// Remove after 5 seconds
setTimeout(() => {
successDiv.style.opacity = '0';

successDiv.style.transform = 'translateX(100%)';
setTimeout(() => {
if (successDiv.parentNode) {
successDiv.parentNode.removeChild(successDiv);
}
}, 300);
}, 5000);
}

// Pricing toggle functionality
function initializePricingToggle() {
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

if (pricingToggle) {
pricingToggle.addEventListener('change', function() {
const isAnnual = this.checked;

monthlyPrices.forEach(price => {
price.style.display = isAnnual ? 'none' : 'flex';
});

annualPrices.forEach(price => {
price.style.display = isAnnual ? 'flex' : 'none';
});
});
}
}

// Animation and scroll effects
function initializeAnimations() {
// Intersection Observer for scroll animations
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fade-in');
}
});
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(`
.service-card,
.value-card,
.team-member,
.cert-item,
.product-card,
.pricing-card,
.addon-card,
.resource-card,
.news-card,
.event-card,
.stat-item
`);

animateElements.forEach(el => {
observer.observe(el);
});

// Counter animation for statistics
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter(entry.target);
statsObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
statsObserver.observe(stat);
});
}

function animateCounter(element) {
const target = element.textContent;
const isPercentage = target.includes('%');
const hasPlus = target.includes('+');
const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));

let current = 0;
const increment = numericValue / 50; // 50 steps
const timer = setInterval(() => {

current += increment;
if (current >= numericValue) {
current = numericValue;
clearInterval(timer);
}

let displayValue = Math.floor(current);
if (isPercentage) displayValue += '%';
if (hasPlus) displayValue += '+';
if (target.includes('/')) displayValue = Math.floor(current) + '/7';

element.textContent = displayValue;
}, 20);
}

// Scroll effects
function initializeScrollEffects() {
// Parallax effect for hero section
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
window.addEventListener('scroll', function() {
const scrolled = window.pageYOffset;
const parallax = scrolled * 0.5;
heroBackground.style.transform = `translateY(${parallax}px)`;
});
}

// Floating animation for security grid items
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach((item, index) => {

item.style.setProperty('--i', index);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});

// Back to top button
createBackToTopButton();
}

function createBackToTopButton() {
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTop.className = 'back-to-top';
backToTop.style.cssText = `
position: fixed;
bottom: 30px;
right: 30px;
width: 50px;

height: 50px;
background: linear-gradient(135deg, #00d4ff, #0099cc);
color: #0d1117;
border: none;
border-radius: 50%;
cursor: pointer;
font-size: 1.25rem;
opacity: 0;
visibility: hidden;
transition: all 0.3s ease;
z-index: 1000;
box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(backToTop);

// Show/hide based on scroll position
window.addEventListener('scroll', function() {
if (window.pageYOffset > 300) {
backToTop.style.opacity = '1';
backToTop.style.visibility = 'visible';
} else {
backToTop.style.opacity = '0';
backToTop.style.visibility = 'hidden';
}
});

// Scroll to top functionality
backToTop.addEventListener('click', function() {
window.scrollTo({

top: 0,
behavior: 'smooth'
});
});

// Hover effects
backToTop.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-5px) scale(1.1)';
this.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.4)';
});

backToTop.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0) scale(1)';
this.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
});
}

// Filter systems
function initializeFilterSystems() {
// Search functionality for resources
const searchInput = document.querySelector('.resource-search');
if (searchInput) {
searchInput.addEventListener('input', function() {
const searchTerm = this.value.toLowerCase();
const resourceItems = document.querySelectorAll('.resource-card, .resource-item');

resourceItems.forEach(item => {
const title = item.querySelector('h3, h4').textContent.toLowerCase();
const description = item.querySelector('p').textContent.toLowerCase();

if (title.includes(searchTerm) || description.includes(searchTerm)) {
item.style.display = '';
} else {
item.style.display = 'none';
}
});
});
}

// Sort functionality for news/events
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
sortSelect.addEventListener('change', function() {
const sortBy = this.value;
const container = document.querySelector('.news-grid, .events-grid');
const items = Array.from(container.children);

items.sort((a, b) => {
if (sortBy === 'date') {
const dateA = new Date(a.querySelector('.news-date, .event-date').textContent);
const dateB = new Date(b.querySelector('.news-date, .event-date').textContent);
return dateB - dateA; // Newest first
} else if (sortBy === 'title') {
const titleA = a.querySelector('h3').textContent;
const titleB = b.querySelector('h3').textContent;
return titleA.localeCompare(titleB);
}
return 0;
});

// Re-append sorted items
items.forEach(item => container.appendChild(item));
});
}
}

// Utility functions
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

function throttle(func, limit) {
let inThrottle;
return function() {
const args = arguments;
const context = this;
if (!inThrottle) {
func.apply(context, args);
inThrottle = true;
setTimeout(() => inThrottle = false, limit);
}
};

}

// Loading states
function showLoading(element) {
const loader = document.createElement('div');
loader.className = 'loading-spinner';
loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
loader.style.cssText = `
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
color: #00d4ff;
font-size: 1.5rem;
z-index: 10;
`;

element.style.position = 'relative';
element.style.opacity = '0.7';
element.appendChild(loader);

return loader;
}

function hideLoading(element, loader) {
element.style.opacity = '';
if (loader && loader.parentNode) {
loader.parentNode.removeChild(loader);
}
}

// Error handling
window.addEventListener('error', function(e) {
console.error('JavaScript error:', e.error);
// Could implement error reporting here
});

// Performance monitoring
if ('performance' in window) {
window.addEventListener('load', function() {
setTimeout(() => {
const perfData = performance.getEntriesByType('navigation')[0];
console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
}, 0);
});
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
// Escape key closes mobile menu
if (e.key === 'Escape') {
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu && navMenu.classList.contains('active')) {
hamburger.classList.remove('active');
navMenu.classList.remove('active');
document.body.classList.remove('menu-open');
}
}

// Tab navigation for custom elements
if (e.key === 'Tab') {
document.body.classList.add('keyboard-navigation');
}
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
document.body.classList.remove('keyboard-navigation');
});

// Preload critical resources
function preloadCriticalResources() {
const criticalFonts = [
'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

criticalFonts.forEach(font => {
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'style';
link.href = font;
document.head.appendChild(link);
});
}

// Initialize preloading
preloadCriticalResources();

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
window.addEventListener('load', function() {
// Service worker could be implemented for caching
console.log('Service Worker support detected');
});
}

// Dark mode preference detection
function detectColorSchemePreference() {
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
console.log('User prefers light mode, but ZeroTrace uses dark theme for security aesthetic');
}
}

detectColorSchemePreference();

// Analytics placeholder (would integrate with actual analytics service)
function trackEvent(eventName, eventData) {
console.log('Event tracked:', eventName, eventData);
// Integration with analytics service would go here
}

// Track form submissions
document.addEventListener('submit', function(e) {
const form = e.target;
if (form.classList.contains('contact-form')) {
trackEvent('contact_form_submit', {
form_type: 'contact',
timestamp: new Date().toISOString()

});
} else if (form.classList.contains('subscription-form')) {
trackEvent('newsletter_subscribe', {
form_type: 'newsletter',
timestamp: new Date().toISOString()
});
}
});

// Track button clicks
document.addEventListener('click', function(e) {
const target = e.target.closest('.btn');
if (target) {
trackEvent('button_click', {
button_text: target.textContent.trim(),
button_class: target.className,
timestamp: new Date().toISOString()
});
}
});

console.log('ZeroTrace website scripts loaded successfully');

