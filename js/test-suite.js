/**
 * Test Suite for Business Assessment Tool
 * This file contains tests for all major components and their integration
 */

// Test configuration
const testConfig = {
    runVisualTests: true,
    runFunctionalTests: true,
    runIntegrationTests: true,
    logResults: true
};

// Test results storage
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
};

/**
 * Main test runner
 */
function runTests() {
    console.log('Starting Business Assessment Tool tests...');
    
    // Clear previous test results
    testResults.passed = 0;
    testResults.failed = 0;
    testResults.warnings = 0;
    testResults.details = [];
    
    // Run tests based on configuration
    if (testConfig.runVisualTests) {
        runVisualTests();
    }
    
    if (testConfig.runFunctionalTests) {
        runFunctionalTests();
    }
    
    if (testConfig.runIntegrationTests) {
        runIntegrationTests();
    }
    
    // Log test summary
    logTestSummary();
}

/**
 * Run visual component tests
 */
function runVisualTests() {
    console.log('Running visual component tests...');
    
    // Test radar chart initialization
    testRadarChartInitialization();
    
    // Test benchmark chart initialization
    testBenchmarkChartInitialization();
    
    // Test progress bars animation
    testProgressBarsAnimation();
    
    // Test responsive layout
    testResponsiveLayout();
}

/**
 * Run functional tests for individual components
 */
function runFunctionalTests() {
    console.log('Running functional component tests...');
    
    // Test industry-specific questions
    testIndustrySpecificQuestions();
    
    // Test recommendation engine
    testRecommendationEngine();
    
    // Test progressive disclosure
    testProgressiveDisclosure();
    
    // Test assessment flow
    testAssessmentFlow();
}

/**
 * Run integration tests between components
 */
function runIntegrationTests() {
    console.log('Running integration tests...');
    
    // Test industry questions integration with visualizations
    testIndustryQuestionsVisualizationIntegration();
    
    // Test recommendation engine integration with results
    testRecommendationResultsIntegration();
    
    // Test progressive disclosure integration with assessment flow
    testProgressiveDisclosureIntegration();
    
    // Test end-to-end assessment flow
    testEndToEndFlow();
}

/**
 * Test radar chart initialization
 */
function testRadarChartInitialization() {
    try {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            recordTestResult('Radar Chart - Chart.js Loading', false, 'Chart.js library not loaded');
            return;
        }
        
        // Check if radar chart canvas exists
        const radarCanvas = document.getElementById('maturityRadarChart');
        if (!radarCanvas) {
            recordTestResult('Radar Chart - Canvas Element', false, 'Radar chart canvas element not found');
            return;
        }
        
        // Check if visualization functions exist
        if (typeof window.BusinessAssessmentVisualizations === 'undefined' || 
            typeof window.BusinessAssessmentVisualizations.initializeMaturityRadarChart === 'undefined') {
            recordTestResult('Radar Chart - Visualization Functions', false, 'Radar chart initialization function not found');
            return;
        }
        
        // Test successful
        recordTestResult('Radar Chart Initialization', true, 'Radar chart components verified');
    } catch (error) {
        recordTestResult('Radar Chart Initialization', false, `Error: ${error.message}`);
    }
}

/**
 * Test benchmark chart initialization
 */
function testBenchmarkChartInitialization() {
    try {
        // Check if benchmark chart canvas exists
        const benchmarkCanvas = document.getElementById('benchmarkChart');
        if (!benchmarkCanvas) {
            recordTestResult('Benchmark Chart - Canvas Element', false, 'Benchmark chart canvas element not found');
            return;
        }
        
        // Check if visualization functions exist
        if (typeof window.BusinessAssessmentVisualizations === 'undefined' || 
            typeof window.BusinessAssessmentVisualizations.initializeBenchmarkChart === 'undefined') {
            recordTestResult('Benchmark Chart - Visualization Functions', false, 'Benchmark chart initialization function not found');
            return;
        }
        
        // Test successful
        recordTestResult('Benchmark Chart Initialization', true, 'Benchmark chart components verified');
    } catch (error) {
        recordTestResult('Benchmark Chart Initialization', false, `Error: ${error.message}`);
    }
}

/**
 * Test progress bars animation
 */
