/**
 * Performance Optimization for Business Assessment Tool
 * This file contains optimizations to improve loading speed and runtime performance
 */

// Performance configuration
const performanceConfig = {
    enableLazyLoading: true,
    minifyResources: true,
    optimizeCharts: true,
    cacheResults: true,
    deferNonCriticalScripts: true
};

/**
 * Initialize performance optimizations
 */
function initializeOptimizations() {
    console.log('Initializing performance optimizations...');
    
    // Apply optimizations based on configuration
    if (performanceConfig.enableLazyLoading) {
        setupLazyLoading();
    }
    
    if (performanceConfig.optimizeCharts) {
        optimizeChartRendering();
    }
    
    if (performanceConfig.cacheResults) {
        setupResultsCaching();
    }
    
    if (performanceConfig.deferNonCriticalScripts) {
        deferNonCriticalScripts();
    }
    
    // Add performance monitoring
    setupPerformanceMonitoring();
}

/**
 * Set up lazy loading for images and non-critical content
 */
function setupLazyLoading() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = Array.from(images).filter(img => !img.loading);
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                if (img.src) {
                    img.setAttribute('data-src', img.src);
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                    imageObserver.observe(img);
                }
            });
        }
    }
    
    // Lazy load assessment steps
    const assessmentSteps = document.querySelectorAll('.assessment-step');
    
    assessmentSteps.forEach((step, index) => {
        if (index > 0) {
            // Only keep the DOM for the first step, lazy load others when needed
            const stepContent = step.innerHTML;
            step.setAttribute('data-content', stepContent);
            step.innerHTML = '';
            
            // Add a flag to track if this step has been loaded
            step.setAttribute('data-loaded', 'false');
        } else {
            step.setAttribute('data-loaded', 'true');
        }
    });
    
    // Override goToStep function to lazy load content
    if (typeof goToStep === 'function') {
        const originalGoToStep = goToStep;
        
        window.goToStep = function(stepNumber) {
            // Get the target step
            const targetStep = document.getElementById(`step${stepNumber}`);
            
            // Check if the step needs to be loaded
            if (targetStep && targetStep.getAttribute('data-loaded') === 'false') {
                const content = targetStep.getAttribute('data-content');
                if (content) {
                    targetStep.innerHTML = content;
                    targetStep.setAttribute('data-loaded', 'true');
                    
                    // Re-attach event listeners for the newly loaded content
                    setupOptionSelection();
                }
            }
            
            // Call the original function
            originalGoToStep(stepNumber);
        };
    }
}

/**
 * Optimize chart rendering
 */
function optimizeChartRendering() {
    // Only render charts when they're visible
    if (typeof Chart !== 'undefined' && typeof window.BusinessAssessmentVisualizations !== 'undefined') {
        // Store original chart initialization functions
        const originalInitCharts = window.BusinessAssessmentVisualizations.initializeCharts;
        const originalRadarChart = window.BusinessAssessmentVisualizations.initializeMaturityRadarChart;
        const originalBenchmarkChart = window.BusinessAssessmentVisualizations.initializeBenchmarkChart;
        
        // Override with optimized versions
        window.BusinessAssessmentVisualizations.initializeCharts = function() {
            // Only initialize charts if results container is visible
            const resultsContainer = document.getElementById('resultsContainer');
            if (resultsContainer && resultsContainer.style.display !== 'none') {
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    // Initialize charts one by one with slight delay to prevent UI blocking
                    setTimeout(() => window.BusinessAssessmentVisualizations.initializeMaturityRadarChart(), 0);
                    setTimeout(() => window.BusinessAssessmentVisualizations.initializeBenchmarkChart(), 100);
                    setTimeout(() => window.BusinessAssessmentVisualizations.animateProgressBars(), 200);
                });
            }
        };
        
        // Optimize radar chart
        window.BusinessAssessmentVisualizations.initializeMaturityRadarChart = function() {
            const ctx = document.getElementById('maturityRadarChart');
            if (!ctx) return;
            
            // Check if chart is visible
            const rect = ctx.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) {
                // Chart not visible, defer rendering
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            originalRadarChart();
                            observer.disconnect();
                        }
                    });
                });
                
                observer.observe(ctx);
            } else {
                // Chart visible, render immediately
                originalRadarChart();
            }
        };
        
        // Optimize benchmark chart
        window.BusinessAssessmentVisualizations.initializeBenchmarkChart = function() {
            const ctx = document.getElementById('benchmarkChart');
            if (!ctx) return;
            
            // Check if chart is visible
            const rect = ctx.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) {
                // Chart not visible, defer rendering
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            originalBenchmarkChart();
                            observer.disconnect();
                        }
                    });
                });
                
                observer.observe(ctx);
            } else {
                // Chart visible, render immediately
                originalBenchmarkChart();
            }
        };
        
        // Optimize Chart.js global settings
        Chart.defaults.animation.duration = 800; // Reduce animation duration
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        
        // Reduce point sizes for better performance
        Chart.defaults.elements.point.radius = 3;
        Chart.defaults.elements.point.hoverRadius = 4;
    }
}

