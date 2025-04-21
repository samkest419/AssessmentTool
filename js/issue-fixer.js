/**
 * Issue Fixes for Business Assessment Tool
 * This file contains fixes for identified issues and edge cases
 */

// Issue tracking configuration
const issueConfig = {
    fixBrowserCompatibility: true,
    fixEdgeCases: true,
    fixAccessibilityIssues: true,
    fixPerformanceBottlenecks: true,
    fixMobileIssues: true
};

/**
 * Initialize issue fixes
 */
function initializeIssueFixes() {
    console.log('Initializing issue fixes...');
    
    // Apply fixes based on configuration
    if (issueConfig.fixBrowserCompatibility) {
        fixBrowserCompatibilityIssues();
    }
    
    if (issueConfig.fixEdgeCases) {
        fixEdgeCases();
    }
    
    if (issueConfig.fixAccessibilityIssues) {
        fixAccessibilityIssues();
    }
    
    if (issueConfig.fixPerformanceBottlenecks) {
        fixPerformanceBottlenecks();
    }
    
    if (issueConfig.fixMobileIssues) {
        fixMobileIssues();
    }
}

/**
 * Fix browser compatibility issues
 */
function fixBrowserCompatibilityIssues() {
    // Add polyfills for older browsers
    const polyfills = document.createElement('script');
    polyfills.textContent = `
        // Array.from polyfill
        if (!Array.from) {
            Array.from = function (object) {
                return [].slice.call(object);
            };
        }
        
        // Element.closest polyfill
        if (!Element.prototype.closest) {
            Element.prototype.closest = function(s) {
                var el = this;
                do {
                    if (el.matches(s)) return el;
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);
                return null;
            };
        }
        
        // Element.matches polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                        Element.prototype.webkitMatchesSelector;
        }
        
        // Object.assign polyfill
        if (typeof Object.assign !== 'function') {
            Object.assign = function(target) {
                if (target === null || target === undefined) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                
                var to = Object(target);
                
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];
                    
                    if (nextSource !== null && nextSource !== undefined) {
                        for (var nextKey in nextSource) {
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                
                return to;
            };
        }
    `;
    document.head.appendChild(polyfills);
    
    // Fix flexbox issues in older browsers
    const flexFixes = document.createElement('style');
    flexFixes.textContent = `
        /* Fix for older versions of Safari */
        .options-grid {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        }
        
        /* Fix for IE11 */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
            .options-grid {
                display: -ms-grid;
                -ms-grid-columns: 1fr 1fr;
            }
            
            .options-grid .option:nth-child(odd) {
                -ms-grid-column: 1;
            }
            
            .options-grid .option:nth-child(even) {
                -ms-grid-column: 2;
            }
            
            .visualization-container {
                display: -ms-grid;
                -ms-grid-columns: 1fr 1fr;
            }
            
            .radar-chart-container {
                -ms-grid-column: 1;
            }
            
            .benchmark-chart-container {
                -ms-grid-column: 2;
            }
        }
    `;
    document.head.appendChild(flexFixes);
    
    // Fix for Safari canvas rendering issues
    if (typeof Chart !== 'undefined') {
        const originalInitCharts = window.BusinessAssessmentVisualizations.initializeCharts;
        
        window.BusinessAssessmentVisualizations.initializeCharts = function() {
            // Check if browser is Safari
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            
            if (isSafari) {
                // Add a slight delay for Safari to ensure proper canvas rendering
                setTimeout(originalInitCharts, 100);
            } else {
                originalInitCharts();
            }
        };
    }
}

/**
 * Fix edge cases
 */