function testProgressBarsAnimation() {
    try {
        // Check if progress bars exist
        const operationsProgress = document.getElementById('operationsProgress');
        const technologyProgress = document.getElementById('technologyProgress');
        
        if (!operationsProgress || !technologyProgress) {
            recordTestResult('Progress Bars - Elements', false, 'Progress bar elements not found');
            return;
        }
        
        // Check if animation function exists
        if (typeof window.BusinessAssessmentVisualizations === 'undefined' || 
            typeof window.BusinessAssessmentVisualizations.animateProgressBars === 'undefined') {
            recordTestResult('Progress Bars - Animation Function', false, 'Progress bar animation function not found');
            return;
        }
        
        // Test animation by checking if width style is applied
        const initialOpWidth = operationsProgress.style.width;
        const initialTechWidth = technologyProgress.style.width;
        
        // Call animation function
        window.BusinessAssessmentVisualizations.animateProgressBars();
        
        // Set timeout to check after animation should have started
        setTimeout(() => {
            const newOpWidth = operationsProgress.style.width;
            const newTechWidth = technologyProgress.style.width;
            
            if (newOpWidth === initialOpWidth && newTechWidth === initialTechWidth) {
                recordTestResult('Progress Bars Animation', false, 'Progress bars did not animate');
            } else {
                recordTestResult('Progress Bars Animation', true, 'Progress bars animated successfully');
            }
        }, 500);
        
        // Initial test passed for function existence
        recordTestResult('Progress Bars Animation Setup', true, 'Progress bar animation components verified');
    } catch (error) {
        recordTestResult('Progress Bars Animation', false, `Error: ${error.message}`);
    }
}

/**
 * Test responsive layout
 */
function testResponsiveLayout() {
    try {
        // Check if viewport meta tag exists
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            recordTestResult('Responsive Layout - Viewport Meta', false, 'Viewport meta tag not found');
            return;
        }
        
        // Check for media queries in CSS
        let mediaQueriesFound = false;
        for (let i = 0; i < document.styleSheets.length; i++) {
            try {
                const rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
                for (let j = 0; j < rules.length; j++) {
                    if (rules[j].type === CSSRule.MEDIA_RULE) {
                        mediaQueriesFound = true;
                        break;
                    }
                }
                if (mediaQueriesFound) break;
            } catch (e) {
                // CORS error when accessing stylesheet from different origin
                // Just continue to next stylesheet
            }
        }
        
        if (!mediaQueriesFound) {
            recordTestResult('Responsive Layout - Media Queries', false, 'No media queries found in CSS');
        } else {
            recordTestResult('Responsive Layout - Media Queries', true, 'Media queries found in CSS');
        }
        
        // Check for responsive grid classes
        const gridElements = document.querySelectorAll('.options-grid, .visualization-container, .maturity-details, .insight-cards, .context-summary');
        if (gridElements.length === 0) {
            recordTestResult('Responsive Layout - Grid Elements', false, 'No responsive grid elements found');
        } else {
            recordTestResult('Responsive Layout - Grid Elements', true, `${gridElements.length} responsive grid elements found`);
        }
        
        // Overall responsive test
        recordTestResult('Responsive Layout', mediaQueriesFound, 'Responsive layout components verified');
    } catch (error) {
        recordTestResult('Responsive Layout', false, `Error: ${error.message}`);
    }
}

/**
 * Test industry-specific questions
 */
function testIndustrySpecificQuestions() {
    try {
        // Check if industry questions module exists
        if (typeof window.IndustryQuestions === 'undefined') {
            recordTestResult('Industry Questions - Module', false, 'Industry questions module not found');
            return;
        }
        
        // Check if getIndustryQuestions function exists
        if (typeof window.IndustryQuestions.getIndustryQuestions !== 'function') {
            recordTestResult('Industry Questions - Get Function', false, 'getIndustryQuestions function not found');
            return;
        }
        
        // Check if generateIndustryQuestionsHTML function exists
        if (typeof window.IndustryQuestions.generateIndustryQuestionsHTML !== 'function') {
            recordTestResult('Industry Questions - Generate HTML Function', false, 'generateIndustryQuestionsHTML function not found');
            return;
        }
        
        // Test getting questions for each industry
        const industries = ['technology', 'finance', 'healthcare', 'retail'];
        let allIndustriesHaveQuestions = true;
        
        industries.forEach(industry => {
            const questions = window.IndustryQuestions.getIndustryQuestions(industry);
            if (!questions || !questions.questions || questions.questions.length === 0) {
                recordTestResult(`Industry Questions - ${industry} Industry`, false, `No questions found for ${industry} industry`);
                allIndustriesHaveQuestions = false;
            } else {
                recordTestResult(`Industry Questions - ${industry} Industry`, true, `${questions.questions.length} questions found for ${industry} industry`);
            }
        });
        
        // Overall industry questions test
        recordTestResult('Industry-Specific Questions', allIndustriesHaveQuestions, 'Industry-specific questions functionality verified');
    } catch (error) {
        recordTestResult('Industry-Specific Questions', false, `Error: ${error.message}`);
    }
}

