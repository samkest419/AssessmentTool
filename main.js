/**
 * Main JavaScript file for the Business Assessment Tool
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize state
    const state = loadState() || {
        currentStep: 1,
        answers: {},
        multiSelections: {}
    };

    // DOM elements
    const getStartedBtn = document.getElementById('getStartedBtn');
    const assessmentContainer = document.getElementById('assessmentContainer');
    const resultsContainer = document.getElementById('resultsContainer');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const printBtn = document.getElementById('printBtn');
    const industrySpecificQuestionsContainer = document.getElementById('industry-specific-questions');
    const industrySubcategoryQuestion = document.getElementById('industry-subcategory-question');
    const industrySubcategoryOptions = document.getElementById('industry-subcategory-options');
    const otherIndustryQuestion = document.getElementById('other-industry-question');
    const otherIndustryInput = document.getElementById('other-industry-input');
    const startupFundingQuestion = document.getElementById('startup-funding-question');
    const executivePrioritiesQuestion = document.getElementById('executive-priorities-question');

    // Initialize the assessment
    initializeAssessment();

    // Event listeners
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            // Scroll to top before showing assessment
            window.scrollTo(0, 0);
            assessmentContainer.style.display = 'block';
            document.querySelector('.hero').style.display = 'none';
            document.querySelector('.features').style.display = 'none';
            
            // Show the current step
            showStep(state.currentStep);
            saveState();
        });
    }

    // Add event listeners to all next buttons
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-current-step'));
            
            // Validate current step
            if (!validateStep(currentStep)) {
                showError(`Please complete all required questions in Step ${currentStep}`);
                return;
            }
            
            // Scroll to top before showing next step
            window.scrollTo(0, 0);
            
            // Move to next step
            showStep(currentStep + 1);
            state.currentStep = currentStep + 1;
            saveState();
        });
    });

    // Add event listeners to all back buttons
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-current-step'));
            
            // Scroll to top before showing previous step
            window.scrollTo(0, 0);
            
            // Move to previous step
            showStep(currentStep - 1);
            state.currentStep = currentStep - 1;
            saveState();
        });
    });

    // Add event listeners to all single-select options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            const value = this.getAttribute('data-value');
            
            // Remove selected class from all options in this question group
            document.querySelectorAll(`.option[data-question="${question}"]`).forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to this option
            this.classList.add('selected');
            
            // Save the answer
            state.answers[question] = value;
            saveState();
            
            // Handle conditional questions
            handleConditionalQuestions(question, value);
        });
    });

    // Add event listeners to all multi-select options
    document.querySelectorAll('.multi-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionGroup = this.parentElement;
            const questionId = questionGroup.getAttribute('data-id');
            const value = this.getAttribute('data-value');
            
            // Toggle selected class
            this.classList.toggle('selected');
            
            // Initialize array for this question if it doesn't exist
            if (!state.multiSelections[questionId]) {
                state.multiSelections[questionId] = [];
            }
            
            // Add or remove value from array
            if (this.classList.contains('selected')) {
                if (!state.multiSelections[questionId].includes(value)) {
                    state.multiSelections[questionId].push(value);
                }
            } else {
                state.multiSelections[questionId] = state.multiSelections[questionId].filter(v => v !== value);
            }
            
            saveState();
        });
    });

    // Add event listener to submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // Validate final step
            if (!validateStep(4)) {
                showError('Please complete all required questions before submitting');
                return;
            }
            
            // Calculate results
            calculateResults();
            
            // Scroll to top before showing results
            window.scrollTo(0, 0);
            
            // Show results
            assessmentContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Reset state for a new assessment
            state.currentStep = 1;
            saveState();
        });
    }

    // Add event listener to reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Clear state
            clearState();
            
            // Reload page
            window.location.reload();
        });
    }

    // Add event listener to print button
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Add event listeners to help icons
    document.querySelectorAll('.help-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const question = this.getAttribute('data-question');
            showHelp(question);
        });
    });

    // Add event listener to other industry input
    if (otherIndustryInput) {
        otherIndustryInput.addEventListener('input', function() {
            state.answers['other-industry'] = this.value;
            saveState();
        });
    }

    // Initialize from saved state
    function initializeAssessment() {
        // If we have saved answers, restore the UI state
        if (state.answers) {
            // Restore single-select answers
            for (const question in state.answers) {
                const value = state.answers[question];
                const option = document.querySelector(`.option[data-question="${question}"][data-value="${value}"]`);
                if (option) {
                    option.classList.add('selected');
                    
                    // Handle conditional questions
                    handleConditionalQuestions(question, value);
                }
            }
            
            // Restore multi-select answers
            for (const questionId in state.multiSelections) {
                const values = state.multiSelections[questionId];
                values.forEach(value => {
                    const option = document.querySelector(`.question-group[data-id="${questionId}"] .multi-option[data-value="${value}"]`);
                    if (option) {
                        option.classList.add('selected');
                    }
                });
            }
            
            // Restore other industry input
            if (state.answers['other-industry'] && otherIndustryInput) {
                otherIndustryInput.value = state.answers['other-industry'];
            }
        }
        
        // If we're in the middle of an assessment, show the current step
        if (state.currentStep > 1) {
            assessmentContainer.style.display = 'block';
            document.querySelector('.hero').style.display = 'none';
            document.querySelector('.features').style.display = 'none';
            showStep(state.currentStep);
        } else {
            // Otherwise, hide the assessment container
            assessmentContainer.style.display = 'none';
            resultsContainer.style.display = 'none';
        }
    }

    // Show a specific step
    function showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.assessment-step').forEach(step => {
            step.style.display = 'none';
        });
        
        // Show the requested step
        const stepElement = document.getElementById(`step${stepNumber}`);
        if (stepElement) {
            stepElement.style.display = 'block';
        }
        
        // Update progress indicator
        updateProgressIndicator(stepNumber);
        
        // If this is step 4, load industry-specific questions
        if (stepNumber === 4) {
            loadIndustrySpecificQuestions();
        }
    }

    // Update the progress indicator
    function updateProgressIndicator(stepNumber) {
        // Update step circles
        document.querySelectorAll('.progress-indicator .step').forEach((step, index) => {
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('current');
            } else if (index + 1 === stepNumber) {
                step.classList.add('current');
                step.classList.remove('completed');
            } else {
                step.classList.remove('current', 'completed');
            }
        });
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            const stepTitles = ['Company Context', 'User Context', 'Business Priorities', 'Assessment'];
            progressText.innerHTML = `<span class="current-step">Step ${stepNumber} of 4:</span> ${stepTitles[stepNumber - 1]}`;
        }
    }

    // Validate a step
    function validateStep(stepNumber) {
        let isValid = true;
        
        // Different validation for each step
        if (stepNumber === 1) {
            // Company Context - require company type and industry
            if (!state.answers['company-type'] || !state.answers['industry'] || !state.answers['business-maturity']) {
                isValid = false;
            }
            
            // If industry is "other", require other-industry input
            if (state.answers['industry'] === 'other' && (!state.answers['other-industry'] || state.answers['other-industry'].trim() === '')) {
                isValid = false;
            }
            
            // If company type is "startup", require startup-funding
            if (state.answers['company-type'] === 'startup' && !state.answers['startup-funding']) {
                isValid = false;
            }
        } else if (stepNumber === 2) {
            // User Context - require role and functional area
            if (!state.answers['role'] || !state.answers['functional-area']) {
                isValid = false;
            }
            
            // Require at least one cross-functional selection
            if (!state.multiSelections['cross-functional'] || state.multiSelections['cross-functional'].length === 0) {
                isValid = false;
            }
            
            // If role is executive or founder, require executive priorities
            if ((state.answers['role'] === 'executive' || state.answers['role'] === 'founder') && 
                (!state.multiSelections['executive-priorities'] || state.multiSelections['executive-priorities'].length === 0)) {
                isValid = false;
            }
        } else if (stepNumber === 3) {
            // Business Focus Areas - require at least one selection
            if (!state.multiSelections['focus-areas'] || state.multiSelections['focus-areas'].length === 0) {
                isValid = false;
            }
        } else if (stepNumber === 4) {
            // Assessment - require operations, technology, and data maturity
            if (!state.answers['operations-maturity'] || !state.answers['technology-maturity'] || !state.answers['data-maturity']) {
                isValid = false;
            }
            
            // Make industry-specific questions optional for now to ensure users can submit
            // We'll check if the industry-specific questions container has any visible children
            const industryQuestionsContainer = document.getElementById('industry-specific-questions');
            const hasVisibleIndustryQuestions = industryQuestionsContainer && 
                                               industryQuestionsContainer.children.length > 0 &&
                                               window.getComputedStyle(industryQuestionsContainer).display !== 'none';
            
            // Only validate industry-specific questions if they are visible to the user
            if (hasVisibleIndustryQuestions) {
                const industry = state.answers['industry'];
                if (industry && typeof industrySpecificQuestions !== 'undefined' && industrySpecificQuestions[industry]) {
                    const questions = industrySpecificQuestions[industry];
                    for (const question of questions) {
                        if (question.type === 'single' && !state.answers[question.id]) {
                            isValid = false;
                        } else if (question.type === 'multi' && 
                                (!state.multiSelections[question.id] || state.multiSelections[question.id].length === 0)) {
                            isValid = false;
                        }
                    }
                }
            }
        }
        
        return isValid;
    }

    // Show error message
    function showError(message) {
        // Check if error element already exists
        let errorElement = document.querySelector('.error-message');
        
        if (!errorElement) {
            // Create error element
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            
            // Insert at the top of the current step
            const currentStep = document.getElementById(`step${state.currentStep}`);
            if (currentStep) {
                currentStep.insertBefore(errorElement, currentStep.firstChild);
            }
        }
        
        // Set message and show
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }

    // Show help tooltip
    function showHelp(question) {
        // Help content for different questions
        const helpContent = {
            'company-type': 'Select the option that best describes your organization\'s structure and size.',
            'business-maturity': 'Select the stage that best represents where your organization is in its business lifecycle.',
            'industry': 'Choose the industry that most closely aligns with your organization\'s primary business activities.',
            'operations-maturity': 'This measures how well-defined, documented, and optimized your business processes are.',
            'technology-maturity': 'This measures the sophistication and integration of your technology systems.',
            'data-maturity': 'This measures how effectively your organization collects, manages, and utilizes data.'
        };
        
        // Check if help tooltip already exists
        let helpTooltip = document.querySelector('.help-tooltip');
        
        if (!helpTooltip) {
            // Create help tooltip
            helpTooltip = document.createElement('div');
            helpTooltip.className = 'help-tooltip';
            document.body.appendChild(helpTooltip);
        }
        
        // Set content
        helpTooltip.textContent = helpContent[question] || 'No help available for this question.';
        
        // Position tooltip near the help icon
        const helpIcon = document.querySelector(`.help-icon[data-question="${question}"]`);
        if (helpIcon) {
            const rect = helpIcon.getBoundingClientRect();
            helpTooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
            helpTooltip.style.left = `${rect.left + window.scrollX - 150}px`;
            helpTooltip.style.display = 'block';
        }
        
        // Hide tooltip when clicking elsewhere
        document.addEventListener('click', function hideTooltip() {
            helpTooltip.style.display = 'none';
            document.removeEventListener('click', hideTooltip);
        });
    }

    // Handle conditional questions
    function handleConditionalQuestions(question, value) {
        // Show/hide startup funding question
        if (question === 'company-type') {
            if (value === 'startup') {
                startupFundingQuestion.style.display = 'block';
            } else {
                startupFundingQuestion.style.display = 'none';
            }
        }
        
        // Show/hide executive priorities question
        if (question === 'role') {
            if (value === 'executive' || value === 'founder') {
                executivePrioritiesQuestion.style.display = 'block';
            } else {
                executivePrioritiesQuestion.style.display = 'none';
            }
        }
        
        // Show/hide industry subcategory question
        if (question === 'industry') {
            if (value === 'other') {
                industrySubcategoryQuestion.style.display = 'none';
                otherIndustryQuestion.style.display = 'block';
            } else {
                otherIndustryQuestion.style.display = 'none';
                
                // Check if we have subcategories for this industry
                if (industrySubcategories[value] && industrySubcategories[value].length > 0) {
                    // Populate subcategory options
                    industrySubcategoryOptions.innerHTML = '';
                    industrySubcategories[value].forEach(subcategory => {
                        const option = document.createElement('div');
                        option.className = 'option';
                        option.setAttribute('data-question', 'industry-subcategory');
                        option.setAttribute('data-value', subcategory.value);
                        
                        const heading = document.createElement('h4');
                        heading.textContent = subcategory.label;
                        option.appendChild(heading);
                        
                        industrySubcategoryOptions.appendChild(option);
                        
                        // Add event listener
                        option.addEventListener('click', function() {
                            // Remove selected class from all options
                            document.querySelectorAll('.option[data-question="industry-subcategory"]').forEach(opt => {
                                opt.classList.remove('selected');
                            });
                            
                            // Add selected class to this option
                            this.classList.add('selected');
                            
                            // Save the answer
                            state.answers['industry-subcategory'] = subcategory.value;
                            saveState();
                        });
                    });
                    
                    // Show subcategory question
                    industrySubcategoryQuestion.style.display = 'block';
                    
                    // Restore selected subcategory if any
                    if (state.answers['industry-subcategory']) {
                        const option = document.querySelector(`.option[data-question="industry-subcategory"][data-value="${state.answers['industry-subcategory']}"]`);
                        if (option) {
                            option.classList.add('selected');
                        }
                    }
                } else {
                    industrySubcategoryQuestion.style.display = 'none';
                }
            }
        }
    }

    // Load industry-specific questions
    function loadIndustrySpecificQuestions() {
        // Clear container
        industrySpecificQuestionsContainer.innerHTML = '';
        
        // Get selected industry
        const industry = state.answers['industry'];
        
        // If no industry selected or no questions for this industry, return
        if (!industry || !industrySpecificQuestions[industry]) {
            return;
        }
        
        // Add industry-specific questions
        const questions = industrySpecificQuestions[industry];
        questions.forEach(question => {
            // Create question group
            const questionGroup = document.createElement('div');
            questionGroup.className = 'question-group';
            questionGroup.setAttribute('data-id', question.id);
            
            // Add question heading
            const heading = document.createElement('h3');
            heading.textContent = question.question;
            questionGroup.appendChild(heading);
            
            // Add options
            if (question.type === 'single') {
                // Single-select options
                const optionsGrid = document.createElement('div');
                optionsGrid.className = 'options-grid';
                
                question.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'option';
                    optionElement.setAttribute('data-question', question.id);
                    optionElement.setAttribute('data-value', option.value);
                    
                    const optionHeading = document.createElement('h4');
                    optionHeading.textContent = option.label;
                    optionElement.appendChild(optionHeading);
                    
                    optionsGrid.appendChild(optionElement);
                    
                    // Add event listener
                    optionElement.addEventListener('click', function() {
                        // Remove selected class from all options in this question group
                        document.querySelectorAll(`.option[data-question="${question.id}"]`).forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        
                        // Add selected class to this option
                        this.classList.add('selected');
                        
                        // Save the answer
                        state.answers[question.id] = option.value;
                        saveState();
                    });
                });
                
                questionGroup.appendChild(optionsGrid);
                
                // Restore selected option if any
                if (state.answers[question.id]) {
                    const option = document.querySelector(`.option[data-question="${question.id}"][data-value="${state.answers[question.id]}"]`);
                    if (option) {
                        option.classList.add('selected');
                    }
                }
            } else if (question.type === 'multi') {
                // Multi-select options
                question.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'multi-option';
                    optionElement.setAttribute('data-value', option.value);
                    optionElement.textContent = option.label;
                    
                    questionGroup.appendChild(optionElement);
                    
                    // Add event listener
                    optionElement.addEventListener('click', function() {
                        // Toggle selected class
                        this.classList.toggle('selected');
                        
                        // Initialize array for this question if it doesn't exist
                        if (!state.multiSelections[question.id]) {
                            state.multiSelections[question.id] = [];
                        }
                        
                        // Add or remove value from array
                        if (this.classList.contains('selected')) {
                            if (!state.multiSelections[question.id].includes(option.value)) {
                                state.multiSelections[question.id].push(option.value);
                            }
                        } else {
                            state.multiSelections[question.id] = state.multiSelections[question.id].filter(v => v !== option.value);
                        }
                        
                        saveState();
                    });
                });
                
                // Restore selected options if any
                if (state.multiSelections[question.id]) {
                    state.multiSelections[question.id].forEach(value => {
                        const option = document.querySelector(`.question-group[data-id="${question.id}"] .multi-option[data-value="${value}"]`);
                        if (option) {
                            option.classList.add('selected');
                        }
                    });
                }
            }
            
            // Add question group to container
            industrySpecificQuestionsContainer.appendChild(questionGroup);
        });
    }

    // Calculate assessment results
    function calculateResults() {
        // Update context summary
        updateContextSummary();
        
        // Calculate scores
        const scores = calculateScores();
        
        // Update progress bars
        updateProgressBars(scores);
        
        // Generate charts
        generateCharts(scores);
        
        // Generate recommendations
        generateRecommendations(scores);
    }

    // Update context summary
    function updateContextSummary() {
        // Company type
        const companyTypeElement = document.getElementById('companyType');
        if (companyTypeElement && state.answers['company-type']) {
            const companyTypeMap = {
                'startup': 'Startup',
                'small-business': 'Small Business',
                'medium-business': 'Medium Business',
                'enterprise': 'Enterprise',
                'non-profit': 'Non-Profit',
                'government': 'Government',
                'education': 'Educational Institution',
                'other': 'Other'
            };
            companyTypeElement.textContent = companyTypeMap[state.answers['company-type']] || 'Not specified';
        }
        
        // Industry
        const industryElement = document.getElementById('industry');
        if (industryElement && state.answers['industry']) {
            const industryMap = {
                'technology': 'Technology',
                'finance': 'Finance & Insurance',
                'healthcare': 'Healthcare & Life Sciences',
                'retail': 'Retail & E-commerce',
                'manufacturing': 'Manufacturing',
                'professional-services': 'Professional Services',
                'education': 'Education',
                'real-estate': 'Real Estate & Construction',
                'media': 'Media & Entertainment',
                'hospitality': 'Hospitality & Tourism',
                'energy': 'Energy & Utilities',
                'transportation': 'Transportation & Logistics',
                'agriculture': 'Agriculture & Food',
                'non-profit': 'Non-Profit & Social Services',
                'government': 'Government & Public Sector',
                'other': state.answers['other-industry'] || 'Other'
            };
            industryElement.textContent = industryMap[state.answers['industry']] || 'Not specified';
        }
        
        // Business maturity
        const businessMaturityElement = document.getElementById('businessMaturity');
        if (businessMaturityElement && state.answers['business-maturity']) {
            const maturityMap = {
                'formation': 'Formation',
                'validation': 'Validation',
                'growth': 'Growth',
                'expansion': 'Expansion',
                'maturity': 'Maturity',
                'renewal': 'Renewal'
            };
            businessMaturityElement.textContent = maturityMap[state.answers['business-maturity']] || 'Not specified';
        }
        
        // Role
        const roleElement = document.getElementById('role');
        if (roleElement && state.answers['role']) {
            const roleMap = {
                'executive': 'Executive Leadership',
                'middle-management': 'Middle Management',
                'team-lead': 'Team Lead',
                'individual-contributor': 'Individual Contributor',
                'founder': 'Founder/Owner',
                'consultant': 'Consultant/Advisor',
                'board': 'Board Member',
                'other': 'Other'
            };
            roleElement.textContent = roleMap[state.answers['role']] || 'Not specified';
        }
        
        // Assessment summary
        const assessmentSummaryElement = document.getElementById('assessmentSummary');
        if (assessmentSummaryElement) {
            // Generate a personalized summary based on the assessment
            const companyType = state.answers['company-type'];
            const industry = state.answers['industry'];
            const maturity = state.answers['business-maturity'];
            const role = state.answers['role'];
            
            let summary = `Based on your assessment, your organization is at the ${maturityMap[maturity] || 'growth'} stage `;
            summary += `as a ${companyTypeMap[companyType] || 'business'} in the ${industryMap[industry] || 'industry'} sector. `;
            
            // Add more personalized insights based on the assessment
            if (companyType === 'startup' || companyType === 'small-business') {
                summary += 'Your organization shows potential for growth with the right strategic focus. ';
                summary += 'Balancing process formalization with continued innovation will be key to your success. ';
            } else if (companyType === 'medium-business') {
                summary += 'Your organization has established operations but may benefit from further optimization. ';
                summary += 'Focusing on scalable processes and technology integration can help support your continued growth. ';
            } else if (companyType === 'enterprise') {
                summary += 'Your organization has significant resources but may face challenges with agility and innovation. ';
                summary += 'Balancing stability with transformation initiatives will be important for maintaining competitive advantage. ';
            }
            
            // Add role-specific insights
            if (role === 'executive' || role === 'founder') {
                summary += 'As a leader, your focus on strategic direction and organizational capabilities will be critical. ';
            } else if (role === 'middle-management' || role === 'team-lead') {
                summary += 'In your management role, your ability to translate strategy into execution and develop team capabilities will be valuable. ';
            } else if (role === 'individual-contributor') {
                summary += 'Your perspective as an individual contributor provides important insights into operational realities and improvement opportunities. ';
            }
            
            assessmentSummaryElement.innerHTML = `<p>${summary}</p>`;
        }
    }

    // Calculate scores
    function calculateScores() {
        // Initialize scores
        const scores = {
            operations: 0,
            technology: 0,
            data: 0,
            strategy: 0,
            innovation: 0,
            people: 0,
            overall: 0
        };
        
        // Calculate operations score (0-100)
        if (state.answers['operations-maturity']) {
            const operationsScoreMap = {
                'ad-hoc': 25,
                'defined': 50,
                'measured': 75,
                'optimized': 100
            };
            scores.operations = operationsScoreMap[state.answers['operations-maturity']] || 0;
        }
        
        // Calculate technology score (0-100)
        if (state.answers['technology-maturity']) {
            const technologyScoreMap = {
                'basic': 25,
                'standard': 50,
                'advanced': 75,
                'cutting-edge': 100
            };
            scores.technology = technologyScoreMap[state.answers['technology-maturity']] || 0;
        }
        
        // Calculate data score (0-100)
        if (state.answers['data-maturity']) {
            const dataScoreMap = {
                'fragmented': 20,
                'organized': 40,
                'integrated': 60,
                'advanced-analytics': 80,
                'ai-driven': 100
            };
            scores.data = dataScoreMap[state.answers['data-maturity']] || 0;
        }
        
        // Calculate strategy score based on priorities and challenges (0-100)
        if (state.multiSelections['priorities'] && state.multiSelections['challenges']) {
            // Strategic priorities count more toward strategy score
            const strategicPriorities = ['strategic-planning', 'market-expansion', 'digital-transformation', 'innovation'];
            let strategyCount = 0;
            
            strategicPriorities.forEach(priority => {
                if (state.multiSelections['priorities'].includes(priority)) {
                    strategyCount++;
                }
            });
            
            // Calculate percentage of strategic priorities selected
            const strategyPercentage = (strategyCount / strategicPriorities.length) * 100;
            
            // Adjust based on challenges
            const strategicChallenges = ['strategic-alignment', 'market-disruption', 'competitive-pressure'];
            let challengeAdjustment = 0;
            
            strategicChallenges.forEach(challenge => {
                if (state.multiSelections['challenges'].includes(challenge)) {
                    challengeAdjustment -= 10; // Reduce score for each strategic challenge
                }
            });
            
            scores.strategy = Math.max(0, Math.min(100, strategyPercentage + challengeAdjustment));
        }
        
        // Calculate innovation score based on priorities and technology maturity (0-100)
        if (state.multiSelections['priorities'] && state.answers['technology-maturity']) {
            // Innovation priorities
            const innovationPriorities = ['innovation', 'digital-transformation', 'technology-systems'];
            let innovationCount = 0;
            
            innovationPriorities.forEach(priority => {
                if (state.multiSelections['priorities'].includes(priority)) {
                    innovationCount++;
                }
            });
            
            // Calculate percentage of innovation priorities selected
            const innovationPercentage = (innovationCount / innovationPriorities.length) * 100;
            
            // Adjust based on technology maturity
            const technologyBonus = {
                'basic': 0,
                'standard': 10,
                'advanced': 20,
                'cutting-edge': 30
            };
            
            const bonus = technologyBonus[state.answers['technology-maturity']] || 0;
            
            scores.innovation = Math.max(0, Math.min(100, innovationPercentage + bonus));
        }
        
        // Calculate people score based on priorities and challenges (0-100)
        if (state.multiSelections['priorities'] && state.multiSelections['challenges']) {
            // People-related priorities
            const peoplePriorities = ['team-culture', 'talent-acquisition'];
            let peopleCount = 0;
            
            peoplePriorities.forEach(priority => {
                if (state.multiSelections['priorities'].includes(priority)) {
                    peopleCount++;
                }
            });
            
            // Calculate percentage of people priorities selected
            const peoplePercentage = (peopleCount / peoplePriorities.length) * 100;
            
            // Adjust based on challenges
            const peopleChallenges = ['team-collaboration', 'talent-shortage', 'change-management'];
            let challengeAdjustment = 0;
            
            peopleChallenges.forEach(challenge => {
                if (state.multiSelections['challenges'].includes(challenge)) {
                    challengeAdjustment -= 10; // Reduce score for each people challenge
                }
            });
            
            scores.people = Math.max(0, Math.min(100, peoplePercentage + challengeAdjustment));
        }
        
        // Calculate overall score (weighted average)
        scores.overall = Math.round(
            (scores.operations * 0.2) +
            (scores.technology * 0.2) +
            (scores.data * 0.15) +
            (scores.strategy * 0.2) +
            (scores.innovation * 0.15) +
            (scores.people * 0.1)
        );
        
        return scores;
    }

    // Update progress bars
    function updateProgressBars(scores) {
        // Operations progress bar
        const operationsScore = document.getElementById('operationsScore');
        const operationsProgress = document.getElementById('operationsProgress');
        const operationsInsight = document.getElementById('operationsInsight');
        
        if (operationsScore && operationsProgress && operationsInsight) {
            operationsScore.textContent = `${scores.operations}%`;
            operationsProgress.style.width = `${scores.operations}%`;
            
            // Set color based on score
            if (scores.operations < 40) {
                operationsProgress.style.backgroundColor = '#e74c3c'; // Red
                operationsInsight.textContent = 'Your operations show significant opportunities for improvement in consistency and optimization.';
            } else if (scores.operations < 70) {
                operationsProgress.style.backgroundColor = '#f39c12'; // Orange
                operationsInsight.textContent = 'Your operations show some opportunities for improvement in consistency and optimization.';
            } else {
                operationsProgress.style.backgroundColor = '#2ecc71'; // Green
                operationsInsight.textContent = 'Your operations are well-defined and optimized, providing a strong foundation for your business.';
            }
        }
        
        // Technology progress bar
        const technologyScore = document.getElementById('technologyScore');
        const technologyProgress = document.getElementById('technologyProgress');
        const technologyInsight = document.getElementById('technologyInsight');
        
        if (technologyScore && technologyProgress && technologyInsight) {
            technologyScore.textContent = `${scores.technology}%`;
            technologyProgress.style.width = `${scores.technology}%`;
            
            // Set color based on score
            if (scores.technology < 40) {
                technologyProgress.style.backgroundColor = '#e74c3c'; // Red
                technologyInsight.textContent = 'Your technology systems need significant improvement to support your business effectively.';
            } else if (scores.technology < 70) {
                technologyProgress.style.backgroundColor = '#f39c12'; // Orange
                technologyInsight.textContent = 'Your technology systems are functional but could benefit from better integration and strategic alignment.';
            } else {
                technologyProgress.style.backgroundColor = '#2ecc71'; // Green
                technologyInsight.textContent = 'Your technology systems are well-integrated and provide strong support for your business operations.';
            }
        }
        
        // Data progress bar
        const dataScore = document.getElementById('dataScore');
        const dataProgress = document.getElementById('dataProgress');
        const dataInsight = document.getElementById('dataInsight');
        
        if (dataScore && dataProgress && dataInsight) {
            dataScore.textContent = `${scores.data}%`;
            dataProgress.style.width = `${scores.data}%`;
            
            // Set color based on score
            if (scores.data < 40) {
                dataProgress.style.backgroundColor = '#e74c3c'; // Red
                dataInsight.textContent = 'Your data management practices need significant improvement to unlock valuable insights.';
            } else if (scores.data < 70) {
                dataProgress.style.backgroundColor = '#f39c12'; // Orange
                dataInsight.textContent = 'Your data management practices need improvement to unlock valuable insights and drive decision-making.';
            } else {
                dataProgress.style.backgroundColor = '#2ecc71'; // Green
                dataInsight.textContent = 'Your data management practices are strong, providing valuable insights for decision-making.';
            }
        }
    }

    // Generate charts
    function generateCharts(scores) {
        // Maturity radar chart
        const maturityRadarChart = document.getElementById('maturityRadarChart');
        if (maturityRadarChart) {
            new Chart(maturityRadarChart, {
                type: 'radar',
                data: {
                    labels: ['Operations', 'Technology', 'Data', 'Strategy', 'Innovation', 'People'],
                    datasets: [{
                        label: 'Your Organization',
                        data: [
                            scores.operations,
                            scores.technology,
                            scores.data,
                            scores.strategy,
                            scores.innovation,
                            scores.people
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                    }]
                },
                options: {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            });
        }
        
        // Benchmark chart
        const benchmarkChart = document.getElementById('benchmarkChart');
        if (benchmarkChart) {
            // Get industry benchmarks based on selected industry
            const industry = state.answers['industry'];
            let benchmarks = {
                operations: 65,
                technology: 60,
                data: 55,
                strategy: 70,
                innovation: 65,
                people: 75
            };
            
            // Adjust benchmarks based on industry
            if (industry === 'technology') {
                benchmarks.technology = 75;
                benchmarks.innovation = 80;
            } else if (industry === 'finance') {
                benchmarks.operations = 75;
                benchmarks.data = 70;
            } else if (industry === 'healthcare') {
                benchmarks.operations = 70;
                benchmarks.people = 80;
            } else if (industry === 'retail') {
                benchmarks.technology = 65;
                benchmarks.innovation = 70;
            }
            
            new Chart(benchmarkChart, {
                type: 'bar',
                data: {
                    labels: ['Operations', 'Technology', 'Data', 'Strategy', 'Innovation', 'People'],
                    datasets: [
                        {
                            label: 'Your Organization',
                            data: [
                                scores.operations,
                                scores.technology,
                                scores.data,
                                scores.strategy,
                                scores.innovation,
                                scores.people
                            ],
                            backgroundColor: 'rgba(54, 162, 235, 0.7)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Industry Benchmark',
                            data: [
                                benchmarks.operations,
                                benchmarks.technology,
                                benchmarks.data,
                                benchmarks.strategy,
                                benchmarks.innovation,
                                benchmarks.people
                            ],
                            backgroundColor: 'rgba(255, 159, 64, 0.7)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    // Generate recommendations
    function generateRecommendations(scores) {
        // Get recommendation containers
        const operationsRecommendations = document.querySelector('.action-area:nth-child(1) .action-list');
        const technologyRecommendations = document.querySelector('.action-area:nth-child(2) .action-list');
        const strategyRecommendations = document.querySelector('.action-area:nth-child(3) .action-list');
        
        if (!operationsRecommendations || !technologyRecommendations || !strategyRecommendations) {
            return;
        }
        
        // Clear existing recommendations
        operationsRecommendations.innerHTML = '';
        technologyRecommendations.innerHTML = '';
        strategyRecommendations.innerHTML = '';
        
        // Operations recommendations based on score
        const operationsRecs = [];
        if (scores.operations < 40) {
            operationsRecs.push('Document key business processes');
            operationsRecs.push('Establish basic performance metrics');
            operationsRecs.push('Implement regular process reviews');
            operationsRecs.push('Create standard operating procedures for critical functions');
        } else if (scores.operations < 70) {
            operationsRecs.push('Implement regular process reviews and updates');
            operationsRecs.push('Develop comprehensive performance metrics');
            operationsRecs.push('Create feedback mechanisms for process improvement');
            operationsRecs.push('Establish cross-functional process governance');
        } else {
            operationsRecs.push('Implement advanced process optimization techniques');
            operationsRecs.push('Develop predictive performance analytics');
            operationsRecs.push('Create a continuous improvement culture');
            operationsRecs.push('Establish centers of excellence for key processes');
        }
        
        // Technology recommendations based on score
        const technologyRecs = [];
        if (scores.technology < 40) {
            technologyRecs.push('Conduct a comprehensive technology assessment');
            technologyRecs.push('Develop a basic technology roadmap');
            technologyRecs.push('Address critical technology gaps');
            technologyRecs.push('Implement foundational security measures');
        } else if (scores.technology < 70) {
            technologyRecs.push('Develop a comprehensive technology roadmap');
            technologyRecs.push('Implement system integration initiatives');
            technologyRecs.push('Enhance security and compliance measures');
            technologyRecs.push('Establish technology governance processes');
        } else {
            technologyRecs.push('Implement advanced technology innovation programs');
            technologyRecs.push('Develop AI and automation strategies');
            technologyRecs.push('Create technology innovation partnerships');
            technologyRecs.push('Establish technology thought leadership');
        }
        
        // Strategy recommendations based on score
        const strategyRecs = [];
        if (scores.strategy < 40) {
            strategyRecs.push('Conduct a basic strategic planning session');
            strategyRecs.push('Define clear business objectives');
            strategyRecs.push('Establish regular strategy reviews');
            strategyRecs.push('Develop competitive awareness');
        } else if (scores.strategy < 70) {
            strategyRecs.push('Conduct a comprehensive strategic planning session');
            strategyRecs.push('Develop clear, measurable strategic objectives');
            strategyRecs.push('Implement regular strategy review meetings');
            strategyRecs.push('Create alignment between strategy and operational activities');
        } else {
            strategyRecs.push('Implement advanced strategic planning methodologies');
            strategyRecs.push('Develop scenario planning capabilities');
            strategyRecs.push('Create strategic innovation programs');
            strategyRecs.push('Establish strategic thought leadership');
        }
        
        // Add recommendations to containers
        operationsRecs.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'action-item';
            li.textContent = rec;
            operationsRecommendations.appendChild(li);
        });
        
        technologyRecs.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'action-item';
            li.textContent = rec;
            technologyRecommendations.appendChild(li);
        });
        
        strategyRecs.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'action-item';
            li.textContent = rec;
            strategyRecommendations.appendChild(li);
        });
    }

    // Save state to localStorage
    function saveState() {
        localStorage.setItem('assessmentState', JSON.stringify(state));
    }

    // Load state from localStorage
    function loadState() {
        const savedState = localStorage.getItem('assessmentState');
        return savedState ? JSON.parse(savedState) : null;
    }

    // Clear state from localStorage
    function clearState() {
        localStorage.removeItem('assessmentState');
    }

    // Add event listener for lead capture form
    const leadForm = document.querySelector('.lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            this.innerHTML = `<div class="success-message">Thank you! Your report has been sent to ${email}.</div>`;
        });
    }
});
