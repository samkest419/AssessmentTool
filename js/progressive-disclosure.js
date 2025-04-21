/**
 * Progressive Disclosure System for Business Assessment Tool
 * This file contains the logic for adaptive questioning and contextual help
 */

// Progressive Disclosure Configuration
const progressiveDisclosureConfig = {
    enableFollowUpQuestions: true,
    enableContextualHelp: true,
    enableBranchingLogic: true,
    animateTransitions: true
};

/**
 * Progressive Disclosure System
 * Manages adaptive questioning, branching logic, and contextual help
 */
class ProgressiveDisclosure {
    constructor() {
        this.followUpQuestions = {};
        this.branchingRules = {};
        this.contextualHelp = {};
        this.initialized = false;
    }
    
    /**
     * Initialize the progressive disclosure system
     */
    initialize() {
        if (this.initialized) return;
        
        // Set up follow-up questions
        this.setupFollowUpQuestions();
        
        // Set up branching rules
        this.setupBranchingRules();
        
        // Set up contextual help
        this.setupContextualHelp();
        
        // Add event listeners
        this.setupEventListeners();
        
        this.initialized = true;
        console.log('Progressive Disclosure System initialized');
    }
    
    /**
     * Set up follow-up questions
     */
    setupFollowUpQuestions() {
        // Company type follow-up questions
        this.followUpQuestions['company-type'] = {
            'startup': [
                {
                    id: 'startup-funding',
                    question: 'What stage of funding are you at?',
                    options: [
                        { value: 'bootstrapped', label: 'Bootstrapped', description: 'Self-funded or friends & family' },
                        { value: 'seed', label: 'Seed', description: 'Angel or seed funding' },
                        { value: 'series-a', label: 'Series A', description: 'First round of venture capital' },
                        { value: 'series-b-plus', label: 'Series B+', description: 'Later stage venture capital' }
                    ]
                }
            ],
            'enterprise': [
                {
                    id: 'enterprise-structure',
                    question: 'How would you describe your organizational structure?',
                    options: [
                        { value: 'centralized', label: 'Centralized', description: 'Decisions flow from top management' },
                        { value: 'decentralized', label: 'Decentralized', description: 'Decisions made at various levels' },
                        { value: 'matrix', label: 'Matrix', description: 'Employees report to multiple managers' },
                        { value: 'flat', label: 'Flat', description: 'Few or no middle management levels' }
                    ]
                }
            ]
        };
        
        // Role follow-up questions
        this.followUpQuestions['role'] = {
            'executive': [
                {
                    id: 'executive-focus',
                    question: 'What is your primary focus as an executive?',
                    options: [
                        { value: 'growth', label: 'Growth', description: 'Expanding the business' },
                        { value: 'efficiency', label: 'Efficiency', description: 'Optimizing operations' },
                        { value: 'innovation', label: 'Innovation', description: 'Developing new products/services' },
                        { value: 'stability', label: 'Stability', description: 'Maintaining consistent performance' }
                    ]
                }
            ],
            'middle-management': [
                {
                    id: 'management-span',
                    question: 'How many direct reports do you manage?',
                    options: [
                        { value: '1-5', label: '1-5', description: 'Small team' },
                        { value: '6-15', label: '6-15', description: 'Medium team' },
                        { value: '16-30', label: '16-30', description: 'Large team' },
                        { value: '30+', label: '30+', description: 'Very large team' }
                    ]
                }
            ]
        };
        
        // Technology maturity follow-up questions
        this.followUpQuestions['technology-maturity'] = {
            'basic': [
                {
                    id: 'tech-challenges',
                    question: 'What are your biggest technology challenges?',
                    options: [
                        { value: 'expertise', label: 'Expertise', description: 'Lack of technical knowledge' },
                        { value: 'budget', label: 'Budget', description: 'Limited financial resources' },
                        { value: 'legacy', label: 'Legacy Systems', description: 'Outdated technology' },
                        { value: 'adoption', label: 'Adoption', description: 'Resistance to new technology' }
                    ]
                }
            ],
            'cutting-edge': [
                {
                    id: 'tech-focus',
                    question: 'Which emerging technologies are you focusing on?',
                    options: [
                        { value: 'ai', label: 'AI/ML', description: 'Artificial Intelligence and Machine Learning' },
                        { value: 'blockchain', label: 'Blockchain', description: 'Distributed ledger technology' },
                        { value: 'iot', label: 'IoT', description: 'Internet of Things' },
                        { value: 'ar-vr', label: 'AR/VR', description: 'Augmented and Virtual Reality' }
                    ]
                }
            ]
        };
    }
    