/**
 * Test recommendation engine
 */
function testRecommendationEngine() {
    try {
        // Check if recommendation engine exists
        if (typeof window.AIRecommendationEngine === 'undefined') {
            recordTestResult('Recommendation Engine - Module', false, 'AI recommendation engine not found');
            return;
        }
        
        // Check if generateRecommendations function exists
        if (typeof window.AIRecommendationEngine.generateRecommendations !== 'function') {
            recordTestResult('Recommendation Engine - Generate Function', false, 'generateRecommendations function not found');
            return;
        }
        
        // Test generating recommendations with mock data
        const mockAssessmentData = {
            companyType: 'small-business',
            industry: 'technology',
            companySize: '11-50',
            role: 'executive',
            departments: ['operations', 'technology'],
            priorities: ['operational-efficiency', 'technology-systems'],
            challenges: ['process-bottlenecks', 'technology-integration'],
            companyScores: [65, 48, 72, 58, 40, 53],
            operationsMaturity: 'partial',
            technologyMaturity: 'mixed'
        };
        
        const recommendations = window.AIRecommendationEngine.generateRecommendations(mockAssessmentData);
        
        // Check if recommendations contain all expected sections
        const hasAllSections = 
            recommendations.summary && 
            recommendations.prioritizedActions && 
            recommendations.resources && 
            recommendations.industryInsights && 
            recommendations.maturityRoadmap;
        
        if (!hasAllSections) {
            recordTestResult('Recommendation Engine - Sections', false, 'Recommendations missing one or more required sections');
        } else {
            recordTestResult('Recommendation Engine - Sections', true, 'All recommendation sections generated successfully');
        }
        
        // Check if prioritized actions are generated
        if (!recommendations.prioritizedActions || recommendations.prioritizedActions.length === 0) {
            recordTestResult('Recommendation Engine - Actions', false, 'No prioritized actions generated');
        } else {
            recordTestResult('Recommendation Engine - Actions', true, `${recommendations.prioritizedActions.length} prioritized actions generated`);
        }
        
        // Overall recommendation engine test
        recordTestResult('AI Recommendation Engine', hasAllSections, 'AI recommendation engine functionality verified');
    } catch (error) {
        recordTestResult('AI Recommendation Engine', false, `Error: ${error.message}`);
    }
}

/**
 * Test progressive disclosure
 */
function testProgressiveDisclosure() {
    try {
        // Check if progressive disclosure controller exists
        if (typeof window.ProgressiveDisclosure === 'undefined') {
            recordTestResult('Progressive Disclosure - Module', false, 'Progressive disclosure controller not found');
            return;
        }
        
        // Check if initialize function exists
        if (typeof window.ProgressiveDisclosure.initialize !== 'function') {
            recordTestResult('Progressive Disclosure - Initialize Function', false, 'initialize function not found');
            return;
        }
        
        // Check if branching rules exist
        if (!window.ProgressiveDisclosure.branchingRules) {
            recordTestResult('Progressive Disclosure - Branching Rules', false, 'Branching rules not found');
        } else {
            recordTestResult('Progressive Disclosure - Branching Rules', true, 'Branching rules found');
        }
        
        // Check if contextual help exists
        if (!window.ProgressiveDisclosure.contextualHelp) {
            recordTestResult('Progressive Disclosure - Contextual Help', false, 'Contextual help data not found');
        } else {
            recordTestResult('Progressive Disclosure - Contextual Help', true, 'Contextual help data found');
        }
        
        // Overall progressive disclosure test
        recordTestResult('Progressive Disclosure', 
            typeof window.ProgressiveDisclosure.initialize === 'function', 
            'Progressive disclosure functionality verified');
    } catch (error) {
        recordTestResult('Progressive Disclosure', false, `Error: ${error.message}`);
    }
}

