/**
 * Main Application Logic for Business Assessment Tool
 * This file contains the core functionality for the assessment flow
 */

// Global assessment data object
let assessmentData = {
    companyType: '',
    industry: '',
    companySize: '',
    role: '',
    departments: [],
    priorities: [],
    challenges: [],
    companyScores: [0, 0, 0, 0, 0, 0],
    operationsMaturity: '',
    technologyMaturity: '',
    responses: {}
};

// Store assessment data in localStorage to persist between page refreshes
function saveAssessmentData() {
    try {
        localStorage.setItem('businessAssessmentData', JSON.stringify(assessmentData));
        localStorage.setItem('businessAssessmentTimestamp', Date.now().toString());
    } catch (e) {
        console.warn('Could not save assessment data to localStorage:', e);
    }
}

// Load assessment data from localStorage if available
function loadAssessmentData() {
    try {
        const savedData = localStorage.getItem('businessAssessmentData');
        const timestamp = localStorage.getItem('businessAssessmentTimestamp');
        
        if (savedData && timestamp) {
            // Check if data is less than 24 hours old
            const age = Date.now() - parseInt(timestamp);
            const maxAge = 24 * 60 * 60 * 1000; // 24 hours
            
            if (age < maxAge) {
                const parsedData = JSON.parse(savedData);
                if (parsedData && typeof parsedData === 'object') {
                    assessmentData = parsedData;
                    return true;
                }
            }
        }
    } catch (e) {
        console.warn('Could not load assessment data from localStorage:', e);
    }
    return false;
}

// Initialize the assessment tool
function initializeAssessment() {
    // Check for existing assessment data
    const hasExistingData = loadAssessmentData();
    
    // Set up event listeners
    setupEventListeners();
    
    // If we have existing data and we're on the results page, show results
    if (hasExistingData && window.location.hash === '#results') {
        showResults();
    } else if (hasExistingData) {
        // Add a button to load previous results
        const startContainer = document.querySelector('.hero');
        if (startContainer) {
            const loadPreviousBtn = document.createElement('button');
            loadPreviousBtn.className = 'btn btn-secondary';
            loadPreviousBtn.textContent = 'Load Previous Assessment';
            loadPreviousBtn.style.marginLeft = '1rem';
            
            loadPreviousBtn.addEventListener('click', function() {
                showResults();
            });
            
            // Add button next to Get Started
            const getStartedBtn = document.getElementById('getStartedBtn');
            if (getStartedBtn) {
                getStartedBtn.parentNode.insertBefore(loadPreviousBtn, getStartedBtn.nextSibling);
            }
        }
    }
}

// Set up event listeners for the assessment tool
function setupEventListeners() {
    // Get Started button
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            startAssessment();
        });
    }
    
    // Next buttons
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-current-step'));
            const nextStep = currentStep + 1;
            
            // Validate current step before proceeding
            if (validateStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });
    
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-current-step'));
            const prevStep = currentStep - 1;
            
            if (prevStep >= 1) {
                goToStep(prevStep);
            }
        });
    });
    
    // Submit button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            if (validateStep(4)) {
                processAssessment();
                showResults();
            }
        });
    }
    
    // Option selection
    setupOptionSelection();
}

