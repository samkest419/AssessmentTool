/**
 * Responsive Enhancer for Business Assessment Tool
 * This file contains improvements for responsive design and mobile experience
 */

// Responsive configuration
const responsiveConfig = {
    enableTouchOptimization: true,
    enableMobileLayout: true,
    enableAccessibility: true,
    enablePrintStyles: true
};

/**
 * Responsive Enhancer
 * Improves the responsive design and mobile experience
 */
class ResponsiveEnhancer {
    constructor() {
        this.initialized = false;
        this.breakpoints = {
            xs: 576,
            sm: 768,
            md: 992,
            lg: 1200
        };
        this.currentBreakpoint = this.getCurrentBreakpoint();
    }
    
    /**
     * Initialize responsive enhancements
     */
    initializeResponsiveEnhancements() {
        if (this.initialized) return;
        
        // Set up event listeners for window resize
        this.setupResizeListener();
        
        // Enhance touch support
        if (responsiveConfig.enableTouchOptimization) {
            this.enhanceTouchSupport();
        }
        
        // Optimize mobile layout
        if (responsiveConfig.enableMobileLayout) {
            this.optimizeMobileLayout();
        }
        
        // Improve accessibility
        if (responsiveConfig.enableAccessibility) {
            this.improveAccessibility();
        }
        
        // Add print styles
        if (responsiveConfig.enablePrintStyles) {
            this.setupPrintStyles();
        }
        
        this.initialized = true;
        console.log('Responsive enhancements initialized');
    }
    