function fixEdgeCases() {
    // Fix for empty assessment data
    if (typeof processAssessment === 'function') {
        const originalProcessFunction = processAssessment;
        
        window.processAssessment = function() {
            // Check if assessment data is complete
            if (!assessmentData || !assessmentData.companyType || !assessmentData.industry) {
                // Show error message
                alert('Please complete all required fields in the assessment.');
                return;
            }
            
            // Call original function
            originalProcessFunction();
        };
    }
    
    // Fix for missing industry-specific questions
    if (typeof window.IndustryQuestions !== 'undefined' && 
        typeof window.IndustryQuestions.getIndustryQuestions === 'function') {
        
        const originalGetQuestions = window.IndustryQuestions.getIndustryQuestions;
        
        window.IndustryQuestions.getIndustryQuestions = function(industry) {
            const questions = originalGetQuestions(industry);
            
            // If no questions found for industry, return default questions
            if (!questions || !questions.questions || questions.questions.length === 0) {
                console.warn(`No questions found for industry: ${industry}. Using default questions.`);
                return window.IndustryQuestions.getIndustryQuestions('default');
            }
            
            return questions;
        };
    }
    
    // Fix for recommendation engine with incomplete data
    if (typeof window.AIRecommendationEngine !== 'undefined' && 
        typeof window.AIRecommendationEngine.generateRecommendations === 'function') {
        
        const originalGenerateRecommendations = window.AIRecommendationEngine.generateRecommendations;
        
        window.AIRecommendationEngine.generateRecommendations = function(data) {
            // Check if data is complete
            if (!data || !data.industry || !data.companyType) {
                console.warn('Incomplete data for recommendation engine. Using default values.');
                
                // Fill in missing data with defaults
                data = data || {};
                data.industry = data.industry || 'technology';
                data.companyType = data.companyType || 'small-business';
                data.companySize = data.companySize || '11-50';
                data.role = data.role || 'executive';
                data.departments = data.departments || ['operations', 'technology'];
                data.priorities = data.priorities || ['operational-efficiency'];
                data.challenges = data.challenges || ['process-bottlenecks'];
                data.companyScores = data.companyScores || [50, 50, 50, 50, 50, 50];
                data.operationsMaturity = data.operationsMaturity || 'partial';
                data.technologyMaturity = data.technologyMaturity || 'mixed';
            }
            
            return originalGenerateRecommendations(data);
        };
    }
    
    // Fix for progressive disclosure with missing elements
    if (typeof window.ProgressiveDisclosure !== 'undefined' && 
        typeof window.ProgressiveDisclosure.applyBranchingRules === 'function') {
        
        const originalApplyBranchingRules = window.ProgressiveDisclosure.applyBranchingRules;
        
        window.ProgressiveDisclosure.applyBranchingRules = function(field, value) {
            try {
                originalApplyBranchingRules(field, value);
            } catch (error) {
                console.warn(`Error applying branching rules for ${field}=${value}: ${error.message}`);
            }
        };
    }
}

/**
 * Fix accessibility issues
 */
