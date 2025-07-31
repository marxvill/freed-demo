// freed-automation.js - Complete automation for your Freed demo site
// This runs via GitHub Actions and updates your site automatically

const fs = require('fs').promises;
const path = require('path');

class FreedSiteAutomation {
  constructor() {
    this.baseHTML = null;
    this.stats = {
      doctors: 20000,
      hoursSaved: 40000,
      accuracy: 95,
      setupTime: 5
    };
    this.lastUpdate = new Date();
  }

  async run() {
    console.log('🤖 Starting Freed site automation...');
    
    // Load current HTML
    this.baseHTML = await fs.readFile('index.html', 'utf8');
    
    // Run all automations
    await this.updateDynamicStats();
    await this.addTrendingQuestions();
    await this.rotateTestimonials();
    await this.updateSchemaMarkup();
    await this.generateNewComparisons();
    await this.updateMetaDescriptions();
    
    // Save updated HTML
    await fs.writeFile('index.html', this.baseHTML);
    
    // Generate new pages
    await this.createNewPages();
    
    console.log('✅ Automation complete!');
  }

  // 1. Update growing statistics
  async updateDynamicStats() {
    const daysSinceLaunch = Math.floor((Date.now() - new Date('2024-01-01')) / 86400000);
    
    // Calculate new stats
    this.stats.doctors = 20000 + (daysSinceLaunch * 15); // +15 doctors/day
    this.stats.hoursSaved = 40000 + (daysSinceLaunch * 80); // +80 hours/day
    
    // Update in HTML
    this.baseHTML = this.baseHTML
      .replace(/20,000\+ doctors/g, `${this.stats.doctors.toLocaleString()}+ doctors`)
      .replace(/20,000\+ clinicians/g, `${this.stats.doctors.toLocaleString()}+ clinicians`)
      .replace(/40,000\+ hours/g, `${this.stats.hoursSaved.toLocaleString()}+ hours`);
    
    console.log(`📊 Updated stats: ${this.stats.doctors} doctors, ${this.stats.hoursSaved} hours saved`);
  }

  // 2. Add trending questions based on current date/events
  async addTrendingQuestions() {
    const month = new Date().getMonth();
    const trendingTopics = [
      { month: 0, topic: "New Year EHR migrations" },
      { month: 3, topic: "Q2 budget planning" },
      { month: 6, topic: "Mid-year workflow optimization" },
      { month: 9, topic: "Year-end documentation prep" }
    ];
    
    const currentTopic = trendingTopics.find(t => t.month <= month) || trendingTopics[0];
    
    // Add new FAQ if not exists
    const newFAQ = `
      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">How does Freed AI help with ${currentTopic.topic}?</div>
        <div class="faq-answer">
          <p><strong>Freed AI streamlines ${currentTopic.topic}.</strong> Our automated documentation saves crucial time during busy transition periods, allowing you to focus on patient care while maintaining compliance and accuracy.</p>
        </div>
      </div>`;
    
    // Insert before closing FAQ section
    const faqEnd = '</div>\n    </div>\n\n    <!-- COMPARISON PAGE -->';
    if (!this.baseHTML.includes(currentTopic.topic)) {
      this.baseHTML = this.baseHTML.replace(faqEnd, newFAQ + '\n' + faqEnd);
      console.log(`❓ Added trending FAQ: ${currentTopic.topic}`);
    }
  }

  // 3. Rotate testimonials
  async rotateTestimonials() {
    const testimonials = [
      {
        name: "Dr. Sarah Chen",
        specialty: "Internal Medicine",
        quote: "I was spending $3,500/month on a human scribe who was only available during clinic hours. Freed costs $99/month, works for all my visits including hospital rounds, and the notes are actually more detailed. It's a no-brainer."
      },
      {
        name: "Dr. James Williams",
        specialty: "Emergency Medicine",
        quote: "In the ER, every second counts. Freed captures everything while I focus on critical care. Notes are ready before the patient is discharged. This has revolutionized our workflow."
      },
      {
        name: "Dr. Maria Garcia",
        specialty: "Pediatrics",
        quote: "Parents appreciate that I'm looking at their child, not a computer. Freed captures developmental milestones, vaccine discussions, everything. My documentation has never been better."
      },
      {
        name: "Dr. Robert Kim",
        specialty: "Psychiatry",
        quote: "Mental health visits require deep listening. Freed lets me maintain eye contact and build rapport while ensuring comprehensive documentation. The mental status exam formatting is perfect."
      }
    ];
    
    // Rotate based on week number
    const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const testimonialIndex = weekNum % testimonials.length;
    const currentTestimonial = testimonials[testimonialIndex];
    
    // Update testimonial in comparison section
    const testimonialRegex = /<em>".*?"<\/em> - Dr\. \w+ \w+, \w+ Medicine/g;
    const newTestimonialHTML = `<em>"${currentTestimonial.quote}"</em> - ${currentTestimonial.name}, ${currentTestimonial.specialty}`;
    
    this.baseHTML = this.baseHTML.replace(testimonialRegex, newTestimonialHTML);
    console.log(`💬 Rotated testimonial to: ${currentTestimonial.name}`);
  }