// Set up option selection functionality
function setupOptionSelection() {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const questionGroup = this.closest('.question-group');
            if (!questionGroup) return;
            
            // Remove selected class from all options in this group
            questionGroup.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to this option
            this.classList.add('selected');
            
            // Store the selection in assessment data
            const questionId = this.getAttribute('data-question');
            const value = this.getAttribute('data-value');
            
            if (questionId && value) {
                // Store in responses object
                assessmentData.responses[questionId] = value;
                
                // Also store in specific fields for common questions
                const questionTitle = questionGroup.querySelector('h3').textContent;
                
                if (questionTitle.includes('type of company')) {
                    assessmentData.companyType = value;
                    
                    // Check if we need to show startup funding question
                    if (value === 'startup') {
                        const fundingQuestion = document.getElementById('startup-funding-question');
                        if (fundingQuestion) {
                            fundingQuestion.style.display = 'block';
                        }
                    }
                } else if (questionTitle.includes('industry')) {
                    assessmentData.industry = value;
                    loadIndustrySpecificQuestions(value);
                } else if (questionTitle.includes('employees')) {
                    assessmentData.companySize = value;
                } else if (questionTitle.includes('role')) {
                    assessmentData.role = value;
                    
                    // Check if we need to show executive priorities question
                    if (value === 'executive') {
                        const prioritiesQuestion = document.getElementById('executive-priorities-question');
                        if (prioritiesQuestion) {
                            prioritiesQuestion.style.display = 'block';
                        }
                    }
                }
                
                // Save data after each selection
                saveAssessmentData();
                
                // Check if this response should trigger follow-up questions
                if (window.ProgressiveDisclosure) {
                    window.ProgressiveDisclosure.checkForFollowUpQuestions(questionId, value);
                }
            }
        });
    });
    
    // Multi-select options (checkboxes)
    document.querySelectorAll('.multi-option').forEach(option => {
        option.addEventListener('click', function() {
            // Toggle selected class
            this.classList.toggle('selected');
            
            // Get all selected options in this group
            const questionGroup = this.closest('.question-group');
            if (!questionGroup) return;
            
            const selectedOptions = Array.from(questionGroup.querySelectorAll('.multi-option.selected')).map(opt => 
                opt.getAttribute('data-value')
            );
            
            // Store the selections in assessment data
            const questionTitle = questionGroup.querySelector('h3').textContent;
            
            if (questionTitle.includes('departments')) {
                assessmentData.departments = selectedOptions;
            } else if (questionTitle.includes('priorities')) {
                assessmentData.priorities = selectedOptions;
            } else if (questionTitle.includes('challenges')) {
                assessmentData.challenges = selectedOptions;
            }
            
            // Save data after each selection
            saveAssessmentData();
        });
    });
}

// Start the assessment
function startAssessment() {
    // Reset assessment data if starting fresh
    assessmentData = {
        companyType: '',
        industry: '',
        companySize: '',
        role: '',
        departments: [],
        priorities: [],
        challenges: [],
        companyScores: [0, 0, 0, 0, 0, 0],
        operationsMaturity: '',
        technologyMaturity: '',
        responses: {}
    };
    
    // Save empty assessment data
    saveAssessmentData();
    
    // Show the assessment container
    const heroContainer = document.querySelector('.hero');
    const assessmentContainer = document.getElementById('assessmentContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (heroContainer) heroContainer.style.display = 'none';
    if (assessmentContainer) assessmentContainer.style.display = 'block';
    if (resultsContainer) resultsContainer.style.display = 'none';
    
    // Go to step 1
    goToStep(1);
}

// Navigate to a specific step
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.assessment-step').forEach(step => {
        step.style.display = 'none';
    });
    
    // Show the target step
    const targetStep = document.getElementById(`step${stepNumber}`);
    if (targetStep) {
        targetStep.style.display = 'block';
        
        // Scroll to top of page
        window.scrollTo(0, 0);
        
        // Update progress indicator
        updateProgressIndicator(stepNumber);
        
        // If this is the industry step and industry is already selected, load industry questions
        if (stepNumber === 1 && assessmentData.industry) {
            loadIndustrySpecificQuestions(assessmentData.industry);
        }
        
        // If this is step 2 and role is executive, show executive priorities question
        if (stepNumber === 2 && assessmentData.role === 'executive') {
            const prioritiesQuestion = document.getElementById('executive-priorities-question');
            if (prioritiesQuestion) {
                prioritiesQuestion.style.display = 'block';
            }
        }
        
        // If this is step 1 and company type is startup, show startup funding question
        if (stepNumber === 1 && assessmentData.companyType === 'startup') {
            const fundingQuestion = document.getElementById('startup-funding-question');
            if (fundingQuestion) {
                fundingQuestion.style.display = 'block';
            }
        }
        
        // Restore selected options based on stored data
        restoreSelections(targetStep);
    }
}