/**
 * Test assessment flow
 */
function testAssessmentFlow() {
    try {
        // Check if step navigation functions exist
        if (typeof goToStep !== 'function') {
            recordTestResult('Assessment Flow - Navigation Function', false, 'goToStep function not found');
            return;
        }
        
        // Check if validation functions exist
        const validationFunctionsExist = 
            typeof validateStep1 === 'function' && 
            typeof validateStep2 === 'function' && 
            typeof validateStep3 === 'function' && 
            typeof validateStep4 === 'function';
        
        if (!validationFunctionsExist) {
            recordTestResult('Assessment Flow - Validation Functions', false, 'One or more validation functions not found');
        } else {
            recordTestResult('Assessment Flow - Validation Functions', true, 'All validation functions found');
        }
        
        // Check if step elements exist
        const stepElementsExist = 
            document.getElementById('step1') && 
            document.getElementById('step2') && 
            document.getElementById('step3') && 
            document.getElementById('step4');
        
        if (!stepElementsExist) {
            recordTestResult('Assessment Flow - Step Elements', false, 'One or more step elements not found');
        } else {
            recordTestResult('Assessment Flow - Step Elements', true, 'All step elements found');
        }
        
        // Overall assessment flow test
        recordTestResult('Assessment Flow', 
            typeof goToStep === 'function' && validationFunctionsExist && stepElementsExist, 
            'Assessment flow functionality verified');
    } catch (error) {
        recordTestResult('Assessment Flow', false, `Error: ${error.message}`);
    }
}

/**
 * Test industry questions integration with visualizations
 */
function testIndustryQuestionsVisualizationIntegration() {
    try {
        // Check if industry questions affect visualization data
        if (typeof window.IndustryQuestions === 'undefined' || 
            typeof window.BusinessAssessmentVisualizations === 'undefined') {
            recordTestResult('Industry-Visualization Integration', false, 'One or more required modules not found');
            return;
        }
        
        // Check if industry benchmarks exist in visualization data
        const industryBenchmarks = window.AIRecommendationEngine.recommendationData.industryBenchmarks;
        if (!industryBenchmarks) {
            recordTestResult('Industry-Visualization Integration - Benchmarks', false, 'Industry benchmarks not found');
            return;
        }
        
        // Check if each industry has benchmark data
        const industries = ['technology', 'finance', 'healthcare', 'retail'];
        let allIndustriesHaveBenchmarks = true;
        
        industries.forEach(industry => {
            if (!industryBenchmarks[industry]) {
                recordTestResult(`Industry-Visualization Integration - ${industry} Benchmarks`, false, `No benchmark data found for ${industry} industry`);
                allIndustriesHaveBenchmarks = false;
            } else {
                recordTestResult(`Industry-Visualization Integration - ${industry} Benchmarks`, true, `Benchmark data found for ${industry} industry`);
            }
        });
        
        // Overall integration test
        recordTestResult('Industry-Visualization Integration', 
            allIndustriesHaveBenchmarks, 
            'Industry questions and visualization integration verified');
    } catch (error) {
        recordTestResult('Industry-Visualization Integration', false, `Error: ${error.message}`);
    }
}

/**
 * Test recommendation engine integration with results
 */
function testRecommendationResultsIntegration() {
    try {
        // Check if updateResultsWithRecommendations function exists
        if (typeof window.updateResultsWithRecommendations !== 'function') {
            recordTestResult('Recommendation-Results Integration - Update Function', false, 'updateResultsWithRecommendations function not found');
            return;
        }
        
        // Check if insight cards container exists
        const insightCardsContainer = document.getElementById('insightCards');
        if (!insightCardsContainer) {
            recordTestResult('Recommendation-Results Integration - Insight Container', false, 'Insight cards container not found');
            return;
        }
        
        // Check if context header exists
        const contextHeader = document.getElementById('contextHeader');
        if (!contextHeader) {
            recordTestResult('Recommendation-Results Integration - Context Header', false, 'Context header not found');
            return;
        }
        
        // Overall integration test
        recordTestResult('Recommendation-Results Integration', 
            typeof window.updateResultsWithRecommendations === 'function' && insightCardsContainer && contextHeader, 
            'Recommendation engine and results integration verified');
    } catch (error) {
        recordTestResult('Recommendation-Results Integration', false, `Error: ${error.message}`);
    }
}