    /**
     * Set up branching rules
     */
    setupBranchingRules() {
        // Branching rules based on company type
        this.branchingRules['company-type'] = {
            'startup': {
                priorityQuestions: ['funding', 'team-size', 'growth-rate'],
                skipQuestions: ['organizational-structure', 'legacy-systems']
            },
            'enterprise': {
                priorityQuestions: ['organizational-structure', 'legacy-systems', 'compliance'],
                skipQuestions: ['funding', 'burn-rate']
            }
        };
        
        // Branching rules based on industry
        this.branchingRules['industry'] = {
            'technology': {
                priorityQuestions: ['development-practices', 'tech-stack', 'innovation-culture'],
                skipQuestions: ['regulatory-compliance', 'physical-operations']
            },
            'finance': {
                priorityQuestions: ['regulatory-compliance', 'security', 'risk-management'],
                skipQuestions: ['product-development', 'supply-chain']
            },
            'healthcare': {
                priorityQuestions: ['patient-data', 'compliance', 'quality-assurance'],
                skipQuestions: ['customer-acquisition', 'digital-marketing']
            },
            'retail': {
                priorityQuestions: ['inventory-management', 'customer-experience', 'omnichannel'],
                skipQuestions: ['r-and-d', 'intellectual-property']
            }
        };
    }
    
