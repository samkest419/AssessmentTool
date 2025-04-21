/**
 * Enhanced Visualizations for Business Assessment Tool
 * This file contains the visualization components for the assessment results
 */

// Visualization configuration
const visualizationConfig = {
    enableAnimations: true,
    responsiveCharts: true,
    showBenchmarks: true,
    showTooltips: true,
    colorScheme: {
        primary: 'rgba(94, 79, 219, 1)',
        primaryLight: 'rgba(94, 79, 219, 0.2)',
        secondary: 'rgba(54, 162, 235, 1)',
        secondaryLight: 'rgba(54, 162, 235, 0.2)',
        tertiary: 'rgba(255, 159, 64, 1)',
        tertiaryLight: 'rgba(255, 159, 64, 0.2)'
    }
};

/**
 * Business Assessment Visualizations
 * Contains methods for initializing and updating visualizations
 */
class BusinessAssessmentVisualizations {
    constructor() {
        this.charts = {};
        this.animationDuration = 1000;
    }
    
    /**
     * Initialize all charts
     */
    initializeCharts() {
        // Only initialize if we're on the results page
        if (document.getElementById('resultsContainer').style.display !== 'block') {
            return;
        }
        
        // Initialize radar chart
        this.initializeMaturityRadarChart();
        
        // Initialize benchmark chart
        this.initializeBenchmarkChart();
        
        // Animate progress bars
        this.animateProgressBars();
    }
    
    /**
     * Initialize maturity radar chart
     */
    initializeMaturityRadarChart() {
        const ctx = document.getElementById('maturityRadarChart');
        if (!ctx) {
            console.warn('Maturity radar chart canvas not found');
            return;
        }
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            return;
        }
        
        // Get assessment data
        const assessmentData = window.assessmentData || {};
        
        // Default scores if not available
        const companyScores = assessmentData.companyScores || [65, 48, 72, 58, 40, 53];
        
        // Get industry benchmarks
        const industryBenchmarks = this.getIndustryBenchmarks(assessmentData.industry);
        
        // Destroy existing chart if it exists
        if (this.charts.radarChart) {
            this.charts.radarChart.destroy();
        }
        