    /**
     * Set up window resize listener
     */
    setupResizeListener() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                
                // Only trigger if breakpoint changed
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.currentBreakpoint = newBreakpoint;
                    this.handleBreakpointChange(newBreakpoint);
                }
            }, 250);
        });
    }
    
    /**
     * Get current breakpoint based on window width
     */
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width < this.breakpoints.xs) return 'xs';
        if (width < this.breakpoints.sm) return 'sm';
        if (width < this.breakpoints.md) return 'md';
        if (width < this.breakpoints.lg) return 'lg';
        return 'xl';
    }
    
    /**
     * Handle breakpoint change
     */
    handleBreakpointChange(breakpoint) {
        console.log(`Breakpoint changed to: ${breakpoint}`);
        
        // Adjust UI based on breakpoint
        if (breakpoint === 'xs' || breakpoint === 'sm') {
            this.applyMobileOptimizations();
        } else {
            this.applyDesktopOptimizations();
        }
    }
    
    /**
     * Apply mobile optimizations
     */
    applyMobileOptimizations() {
        // Simplify progress indicator on mobile
        const progressSteps = document.querySelectorAll('.progress-indicator .step');
        progressSteps.forEach(step => {
            step.style.width = '30px';
            step.style.height = '30px';
            step.style.fontSize = '14px';
        });
        
        // Adjust option grid to single column
        const optionsGrids = document.querySelectorAll('.options-grid');
        optionsGrids.forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
        });
        
        // Increase touch target sizes
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.style.padding = '12px 16px';
        });
        
        const options = document.querySelectorAll('.option, .multi-option');
        options.forEach(option => {
            option.style.padding = '16px';
        });
        
        // Adjust charts for mobile
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            container.style.height = '250px';
        });
    }
    
    /**
     * Apply desktop optimizations
     */
    applyDesktopOptimizations() {
        // Reset progress indicator
        const progressSteps = document.querySelectorAll('.progress-indicator .step');
        progressSteps.forEach(step => {
            step.style.width = '40px';
            step.style.height = '40px';
            step.style.fontSize = '16px';
        });
        
        // Reset option grid
        const optionsGrids = document.querySelectorAll('.options-grid');
        optionsGrids.forEach(grid => {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
        });
        
        // Reset button sizes
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.style.padding = '';
        });
        
        const options = document.querySelectorAll('.option, .multi-option');
        options.forEach(option => {
            option.style.padding = '';
        });
        
        // Reset chart sizes
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            container.style.height = '300px';
        });
    }
    
    /**
     * Enhance touch support for mobile devices
     */
    enhanceTouchSupport() {
        // Increase touch target sizes for interactive elements
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .btn, .option, .multi-option, .nav-item, .help-icon {
                    min-height: 44px;
                }
                
                .option, .multi-option {
                    padding: 16px;
                }
                
                .btn {
                    padding: 12px 16px;
                }
                
                .help-icon {
                    width: 24px;
                    height: 24px;
                }
                
                .nav-buttons {
                    margin-top: 24px;
                }
                
                .nav-buttons .btn {
                    padding: 14px 20px;
                    font-size: 16px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add active state styles for touch feedback
        const activeStyle = document.createElement('style');
        activeStyle.textContent = `
            @media (max-width: 768px) {
                .btn:active, .option:active, .multi-option:active {
                    transform: scale(0.98);
                    transition: transform 0.1s ease;
                }
            }
        `;
        document.head.appendChild(activeStyle);
    }
    
    /**
     * Optimize layout for mobile devices
     */
    optimizeMobileLayout() {
        // Adjust spacing for mobile
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 576px) {
                .container {
                    padding: 0 16px;
                }
                
                h1 {
                    font-size: 28px;
                }
                
                h2 {
                    font-size: 24px;
                }
                
                h3 {
                    font-size: 20px;
                }
                
                .hero {
                    padding: 40px 0;
                }
                
                .features {
                    padding: 40px 0;
                }
                
                .assessment-container, .results-container {
                    padding: 32px 0;
                }
                
                .progress-container {
                    margin-bottom: 32px;
                }
                
                .question-group {
                    margin-bottom: 32px;
                }
                
                .results-charts {
                    grid-template-columns: 1fr;
                }
                
                .resources-grid {
                    grid-template-columns: 1fr;
                }
                
                .lead-form {
                    flex-direction: column;
                }
                
                .lead-form input {
                    margin-bottom: 8px;
                    border-radius: 4px;
                }
                
                .lead-form button {
                    border-radius: 4px;
                }
                
                .results-actions {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .footer-container {
                    flex-direction: column;
                    text-align: center;
                }
                
                .footer-logo {
                    margin-bottom: 16px;
                }
                
                .footer-links {
                    flex-direction: column;
                    gap: 12px;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        // Fix viewport meta tag to prevent zooming issues
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Add orientation change handler
        window.addEventListener('orientationchange', () => {
            // Force redraw after orientation change
            setTimeout(() => {
                window.scrollTo(0, 0);
                const newBreakpoint = this.getCurrentBreakpoint();
                this.handleBreakpointChange(newBreakpoint);
            }, 200);
        });
    }
    
    /**
     * Improve accessibility
     */
    improveAccessibility() {
        // Add ARIA attributes to interactive elements
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.setAttribute('role', 'button');
            option.setAttribute('tabindex', '0');
            option.setAttribute('aria-label', option.querySelector('h4').textContent);
            
            // Add keyboard support
            option.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    option.click();
                }
            });
        });
        
        const multiOptions = document.querySelectorAll('.multi-option');
        multiOptions.forEach((option, index) => {
            option.setAttribute('role', 'checkbox');
            option.setAttribute('tabindex', '0');
            option.setAttribute('aria-checked', 'false');
            
            // Update aria-checked when selected
            option.addEventListener('click', () => {
                const isSelected = option.classList.contains('selected');
                option.setAttribute('aria-checked', isSelected ? 'true' : 'false');
            });
            
            // Add keyboard support
            option.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    option.click();
                }
            });
        });
        
        // Add focus styles
        const focusStyle = document.createElement('style');
        focusStyle.textContent = `
            .btn:focus, .option:focus, .multi-option:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
            
            .btn:focus:not(:focus-visible), .option:focus:not(:focus-visible), .multi-option:focus:not(:focus-visible) {
                outline: none;
            }
            
            .btn:focus-visible, .option:focus-visible, .multi-option:focus-visible {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(focusStyle);
        
        // Add skip to content link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#assessmentContainer';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary);
            color: white;
            padding: 8px 16px;
            z-index: 100;
            transition: top 0.3s ease;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    /**
     * Set up print styles
     */
    setupPrintStyles() {
        // Add print button functionality
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
        
        // Add additional print styles
        const printStyle = document.createElement('style');
        printStyle.textContent = `
            @media print {
                @page {
                    size: portrait;
                    margin: 1cm;
                }
                
                body {
                    font-size: 12pt;
                    line-height: 1.3;
                }
                
                .header, .footer, .nav-buttons, .lead-capture {
                    display: none !important;
                }
                
                .container {
                    width: 100% !important;
                    max-width: none !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }
                
                .results-container {
                    display: block !important;
                    padding: 0 !important;
                }
                
                .results-header {
                    text-align: left !important;
                }
                
                .results-summary, .chart-container, .progress-bar-container, .recommendations-container, .resources-container {
                    box-shadow: none !important;
                    border: 1px solid #ddd !important;
                    break-inside: avoid !important;
                    margin-bottom: 20pt !important;
                    page-break-inside: avoid !important;
                }
                
                .results-charts {
                    grid-template-columns: 1fr !important;
                }
                
                .chart-container {
                    height: auto !important;
                    page-break-inside: avoid !important;
                }
                
                .progress-bar {
                    print-color-adjust: exact !important;
                    -webkit-print-color-adjust: exact !important;
                }
                
                a {
                    text-decoration: underline !important;
                }
                
                a::after {
                    content: " (" attr(href) ")" !important;
                    font-size: 10pt !important;
                    color: #666 !important;
                }
                
                .results-actions {
                    display: none !important;
                }
                
                h2 {
                    font-size: 18pt !important;
                    margin-bottom: 10pt !important;
                }
                
                h3 {
                    font-size: 14pt !important;
                    margin-bottom: 8pt !important;
                }
                
                h4 {
                    font-size: 12pt !important;
                    margin-bottom: 6pt !important;
                }
                
                p {
                    margin-bottom: 8pt !important;
                }
                
                .resources-grid {
                    grid-template-columns: 1fr 1fr !important;
                }
                
                .resource-card {
                    break-inside: avoid !important;
                }
            }
        `;
        document.head.appendChild(printStyle);
    }
}

// Create and export responsive enhancer
const responsiveEnhancer = new ResponsiveEnhancer();

// Export for use in main.js
window.ResponsiveEnhancer = responsiveEnhancer;