    /**
     * Set up contextual help
     */
    setupContextualHelp() {
        // Contextual help for company type
        this.contextualHelp['company-type'] = {
            title: 'Company Type',
            content: 'Select the option that best describes your company structure and stage. This helps us tailor the assessment to your specific context.'
        };
        
        // Contextual help for industry
        this.contextualHelp['industry'] = {
            title: 'Industry',
            content: 'Your industry selection will determine which specialized questions you receive later in the assessment.'
        };
        
        // Contextual help for operations maturity
        this.contextualHelp['operations-maturity'] = {
            title: 'Operations Maturity',
            content: 'This measures how formalized and optimized your business processes are. Higher maturity means more documented, measured, and continuously improved processes.'
        };
        
        // Contextual help for technology maturity
        this.contextualHelp['technology-maturity'] = {
            title: 'Technology Maturity',
            content: 'This measures how advanced and integrated your technology systems are. Higher maturity means more modern, connected, and strategically aligned technology.'
        };
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Help icon click event
        document.querySelectorAll('.help-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const questionId = event.target.getAttribute('data-question');
                if (questionId && this.contextualHelp[questionId]) {
                    this.showContextualHelp(questionId);
                }
            });
        });
        
        // Option selection event for follow-up questions
        document.addEventListener('click', (event) => {
            const option = event.target.closest('.option');
            if (!option) return;
            
            const questionId = option.getAttribute('data-question');
            const value = option.getAttribute('data-value');
            
            if (questionId && value) {
                this.checkForFollowUpQuestions(questionId, value);
            }
        });
    }
    
    /**
     * Check for follow-up questions based on a response
     */
    checkForFollowUpQuestions(questionId, value) {
        if (!progressiveDisclosureConfig.enableFollowUpQuestions) return;
        
        // Check if we have follow-up questions for this question and value
        if (this.followUpQuestions[questionId] && this.followUpQuestions[questionId][value]) {
            const followUps = this.followUpQuestions[questionId][value];
            this.insertFollowUpQuestions(followUps, questionId);
        }
    }
    
    /**
     * Insert follow-up questions into the DOM
     */
    insertFollowUpQuestions(followUps, parentQuestionId) {
        // Find the parent question container
        const parentQuestion = document.querySelector(`[data-id="${parentQuestionId}"]`);
        if (!parentQuestion) return;
        
        // Remove any existing follow-up questions for this parent
        document.querySelectorAll(`.follow-up-container[data-parent="${parentQuestionId}"]`).forEach(el => {
            el.remove();
        });
        
        // Create a container for follow-up questions
        const followUpContainer = document.createElement('div');
        followUpContainer.className = 'follow-up-container';
        followUpContainer.setAttribute('data-parent', parentQuestionId);
        
        // Generate HTML for each follow-up question
        followUps.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-group follow-up';
            questionElement.setAttribute('data-id', question.id);
            
            questionElement.innerHTML = `
                <h4>${question.question}</h4>
                <div class="options-grid">
                    ${question.options.map(option => `
                        <div class="option" data-value="${option.value}" data-question="${question.id}">
                            <h4>${option.label}</h4>
                            <p>${option.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            
            followUpContainer.appendChild(questionElement);
        });
        
        // Insert the follow-up questions after the parent question
        const parentContainer = parentQuestion.closest('.question-group');
        if (parentContainer) {
            parentContainer.after(followUpContainer);
            
            // Add animation if enabled
            if (progressiveDisclosureConfig.animateTransitions) {
                followUpContainer.style.opacity = '0';
                followUpContainer.style.maxHeight = '0';
                followUpContainer.style.overflow = 'hidden';
                followUpContainer.style.transition = 'opacity 0.5s ease, max-height 0.5s ease';
                
                // Trigger animation
                setTimeout(() => {
                    followUpContainer.style.opacity = '1';
                    followUpContainer.style.maxHeight = '1000px';
                }, 10);
            }
            
            // Set up option selection for new questions
            if (window.setupOptionSelection) {
                window.setupOptionSelection();
            }
        }
    }
    
    /**
     * Show contextual help for a question
     */
    showContextualHelp(questionId) {
        if (!progressiveDisclosureConfig.enableContextualHelp) return;
        
        const helpData = this.contextualHelp[questionId];
        if (!helpData) return;
        
        // Create help tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'help-tooltip';
        tooltip.innerHTML = `
            <div class="help-tooltip-header">
                <h4>${helpData.title}</h4>
                <button class="close-tooltip">&times;</button>
            </div>
            <div class="help-tooltip-content">
                <p>${helpData.content}</p>
            </div>
        `;
        
        // Position tooltip near the help icon
        const helpIcon = document.querySelector(`.help-icon[data-question="${questionId}"]`);
        if (helpIcon) {
            const rect = helpIcon.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${rect.bottom + scrollTop + 10}px`;
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.zIndex = '1000';
            
            // Add to document
            document.body.appendChild(tooltip);
            
            // Add animation if enabled
            if (progressiveDisclosureConfig.animateTransitions) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-10px)';
                tooltip.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                // Trigger animation
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(0)';
                }, 10);
            }
            
            // Add close button event
            const closeButton = tooltip.querySelector('.close-tooltip');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    if (progressiveDisclosureConfig.animateTransitions) {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'translateY(-10px)';
                        
                        setTimeout(() => {
                            tooltip.remove();
                        }, 300);
                    } else {
                        tooltip.remove();
                    }
                });
            }
            
            // Close when clicking outside
            document.addEventListener('click', function closeTooltip(event) {
                if (!tooltip.contains(event.target) && event.target !== helpIcon) {
                    if (progressiveDisclosureConfig.animateTransitions) {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'translateY(-10px)';
                        
                        setTimeout(() => {
                            tooltip.remove();
                        }, 300);
                    } else {
                        tooltip.remove();
                    }
                    
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }
    }
    
    /**
     * Apply branching logic based on a response
     */
    applyBranchingLogic(questionId, value) {
        if (!progressiveDisclosureConfig.enableBranchingLogic) return;
        
        // Check if we have branching rules for this question and value
        if (this.branchingRules[questionId] && this.branchingRules[questionId][value]) {
            const rules = this.branchingRules[questionId][value];
            
            // Show priority questions
            if (rules.priorityQuestions) {
                rules.priorityQuestions.forEach(qId => {
                    const question = document.querySelector(`[data-id="${qId}"]`);
                    if (question) {
                        question.style.display = 'block';
                        
                        // Add animation if enabled
                        if (progressiveDisclosureConfig.animateTransitions) {
                            question.style.opacity = '0';
                            question.style.transition = 'opacity 0.5s ease';
                            
                            // Trigger animation
                            setTimeout(() => {
                                question.style.opacity = '1';
                            }, 10);
                        }
                    }
                });
            }
            
            // Hide skipped questions
            if (rules.skipQuestions) {
                rules.skipQuestions.forEach(qId => {
                    const question = document.querySelector(`[data-id="${qId}"]`);
                    if (question) {
                        if (progressiveDisclosureConfig.animateTransitions) {
                            question.style.opacity = '0';
                            question.style.transition = 'opacity 0.5s ease';
                            
                            // Hide after animation
                            setTimeout(() => {
                                question.style.display = 'none';
                            }, 500);
                        } else {
                            question.style.display = 'none';
                        }
                    }
                });
            }
        }
    }
    
    /**
     * Add contextual help icons to questions
     */
    addHelpIcons() {
        if (!progressiveDisclosureConfig.enableContextualHelp) return;
        
        // Add help icons to questions that have contextual help
        Object.keys(this.contextualHelp).forEach(questionId => {
            const questionElement = document.querySelector(`[data-id="${questionId}"]`);
            if (!questionElement) return;
            
            const questionTitle = questionElement.querySelector('h3, h4');
            if (!questionTitle) return;
            
            // Check if help icon already exists
            if (questionTitle.querySelector('.help-icon')) return;
            
            // Create help icon
            const helpIcon = document.createElement('span');
            helpIcon.className = 'help-icon';
            helpIcon.setAttribute('data-question', questionId);
            helpIcon.innerHTML = '?';
            helpIcon.title = 'Click for help';
            
            // Add to question title
            questionTitle.appendChild(helpIcon);
        });
    }
}

// Create and export progressive disclosure system
const progressiveDisclosure = new ProgressiveDisclosure();

// Export for use in main app.js
window.ProgressiveDisclosure = progressiveDisclosure;
