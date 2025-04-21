// Update index.html to include all new JavaScript files
document.addEventListener('DOMContentLoaded', function() {
    // Add script tags for new JavaScript files
    const scripts = [
        'js/industry-questions.js',
        'js/recommendation-engine.js',
        'js/progressive-disclosure.js'
    ];
    
    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    });
    
    // Initialize components after all scripts are loaded
    const lastScript = document.createElement('script');
    lastScript.textContent = `
        // Initialize all components
        window.addEventListener('load', function() {
            // Initialize progressive disclosure system
            if (window.ProgressiveDisclosure) {
                window.ProgressiveDisclosure.initialize();
            }
            
            // Update loadIndustrySpecificQuestions function in app.js to use the new system
            if (window.loadIndustrySpecificQuestions) {
                const originalLoadFunction = window.loadIndustrySpecificQuestions;
                window.loadIndustrySpecificQuestions = function(industry) {
                    if (window.IndustryQuestions) {
                        const container = document.getElementById('industry-specific-questions');
                        if (container) {
                            const html = window.IndustryQuestions.generateIndustryQuestionsHTML(industry);
                            container.innerHTML = html;
                            
                            // Setup option selection for new questions
                            setupOptionSelection();
                        }
                    } else {
                        // Fall back to original function if new system isn't available
                        originalLoadFunction(industry);
                    }
                };
            }
            
            // Update processAssessment function to use the AI recommendation engine
            if (window.processAssessment && window.AIRecommendationEngine) {
                const originalProcessFunction = window.processAssessment;
                window.processAssessment = function() {
                    // Call original function first
                    originalProcessFunction();
                    
                    // Then use the AI recommendation engine
                    const recommendations = window.AIRecommendationEngine.generateRecommendations(assessmentData);
                    
                    // Store recommendations in assessment data
                    assessmentData.recommendations = recommendations;
                    
                    // Update results page with recommendations
                    updateResultsWithRecommendations(recommendations);
                };
            }
            
            // Add function to update results with recommendations
            window.updateResultsWithRecommendations = function(recommendations) {
                // Update insight cards with AI-generated insights
                const insightCardsContainer = document.getElementById('insightCards');
                if (insightCardsContainer && recommendations.prioritizedActions) {
                    // Clear existing insights
                    insightCardsContainer.innerHTML = '';
                    
                    // Add summary text to context header
                    const contextHeader = document.getElementById('contextHeader');
                    if (contextHeader && recommendations.summary) {
                        contextHeader.textContent = recommendations.summary.summaryText;
                    }
                    
                    // Create and append insight cards for prioritized actions
                    recommendations.prioritizedActions.forEach(action => {
                        const insightCard = document.createElement('div');
                        insightCard.className = 'insight-card';
                        
                        const insightTitle = document.createElement('h4');
                        insightTitle.textContent = action.title;
                        
                        const insightContent = document.createElement('p');
                        insightContent.textContent = action.description;
                        
                        const insightMeta = document.createElement('div');
                        insightMeta.className = 'insight-meta';
                        insightMeta.innerHTML = \`
                            <span class="effort">Effort: \${action.effort}</span>
                            <span class="impact">Impact: \${action.impact}</span>
                            <span class="timeframe">Timeframe: \${action.timeframe}</span>
                        \`;
                        
                        insightCard.appendChild(insightTitle);
                        insightCard.appendChild(insightContent);
                        insightCard.appendChild(insightMeta);
                        
                        insightCardsContainer.appendChild(insightCard);
                    });
                    
                    // Add a "View All Recommendations" button if we have more than shown
                    if (recommendations.resources && recommendations.resources.length > 0) {
                        const viewAllButton = document.createElement('button');
                        viewAllButton.className = 'btn btn-secondary view-all-btn';
                        viewAllButton.textContent = 'View All Recommendations';
                        viewAllButton.addEventListener('click', function() {
                            showAllRecommendations(recommendations);
                        });
                        
                        insightCardsContainer.appendChild(viewAllButton);
                    }
                }
                
                // Update maturity scores with AI-generated insights
                if (recommendations.summary) {
                    const operationsInsight = document.getElementById('operationsInsight');
                    const technologyInsight = document.getElementById('technologyInsight');
                    
                    if (operationsInsight) {
                        operationsInsight.textContent = "Your operations show " + 
                            (recommendations.summary.improvementAreas.includes('Operations') ? 
                            "opportunities for improvement in documentation and standardization." : 
                            "relative strength with established processes.");
                    }
                    
                    if (technologyInsight) {
                        technologyInsight.textContent = "Your technology infrastructure " + 
                            (recommendations.summary.improvementAreas.includes('Technology') ? 
                            "has significant room for modernization and better integration." : 
                            "demonstrates good integration and modern capabilities.");
                    }
                }
            };
            
            // Function to show all recommendations in a modal
            window.showAllRecommendations = function(recommendations) {
                // Create modal container
                const modal = document.createElement('div');
                modal.className = 'recommendation-modal';
                
                // Create modal content
                const modalContent = document.createElement('div');
                modalContent.className = 'recommendation-modal-content';
                
                // Add close button
                const closeButton = document.createElement('span');
                closeButton.className = 'close-button';
                closeButton.innerHTML = '&times;';
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                // Add title
                const title = document.createElement('h2');
                title.textContent = 'All Recommendations';
                
                // Add actions section
                const actionsSection = document.createElement('div');
                actionsSection.className = 'recommendation-section';
                
                const actionsTitle = document.createElement('h3');
                actionsTitle.textContent = 'Prioritized Actions';
                
                actionsSection.appendChild(actionsTitle);
                
                // Add action cards
                if (recommendations.prioritizedActions) {
                    recommendations.prioritizedActions.forEach(action => {
                        const actionCard = document.createElement('div');
                        actionCard.className = 'recommendation-card';
                        
                        actionCard.innerHTML = \`
                            <h4>\${action.title}</h4>
                            <p>\${action.description}</p>
                            <div class="recommendation-meta">
                                <span class="effort">Effort: \${action.effort}</span>
                                <span class="impact">Impact: \${action.impact}</span>
                                <span class="timeframe">Timeframe: \${action.timeframe}</span>
                            </div>
                        \`;
                        
                        actionsSection.appendChild(actionCard);
                    });
                }
                
                // Add resources section
                const resourcesSection = document.createElement('div');
                resourcesSection.className = 'recommendation-section';
                
                const resourcesTitle = document.createElement('h3');
                resourcesTitle.textContent = 'Recommended Resources';
                
                resourcesSection.appendChild(resourcesTitle);
                
                // Add resource cards
                if (recommendations.resources) {
                    recommendations.resources.forEach(resource => {
                        const resourceCard = document.createElement('div');
                        resourceCard.className = 'recommendation-card';
                        
                        resourceCard.innerHTML = \`
                            <h4>\${resource.title}</h4>
                            <p>\${resource.description}</p>
                            <div class="recommendation-meta">
                                <span class="type">Type: \${resource.type}</span>
                                <span class="author">By: \${resource.author}</span>
                            </div>
                        \`;
                        
                        resourcesSection.appendChild(resourceCard);
                    });
                }
                
                // Add industry insights section
                const insightsSection = document.createElement('div');
                insightsSection.className = 'recommendation-section';
                
                const insightsTitle = document.createElement('h3');
                insightsTitle.textContent = 'Industry Insights';
                
                insightsSection.appendChild(insightsTitle);
                
                // Add industry trends
                if (recommendations.industryInsights && recommendations.industryInsights.trends) {
                    const trendsList = document.createElement('div');
                    trendsList.className = 'trends-list';
                    
                    const trendsTitle = document.createElement('h4');
                    trendsTitle.textContent = 'Industry Trends';
                    
                    trendsList.appendChild(trendsTitle);
                    
                    const trendItems = document.createElement('ul');
                    
                    recommendations.industryInsights.trends.forEach(trend => {
                        const trendItem = document.createElement('li');
                        trendItem.textContent = trend;
                        trendItems.appendChild(trendItem);
                    });
                    
                    trendsList.appendChild(trendItems);
                    insightsSection.appendChild(trendsList);
                }
                
                // Assemble modal content
                modalContent.appendChild(closeButton);
                modalContent.appendChild(title);
                modalContent.appendChild(actionsSection);
                modalContent.appendChild(resourcesSection);
                modalContent.appendChild(insightsSection);
                
                // Add modal content to modal
                modal.appendChild(modalContent);
                
                // Add modal styles if not already present
                if (!document.getElementById('modal-styles')) {
                    const style = document.createElement('style');
                    style.id = 'modal-styles';
                    style.textContent = \`
                        .recommendation-modal {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.5);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            z-index: 1000;
                        }
                        
                        .recommendation-modal-content {
                            background-color: white;
                            padding: 2rem;
                            border-radius: 8px;
                            max-width: 800px;
                            width: 90%;
                            max-height: 90vh;
                            overflow-y: auto;
                            position: relative;
                        }
                        
                        .close-button {
                            position: absolute;
                            top: 1rem;
                            right: 1rem;
                            font-size: 1.5rem;
                            cursor: pointer;
                        }
                        
                        .recommendation-section {
                            margin-bottom: 2rem;
                        }
                        
                        .recommendation-card {
                            border: 1px solid #e1e4e8;
                            border-radius: 8px;
                            padding: 1rem;
                            margin-bottom: 1rem;
                        }
                        
                        .recommendation-meta {
                            display: flex;
                            gap: 1rem;
                            margin-top: 0.5rem;
                            font-size: 0.9rem;
                            color: #666;
                        }
                        
                        .trends-list ul {
                            padding-left: 1.5rem;
                        }
                        
                        .trends-list li {
                            margin-bottom: 0.5rem;
                        }
                        
                        .view-all-btn {
                            margin-top: 1rem;
                            width: 100%;
                        }
                        
                        .insight-meta {
                            display: flex;
                            gap: 1rem;
                            margin-top: 0.5rem;
                            font-size: 0.9rem;
                            color: #666;
                        }
                    \`;
                    document.head.appendChild(style);
                }
                
                // Add modal to body
                document.body.appendChild(modal);
            };
        });
    `;
    document.body.appendChild(lastScript);
});
