export interface BusinessModel {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  timeToStart: string;
  initialInvestment: string;
  potentialIncome: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  pros: string[];
  cons: string[];
  requiredSkills: string[];
  timeCommitment: string;
  scalability: 'Low' | 'Medium' | 'High' | 'Very High';
}

export const businessModels: BusinessModel[] = [
  {
    id: 'freelance-writing',
    title: 'Freelance Writing',
    description: 'Offer writing services for blogs, websites, and marketing materials.',
    detailedDescription: `Freelance writing involves creating written content for businesses, publications, and individuals across various formats—blog posts, articles, web copy, email campaigns, social media content, whitepapers, and more. Writers typically work with multiple clients on a project or retainer basis, leveraging their expertise in specific niches or writing styles.

STRENGTHS:
• Low barrier to entry—can start with existing writing skills and a computer
• High demand across all industries for quality content
• Flexible schedule and location independence
• Ability to specialize in high-paying niches (SaaS, finance, healthcare, B2B)
• Scalable through higher rates, retainer clients, and team building
• Multiple income streams possible (writing, editing, content strategy)

WEAKNESSES:
• Income can be inconsistent, especially when starting
• Constant client acquisition needed without retainers
• Competitive market with many low-cost providers
• Feast or famine cycles common
• Requires strong self-discipline and time management
• Client revisions and scope creep can affect profitability

POTENTIAL USER STRUGGLES:
• Pricing Confidence: New writers often undercharge due to imposter syndrome or market pressure
• Niche Selection: Trying to write for everyone instead of specializing in profitable niches
• Client Quality: Working with difficult clients who don't value quality writing
• Inconsistent Workflow: Struggling to maintain steady work without systems

COUNTERACTING STRUGGLES:
• Specialize Early: Focus on 1-2 profitable niches (SaaS, finance, health) rather than general writing
• Build a Portfolio: Create spec pieces and case studies to demonstrate expertise
• Use Value-Based Pricing: Price based on client results, not just time spent
• Develop Systems: Use templates, processes, and tools to increase efficiency
• Build Long-Term Relationships: Focus on retainer clients over one-off projects

BEST FIT PERSONALITY:
• Strong written communication skills
• Self-motivated and disciplined
• Curious and enjoys research
• Detail-oriented with good grammar/editing skills
• Comfortable with deadlines and client communication
• Adaptable to different brand voices and styles

MARKET SIZE:
The global content marketing industry was valued at over $63 billion in 2024, with businesses increasingly investing in quality written content for digital marketing, thought leadership, and customer education.

AVERAGE INCOME TIERS (MONTHLY):
• Beginner: $500 – $2,000
• Average: $2,000 – $6,000
• Experienced: $8,000 – $15,000+

RESOURCES TO CHECK OUT:
• Platforms: Upwork, Contently, ClearVoice, Scripted, ProBlogger Job Board, LinkedIn
• Portfolio Tools: WordPress, Notion, Contently, Journo Portfolio, Clippings.me
• Writing Tools: Grammarly, Hemingway Editor, Surfer SEO, Clearscope, Jasper.ai
• Client Management: HoneyBook, Dubsado, FreshBooks, Toggl (time tracking)
• Learning Resources: Copyblogger, Smart Blogger, The Write Life, Ann Handley's MarketingProfs
• Networking: Facebook groups (Freelance Writers Den), Twitter writing community, local business groups`,
    timeToStart: '1-2 weeks',
    initialInvestment: '$0-$100',
    potentialIncome: '$500-$5,000/month',
    difficulty: 'Beginner',
    category: 'Service',
    pros: ['Low startup cost', 'Work from anywhere', 'High demand'],
    cons: ['Income can be inconsistent', 'Requires good writing skills'],
    requiredSkills: ['Writing', 'Research', 'Communication'],
    timeCommitment: '10-40 hours/week',
    scalability: 'Medium'
  },
  {
    id: 'dropshipping',
    title: 'Dropshipping Store',
    description: 'Sell products online without holding inventory.',
    detailedDescription: `Dropshipping is an e-commerce model where you sell physical products online without holding inventory. When a customer places an order, it's forwarded to a third-party supplier (often overseas), who ships the product directly to the customer. You handle marketing, customer service, and branding while the supplier fulfills the order.

STRENGTHS:
• Low startup cost (no inventory needed)
• No need to manage warehousing, packaging, or shipping
• Easy to test multiple products and niches
• Scalable through paid ads, influencer marketing, or SEO
• Can be managed from anywhere (location independent)

WEAKNESSES:
• Lower profit margins due to third-party fulfillment
• Shipping times can be long, especially with international suppliers
• Quality control and customer experience depend on your supplier
• High competition, especially in saturated niches
• Platform policy risks (e.g., ad account bans, payment processor holds)

POTENTIAL USER STRUGGLES:
• Impatience with Setup: Users expecting instant success may struggle with the trial-and-error period of testing products, creatives, and ad campaigns.
• Managing Refunds & Complaints: With longer shipping times or supplier errors, users may struggle to handle support and reputation issues.
• Paid Ad Complexity: Understanding and optimizing Facebook, TikTok, or Google Ads can overwhelm users with no digital marketing background.
• Product Selection Pressure: Constant need to find winning products can feel uncertain and frustrating for new users.

COUNTERACTING STRUGGLES:
• Set Realistic Financial Expectations: Emphasize testing budgets ($200–$1,000), learning curve, and that success typically comes after launching multiple products.
• Choose Good Suppliers: Use vetted platforms (e.g., CJ Dropshipping, Zendrop, or private agents) with fast shipping, tracking, and communication.
• Use Prebuilt Store Templates: Lower the barrier to entry with done-for-you Shopify themes, product page templates, and app setups.
• AI-Assisted Ads: Recommend using AI tools to generate copy, creatives, and analyze ad data to optimize campaigns faster.
• Lean into Micro-Brands: Teach users to differentiate with better branding, niche targeting, or influencer partnerships—don't just copy trending TikTok products.

BEST FIT PERSONALITY:
• High openness (for product and market testing)
• High conscientiousness (to manage fulfillment, refunds, ads)
• Low neuroticism (resilience under uncertain results)
• Growth-oriented and performance-driven
• Moderate extroversion (helpful for influencer outreach and networking)

MARKET SIZE:
The global dropshipping market was valued at ~$243 billion in 2023 and is projected to reach over $500 billion by 2027, with booming interest in niche e-commerce and direct-to-consumer brands.

AVERAGE INCOME TIERS (MONTHLY):
• Beginner: $0 – $1,000
• Average: $1,000 – $5,000
• Experienced: $10,000 – $50,000+

RESOURCES TO CHECK OUT:
• Tools/Platforms: Shopify, CJ Dropshipping, DSers, Zendrop, AutoDS, Oberlo (legacy), Canva, TikTok Creative Center
• Ad Tools: AdSpy, Minea, BigSpy, PPSpy
• AI Tools: AdCreative.ai, Copy.ai, Triple Whale (analytics), Taplio, Instantly.ai (email outreach)
• Fulfillment/Branding: SourcinBox, EcomOps, EcommHub
• Education: Start with YouTube channels like Jordan Welch, Biaheza, and @EcomKing for tactical advice. Consider course-based learning if budget allows (but vet carefully).`,
    timeToStart: '2-4 weeks',
    initialInvestment: '$100-$500',
    potentialIncome: '$1,000-$10,000/month',
    difficulty: 'Intermediate',
    category: 'E-commerce',
    pros: ['No inventory management', 'Scalable', 'Location independent'],
    cons: ['High competition', 'Lower profit margins', 'Customer service challenges'],
    requiredSkills: ['Marketing', 'Customer service', 'Basic web skills'],
    timeCommitment: '20-50 hours/week',
    scalability: 'High'
  },
  {
    id: 'online-tutoring',
    title: 'Online Tutoring',
    description: 'Teach students online in subjects you excel at.',
    detailedDescription: `Online tutoring involves providing personalized educational support to students via video calls, helping them understand concepts, complete assignments, and improve academic performance. Tutors can work with K-12 students, college students, or adult learners across various subjects from math and science to languages and test preparation.

STRENGTHS:
• Flexible scheduling that fits around other commitments
• Rewarding work that makes a direct impact on student success
• Growing market with increased acceptance of online learning
• Can charge premium rates for specialized subjects (SAT prep, advanced math, coding)
• Low overhead costs—just need a computer and internet connection
• Ability to work with students globally, expanding market reach

WEAKNESSES:
• Seasonal demand fluctuations (busy during school year, slower in summer)
• Requires strong teaching and communication skills
• Income tied to hours worked—limited scalability without group sessions
• Student retention can be challenging
• Competition from tutoring platforms that take significant commissions
• Need to stay current with curriculum changes and educational standards

POTENTIAL USER STRUGGLES:
• Platform Dependence: Relying solely on tutoring platforms that take 20-50% commissions
• Pricing Uncertainty: Not knowing how to price services competitively while maintaining profitability
• Student Engagement: Keeping students motivated and engaged in virtual learning environments
• Inconsistent Bookings: Struggling with irregular scheduling and income fluctuations

COUNTERACTING STRUGGLES:
• Build Direct Relationships: Transition platform clients to direct bookings to avoid commissions
• Specialize in High-Value Areas: Focus on test prep, advanced subjects, or adult learning for higher rates
• Create Group Sessions: Offer small group tutoring to increase hourly earnings
• Develop Learning Materials: Create worksheets, guides, and resources to add value and justify higher rates
• Use Scheduling Tools: Implement booking systems and automated reminders to reduce no-shows

BEST FIT PERSONALITY:
• Patient and empathetic with strong interpersonal skills
• Clear communicator who can explain complex concepts simply
• Organized and reliable with good time management
• Passionate about education and helping others succeed
• Adaptable to different learning styles and student needs
• Comfortable with technology and virtual teaching tools

MARKET SIZE:
The global online tutoring market reached $8.5 billion in 2024 and is projected to grow significantly, driven by increased demand for personalized learning and test preparation services.

AVERAGE INCOME TIERS (MONTHLY):
• Beginner: $800 – $2,000
• Average: $2,000 – $4,500
• Experienced: $5,000 – $8,000+

RESOURCES TO CHECK OUT:
• Platforms: Wyzant, Tutor.com, Chegg Tutors, Varsity Tutors, Preply, iTalki (languages)
• Video Tools: Zoom, Google Meet, Microsoft Teams, BigBlueButton
• Teaching Tools: Khan Academy, Desmos (math), Whiteboard.fi, Jamboard, Explain Everything
• Scheduling: Calendly, Acuity Scheduling, SimplyBook.me, Bookeo
• Payment Processing: PayPal, Stripe, Square, Venmo
• Marketing: Local Facebook groups, Nextdoor, university bulletin boards, referral programs`,
    timeToStart: '1 week',
    initialInvestment: '$0-$200',
    potentialIncome: '$1,000-$4,000/month',
    difficulty: 'Beginner',
    category: 'Education',
    pros: ['Flexible schedule', 'Rewarding work', 'Growing market'],
    cons: ['Seasonal demand', 'Requires teaching skills'],
    requiredSkills: ['Subject expertise', 'Communication', 'Patience'],
    timeCommitment: '5-30 hours/week',
    scalability: 'Medium'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    description: 'Manage social media accounts for small businesses.',
    detailedDescription: `Social media management involves creating, scheduling, and managing content across various social platforms for businesses, helping them build brand awareness, engage with customers, and drive sales. This includes content creation, community management, analytics reporting, and social media strategy development.

STRENGTHS:
• High demand as businesses recognize the importance of social media presence
• Creative and varied work with different clients and industries
• Recurring monthly income through retainer agreements
• Scalable by hiring team members or using automation tools
• Can work remotely with flexible scheduling
• Multiple service offerings (content creation, ads management, strategy consulting)

WEAKNESSES:
• Constantly changing platform algorithms and features require ongoing learning
• Client management can be challenging with subjective creative feedback
• Burnout risk from managing multiple accounts and staying "always on"
• Competition from agencies and freelancers, including overseas providers
• Results can be difficult to measure and attribute directly to social media efforts
• Platform dependency—changes in policies can affect client results

POTENTIAL USER STRUGGLES:
• Content Creation Burnout: Struggling to consistently create fresh, engaging content for multiple clients
• Proving ROI: Difficulty demonstrating clear return on investment to justify fees
• Scope Creep: Clients requesting additional services without additional compensation
• Keeping Up with Changes: Overwhelming pace of platform updates and new features

COUNTERACTING STRUGGLES:
• Develop Content Systems: Create templates, content calendars, and batch creation processes
• Focus on Metrics That Matter: Track engagement, leads, and conversions rather than just vanity metrics
• Set Clear Boundaries: Define scope of work clearly in contracts and charge for additional requests
• Specialize in Specific Platforms: Become an expert in 1-2 platforms rather than trying to master all
• Use Automation Tools: Leverage scheduling and analytics tools to increase efficiency

BEST FIT PERSONALITY:
• Creative with strong visual and written communication skills
• Organized and detail-oriented with good project management abilities
• Social and outgoing with understanding of online community dynamics
• Adaptable and quick to learn new platforms and features
• Strategic thinker who can align social media with business goals
• Patient and diplomatic when managing client relationships and feedback

MARKET SIZE:
The global social media management market was valued at $17.7 billion in 2024 and continues to grow as businesses increase their digital marketing investments and recognize the need for professional social media expertise.

AVERAGE INCOME TIERS (MONTHLY):
• Beginner: $1,000 – $3,000
• Average: $3,000 – $8,000
• Experienced: $10,000 – $20,000+

RESOURCES TO CHECK OUT:
• Scheduling Tools: Hootsuite, Buffer, Later, Sprout Social, Creator Studio
• Design Tools: Canva Pro, Adobe Creative Suite, Figma, Unfold, VSCO
• Analytics: Google Analytics, Facebook Analytics, Sprout Social, Hootsuite Analytics
• Content Creation: Unsplash, Pexels, Loom (video), CapCut, InShot
• Client Management: HoneyBook, Dubsado, Asana, Trello, Monday.com
• Learning: Social Media Examiner, HubSpot Academy, Facebook Blueprint, Hootsuite Academy`,
    timeToStart: '2-4 weeks',
    initialInvestment: '$500-$2,000',
    potentialIncome: '$3,000-$15,000/month',
    difficulty: 'Intermediate',
    category: 'Marketing',
    pros: ['High demand', 'Recurring revenue', 'Scalable team model'],
    cons: ['Platform algorithm changes', 'Client management challenges', 'Content creation demands'],
    requiredSkills: ['Social media marketing', 'Content creation', 'Client management', 'Analytics'],
    timeCommitment: '30-50 hours/week',
    scalability: 'High'
  },
  {
    id: 'print-on-demand',
    title: 'Print on Demand',
    description: 'Create and sell custom designs on products like t-shirts, mugs, and phone cases without holding inventory.',
    detailedDescription: `Print-on-demand involves creating custom designs that are printed on products (t-shirts, mugs, phone cases, wall art, etc.) only when a customer places an order. The POD service handles printing, packaging, and shipping while you focus on design creation and marketing. This eliminates the need for inventory investment and storage.

STRENGTHS:
• No upfront inventory costs
• Creative freedom with designs
• Passive income potential
• Easy to test different niches

WEAKNESSES:
• Lower profit margins
• Highly competitive market
• Dependent on platform policies
• Limited control over fulfillment

POTENTIAL USER STRUGGLES:
• Design Saturation: Difficulty standing out in oversaturated niches like motivational quotes
• Keyword Research: Struggling to optimize listings for discoverability on platforms
• Trend Timing: Missing trending topics or being too late to capitalize on viral moments
• Quality Control: Dealing with customer complaints about print quality or product issues

COUNTERACTING STRUGGLES:
• Research Profitable Niches: Use tools to find underserved markets with good demand
• Focus on Evergreen Designs: Create timeless designs that sell consistently year-round
• Optimize for SEO: Learn platform-specific keyword research and listing optimization
• Test and Iterate: Start with simple designs, analyze performance, and improve based on data
• Diversify Platforms: Don't rely on just one marketplace—spread across multiple channels

BEST FIT PERSONALITY:
• Creative with strong design sense and artistic abilities
• Patient and persistent—success often takes time and many design iterations
• Analytical mindset for researching trends and optimizing listings
• Self-motivated to consistently create new designs
• Detail-oriented for proper file preparation and listing optimization
• Comfortable with digital design tools and learning new software

MARKET SIZE:
The global print-on-demand market was valued at $7.2 billion in 2024 and is projected to reach $43.4 billion by 2030, driven by e-commerce growth and demand for personalized products.

AVERAGE INCOME TIERS (MONTHLY):
• Beginner: $50 – $500
• Average: $500 – $2,000
• Experienced: $3,000 – $10,000+

RESOURCES TO CHECK OUT:
• POD Platforms: Printful, Printify, Gooten, SPOD, Teespring (Spring), RedBubble
• Marketplaces: Etsy, Amazon Merch on Demand, Society6, TeePublic, Zazzle
• Design Tools: Canva Pro, Adobe Illustrator, Photoshop, Procreate, GIMP (free)
• Research Tools: Marmalead, eRank, Merch Informer, Jungle Scout, Helium 10
• Mockup Tools: Placeit, Smartmockups, Mockup World, Freepik
• Learning: Print on Demand Secrets, Merch Empire, YouTube channels like Detour Shirts`,
    timeToStart: '1-3 weeks',
    initialInvestment: '$0-$200',
    potentialIncome: '$300-$3,000/month',
    difficulty: 'Beginner',
    category: 'Creative',
    pros: ['No inventory', 'Creative freedom', 'Passive income potential'],
    cons: ['Competitive market', 'Design skills needed'],
    requiredSkills: ['Design', 'Marketing', 'Trend research'],
    timeCommitment: '10-25 hours/week',
    scalability: 'Medium'
  },
  {
    id: 'ecommerce-brand-building',
    title: 'E-commerce Brand Building',
    description: 'Create and sell your own physical products under a unique brand identity for long-term equity.',
    detailedDescription: `E-commerce brand builders create and sell their own physical products—either self-manufactured or white-labeled—under a unique brand identity. Unlike dropshipping, this model focuses on long-term brand equity, customer loyalty, and higher margins through owned marketing channels (email, SMS, content). Products are typically sold via Shopify, Amazon, or other marketplaces.

STRENGTHS:
• High control over product, branding, customer experience
• Long-term equity building—can lead to acquisition or expansion
• High scalability potential with the right product-market fit
• Enables deep brand storytelling and loyalty
• Greater margin control than dropshipping or affiliate models

WEAKNESSES:
• Higher upfront investment (product development, inventory, branding, ads)
• Logistics: fulfillment, shipping, and returns must be managed
• Slower ramp-up—takes months to build traction and cash flow
• Requires product sourcing, packaging, quality control
• Paid traffic can be expensive if not optimized early

POTENTIAL USER STRUGGLES:
• Overcomplicating the Product: New founders often overbuild instead of testing MVPs quickly
• Cash Flow Mismanagement: Inventory-heavy models require upfront cash before returns come in
• Lack of Differentiation: Generic products = low conversion and no brand value
• Inconsistent Traffic: Reliance on paid ads without a long-term strategy (email/SMS) leads to burnout

COUNTERACTING STRUGGLES:
• Start With a Niche: Serve a clear, under-addressed audience with a specific need
• Leverage Preorders: Reduce upfront risk by validating demand before stocking inventory
• Focus on 1 Hero Product: Scale depth before breadth—build around a flagship SKU
• Build Retention Systems: Use Klaviyo, Postscript, or Attentive for automated email/SMS flows
• Use Influencer Seeding + UGC: Grow trust and content without high ad spend

BEST FIT PERSONALITY:
• Long-term thinker with a brand-building mindset
• Comfortable with some financial risk
• Detail-oriented and aesthetic-driven
• Analytical with a bias for testing and optimization
• Persistent and patient (slow initial traction is normal)
• Creative problem-solver—especially in sourcing, messaging, and marketing

MARKET SIZE:
Global e-commerce retail sales hit $6.3 trillion in 2024 and continue to grow. Niche DTC brands are capturing loyal audiences through verticalization and storytelling.

AVERAGE INCOME TIERS (MONTHLY):
• Beginner: $0 – $1,000
• Average: $3,000 – $15,000
• Experienced: $50,000 – $100,000+

RESOURCES TO CHECK OUT:
• Platform Tools: Shopify, Webflow, WooCommerce, Etsy (for niche discovery), Faire (wholesale)
• Fulfillment/Logistics: ShipBob, EasyShip, Deliverr, Amazon FBA, Printful (hybrid)
• Marketing Tools: Klaviyo (email), Postscript (SMS), Gorgias (support), Fera (social proof)
• Design & Branding: Canva Pro, Figma, 99designs, Hatchful
• Ad Platforms: Meta Ads, TikTok Ads Manager, Pinterest Ads, Google Shopping
• Marketplaces & Communities: Trend.io, JoinBrands, Carro (collabs), Indie Hackers (eComm threads)
• Product Sourcing: Alibaba, Sourcify, ThomasNet, Indie brands via Faire
• AI Tools: Copy.ai, ChatGPT (landing page copy), AdCreative.ai, NeuronWriter, Rytell, Blend for product photos
• Courses/Communities: Build Your Brand (Kristen), 6-Figure Brands (Iman Gadzhi), Foundr's eCommerce course, eComm Mastermind groups on Discord or Skool`,
    timeToStart: '3-6 months',
    initialInvestment: '$2,000-$10,000',
    potentialIncome: '$3,000-$100,000+/month',
    difficulty: 'Advanced',
    category: 'E-commerce',
    pros: ['Brand equity building', 'High control', 'Long-term scalability'],
    cons: ['High upfront investment', 'Complex logistics', 'Slow initial growth'],
    requiredSkills: ['Product sourcing', 'Brand development', 'Digital marketing', 'Operations management'],
    timeCommitment: '40-60 hours/week',
    scalability: 'Very High'
  }
];