/**
 * Set up caching for assessment results
 */
function setupResultsCaching() {
    // Cache assessment data in localStorage
    if (typeof processAssessment === 'function') {
        const originalProcessFunction = processAssessment;
        
        window.processAssessment = function() {
            // Call original function
            originalProcessFunction();
            
            // Cache the assessment data
            try {
                localStorage.setItem('businessAssessmentData', JSON.stringify(assessmentData));
                localStorage.setItem('businessAssessmentTimestamp', Date.now());
            } catch (e) {
                console.warn('Could not cache assessment data:', e);
            }
        };
    }
    
    // Check for cached data on page load
    window.addEventListener('load', function() {
        try {
            const cachedData = localStorage.getItem('businessAssessmentData');
            const timestamp = localStorage.getItem('businessAssessmentTimestamp');
            
            if (cachedData && timestamp) {
                // Check if cache is less than 24 hours old
                const age = Date.now() - parseInt(timestamp);
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours
                
                if (age < maxAge) {
                    // Parse cached data
                    const parsedData = JSON.parse(cachedData);
                    
                    // Add a button to load previous results
                    const startContainer = document.querySelector('.hero');
                    if (startContainer) {
                        const loadPreviousBtn = document.createElement('button');
                        loadPreviousBtn.className = 'btn btn-secondary';
                        loadPreviousBtn.textContent = 'Load Previous Assessment';
                        loadPreviousBtn.style.marginLeft = '1rem';
                        
                        loadPreviousBtn.addEventListener('click', function() {
                            // Load cached data into assessmentData
                            if (typeof assessmentData !== 'undefined') {
                                Object.assign(assessmentData, parsedData);
                                showResults();
                            }
                        });
                        
                        // Add button next to Get Started
                        const getStartedBtn = document.getElementById('getStartedBtn');
                        if (getStartedBtn) {
                            getStartedBtn.parentNode.insertBefore(loadPreviousBtn, getStartedBtn.nextSibling);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Could not load cached assessment data:', e);
        }
    });
}

/**
 * Defer loading of non-critical scripts
 */
function deferNonCriticalScripts() {
    // Identify non-critical scripts
    const nonCriticalScripts = [
        'js/test-suite.js'
    ];
    
    // Find script tags for non-critical scripts
    document.querySelectorAll('script').forEach(script => {
        if (script.src) {
            const scriptPath = script.src.split('/').pop();
            if (nonCriticalScripts.includes(scriptPath)) {
                // Make the script defer
                script.defer = true;
                
                // Move to end of body
                document.body.appendChild(script);
            }
        }
    });
    
    // Defer Chart.js plugin loading
    const chartPlugins = document.querySelector('script[src*="chartjs-plugin"]');
    if (chartPlugins) {
        chartPlugins.defer = true;
    }
}

/**
 * Set up performance monitoring
 */
function setupPerformanceMonitoring() {
    // Create performance marks for key user interactions
    const markInteraction = (name) => {
        performance.mark(`${name}-start`);
        
        // Measure after a short delay to capture rendering time
        setTimeout(() => {
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
            
            // Log performance measure
            const measures = performance.getEntriesByName(name);
            if (measures.length > 0) {
                console.log(`Performance: ${name} took ${measures[0].duration.toFixed(2)}ms`);
            }
        }, 100);
    };
    
    // Monitor assessment step navigation
    if (typeof goToStep === 'function') {
        const originalGoToStep = goToStep;
        
        window.goToStep = function(stepNumber) {
            markInteraction(`navigate-to-step-${stepNumber}`);
            originalGoToStep(stepNumber);
        };
    }
    
    // Monitor results display
    if (typeof showResults === 'function') {
        const originalShowResults = showResults;
        
        window.showResults = function() {
            markInteraction('show-results');
            originalShowResults();
        };
    }
    
    // Monitor chart initialization
    if (typeof window.BusinessAssessmentVisualizations !== 'undefined' && 
        typeof window.BusinessAssessmentVisualizations.initializeCharts === 'function') {
        
        const originalInitCharts = window.BusinessAssessmentVisualizations.initializeCharts;
        
        window.BusinessAssessmentVisualizations.initializeCharts = function() {
            markInteraction('initialize-charts');
            originalInitCharts();
        };
    }
}

/**
 * Optimize CSS delivery
 */
function optimizeCssDelivery() {
    // Inline critical CSS
    const criticalCss = `
        /* Critical CSS for above-the-fold content */
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; }
        header { background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 1rem 0; position: sticky; top: 0; z-index: 100; }
        .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hero { padding: 4rem 0; text-align: center; background-color: white; }
        .btn { display: inline-block; padding: 0.75rem 1.5rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; text-align: center; }
        .btn-primary { background-color: #5E4FDB; color: white; }
        .btn-secondary { background-color: #F0F2F5; color: #333333; }
    `;
    
    // Add critical CSS to head
    const style = document.createElement('style');
    style.textContent = criticalCss;
    document.head.appendChild(style);
    
    // Preload main CSS file
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'css/styles.css';
    link.as = 'style';
    document.head.appendChild(link);
}

/**
 * Optimize JavaScript execution
 */
function optimizeJavaScriptExecution() {
    // Use requestIdleCallback for non-critical operations
    const scheduleIdleTask = (callback) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback);
        } else {
            setTimeout(callback, 1);
        }
    };
    
    // Debounce function for performance-intensive operations
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // Throttle function for scroll events
    const throttle = (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    // Export utility functions
    window.PerformanceUtils = {
        scheduleIdleTask,
        debounce,
        throttle
    };
    
    // Apply throttling to scroll handlers
    const originalScrollDown = window.scrollDown;
    if (typeof originalScrollDown === 'function') {
        window.scrollDown = throttle(originalScrollDown, 100);
    }
    
    const originalScrollUp = window.scrollUp;
    if (typeof originalScrollUp === 'function') {
        window.scrollUp = throttle(originalScrollUp, 100);
    }
}

// Initialize optimizations when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Optimize CSS delivery immediately
    optimizeCssDelivery();
    
    // Initialize other optimizations after a short delay
    setTimeout(initializeOptimizations, 100);
    
    // Optimize JavaScript execution
    optimizeJavaScriptExecution();
});

// Export optimization functions
window.PerformanceOptimizer = {
    initializeOptimizations,
    setupLazyLoading,
    optimizeChartRendering,
    setupResultsCaching,
    deferNonCriticalScripts,
    setupPerformanceMonitoring,
    optimizeCssDelivery,
    optimizeJavaScriptExecution
};