function fixAccessibilityIssues() {
    // Fix missing alt text on images
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.alt = 'Business assessment visual';
    });
    
    // Fix color contrast issues
    const contrastFixes = document.createElement('style');
    contrastFixes.textContent = `
        /* Improve text contrast */
        body {
            color: #333333;
        }
        
        .option p, .insight-card p {
            color: #333333;
        }
        
        /* Improve button contrast */
        .btn-primary {
            background-color: #4A3DB3; /* Darker purple for better contrast */
        }
        
        .btn-secondary {
            color: #333333;
        }
        
        /* Add focus styles for keyboard navigation */
        a:focus, button:focus, input:focus, select:focus, textarea:focus, [tabindex]:focus {
            outline: 3px solid #4A3DB3;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(contrastFixes);
    
    // Fix heading hierarchy
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        // Get current heading level
        const level = parseInt(heading.tagName.substring(1));
        
        // Check if this heading is inside a section and should be demoted
        const isInSection = heading.closest('.sub-question, .follow-up-questions, .insight-card');
        if (isInSection && level < 3) {
            // Create new heading with appropriate level
            const newHeading = document.createElement(`h${level + 1}`);
            newHeading.innerHTML = heading.innerHTML;
            newHeading.className = heading.className;
            
            // Replace old heading
            heading.parentNode.replaceChild(newHeading, heading);
        }
    });
    
    // Add missing form labels
    document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])').forEach(input => {
        const id = input.id || `input-${Math.random().toString(36).substring(2, 9)}`;
        input.id = id;
        
        // Create label if none exists
        if (!document.querySelector(`label[for="${id}"]`)) {
            const label = document.createElement('label');
            label.htmlFor = id;
            label.textContent = input.placeholder || 'Input field';
            
            // Insert label before input
            input.parentNode.insertBefore(label, input);
        }
    });
}

/**
 * Fix performance bottlenecks
 */
function fixPerformanceBottlenecks() {
    // Fix excessive DOM operations
    if (typeof setupOptionSelection === 'function') {
        const originalSetupFunction = setupOptionSelection;
        
        window.setupOptionSelection = function() {
            // Remove existing event listeners before adding new ones
            document.querySelectorAll('.option').forEach(option => {
                const clone = option.cloneNode(true);
                option.parentNode.replaceChild(clone, option);
            });
            
            // Call original function
            originalSetupFunction();
        };
    }
    
    // Fix chart rendering performance
    if (typeof Chart !== 'undefined' && typeof window.BusinessAssessmentVisualizations !== 'undefined') {
        // Reduce data points for better performance
        const originalRadarChart = window.BusinessAssessmentVisualizations.initializeMaturityRadarChart;
        
        window.BusinessAssessmentVisualizations.initializeMaturityRadarChart = function() {
            // Check if device is low-powered
            const isLowPowered = window.navigator.hardwareConcurrency < 4 || 
                                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isLowPowered) {
                // Reduce animation duration for better performance
                Chart.defaults.animation.duration = 500;
                
                // Simplify radar chart for better performance
                const ctx = document.getElementById('maturityRadarChart');
                if (ctx) {
                    const radarChart = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ['Operations', 'Technology', 'Strategy', 'Culture', 'Innovation', 'Customer'],
                            datasets: [{
                                label: 'Your Company',
                                data: assessmentData.companyScores || [65, 48, 72, 58, 40, 53],
                                backgroundColor: 'rgba(94, 79, 219, 0.2)',
                                borderColor: 'rgba(94, 79, 219, 1)',
                                borderWidth: 2,
                                pointBackgroundColor: 'rgba(94, 79, 219, 1)'
                            }]
                        },
                        options: {
                            scales: {
                                r: {
                                    angleLines: {
                                        display: false
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 100
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }
                    });
                    
                    return;
                }
            }
            
            // Call original function for powerful devices
            originalRadarChart();
        };
    }
    
    // Fix memory leaks
    window.addEventListener('beforeunload', function() {
        // Clean up Chart.js instances
        if (typeof Chart !== 'undefined') {
            Chart.instances.forEach(instance => {
                instance.destroy();
            });
        }
        
        // Remove event listeners
        document.querySelectorAll('.option, .btn, .step').forEach(element => {
            element.replaceWith(element.cloneNode(true));
        });
    });
}

/**
 * Fix mobile-specific issues
 */
function fixMobileIssues() {
    // Fix touch target size issues
    const touchFixes = document.createElement('style');
    touchFixes.textContent = `
        @media (max-width: 768px) {
            /* Ensure minimum touch target size of 44x44px */
            .btn, .option, .step, .help-icon, input[type="radio"], input[type="checkbox"] {
                min-height: 44px;
                min-width: 44px;
            }
            
            /* Fix for iOS input zoom */
            input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select, textarea {
                font-size: 16px;
            }
            
            /* Fix for iOS button styling */
            .btn {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }
            
            /* Fix for iOS scrolling */
            .results-container {
                -webkit-overflow-scrolling: touch;
            }
        }
    `;
    document.head.appendChild(touchFixes);
    
    // Fix iOS scroll bounce issues
    document.addEventListener('touchmove', function(e) {
        // Check if this is a modal that shouldn't bounce
        if (e.target.closest('.recommendation-modal-content')) {
            const modal = e.target.closest('.recommendation-modal-content');
            const scrollTop = modal.scrollTop;
            const scrollHeight = modal.scrollHeight;
            const height = modal.clientHeight;
            const delta = e.touches[0].clientY - window.touchY;
            
            window.touchY = e.touches[0].clientY;
            
            // Prevent overscroll
            if ((scrollTop <= 0 && delta > 0) || (scrollTop + height >= scrollHeight && delta < 0)) {
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    document.addEventListener('touchstart', function(e) {
        window.touchY = e.touches[0].clientY;
    });
    
    // Fix for mobile keyboard issues
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll to input when focused
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
        
        input.addEventListener('blur', function() {
            // Scroll back to normal position when input loses focus
            window.scrollTo(0, window.scrollY);
        });
    });
}

// Initialize issue fixes when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize issue fixes
    initializeIssueFixes();
});

// Export issue fix functions
window.IssueFixer = {
    initializeIssueFixes,
    fixBrowserCompatibilityIssues,
    fixEdgeCases,
    fixAccessibilityIssues,
    fixPerformanceBottlenecks,
    fixMobileIssues
};
