/**
 * Industry-specific questions and sub-categories
 * This file contains the industry-specific questions and sub-categories for the assessment
 */

// Industry sub-categories
const industrySubcategories = {
    'technology': [
        { value: 'software', label: 'Software Development' },
        { value: 'hardware', label: 'Hardware & Electronics' },
        { value: 'it-services', label: 'IT Services & Consulting' },
        { value: 'telecommunications', label: 'Telecommunications' },
        { value: 'cloud-services', label: 'Cloud Services' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
        { value: 'ai-ml', label: 'AI & Machine Learning' },
        { value: 'blockchain', label: 'Blockchain & Cryptocurrency' },
        { value: 'iot', label: 'Internet of Things (IoT)' },
        { value: 'gaming', label: 'Gaming & Interactive Media' }
    ],
    'finance': [
        { value: 'banking', label: 'Banking' },
        { value: 'insurance', label: 'Insurance' },
        { value: 'investments', label: 'Investment & Asset Management' },
        { value: 'fintech', label: 'Financial Technology (Fintech)' },
        { value: 'wealth-management', label: 'Wealth Management' },
        { value: 'payments', label: 'Payments & Money Transfer' },
        { value: 'lending', label: 'Lending & Credit' },
        { value: 'capital-markets', label: 'Capital Markets' },
        { value: 'accounting', label: 'Accounting & Tax Services' },
        { value: 'crypto', label: 'Cryptocurrency & Digital Assets' }
    ],
    'healthcare': [
        { value: 'providers', label: 'Healthcare Providers & Services' },
        { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
        { value: 'biotech', label: 'Biotechnology' },
        { value: 'medical-devices', label: 'Medical Devices & Equipment' },
        { value: 'health-tech', label: 'Health Technology' },
        { value: 'mental-health', label: 'Mental Health Services' },
        { value: 'telemedicine', label: 'Telemedicine' },
        { value: 'health-insurance', label: 'Health Insurance' },
        { value: 'senior-care', label: 'Senior & Long-term Care' },
        { value: 'wellness', label: 'Wellness & Preventive Health' }
    ],
    'retail': [
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'brick-mortar', label: 'Brick & Mortar Retail' },
        { value: 'omnichannel', label: 'Omnichannel Retail' },
        { value: 'grocery', label: 'Grocery & Food Retail' },
        { value: 'fashion', label: 'Fashion & Apparel' },
        { value: 'luxury', label: 'Luxury Goods' },
        { value: 'consumer-electronics', label: 'Consumer Electronics' },
        { value: 'home-improvement', label: 'Home Improvement & Furnishings' },
        { value: 'specialty', label: 'Specialty Retail' },
        { value: 'direct-to-consumer', label: 'Direct-to-Consumer (DTC)' }
    ],
    'manufacturing': [
        { value: 'industrial', label: 'Industrial Manufacturing' },
        { value: 'consumer-goods', label: 'Consumer Goods Manufacturing' },
        { value: 'automotive', label: 'Automotive & Transportation Equipment' },
        { value: 'electronics', label: 'Electronics Manufacturing' },
        { value: 'aerospace', label: 'Aerospace & Defense' },
        { value: 'chemicals', label: 'Chemicals & Materials' },
        { value: 'textiles', label: 'Textiles & Apparel Manufacturing' },
        { value: 'food-beverage', label: 'Food & Beverage Processing' },
        { value: 'pharmaceuticals-mfg', label: 'Pharmaceutical Manufacturing' },
        { value: 'medical-devices-mfg', label: 'Medical Device Manufacturing' }
    ],
    'professional-services': [
        { value: 'consulting', label: 'Management Consulting' },
        { value: 'legal', label: 'Legal Services' },
        { value: 'accounting-services', label: 'Accounting & Tax Services' },
        { value: 'marketing-agencies', label: 'Marketing & Advertising Agencies' },
        { value: 'hr-services', label: 'HR & Recruitment Services' },
        { value: 'engineering', label: 'Engineering Services' },
        { value: 'research', label: 'Research & Development Services' },
        { value: 'design', label: 'Design Services' },
        { value: 'it-consulting', label: 'IT Consulting' },
        { value: 'business-services', label: 'Business Support Services' }
    ],
    'education': [
        { value: 'k12', label: 'K-12 Education' },
        { value: 'higher-ed', label: 'Higher Education' },
        { value: 'edtech', label: 'Educational Technology' },
        { value: 'professional-training', label: 'Professional Training & Coaching' },
        { value: 'language', label: 'Language Learning' },
        { value: 'tutoring', label: 'Tutoring & Test Preparation' },
        { value: 'early-childhood', label: 'Early Childhood Education' },
        { value: 'special-education', label: 'Special Education' },
        { value: 'vocational', label: 'Vocational & Trade Schools' },
        { value: 'corporate-learning', label: 'Corporate Learning & Development' }
    ],
    'real-estate': [
        { value: 'residential', label: 'Residential Real Estate' },
        { value: 'commercial', label: 'Commercial Real Estate' },
        { value: 'construction', label: 'Construction' },
        { value: 'property-management', label: 'Property Management' },
        { value: 'real-estate-tech', label: 'Real Estate Technology' },
        { value: 'architecture', label: 'Architecture & Design' },
        { value: 'development', label: 'Real Estate Development' },
        { value: 'facilities', label: 'Facilities Management' },
        { value: 'brokerage', label: 'Real Estate Brokerage' },
        { value: 'reit', label: 'REITs & Real Estate Investment' }
    ],
    'media': [
        { value: 'publishing', label: 'Publishing & Digital Content' },
        { value: 'broadcasting', label: 'Broadcasting & Cable' },
        { value: 'film-production', label: 'Film & Video Production' },
        { value: 'music', label: 'Music & Audio' },
        { value: 'gaming-media', label: 'Gaming & Interactive Entertainment' },
        { value: 'digital-media', label: 'Digital Media & Platforms' },
        { value: 'advertising', label: 'Advertising & Marketing' },
        { value: 'social-media', label: 'Social Media' },
        { value: 'streaming', label: 'Streaming Services' },
        { value: 'news', label: 'News & Information Services' }
    ],
    'hospitality': [
        { value: 'hotels', label: 'Hotels & Accommodations' },
        { value: 'restaurants', label: 'Restaurants & Food Service' },
        { value: 'travel', label: 'Travel & Tourism' },
        { value: 'events', label: 'Events & Conferences' },
        { value: 'entertainment', label: 'Entertainment & Recreation' },
        { value: 'cruise', label: 'Cruise & Travel Experiences' },
        { value: 'hospitality-tech', label: 'Hospitality Technology' },
        { value: 'food-delivery', label: 'Food Delivery & Catering' },
        { value: 'vacation-rental', label: 'Vacation Rentals' },
        { value: 'theme-parks', label: 'Theme Parks & Attractions' }
    ],
    'energy': [
        { value: 'oil-gas', label: 'Oil & Gas' },
        { value: 'renewable', label: 'Renewable Energy' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'power-generation', label: 'Power Generation & Distribution' },
        { value: 'energy-tech', label: 'Energy Technology' },
        { value: 'cleantech', label: 'Clean Technology' },
        { value: 'energy-storage', label: 'Energy Storage' },
        { value: 'energy-efficiency', label: 'Energy Efficiency' },
        { value: 'nuclear', label: 'Nuclear Energy' },
        { value: 'energy-services', label: 'Energy Services' }
    ],
    'transportation': [
        { value: 'logistics', label: 'Logistics & Supply Chain' },
        { value: 'shipping', label: 'Shipping & Freight' },
        { value: 'passenger-transport', label: 'Passenger Transportation' },
        { value: 'aviation', label: 'Aviation & Airlines' },
        { value: 'automotive-transport', label: 'Automotive & Mobility' },
        { value: 'rail', label: 'Rail Transportation' },
        { value: 'maritime', label: 'Maritime & Shipping' },
        { value: 'last-mile', label: 'Last-Mile Delivery' },
        { value: 'transportation-tech', label: 'Transportation Technology' },
        { value: 'fleet-management', label: 'Fleet Management' }
    ],
    'agriculture': [
        { value: 'farming', label: 'Farming & Crop Production' },
        { value: 'livestock', label: 'Livestock & Animal Husbandry' },
        { value: 'agtech', label: 'Agricultural Technology' },
        { value: 'food-processing', label: 'Food Processing & Production' },
        { value: 'forestry', label: 'Forestry & Timber' },
        { value: 'aquaculture', label: 'Aquaculture & Fisheries' },
        { value: 'agribusiness', label: 'Agribusiness' },
        { value: 'sustainable-ag', label: 'Sustainable Agriculture' },
        { value: 'farm-equipment', label: 'Farm Equipment & Supplies' },
        { value: 'food-distribution', label: 'Food Distribution' }
    ],
    'non-profit': [
        { value: 'charity', label: 'Charitable Organizations' },
        { value: 'foundation', label: 'Foundations & Grantmaking' },
        { value: 'social-enterprise', label: 'Social Enterprises' },
        { value: 'ngo', label: 'NGOs & International Organizations' },
        { value: 'healthcare-nonprofit', label: 'Healthcare Non-profits' },
        { value: 'education-nonprofit', label: 'Educational Non-profits' },
        { value: 'arts-culture', label: 'Arts & Cultural Organizations' },
        { value: 'environmental', label: 'Environmental Organizations' },
        { value: 'human-services', label: 'Human Services' },
        { value: 'religious', label: 'Religious Organizations' }
    ],
    'government': [
        { value: 'federal', label: 'Federal Government' },
        { value: 'state', label: 'State/Provincial Government' },
        { value: 'local', label: 'Local Government' },
        { value: 'defense', label: 'Defense & Military' },
        { value: 'public-safety', label: 'Public Safety & Emergency Services' },
        { value: 'healthcare-gov', label: 'Healthcare & Public Health' },
        { value: 'education-gov', label: 'Education Administration' },
        { value: 'regulatory', label: 'Regulatory Agencies' },
        { value: 'infrastructure', label: 'Infrastructure & Transportation' },
        { value: 'social-services', label: 'Social Services & Welfare' }
    ]
};

// Industry-specific questions
const industrySpecificQuestions = {
    'technology': [
        {
            id: 'tech-stack',
            question: 'How would you describe your current technology stack?',
            type: 'single',
            options: [
                { value: 'legacy', label: 'Primarily legacy systems with minimal modern technology' },
                { value: 'mixed', label: 'Mix of legacy and modern technology' },
                { value: 'modern', label: 'Primarily modern technology with some technical debt' },
                { value: 'cutting-edge', label: 'Cutting-edge technology stack with continuous updates' }
            ]
        },
        {
            id: 'development-methodology',
            question: 'What development methodology do you primarily use?',
            type: 'single',
            options: [
                { value: 'waterfall', label: 'Waterfall or traditional' },
                { value: 'agile', label: 'Agile (Scrum, Kanban, etc.)' },
                { value: 'devops', label: 'DevOps with CI/CD' },
                { value: 'hybrid', label: 'Hybrid approach' }
            ]
        },
        {
            id: 'tech-challenges',
            question: 'What are your biggest technology challenges? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'technical-debt', label: 'Managing technical debt' },
                { value: 'talent', label: 'Finding and retaining technical talent' },
                { value: 'scalability', label: 'Scalability issues' },
                { value: 'security', label: 'Security and compliance' },
                { value: 'integration', label: 'System integration complexity' },
                { value: 'innovation', label: 'Keeping pace with innovation' },
                { value: 'cloud-migration', label: 'Cloud migration challenges' },
                { value: 'data-management', label: 'Data management and analytics' }
            ]
        }
    ],
    'finance': [
        {
            id: 'regulatory-compliance',
            question: 'How would you rate your regulatory compliance capabilities?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic compliance with some gaps' },
                { value: 'adequate', label: 'Adequate compliance with manual processes' },
                { value: 'advanced', label: 'Advanced compliance with some automation' },
                { value: 'comprehensive', label: 'Comprehensive compliance with full automation' }
            ]
        },
        {
            id: 'digital-transformation',
            question: 'Where are you in your digital transformation journey?',
            type: 'single',
            options: [
                { value: 'planning', label: 'Planning and strategy phase' },
                { value: 'early-implementation', label: 'Early implementation of digital initiatives' },
                { value: 'advanced-implementation', label: 'Advanced implementation across multiple areas' },
                { value: 'digital-first', label: 'Digital-first organization with mature capabilities' }
            ]
        },
        {
            id: 'finance-priorities',
            question: 'What are your top financial services priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'customer-experience', label: 'Enhancing customer experience' },
                { value: 'risk-management', label: 'Improving risk management' },
                { value: 'cost-reduction', label: 'Reducing operational costs' },
                { value: 'digital-channels', label: 'Expanding digital channels' },
                { value: 'data-analytics', label: 'Leveraging data and analytics' },
                { value: 'regulatory-compliance', label: 'Strengthening regulatory compliance' },
                { value: 'cybersecurity', label: 'Enhancing cybersecurity' },
                { value: 'product-innovation', label: 'Accelerating product innovation' }
            ]
        }
    ],
    'healthcare': [
        {
            id: 'patient-experience',
            question: 'How would you rate your patient/customer experience capabilities?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic with limited digital engagement' },
                { value: 'developing', label: 'Developing with some digital touchpoints' },
                { value: 'advanced', label: 'Advanced with integrated digital experience' },
                { value: 'exceptional', label: 'Exceptional with personalized omnichannel experience' }
            ]
        },
        {
            id: 'health-data',
            question: 'How do you manage healthcare data and analytics?',
            type: 'single',
            options: [
                { value: 'siloed', label: 'Siloed data with limited analytics' },
                { value: 'centralized', label: 'Centralized data with basic analytics' },
                { value: 'integrated', label: 'Integrated data with advanced analytics' },
                { value: 'ai-driven', label: 'AI-driven analytics with predictive capabilities' }
            ]
        },
        {
            id: 'healthcare-priorities',
            question: 'What are your top healthcare priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'patient-outcomes', label: 'Improving patient outcomes' },
                { value: 'operational-efficiency', label: 'Enhancing operational efficiency' },
                { value: 'cost-containment', label: 'Containing costs' },
                { value: 'regulatory-compliance', label: 'Ensuring regulatory compliance' },
                { value: 'digital-health', label: 'Expanding digital health capabilities' },
                { value: 'data-interoperability', label: 'Improving data interoperability' },
                { value: 'talent-retention', label: 'Attracting and retaining healthcare talent' },
                { value: 'innovation', label: 'Accelerating healthcare innovation' }
            ]
        }
    ],
    'retail': [
        {
            id: 'omnichannel',
            question: 'How would you describe your omnichannel capabilities?',
            type: 'single',
            options: [
                { value: 'siloed', label: 'Siloed channels with limited integration' },
                { value: 'connected', label: 'Connected channels with some integration' },
                { value: 'integrated', label: 'Integrated omnichannel experience' },
                { value: 'seamless', label: 'Seamless omnichannel with unified customer view' }
            ]
        },
        {
            id: 'supply-chain',
            question: 'How would you rate your supply chain capabilities?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic with limited visibility and automation' },
                { value: 'developing', label: 'Developing with partial visibility and some automation' },
                { value: 'advanced', label: 'Advanced with good visibility and significant automation' },
                { value: 'optimized', label: 'Optimized with full visibility and extensive automation' }
            ]
        },
        {
            id: 'retail-priorities',
            question: 'What are your top retail priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'customer-experience', label: 'Enhancing customer experience' },
                { value: 'omnichannel', label: 'Developing omnichannel capabilities' },
                { value: 'supply-chain', label: 'Optimizing supply chain' },
                { value: 'personalization', label: 'Implementing personalization' },
                { value: 'inventory-management', label: 'Improving inventory management' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'store-experience', label: 'Reimagining store experience' },
                { value: 'data-analytics', label: 'Leveraging data and analytics' }
            ]
        }
    ],
    'manufacturing': [
        {
            id: 'production-automation',
            question: 'What is your level of production automation?',
            type: 'single',
            options: [
                { value: 'minimal', label: 'Minimal automation with primarily manual processes' },
                { value: 'partial', label: 'Partial automation of key processes' },
                { value: 'significant', label: 'Significant automation across most processes' },
                { value: 'advanced', label: 'Advanced automation with smart manufacturing capabilities' }
            ]
        },
        {
            id: 'supply-chain-visibility',
            question: 'How would you describe your supply chain visibility?',
            type: 'single',
            options: [
                { value: 'limited', label: 'Limited visibility with reactive management' },
                { value: 'moderate', label: 'Moderate visibility with some predictive capabilities' },
                { value: 'comprehensive', label: 'Comprehensive visibility with good predictive capabilities' },
                { value: 'end-to-end', label: 'End-to-end visibility with advanced analytics and optimization' }
            ]
        },
        {
            id: 'manufacturing-priorities',
            question: 'What are your top manufacturing priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'quality-control', label: 'Enhancing quality control' },
                { value: 'supply-chain-resilience', label: 'Building supply chain resilience' },
                { value: 'cost-reduction', label: 'Reducing production costs' },
                { value: 'automation', label: 'Increasing automation' },
                { value: 'sustainability', label: 'Implementing sustainable practices' },
                { value: 'workforce-skills', label: 'Developing workforce skills' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' }
            ]
        }
    ],
    'professional-services': [
        {
            id: 'service-delivery',
            question: 'How would you describe your service delivery model?',
            type: 'single',
            options: [
                { value: 'traditional', label: 'Traditional with limited digital integration' },
                { value: 'hybrid', label: 'Hybrid with some digital service components' },
                { value: 'digital-enabled', label: 'Digitally-enabled with significant automation' },
                { value: 'digital-first', label: 'Digital-first with innovative service delivery' }
            ]
        },
        {
            id: 'knowledge-management',
            question: 'How would you rate your knowledge management capabilities?',
            type: 'single',
            options: [
                { value: 'informal', label: 'Informal with limited documentation' },
                { value: 'structured', label: 'Structured with basic knowledge sharing' },
                { value: 'comprehensive', label: 'Comprehensive with good knowledge access' },
                { value: 'advanced', label: 'Advanced with AI-enhanced knowledge systems' }
            ]
        },
        {
            id: 'professional-services-priorities',
            question: 'What are your top professional services priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'client-experience', label: 'Enhancing client experience' },
                { value: 'service-innovation', label: 'Accelerating service innovation' },
                { value: 'talent-development', label: 'Developing and retaining talent' },
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'digital-transformation', label: 'Driving digital transformation' },
                { value: 'data-analytics', label: 'Leveraging data and analytics' },
                { value: 'market-expansion', label: 'Expanding into new markets' },
                { value: 'pricing-models', label: 'Evolving pricing and business models' }
            ]
        }
    ],
    'education': [
        {
            id: 'digital-learning',
            question: 'How would you describe your digital learning capabilities?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic with limited online components' },
                { value: 'blended', label: 'Blended learning with significant online elements' },
                { value: 'comprehensive', label: 'Comprehensive digital learning environment' },
                { value: 'innovative', label: 'Innovative with adaptive and personalized learning' }
            ]
        },
        {
            id: 'student-data',
            question: 'How do you leverage student/learner data?',
            type: 'single',
            options: [
                { value: 'limited', label: 'Limited data collection and minimal analysis' },
                { value: 'basic', label: 'Basic data collection with some analysis' },
                { value: 'advanced', label: 'Advanced data collection with regular analysis' },
                { value: 'comprehensive', label: 'Comprehensive data ecosystem with predictive analytics' }
            ]
        },
        {
            id: 'education-priorities',
            question: 'What are your top education priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'learning-outcomes', label: 'Improving learning outcomes' },
                { value: 'student-experience', label: 'Enhancing student experience' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'faculty-development', label: 'Supporting faculty/staff development' },
                { value: 'accessibility', label: 'Increasing accessibility and inclusion' },
                { value: 'innovation', label: 'Fostering educational innovation' },
                { value: 'industry-alignment', label: 'Aligning with industry needs' }
            ]
        }
    ],
    'real-estate': [
        {
            id: 'property-technology',
            question: 'How would you describe your use of property technology (PropTech)?',
            type: 'single',
            options: [
                { value: 'minimal', label: 'Minimal with primarily traditional methods' },
                { value: 'emerging', label: 'Emerging with some digital tools' },
                { value: 'significant', label: 'Significant with integrated digital systems' },
                { value: 'advanced', label: 'Advanced with innovative PropTech solutions' }
            ]
        },
        {
            id: 'sustainability',
            question: 'How would you rate your sustainability and ESG initiatives?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic compliance with minimal initiatives' },
                { value: 'developing', label: 'Developing with some dedicated programs' },
                { value: 'comprehensive', label: 'Comprehensive with significant investment' },
                { value: 'leading', label: 'Industry-leading with innovative approaches' }
            ]
        },
        {
            id: 'real-estate-priorities',
            question: 'What are your top real estate priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'portfolio-optimization', label: 'Optimizing property portfolio' },
                { value: 'tenant-experience', label: 'Enhancing tenant/buyer experience' },
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'sustainability', label: 'Implementing sustainability initiatives' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'market-expansion', label: 'Expanding into new markets' },
                { value: 'risk-management', label: 'Enhancing risk management' },
                { value: 'proptech-adoption', label: 'Adopting PropTech solutions' }
            ]
        }
    ],
    'media': [
        {
            id: 'content-strategy',
            question: 'How would you describe your content strategy and distribution?',
            type: 'single',
            options: [
                { value: 'traditional', label: 'Traditional with limited digital distribution' },
                { value: 'digital-transition', label: 'In transition to digital-first approach' },
                { value: 'digital-first', label: 'Digital-first with multiple platforms' },
                { value: 'omnichannel', label: 'Sophisticated omnichannel content strategy' }
            ]
        },
        {
            id: 'audience-data',
            question: 'How do you leverage audience data and analytics?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic data collection with limited analysis' },
                { value: 'developing', label: 'Developing with regular analysis' },
                { value: 'advanced', label: 'Advanced with data-driven decision making' },
                { value: 'sophisticated', label: 'Sophisticated with predictive analytics and personalization' }
            ]
        },
        {
            id: 'media-priorities',
            question: 'What are your top media and entertainment priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'audience-growth', label: 'Growing audience/subscriber base' },
                { value: 'content-innovation', label: 'Accelerating content innovation' },
                { value: 'monetization', label: 'Improving monetization strategies' },
                { value: 'digital-transformation', label: 'Advancing digital transformation' },
                { value: 'data-analytics', label: 'Enhancing data and analytics capabilities' },
                { value: 'user-experience', label: 'Optimizing user experience' },
                { value: 'technology-infrastructure', label: 'Upgrading technology infrastructure' },
                { value: 'talent-development', label: 'Developing creative and technical talent' }
            ]
        }
    ],
    'hospitality': [
        {
            id: 'guest-experience',
            question: 'How would you describe your guest experience capabilities?',
            type: 'single',
            options: [
                { value: 'traditional', label: 'Traditional with limited digital touchpoints' },
                { value: 'enhanced', label: 'Enhanced with some digital integration' },
                { value: 'digital-enabled', label: 'Digitally-enabled with significant personalization' },
                { value: 'innovative', label: 'Innovative with seamless digital-physical experience' }
            ]
        },
        {
            id: 'operational-technology',
            question: 'How would you rate your operational technology systems?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic systems with limited integration' },
                { value: 'standard', label: 'Standard industry systems with some integration' },
                { value: 'advanced', label: 'Advanced systems with good integration' },
                { value: 'cutting-edge', label: 'Cutting-edge systems with full integration and automation' }
            ]
        },
        {
            id: 'hospitality-priorities',
            question: 'What are your top hospitality priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'guest-experience', label: 'Enhancing guest experience' },
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'talent-management', label: 'Addressing staffing and talent challenges' },
                { value: 'revenue-management', label: 'Optimizing revenue management' },
                { value: 'sustainability', label: 'Implementing sustainability initiatives' },
                { value: 'brand-differentiation', label: 'Strengthening brand differentiation' },
                { value: 'distribution-strategy', label: 'Enhancing distribution strategy' }
            ]
        }
    ],
    'energy': [
        {
            id: 'energy-transition',
            question: 'Where are you in the energy transition journey?',
            type: 'single',
            options: [
                { value: 'early', label: 'Early stages with limited initiatives' },
                { value: 'developing', label: 'Developing with some significant initiatives' },
                { value: 'advanced', label: 'Advanced with comprehensive strategy' },
                { value: 'leading', label: 'Leading the transition with innovative approaches' }
            ]
        },
        {
            id: 'operational-technology',
            question: 'How would you describe your operational technology integration?',
            type: 'single',
            options: [
                { value: 'siloed', label: 'Siloed systems with minimal integration' },
                { value: 'connected', label: 'Connected systems with partial integration' },
                { value: 'integrated', label: 'Integrated systems with good data flow' },
                { value: 'optimized', label: 'Fully optimized with advanced analytics and automation' }
            ]
        },
        {
            id: 'energy-priorities',
            question: 'What are your top energy sector priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'energy-transition', label: 'Advancing energy transition' },
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'regulatory-compliance', label: 'Ensuring regulatory compliance' },
                { value: 'infrastructure-modernization', label: 'Modernizing infrastructure' },
                { value: 'sustainability', label: 'Implementing sustainability initiatives' },
                { value: 'cybersecurity', label: 'Enhancing cybersecurity' },
                { value: 'innovation', label: 'Fostering innovation and new technologies' }
            ]
        }
    ],
    'transportation': [
        {
            id: 'logistics-technology',
            question: 'How would you describe your logistics and transportation technology?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic with limited automation' },
                { value: 'standard', label: 'Standard with some digital capabilities' },
                { value: 'advanced', label: 'Advanced with significant automation' },
                { value: 'cutting-edge', label: 'Cutting-edge with AI and predictive capabilities' }
            ]
        },
        {
            id: 'sustainability-initiatives',
            question: 'How would you rate your sustainability initiatives?',
            type: 'single',
            options: [
                { value: 'minimal', label: 'Minimal with basic compliance' },
                { value: 'developing', label: 'Developing with some dedicated programs' },
                { value: 'significant', label: 'Significant with comprehensive strategy' },
                { value: 'industry-leading', label: 'Industry-leading with innovative approaches' }
            ]
        },
        {
            id: 'transportation-priorities',
            question: 'What are your top transportation and logistics priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'customer-experience', label: 'Enhancing customer experience' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'sustainability', label: 'Implementing sustainability initiatives' },
                { value: 'supply-chain-resilience', label: 'Building supply chain resilience' },
                { value: 'last-mile-optimization', label: 'Optimizing last-mile delivery' },
                { value: 'workforce-management', label: 'Addressing workforce challenges' },
                { value: 'technology-adoption', label: 'Adopting new technologies' }
            ]
        }
    ],
    'agriculture': [
        {
            id: 'agtech-adoption',
            question: 'How would you describe your agricultural technology adoption?',
            type: 'single',
            options: [
                { value: 'traditional', label: 'Traditional with minimal technology' },
                { value: 'transitioning', label: 'Transitioning with some technology adoption' },
                { value: 'modern', label: 'Modern with significant technology integration' },
                { value: 'advanced', label: 'Advanced with precision agriculture and analytics' }
            ]
        },
        {
            id: 'sustainability-practices',
            question: 'How would you rate your sustainable agriculture practices?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic with minimal sustainable practices' },
                { value: 'developing', label: 'Developing with some sustainable initiatives' },
                { value: 'comprehensive', label: 'Comprehensive sustainable agriculture program' },
                { value: 'regenerative', label: 'Regenerative agriculture with innovative approaches' }
            ]
        },
        {
            id: 'agriculture-priorities',
            question: 'What are your top agriculture and food priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'productivity', label: 'Increasing productivity and yield' },
                { value: 'sustainability', label: 'Implementing sustainable practices' },
                { value: 'technology-adoption', label: 'Adopting agricultural technology' },
                { value: 'supply-chain', label: 'Optimizing supply chain' },
                { value: 'quality-control', label: 'Enhancing quality control' },
                { value: 'market-access', label: 'Improving market access' },
                { value: 'resource-management', label: 'Optimizing resource management' },
                { value: 'climate-resilience', label: 'Building climate resilience' }
            ]
        }
    ],
    'non-profit': [
        {
            id: 'impact-measurement',
            question: 'How would you describe your impact measurement capabilities?',
            type: 'single',
            options: [
                { value: 'basic', label: 'Basic with limited metrics' },
                { value: 'developing', label: 'Developing with some outcome measurement' },
                { value: 'comprehensive', label: 'Comprehensive with regular impact reporting' },
                { value: 'advanced', label: 'Advanced with sophisticated impact evaluation' }
            ]
        },
        {
            id: 'digital-capabilities',
            question: 'How would you rate your digital capabilities?',
            type: 'single',
            options: [
                { value: 'limited', label: 'Limited with basic digital presence' },
                { value: 'functional', label: 'Functional with standard digital tools' },
                { value: 'enhanced', label: 'Enhanced with good digital integration' },
                { value: 'innovative', label: 'Innovative with advanced digital strategies' }
            ]
        },
        {
            id: 'nonprofit-priorities',
            question: 'What are your top non-profit priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'mission-impact', label: 'Increasing mission impact' },
                { value: 'funding-sustainability', label: 'Improving funding sustainability' },
                { value: 'operational-efficiency', label: 'Enhancing operational efficiency' },
                { value: 'stakeholder-engagement', label: 'Strengthening stakeholder engagement' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'talent-development', label: 'Developing staff and volunteer capabilities' },
                { value: 'collaboration', label: 'Expanding partnerships and collaboration' },
                { value: 'advocacy', label: 'Enhancing advocacy and awareness' }
            ]
        }
    ],
    'government': [
        {
            id: 'digital-government',
            question: 'How would you describe your digital government capabilities?',
            type: 'single',
            options: [
                { value: 'early', label: 'Early stages with limited digital services' },
                { value: 'developing', label: 'Developing with some digital transformation' },
                { value: 'advanced', label: 'Advanced with significant digital services' },
                { value: 'comprehensive', label: 'Comprehensive digital government strategy' }
            ]
        },
        {
            id: 'citizen-engagement',
            question: 'How would you rate your citizen/constituent engagement?',
            type: 'single',
            options: [
                { value: 'traditional', label: 'Traditional with limited digital engagement' },
                { value: 'mixed', label: 'Mixed approach with some digital channels' },
                { value: 'multi-channel', label: 'Multi-channel with good digital integration' },
                { value: 'citizen-centric', label: 'Citizen-centric with innovative engagement' }
            ]
        },
        {
            id: 'government-priorities',
            question: 'What are your top government priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'service-delivery', label: 'Improving service delivery' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'operational-efficiency', label: 'Enhancing operational efficiency' },
                { value: 'cybersecurity', label: 'Strengthening cybersecurity' },
                { value: 'data-driven-decision', label: 'Implementing data-driven decision making' },
                { value: 'workforce-modernization', label: 'Modernizing workforce capabilities' },
                { value: 'citizen-engagement', label: 'Improving citizen engagement' },
                { value: 'infrastructure', label: 'Upgrading infrastructure' }
            ]
        }
    ],
    'other': [
        {
            id: 'digital-maturity',
            question: 'How would you describe your organization\'s digital maturity?',
            type: 'single',
            options: [
                { value: 'early', label: 'Early stages with limited digital capabilities' },
                { value: 'developing', label: 'Developing with some digital transformation' },
                { value: 'advanced', label: 'Advanced with significant digital integration' },
                { value: 'leading', label: 'Leading with innovative digital strategies' }
            ]
        },
        {
            id: 'innovation-culture',
            question: 'How would you rate your organization\'s innovation culture?',
            type: 'single',
            options: [
                { value: 'traditional', label: 'Traditional with limited focus on innovation' },
                { value: 'receptive', label: 'Receptive to innovation with some initiatives' },
                { value: 'proactive', label: 'Proactive with structured innovation programs' },
                { value: 'innovative', label: 'Highly innovative with embedded innovation culture' }
            ]
        },
        {
            id: 'general-priorities',
            question: 'What are your top organizational priorities? (Select all that apply)',
            type: 'multi',
            options: [
                { value: 'operational-efficiency', label: 'Improving operational efficiency' },
                { value: 'customer-experience', label: 'Enhancing customer/client experience' },
                { value: 'digital-transformation', label: 'Accelerating digital transformation' },
                { value: 'talent-development', label: 'Developing talent and capabilities' },
                { value: 'innovation', label: 'Fostering innovation' },
                { value: 'growth', label: 'Driving growth and expansion' },
                { value: 'sustainability', label: 'Implementing sustainability initiatives' },
                { value: 'resilience', label: 'Building organizational resilience' }
            ]
        }
    ]
};

// Export the data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        industrySubcategories,
        industrySpecificQuestions
    };
}