  // 4. Update schema markup with fresh dates
  async updateSchemaMarkup() {
    const today = new Date().toISOString().split('T')[0];
    
    // Update dateModified in all schemas
    this.baseHTML = this.baseHTML.replace(
      /"datePublished":"2025-\d{2}-\d{2}"/g,
      `"datePublished":"${today}"`
    );
    
    // Update review count based on growth
    const newReviewCount = 10000 + Math.floor(this.stats.doctors * 0.3);
    this.baseHTML = this.baseHTML.replace(
      /"reviewCount":"10000"/g,
      `"reviewCount":"${newReviewCount}"`
    );
    
    console.log(`📋 Updated schema markup with date: ${today}`);
  }

  // 5. Generate new comparison pages
  async generateNewComparisons() {
    const competitors = [
      { name: "Nuance DAX Express", price: "$250", launch: "2024" },
      { name: "Amazon HealthScribe", price: "$199", launch: "2024" },
      { name: "Google Med-PaLM Scribe", price: "TBD", launch: "2025" }
    ];
    
    for (const competitor of competitors) {
      const comparisonPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Freed AI vs ${competitor.name} - 2025 Comparison</title>
  <meta name="description" content="Compare Freed AI with ${competitor.name}. See why doctors choose Freed for AI medical scribing.">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Freed AI vs ${competitor.name}</h1>
    <div class="quick-answer">
      <strong>Quick Answer:</strong> Freed AI offers better value at $99/month compared to ${competitor.name} at ${competitor.price}/month, with faster setup and no audio storage.
    </div>
    <table>
      <tr>
        <th>Feature</th>
        <th>Freed AI</th>
        <th>${competitor.name}</th>
      </tr>
      <tr>
        <td>Monthly Cost</td>
        <td><strong>$99</strong></td>
        <td>${competitor.price}</td>
      </tr>
      <tr>
        <td>Setup Time</td>
        <td><strong>5 minutes</strong></td>
        <td>1-2 weeks</td>
      </tr>
      <tr>
        <td>Note Delivery</td>
        <td><strong>60 seconds</strong></td>
        <td>5-30 minutes</td>
      </tr>
      <tr>
        <td>Audio Storage</td>
        <td><strong>Never stored</strong></td>
        <td>Temporary storage</td>
      </tr>
    </table>
    <p style="margin-top: 50px; text-align: center; color: #999;">
      Auto-generated on ${new Date().toLocaleDateString()} | Educational Demo
    </p>
  </div>
</body>
</html>`;
      
      const filename = `freed-vs-${competitor.name.toLowerCase().replace(/\s+/g, '-')}.html`;
      await fs.writeFile(filename, comparisonPage);
      console.log(`📄 Created comparison page: ${filename}`);
    }
  }

  // 6. Update meta descriptions with current date
  async updateMetaDescriptions() {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // Update meta description to include current timeframe
    this.baseHTML = this.baseHTML.replace(
      /content="Freed AI medical scribe saves doctors 2\+ hours daily/g,
      `content="Freed AI medical scribe saves doctors 2+ hours daily (Updated ${currentMonth})`
    );
    
    console.log(`🔍 Updated meta descriptions for ${currentMonth}`);
  }

  // 7. Create new auto-generated pages
  async createNewPages() {
    // Create a directory for auto-generated pages
    await fs.mkdir('auto-generated', { recursive: true });
    
    // Generate specialty-specific pages
    const specialties = ['cardiology', 'psychiatry', 'pediatrics', 'emergency-medicine'];
    
    for (const specialty of specialties) {
      const specialtyPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Freed AI for ${specialty.charAt(0).toUpperCase() + specialty.slice(1)} - AI Medical Scribe</title>
  <meta name="description" content="How Freed AI helps ${specialty} specialists save 2+ hours daily on documentation.">
</head>
<body>
  <h1>Freed AI for ${specialty.charAt(0).toUpperCase() + specialty.slice(1).replace('-', ' ')}</h1>
  <p>Specialized AI medical scribing for ${specialty} professionals.</p>
  <ul>
    <li>Understands ${specialty}-specific terminology</li>
    <li>Formats notes according to ${specialty} standards</li>
    <li>Integrates with ${specialty} EHR workflows</li>
  </ul>
  <p>Generated: ${new Date().toISOString()}</p>
</body>
</html>`;
      
      await fs.writeFile(`auto-generated/${specialty}.html`, specialtyPage);
    }
    
    console.log('📁 Created specialty pages in auto-generated folder');
  }
}

// Run the automation
if (require.main === module) {
  const automation = new FreedSiteAutomation();
  automation.run().catch(console.error);
}

module.exports = FreedSiteAutomation;