/**
 * Test progressive disclosure integration with assessment flow
 */
function testProgressiveDisclosureIntegration() {
    try {
        // Check if progressive disclosure controller is initialized in the assessment flow
        if (typeof window.ProgressiveDisclosure === 'undefined') {
            recordTestResult('Progressive Disclosure Integration', false, 'Progressive disclosure controller not found');
            return;
        }
        
        // Check if follow-up questions can be inserted
        if (typeof window.ProgressiveDisclosure.insertFollowUpQuestions !== 'function') {
            recordTestResult('Progressive Disclosure Integration - Follow-Up Questions', false, 'insertFollowUpQuestions function not found');
            return;
        }
        
        // Check if branching rules can be applied
        if (typeof window.ProgressiveDisclosure.applyBranchingRules !== 'function') {
            recordTestResult('Progressive Disclosure Integration - Branching Rules', false, 'applyBranchingRules function not found');
            return;
        }
        
        // Overall integration test
        recordTestResult('Progressive Disclosure Integration', 
            typeof window.ProgressiveDisclosure.insertFollowUpQuestions === 'function' && 
            typeof window.ProgressiveDisclosure.applyBranchingRules === 'function', 
            'Progressive disclosure and assessment flow integration verified');
    } catch (error) {
        recordTestResult('Progressive Disclosure Integration', false, `Error: ${error.message}`);
    }
}

/**
 * Test end-to-end assessment flow
 */
function testEndToEndFlow() {
    try {
        // Check if all required functions for end-to-end flow exist
        const requiredFunctions = [
            typeof startAssessment === 'function',
            typeof goToStep === 'function',
            typeof processAssessment === 'function',
            typeof showResults === 'function'
        ];
        
        if (requiredFunctions.includes(false)) {
            recordTestResult('End-to-End Flow - Required Functions', false, 'One or more required functions not found');
            return;
        }
        
        // Check if all required containers exist
        const requiredContainers = [
            document.getElementById('assessmentContainer'),
            document.getElementById('resultsContainer')
        ];
        
        if (requiredContainers.includes(null)) {
            recordTestResult('End-to-End Flow - Required Containers', false, 'One or more required containers not found');
            return;
        }
        
        // Overall end-to-end test
        recordTestResult('End-to-End Assessment Flow', 
            !requiredFunctions.includes(false) && !requiredContainers.includes(null), 
            'End-to-end assessment flow verified');
    } catch (error) {
        recordTestResult('End-to-End Assessment Flow', false, `Error: ${error.message}`);
    }
}

/**
 * Record a test result
 */
function recordTestResult(testName, passed, message) {
    if (passed) {
        testResults.passed++;
    } else {
        testResults.failed++;
    }
    
    testResults.details.push({
        name: testName,
        passed: passed,
        message: message
    });
    
    if (testConfig.logResults) {
        console.log(`${passed ? '✅' : '❌'} ${testName}: ${message}`);
    }
}

/**
 * Log test summary
 */
function logTestSummary() {
    console.log('\n----- Test Summary -----');
    console.log(`Total Tests: ${testResults.passed + testResults.failed}`);
    console.log(`Passed: ${testResults.passed}`);
    console.log(`Failed: ${testResults.failed}`);
    console.log(`Warnings: ${testResults.warnings}`);
    console.log('------------------------\n');
    
    if (testResults.failed > 0) {
        console.log('Failed Tests:');
        testResults.details
            .filter(result => !result.passed)
            .forEach(result => {
                console.log(`- ${result.name}: ${result.message}`);
            });
    }
}

// Export test functions
window.TestSuite = {
    runTests,
    testResults,
    testConfig
};

// Run tests when loaded if in test mode
if (window.location.search.includes('test=true')) {
    window.addEventListener('load', function() {
        // Wait for all components to initialize
        setTimeout(runTests, 1000);
    });
}