// Update progress indicator
function updateProgressIndicator(currentStep) {
    document.querySelectorAll('.progress-indicator .step').forEach((step, index) => {
        // Steps are 1-indexed in the UI but 0-indexed in the DOM
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('current');
        } else if (stepNumber === currentStep) {
            step.classList.add('current');
            step.classList.remove('completed');
        } else {
            step.classList.remove('completed');
            step.classList.remove('current');
        }
    });
}

// Restore selections based on stored assessment data
function restoreSelections(stepElement) {
    // Restore single-select options
    Object.entries(assessmentData.responses).forEach(([questionId, value]) => {
        const option = stepElement.querySelector(`.option[data-question="${questionId}"][data-value="${value}"]`);
        if (option) {
            option.classList.add('selected');
        }
    });
    
    // Restore multi-select options
    if (assessmentData.departments.length > 0) {
        assessmentData.departments.forEach(dept => {
            const option = stepElement.querySelector(`.multi-option[data-value="${dept}"]`);
            if (option) {
                option.classList.add('selected');
            }
        });
    }
    
    if (assessmentData.priorities.length > 0) {
        assessmentData.priorities.forEach(priority => {
            const option = stepElement.querySelector(`.multi-option[data-value="${priority}"]`);
            if (option) {
                option.classList.add('selected');
            }
        });
    }
    
    if (assessmentData.challenges.length > 0) {
        assessmentData.challenges.forEach(challenge => {
            const option = stepElement.querySelector(`.multi-option[data-value="${challenge}"]`);
            if (option) {
                option.classList.add('selected');
            }
        });
    }
}

// Validate a step before proceeding
function validateStep(stepNumber) {
    switch (stepNumber) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return validateStep4();
        default:
            return true;
    }
}

// Validate step 1 (Company Context)
function validateStep1() {
    if (!assessmentData.companyType) {
        alert('Please select your company type.');
        return false;
    }
    
    if (!assessmentData.industry) {
        alert('Please select your industry.');
        return false;
    }
    
    if (!assessmentData.companySize) {
        alert('Please select your company size.');
        return false;
    }
    
    return true;
}

// Validate step 2 (User Context)
function validateStep2() {
    if (!assessmentData.role) {
        alert('Please select your role.');
        return false;
    }
    
    if (assessmentData.departments.length === 0) {
        alert('Please select at least one department.');
        return false;
    }
    
    return true;
}

// Validate step 3 (Business Priorities)
function validateStep3() {
    if (assessmentData.priorities.length === 0) {
        alert('Please select at least one business priority.');
        return false;
    }
    
    if (assessmentData.challenges.length === 0) {
        alert('Please select at least one business challenge.');
        return false;
    }
    
    return true;
}

// Validate step 4 (Assessment Questions)
function validateStep4() {
    const operationsMaturity = document.querySelector('input[name="operations-maturity"]:checked');
    const technologyMaturity = document.querySelector('input[name="technology-maturity"]:checked');
    
    if (!operationsMaturity) {
        alert('Please select your operations maturity level.');
        return false;
    }
    
    if (!technologyMaturity) {
        alert('Please select your technology maturity level.');
        return false;
    }
    
    // Store the maturity levels
    assessmentData.operationsMaturity = operationsMaturity.value;
    assessmentData.technologyMaturity = technologyMaturity.value;
    
    // Save the updated assessment data
    saveAssessmentData();
    
    return true;
}