        // Create new radar chart
        this.charts.radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Operations', 'Technology', 'Strategy', 'Culture', 'Innovation', 'Customer'],
                datasets: [{
                    label: 'Your Company',
                    data: companyScores,
                    backgroundColor: visualizationConfig.colorScheme.primaryLight,
                    borderColor: visualizationConfig.colorScheme.primary,
                    borderWidth: 2,
                    pointBackgroundColor: visualizationConfig.colorScheme.primary,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }, {
                    label: 'Industry Average',
                    data: industryBenchmarks,
                    backgroundColor: visualizationConfig.colorScheme.secondaryLight,
                    borderColor: visualizationConfig.colorScheme.secondary,
                    borderWidth: 2,
                    pointBackgroundColor: visualizationConfig.colorScheme.secondary,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: visualizationConfig.responsiveCharts,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 15,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        enabled: visualizationConfig.showTooltips,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                animation: {
                    duration: visualizationConfig.enableAnimations ? this.animationDuration : 0
                }
            }
        });
    }
    
    /**
     * Initialize benchmark chart
     */
    initializeBenchmarkChart() {
        const ctx = document.getElementById('benchmarkChart');
        if (!ctx) {
            console.warn('Benchmark chart canvas not found');
            return;
        }
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            return;
        }
        
        // Get assessment data
        const assessmentData = window.assessmentData || {};
        
        // Get company type and industry
        const companyType = assessmentData.companyType || 'small-business';
        const industry = assessmentData.industry || 'technology';
        
        // Get overall score (average of all dimension scores)
        const companyScores = assessmentData.companyScores || [65, 48, 72, 58, 40, 53];
        const overallScore = Math.round(companyScores.reduce((a, b) => a + b, 0) / companyScores.length);
        
        // Get benchmark data
        const benchmarkData = this.getBenchmarkData(companyType, industry);
        
        // Destroy existing chart if it exists
        if (this.charts.benchmarkChart) {
            this.charts.benchmarkChart.destroy();
        }
        
        // Create new bar chart
        this.charts.benchmarkChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Your Score', 'Industry Average', 'Top Performers'],
                datasets: [{
                    data: [overallScore, benchmarkData.industryAverage, benchmarkData.topPerformers],
                    backgroundColor: [
                        visualizationConfig.colorScheme.primary,
                        visualizationConfig.colorScheme.secondary,
                        visualizationConfig.colorScheme.tertiary
                    ],
                    borderColor: [
                        visualizationConfig.colorScheme.primary,
                        visualizationConfig.colorScheme.secondary,
                        visualizationConfig.colorScheme.tertiary
                    ],
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: visualizationConfig.responsiveCharts,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: visualizationConfig.showTooltips,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                return `Score: ${context.raw}%`;
                            }
                        }
                    }
                },
                animation: {
                    duration: visualizationConfig.enableAnimations ? this.animationDuration : 0
                }
            }
        });
    }
    
    /**
     * Animate progress bars
     */
    animateProgressBars() {
        const operationsProgress = document.getElementById('operationsProgress');
        const technologyProgress = document.getElementById('technologyProgress');
        
        if (!operationsProgress || !technologyProgress) {
            console.warn('Progress bar elements not found');
            return;
        }
        
        // Get assessment data
        const assessmentData = window.assessmentData || {};
        
        // Get operations and technology scores
        const operationsScore = assessmentData.companyScores ? assessmentData.companyScores[0] : 65;
        const technologyScore = assessmentData.companyScores ? assessmentData.companyScores[1] : 48;
        
        // Reset progress bars
        operationsProgress.style.width = '0%';
        technologyProgress.style.width = '0%';
        
        // Animate progress bars
        if (visualizationConfig.enableAnimations) {
            this.animateProgressBar(operationsProgress, operationsScore);
            this.animateProgressBar(technologyProgress, technologyScore);
        } else {
            operationsProgress.style.width = `${operationsScore}%`;
            technologyProgress.style.width = `${technologyScore}%`;
        }
    }
    
    /**
     * Animate a progress bar
     */
    animateProgressBar(element, targetWidth) {
        let width = 0;
        const duration = this.animationDuration;
        const interval = 10;
        const steps = duration / interval;
        const increment = targetWidth / steps;
        
        const animation = setInterval(() => {
            if (width >= targetWidth) {
                clearInterval(animation);
                element.style.width = `${targetWidth}%`;
            } else {
                width += increment;
                element.style.width = `${width}%`;
            }
        }, interval);
    }
    
    /**
     * Get industry benchmarks
     */
    getIndustryBenchmarks(industry) {
        // Default benchmarks
        const defaultBenchmarks = [60, 55, 65, 60, 50, 70];
        
        // Industry-specific benchmarks
        const benchmarks = {
            'technology': [65, 80, 70, 75, 85, 65],
            'finance': [80, 70, 75, 60, 50, 65],
            'healthcare': [75, 65, 60, 70, 55, 80],
            'retail': [70, 60, 65, 65, 60, 85]
        };
        
        return benchmarks[industry] || defaultBenchmarks;
    }
    
    /**
     * Get benchmark data
     */
    getBenchmarkData(companyType, industry) {
        // Default benchmark data
        let industryAverage = 65;
        let topPerformers = 85;
        
        // Adjust based on industry
        switch (industry) {
            case 'technology':
                industryAverage = 70;
                topPerformers = 90;
                break;
            case 'finance':
                industryAverage = 68;
                topPerformers = 88;
                break;
            case 'healthcare':
                industryAverage = 65;
                topPerformers = 85;
                break;
            case 'retail':
                industryAverage = 62;
                topPerformers = 82;
                break;
        }
        
        // Adjust based on company type
        switch (companyType) {
            case 'startup':
                industryAverage -= 5;
                topPerformers -= 3;
                break;
            case 'enterprise':
                industryAverage += 5;
                topPerformers += 2;
                break;
        }
        
        return {
            industryAverage,
            topPerformers
        };
    }
    
    /**
     * Update charts with new data
     */
    updateCharts(newData) {
        // Update radar chart
        if (this.charts.radarChart && newData.companyScores) {
            this.charts.radarChart.data.datasets[0].data = newData.companyScores;
            
            if (newData.industry) {
                const industryBenchmarks = this.getIndustryBenchmarks(newData.industry);
                this.charts.radarChart.data.datasets[1].data = industryBenchmarks;
            }
            
            this.charts.radarChart.update();
        }
        
        // Update benchmark chart
        if (this.charts.benchmarkChart && newData.companyScores) {
            const overallScore = Math.round(newData.companyScores.reduce((a, b) => a + b, 0) / newData.companyScores.length);
            this.charts.benchmarkChart.data.datasets[0].data[0] = overallScore;
            
            if (newData.companyType && newData.industry) {
                const benchmarkData = this.getBenchmarkData(newData.companyType, newData.industry);
                this.charts.benchmarkChart.data.datasets[0].data[1] = benchmarkData.industryAverage;
                this.charts.benchmarkChart.data.datasets[0].data[2] = benchmarkData.topPerformers;
            }
            
            this.charts.benchmarkChart.update();
        }
        
        // Update progress bars
        if (newData.companyScores) {
            const operationsProgress = document.getElementById('operationsProgress');
            const technologyProgress = document.getElementById('technologyProgress');
            
            if (operationsProgress) {
                operationsProgress.style.width = `${newData.companyScores[0]}%`;
            }
            
            if (technologyProgress) {
                technologyProgress.style.width = `${newData.companyScores[1]}%`;
            }
        }
    }
}

// Create and export visualizations
const visualizations = new BusinessAssessmentVisualizations();

// Export for use in main app.js
window.BusinessAssessmentVisualizations = visualizations;