// Load industry-specific questions
function loadIndustrySpecificQuestions(industry) {
    const container = document.getElementById('industry-specific-questions');
    if (!container) return;
    
    // Check if we have the industry questions module
    if (window.IndustryQuestions && typeof window.IndustryQuestions.generateIndustryQuestionsHTML === 'function') {
        // Generate HTML for industry-specific questions
        const html = window.IndustryQuestions.generateIndustryQuestionsHTML(industry);
        
        // Insert the HTML
        container.innerHTML = html;
        
        // Set up option selection for new questions
        setupOptionSelection();
    } else {
        // Fallback for when the module isn't available
        container.innerHTML = `
            <div class="question-group">
                <h3>Industry-Specific Assessment</h3>
                <p>Please answer these questions specific to the ${industry} industry:</p>
                
                <div class="sub-question">
                    <h4>How would you rate your organization's digital transformation efforts?</h4>
                    <div class="options-grid">
                        <div class="option" data-question="digital-transformation" data-value="beginning">
                            <h4>Just Beginning</h4>
                            <p>We're in the early stages of our digital journey.</p>
                        </div>
                        <div class="option" data-question="digital-transformation" data-value="in-progress">
                            <h4>In Progress</h4>
                            <p>We've made significant progress but still have work to do.</p>
                        </div>
                        <div class="option" data-question="digital-transformation" data-value="advanced">
                            <h4>Advanced</h4>
                            <p>We're well along in our digital transformation.</p>
                        </div>
                        <div class="option" data-question="digital-transformation" data-value="leader">
                            <h4>Industry Leader</h4>
                            <p>We're at the forefront of digital innovation in our industry.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Set up option selection for new questions
        setupOptionSelection();
    }
}

// Process the assessment data
function processAssessment() {
    // Calculate company scores based on responses
    calculateScores();
    
    // Save the final assessment data
    saveAssessmentData();
    
    // Generate recommendations if AI engine is available
    if (window.AIRecommendationEngine && typeof window.AIRecommendationEngine.generateRecommendations === 'function') {
        const recommendations = window.AIRecommendationEngine.generateRecommendations(assessmentData);
        assessmentData.recommendations = recommendations;
        saveAssessmentData();
    }
}

// Calculate scores based on assessment responses
function calculateScores() {
    // Default base scores
    let operationsScore = 50;
    let technologyScore = 50;
    let strategyScore = 50;
    let cultureScore = 50;
    let innovationScore = 50;
    let customerScore = 50;
    
    // Adjust based on company type
    switch (assessmentData.companyType) {
        case 'startup':
            innovationScore += 10;
            cultureScore += 5;
            operationsScore -= 5;
            break;
        case 'small-business':
            customerScore += 5;
            operationsScore -= 5;
            break;
        case 'medium-business':
            operationsScore += 5;
            strategyScore += 5;
            break;
        case 'enterprise':
            strategyScore += 10;
            operationsScore += 5;
            innovationScore -= 5;
            break;
    }
    
    // Adjust based on industry
    switch (assessmentData.industry) {
        case 'technology':
            technologyScore += 10;
            innovationScore += 5;
            break;
        case 'finance':
            operationsScore += 10;
            technologyScore += 5;
            break;
        case 'healthcare':
            operationsScore += 5;
            customerScore += 5;
            break;
        case 'retail':
            customerScore += 10;
            innovationScore += 5;
            break;
    }
    
    // Adjust based on operations maturity
    switch (assessmentData.operationsMaturity) {
        case 'ad-hoc':
            operationsScore = 30;
            strategyScore -= 5;
            break;
        case 'defined':
            operationsScore = 50;
            break;
        case 'measured':
            operationsScore = 70;
            strategyScore += 5;
            break;
        case 'optimized':
            operationsScore = 90;
            strategyScore += 10;
            break;
    }
    
    // Adjust based on technology maturity
    switch (assessmentData.technologyMaturity) {
        case 'basic':
            technologyScore = 30;
            innovationScore -= 5;
            break;
        case 'standard':
            technologyScore = 50;
            break;
        case 'advanced':
            technologyScore = 70;
            innovationScore += 5;
            break;
        case 'cutting-edge':
            technologyScore = 90;
            innovationScore += 10;
            break;
    }
    
    // Adjust based on priorities
    if (assessmentData.priorities.includes('operational-efficiency')) {
        operationsScore += 5;
    }
    
    if (assessmentData.priorities.includes('technology-systems')) {
        technologyScore += 5;
    }
    
    if (assessmentData.priorities.includes('strategic-planning')) {
        strategyScore += 5;
    }
    
    if (assessmentData.priorities.includes('team-culture')) {
        cultureScore += 5;
    }
    
    if (assessmentData.priorities.includes('innovation')) {
        innovationScore += 5;
    }
    
    if (assessmentData.priorities.includes('customer-experience')) {
        customerScore += 5;
    }
    
    // Adjust based on challenges
    if (assessmentData.challenges.includes('process-bottlenecks')) {
        operationsScore -= 5;
    }
    
    if (assessmentData.challenges.includes('technology-integration')) {
        technologyScore -= 5;
    }
    
    if (assessmentData.challenges.includes('strategic-alignment')) {
        strategyScore -= 5;
    }
    
    if (assessmentData.challenges.includes('team-collaboration')) {
        cultureScore -= 5;
    }
    
    if (assessmentData.challenges.includes('market-disruption')) {
        innovationScore -= 5;
    }
    
    if (assessmentData.challenges.includes('customer-retention')) {
        customerScore -= 5;
    }
    
    // Ensure scores are within 0-100 range
    operationsScore = Math.max(0, Math.min(100, operationsScore));
    technologyScore = Math.max(0, Math.min(100, technologyScore));
    strategyScore = Math.max(0, Math.min(100, strategyScore));
    cultureScore = Math.max(0, Math.min(100, cultureScore));
    innovationScore = Math.max(0, Math.min(100, innovationScore));
    customerScore = Math.max(0, Math.min(100, customerScore));
    
    // Store the calculated scores
    assessmentData.companyScores = [
        operationsScore,
        technologyScore,
        strategyScore,
        cultureScore,
        innovationScore,
        customerScore
    ];
}

// Show the assessment results
function showResults() {
    // Hide other containers
    const heroContainer = document.querySelector('.hero');
    const assessmentContainer = document.getElementById('assessmentContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (heroContainer) heroContainer.style.display = 'none';
    if (assessmentContainer) assessmentContainer.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'block';
    
    // Update URL hash
    window.location.hash = 'results';
    
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    // Update context summary
    updateContextSummary();
    
    // Update maturity scores
    updateMaturityScores();
    
    // Initialize charts if visualization module is available
    if (window.BusinessAssessmentVisualizations && typeof window.BusinessAssessmentVisualizations.initializeCharts === 'function') {
        window.BusinessAssessmentVisualizations.initializeCharts();
    }
    
    // Update results with recommendations if available
    if (assessmentData.recommendations && window.updateResultsWithRecommendations) {
        window.updateResultsWithRecommendations(assessmentData.recommendations);
    }
}

// Update the context summary in the results
function updateContextSummary() {
    const companyTypeElement = document.getElementById('companyType');
    const industryElement = document.getElementById('industry');
    const companySizeElement = document.getElementById('companySize');
    const roleElement = document.getElementById('role');
    
    if (companyTypeElement) {
        companyTypeElement.textContent = getReadableCompanyType(assessmentData.companyType);
    }
    
    if (industryElement) {
        industryElement.textContent = getReadableIndustry(assessmentData.industry);
    }
    
    if (companySizeElement) {
        companySizeElement.textContent = getReadableCompanySize(assessmentData.companySize);
    }
    
    if (roleElement) {
        roleElement.textContent = getReadableRole(assessmentData.role);
    }
}

// Update the maturity scores in the results
function updateMaturityScores() {
    const operationsProgress = document.getElementById('operationsProgress');
    const technologyProgress = document.getElementById('technologyProgress');
    const operationsScore = document.getElementById('operationsScore');
    const technologyScore = document.getElementById('technologyScore');
    const operationsInsight = document.getElementById('operationsInsight');
    const technologyInsight = document.getElementById('technologyInsight');
    
    if (operationsProgress && assessmentData.companyScores[0]) {
        operationsProgress.style.width = `${assessmentData.companyScores[0]}%`;
    }
    
    if (technologyProgress && assessmentData.companyScores[1]) {
        technologyProgress.style.width = `${assessmentData.companyScores[1]}%`;
    }
    
    if (operationsScore && assessmentData.companyScores[0]) {
        operationsScore.textContent = `${Math.round(assessmentData.companyScores[0])}%`;
    }
    
    if (technologyScore && assessmentData.companyScores[1]) {
        technologyScore.textContent = `${Math.round(assessmentData.companyScores[1])}%`;
    }
    
    if (operationsInsight) {
        if (assessmentData.companyScores[0] < 40) {
            operationsInsight.textContent = "Your operations show significant opportunities for improvement in documentation and standardization.";
        } else if (assessmentData.companyScores[0] < 70) {
            operationsInsight.textContent = "Your operations show some opportunities for improvement in consistency and optimization.";
        } else {
            operationsInsight.textContent = "Your operations show relative strength with established processes and continuous improvement.";
        }
    }
    
    if (technologyInsight) {
        if (assessmentData.companyScores[1] < 40) {
            technologyInsight.textContent = "Your technology infrastructure has significant room for modernization and better integration.";
        } else if (assessmentData.companyScores[1] < 70) {
            technologyInsight.textContent = "Your technology systems are functional but could benefit from better integration and strategic alignment.";
        } else {
            technologyInsight.textContent = "Your technology infrastructure demonstrates good integration and modern capabilities aligned with business needs.";
        }
    }
}

// Get readable company type
function getReadableCompanyType(type) {
    switch (type) {
        case 'startup':
            return 'Startup';
        case 'small-business':
            return 'Small Business';
        case 'medium-business':
            return 'Medium Business';
        case 'enterprise':
            return 'Enterprise';
        default:
            return type;
    }
}

// Get readable industry
function getReadableIndustry(industry) {
    switch (industry) {
        case 'technology':
            return 'Technology';
        case 'finance':
            return 'Finance';
        case 'healthcare':
            return 'Healthcare';
        case 'retail':
            return 'Retail';
        default:
            return industry;
    }
}

// Get readable company size
function getReadableCompanySize(size) {
    switch (size) {
        case '1-10':
            return '1-10 employees';
        case '11-50':
            return '11-50 employees';
        case '51-200':
            return '51-200 employees';
        case '201-1000':
            return '201-1000 employees';
        case '1000+':
            return '1000+ employees';
        default:
            return size;
    }
}

// Get readable role
function getReadableRole(role) {
    switch (role) {
        case 'executive':
            return 'Executive';
        case 'middle-management':
            return 'Middle Management';
        case 'team-lead':
            return 'Team Lead';
        case 'individual-contributor':
            return 'Individual Contributor';
        default:
            return role;
    }
}

// Reset the assessment
function resetAssessment() {
    // Clear localStorage
    localStorage.removeItem('businessAssessmentData');
    localStorage.removeItem('businessAssessmentTimestamp');
    
    // Reload the page
    window.location.href = window.location.pathname;
}

// Initialize the assessment tool when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAssessment();
});

// Export functions for use in other modules
window.startAssessment = startAssessment;
window.goToStep = goToStep;
window.validateStep = validateStep;
window.processAssessment = processAssessment;
window.showResults = showResults;
window.resetAssessment = resetAssessment;
window.setupOptionSelection = setupOptionSelection;
window.loadIndustrySpecificQuestions = loadIndustrySpecificQuestions;
